import { useEffect } from 'react';

export function PublicVoiceWidget() {
  useEffect(() => {
    // Only load the widget on public pages
    const script = document.createElement('script');
    script.id = 'vw';
    script.src = 'https://zonvo.tech/widget/embed.js';
    script.async = true;
    
    // Initialize the widget once the script is loaded
    script.onload = () => {
      if ((window as any).vw) {
        (window as any).vw('init', 'wgt_an5k7vNFf0Kgrr5AmFPMI5cU');
      }
    };

    document.body.appendChild(script);

    // Cleanup: remove the widget when leaving public pages
    return () => {
      // Remove the script tag
      const scriptElement = document.getElementById('vw');
      if (scriptElement) {
        scriptElement.remove();
      }
      
      // The widget usually creates an iframe or a div at the end of the body.
      // Since it's a third party widget, it might be tricky to remove its UI perfectly,
      // but typically we can remove its injected containers if known.
      const widgetContainer = document.getElementById('zonvo-voice-widget-container');
      if (widgetContainer) {
        widgetContainer.remove();
      }
    };
  }, []);

  return null;
}
