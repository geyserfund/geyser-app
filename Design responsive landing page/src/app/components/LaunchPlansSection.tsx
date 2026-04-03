import { Button } from "./ui/button";
import { PiCheckCircle, PiRocket, PiTrendUp, PiStar, PiSparkle } from "react-icons/pi";

export function LaunchPlansSection() {
  const plans = [
    {
      name: "Starter Launch",
      tagline: "Do it yourself, get basic exposure",
      price: "$25",
      icon: PiRocket,
      badge: null,
      features: [
        "Access to all Geyser tooling",
        "Get discovered through Geyser platform",
        "Community support",
        "Full creator dashboard"
      ],
      bestFor: "DIY launchers testing their project"
    },
    {
      name: "Growth Launch",
      tagline: "Visibility boost",
      price: "$60",
      icon: PiTrendUp,
      badge: "Popular",
      features: [
        "Everything in Starter",
        "1 week front-page spotlight",
        "Featured in monthly newsletter (5,000+ subscribers)",
        "Social media post on Geyser's X (15k+ followers)"
      ],
      bestFor: "Creators ready to scale their reach"
    },
    {
      name: "Pro Launch",
      tagline: "Maximum visibility + product feedback",
      price: "$90",
      icon: PiStar,
      badge: "Best Value",
      features: [
        "Everything in Growth",
        "Spotlight email to targeted audience",
        "Expert project feedback from Geyser Team",
        "Limited to 5 per month",
        "Picked by 40% of Top 100 projects"
      ],
      bestFor: "Serious projects aiming for maximum exposure"
    },
    {
      name: "Geyser Partnership",
      tagline: "Hands-on support + network amplification",
      price: "Starting at $1,000",
      icon: PiSparkle,
      badge: "Premium",
      features: [
        "Personalized launch strategy",
        "Dedicated project feedback",
        "Marketing support & guidance",
        "Network amplification",
        "Priority support"
      ],
      bestFor: "Teams wanting hands-on partnership"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-[1.75rem] lg:text-[2.5rem] font-bold mb-4">
            Choose your Launch Plan
          </h2>
          <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Different levels of amplification and support to match your project's ambition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`bg-card border-2 rounded-xl p-6 flex flex-col ${
                plan.badge === "Best Value"
                  ? "border-[var(--geyser-primary)] shadow-lg scale-105 lg:scale-110"
                  : "border-border hover:border-[var(--geyser-primary)]"
              } transition-all`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="inline-flex self-start items-center gap-1 text-xs font-bold bg-[var(--geyser-primary)] text-white px-3 py-1 rounded-full mb-4">
                  {plan.badge}
                </div>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-[var(--geyser-primary-surface)] flex items-center justify-center mb-4">
                <plan.icon className="w-6 h-6 text-[var(--geyser-primary-text)]" />
              </div>

              {/* Plan name & tagline */}
              <h3 className="text-lg font-bold mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.tagline}</p>

              {/* Price */}
              <div className="mb-6">
                <p className="text-2xl font-bold text-[var(--geyser-primary-text)]">{plan.price}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start gap-2 text-sm">
                    <PiCheckCircle className="w-5 h-5 text-[var(--geyser-primary-text)] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Best for */}
              <div className="pt-4 border-t border-border mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-1 uppercase">Best for</p>
                <p className="text-xs">{plan.bestFor}</p>
              </div>

              {/* CTA */}
              <Button
                className={`w-full ${
                  plan.badge === "Best Value"
                    ? "bg-[var(--geyser-primary)] hover:bg-[var(--geyser-primary-hover)] text-[var(--geyser-primary-text)]"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {idx === 3 ? "Contact Us" : "Select Plan"}
              </Button>
            </div>
          ))}
        </div>

        {/* Comparison note */}
        <div className="text-center bg-card border border-border rounded-xl p-6">
          <p className="text-sm text-muted-foreground">
            Not sure which plan to choose? Start with Starter and upgrade anytime.{" "}
            <span className="text-[var(--geyser-primary-text)] font-semibold cursor-pointer hover:underline">
              Compare all features →
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
