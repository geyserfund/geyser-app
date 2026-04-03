import { PiTwitterLogo, PiGithubLogo, PiDiscordLogo } from "react-icons/pi";

export function Footer() {
  const footerLinks = {
    product: [
      { label: "Launch a project", href: "#" },
      { label: "Creator tools", href: "#" },
      { label: "Launch plans", href: "#" },
      { label: "Success stories", href: "#" }
    ],
    resources: [
      { label: "How to fundraise", href: "#" },
      { label: "Creator guide", href: "#" },
      { label: "Help center", href: "#" },
      { label: "API docs", href: "#" }
    ],
    company: [
      { label: "About Geyser", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" }
    ]
  };

  const socialLinks = [
    { icon: PiTwitterLogo, label: "Twitter", href: "#" },
    { icon: PiGithubLogo, label: "GitHub", href: "#" },
    { icon: PiDiscordLogo, label: "Discord", href: "#" }
  ];

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold">Geyser</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Fundraising tools for creators building the future
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center hover:border-[var(--geyser-primary)] transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-bold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 Geyser. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
