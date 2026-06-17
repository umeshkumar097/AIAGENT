import { useEffect } from 'react';

export function ChatbotWidget() {
  useEffect(() => {
    // Anjali Gupta Voice Widget Initialization
    const w = window as any;
    const d = document;
    const s = 'script';
    const o = 'vw';
    const f = 'http://zonvo.tech/widget/embed.js';
    
    w[o] = w[o] || function() { (w[o].q = w[o].q || []).push(arguments) };
    
    const js = d.createElement(s) as HTMLScriptElement;
    js.id = o;
    js.src = f;
    js.async = true;
    
    const target = d.head || d.body;
    target.appendChild(js);
    
    w.vw('init', 'wgt_an5k7vNFf0Kgrr5AmFPMI5cU');

    return () => {
      const existingScript = document.getElementById(o);
      if (existingScript) {
        existingScript.remove();
      }
      // Note: Full unmounting of external widgets might require specific API calls from the widget itself if it injects DOM elements
    };
  }, []);

  return null;
}
