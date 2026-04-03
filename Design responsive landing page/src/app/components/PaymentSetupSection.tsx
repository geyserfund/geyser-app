import { PiWallet, PiShieldCheck, PiCreditCard, PiArrowDown } from "react-icons/pi";

export function PaymentSetupSection() {
  const setupCards = [
    {
      icon: PiWallet,
      title: "Wallet setup",
      description: "Configure your Bitcoin wallet to receive funds. Full control, self-custody.",
      details: ["Connect your wallet", "Secure your credentials", "Test with small amount"]
    },
    {
      icon: PiArrowDown,
      title: "Withdraw funds",
      description: "Withdrawals are manual and intentional. You decide when to move funds.",
      details: ["One-click withdrawal", "Track all transactions", "Export for accounting"]
    },
    {
      icon: PiShieldCheck,
      title: "Verification",
      description: "Increase trust by verifying your identity and project authenticity.",
      details: ["Identity verification", "Social connections", "Trust badges"]
    },
    {
      icon: PiCreditCard,
      title: "Contributor options",
      description: "Supporters can contribute using Bitcoin or familiar fiat/card payments.",
      details: ["Lightning Network", "On-chain Bitcoin", "Credit/debit cards"]
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-12 lg:mb-16">
          <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold mb-4">
            Set up how you get paid—and build trust from day one
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl">
            Make the payout and trust setup clear, secure, and manageable. Supporters should feel safe backing your project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {setupCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-6 lg:p-8 hover:border-[var(--geyser-primary)] transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--geyser-primary-surface)] flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-[var(--geyser-primary-text)]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              </div>
              <ul className="space-y-2 pl-16">
                {card.details.map((detail, detailIdx) => (
                  <li key={detailIdx} className="text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--geyser-primary)]"></div>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust and Security Callout */}
        <div className="bg-card border-2 border-[var(--geyser-primary)] rounded-xl p-8 lg:p-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--geyser-primary-surface)] mb-6">
              <PiShieldCheck className="w-8 h-8 text-[var(--geyser-primary-text)]" />
            </div>
            <h3 className="text-xl font-bold mb-4">
              Self-custody made approachable
            </h3>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              You maintain full control of your funds with Bitcoin's self-custody model. Geyser makes setup straightforward with clear guidance and verification options that build supporter confidence.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[var(--geyser-primary-text)]">100%</p>
                <p className="text-xs text-muted-foreground mt-1">Your control</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--geyser-primary-text)]">0%</p>
                <p className="text-xs text-muted-foreground mt-1">Platform holds</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--geyser-primary-text)]">24/7</p>
                <p className="text-xs text-muted-foreground mt-1">Access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
