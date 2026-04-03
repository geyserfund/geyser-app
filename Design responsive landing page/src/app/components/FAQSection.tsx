import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "Which fundraiser type should I choose?",
      answer: "Choose Open Fundraiser if your project can start with any amount and grows over time. Choose All-or-Nothing if you need a minimum budget to deliver your project. Open is flexible and ongoing, while All-or-Nothing provides structure and supporter protection."
    },
    {
      question: "Do I need to configure my wallet before launch?",
      answer: "Yes, you'll need to set up your Bitcoin wallet before publishing your project. This ensures you can receive funds immediately when supporters contribute. The setup process is straightforward, and we provide clear guidance throughout."
    },
    {
      question: "Can supporters contribute in different ways?",
      answer: "Absolutely! Supporters can contribute via Lightning Network, on-chain Bitcoin, or familiar credit/debit card payments. We make it easy for anyone to back your project, regardless of their technical knowledge."
    },
    {
      question: "Do I need verification?",
      answer: "Verification is optional but highly recommended. It increases trust and can significantly improve your conversion rate. Verified projects show supporters that you're committed and credible."
    },
    {
      question: "Can I add goals or rewards later?",
      answer: "Yes! You can add and edit goals, rewards, and other project elements anytime. Many successful creators launch with a basic setup and add more features as they learn what their supporters want."
    },
    {
      question: "What if I want more visibility?",
      answer: "You can upgrade your launch plan at any time. Start with Starter Launch and upgrade to Growth or Pro Launch when you're ready for additional visibility and support."
    },
    {
      question: "Which launch plan is right for me?",
      answer: "Starter Launch ($25) is perfect for testing your idea. Growth Launch ($60) adds visibility through our newsletter and social channels. Pro Launch ($90) includes expert feedback and is chosen by 40% of our top projects. Geyser Partnership ($1,000+) provides hands-on support for ambitious teams."
    },
    {
      question: "What happens after I launch?",
      answer: "After launching, focus on your first 72 hours: engage with early supporters, share your launch announcement, and post regular updates. Use the Geyser dashboard to track performance, manage contributions, and communicate with your community."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-[900px] px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold mb-4">
            Questions creators usually have
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know before launching your project on Geyser.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-[var(--geyser-primary)]"
            >
              <AccordionTrigger className="text-left font-bold hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional help */}
        <div className="mt-12 text-center bg-muted/50 rounded-xl p-8">
          <p className="text-sm text-muted-foreground mb-4">
            Still have questions? We're here to help.
          </p>
          <div className="flex justify-center gap-4">
            <button className="text-sm font-semibold text-[var(--geyser-primary-text)] hover:underline">
              Visit Help Center
            </button>
            <span className="text-muted-foreground">•</span>
            <button className="text-sm font-semibold text-[var(--geyser-primary-text)] hover:underline">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
