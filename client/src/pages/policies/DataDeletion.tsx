import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic2, ShieldAlert } from "lucide-react";
import { useLocation } from "wouter";
import { useBranding } from "@/components/BrandingProvider";

export default function DataDeletion() {
  const [, setLocation] = useLocation();
  const { branding, currentLogo } = useBranding();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b bg-background sticky top-0 z-50 backdrop-blur-md bg-background/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setLocation('/')}>
              {currentLogo ? (
                <img
                  src={currentLogo}
                  alt={branding.app_name}
                  className="h-10 w-auto max-w-[180px] object-contain"
                  data-testid="img-policy-logo"
                />
              ) : (
                <>
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <Mic2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    {branding.app_name}
                  </span>
                </>
              )}
            </div>
            <Button variant="ghost" onClick={() => setLocation('/')} data-testid="button-back-home">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="h-8 w-8 text-orange-500" />
            <h1 className="text-4xl md:text-5xl font-bold m-0">Data Deletion Instructions</h1>
          </div>
          <p className="text-muted-foreground text-lg mb-12">Last Updated: 11 July 2026</p>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">ZONVO Data Deletion Request</h2>
            <p className="text-lg leading-relaxed mb-4">
              At ZONVO, we respect your privacy. If you wish to delete your account or personal data associated with our services, you may request deletion using the methods below.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">What data can be deleted?</h2>
            <p className="text-lg leading-relaxed mb-4">
              Upon verification of your request, we may delete:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
              <li>Account information</li>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>WhatsApp integration data</li>
              <li>Contacts uploaded to ZONVO</li>
              <li>Conversation history (where applicable)</li>
              <li>AI call logs (where applicable)</li>
              <li>Campaign data</li>
              <li>Other personal information stored in your account</li>
            </ul>
            <p className="text-lg leading-relaxed mb-4 text-muted-foreground">
              Some information such as invoices, payment records, or records required by law may be retained for legal or compliance purposes.
            </p>
          </section>

          <section className="mb-12 border p-6 rounded-xl bg-muted/30">
            <h2 className="text-3xl font-bold mb-4 text-orange-600 dark:text-orange-500">How to request deletion</h2>
            <p className="text-lg leading-relaxed mb-4">
              Send an email to:
            </p>
            <div className="bg-background border p-4 rounded-lg font-mono text-lg mb-6">
              <strong>privacy@zonvo.tech</strong>
            </div>
            
            <p className="text-lg leading-relaxed mb-4">
              Subject:
            </p>
            <div className="bg-background border p-4 rounded-lg font-mono text-lg mb-6">
              <strong>Data Deletion Request</strong>
            </div>

            <p className="text-lg leading-relaxed mb-4">
              Include the following information:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-lg">
              <li>Full Name</li>
              <li>Registered Email Address</li>
              <li>Registered Phone Number</li>
              <li>Company Name (if applicable)</li>
              <li>Reason for deletion (optional)</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Processing Time</h2>
            <p className="text-lg leading-relaxed mb-4">
              We will verify your identity and process your request within 7–30 business days.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Delete Meta / Facebook Data</h2>
            <p className="text-lg leading-relaxed mb-4">
              If you connected your Facebook or WhatsApp account with ZONVO, you can also remove ZONVO from your Meta Account settings. We will delete any data stored by ZONVO after receiving and verifying your deletion request. Meta may retain information according to its own policies.
            </p>
          </section>

          <section className="mb-12 border-t pt-8">
            <h2 className="text-3xl font-bold mb-4">Contact</h2>
            <p className="text-lg font-semibold mb-2">AICLEX SOLUTIONS PRIVATE LIMITED</p>
            <p className="text-lg mb-1"><strong>Website:</strong> <a href="https://zonvo.tech" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://zonvo.tech</a></p>
            <p className="text-lg mb-1"><strong>Email:</strong> privacy@zonvo.tech</p>
            <p className="text-lg mb-1"><strong>Support:</strong> support@zonvo.tech</p>
          </section>
        </div>
      </div>
    </div>
  );
}
