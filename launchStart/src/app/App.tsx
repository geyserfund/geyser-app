import { ArrowRight, CheckCircle2, Target, Gift, Megaphone, Sparkles, Shield, Wallet, Users, TrendingUp, ExternalLink, BookOpen } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
                  How to fundraise on Geyser
                </h1>
                <p className="text-xl text-muted-foreground lg:text-2xl">
                  Start with an idea, tell a clear story, and invite people to back what matters.
                </p>
              </div>

              <p className="text-lg text-muted-foreground">
                You don't need to know everything before you begin.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="group gap-2">
                  Start your project
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Read the guide
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border bg-card shadow-2xl">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20 p-8">
                  <div className="text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Sparkles className="h-8 w-8" />
                    </div>
                    <p className="text-lg font-medium">Your project preview</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Intro Section */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              A great fundraiser is simpler than you think
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Successful fundraising usually comes down to a few basics
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">Clear idea</h3>
                <p className="text-sm text-muted-foreground">
                  Know what you're building and why it matters
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">Believable story</h3>
                <p className="text-sm text-muted-foreground">
                  Help people understand and connect with your vision
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">Build trust</h3>
                <p className="text-sm text-muted-foreground">
                  Show you're prepared and transparent
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="mb-2 font-semibold">Launch momentum</h3>
                <p className="text-sm text-muted-foreground">
                  Start strong and keep supporters engaged
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tell a Story Section */}
      <section className="bg-muted/30 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold lg:text-4xl">
                Start with a project people understand right away
              </h2>

              <div className="space-y-4 text-muted-foreground">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>Say what you're making</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>Explain why it matters</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>Make it easy to support</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>Use strong visuals</span>
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>Show what support helps make possible</span>
                </p>
              </div>

              <Button variant="link" className="gap-1 px-0">
                Read the guide
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>

            <div className="relative">
              <Card className="overflow-hidden shadow-xl">
                <div className="bg-gradient-to-br from-primary/5 to-accent/10 p-8">
                  <div className="mb-6 h-48 rounded-lg bg-gradient-to-br from-primary/20 to-accent/30"></div>
                  <div className="space-y-3">
                    <div className="h-8 w-3/4 rounded bg-foreground/10"></div>
                    <div className="h-4 w-full rounded bg-foreground/5"></div>
                    <div className="h-4 w-5/6 rounded bg-foreground/5"></div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Fundraiser Types Section */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Choose the fundraising style that fits your project
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Two simple options to match your needs
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card className="border-2 transition-all hover:shadow-xl">
              <CardContent className="p-8">
                <Badge className="mb-4" variant="secondary">Flexible</Badge>
                <h3 className="mb-3 text-2xl font-bold">Open Fundraiser</h3>
                <p className="mb-6 text-muted-foreground">
                  Best when you want flexible support and can start with any amount of momentum.
                </p>

                <div className="mb-6 space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Good for ongoing work
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Keep funds as you go
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    No deadline pressure
                  </p>
                </div>

                <Button variant="link" className="gap-1 px-0">
                  Learn about open fundraisers
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-xl">
              <CardContent className="p-8">
                <Badge className="mb-4" variant="secondary">Goal-focused</Badge>
                <h3 className="mb-3 text-2xl font-bold">All-or-Nothing Campaign</h3>
                <p className="mb-6 text-muted-foreground">
                  Best when your project needs to hit a clear goal before it can happen.
                </p>

                <div className="mb-6 space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Good for projects with a budget target
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Creates urgency
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    Supporters only charged if goal is met
                  </p>
                </div>

                <Button variant="link" className="gap-1 px-0">
                  Learn about all-or-nothing
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted/30 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Trust helps people say yes
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              People are more likely to support a project that feels real, prepared, and transparent
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Wallet className="h-8 w-8" />
                </div>
                <h3 className="mb-2 font-semibold">Connect your wallet</h3>
                <p className="text-sm text-muted-foreground">
                  Make it clear where funds are going
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Shield className="h-8 w-8" />
                </div>
                <h3 className="mb-2 font-semibold">Verify your profile</h3>
                <p className="text-sm text-muted-foreground">
                  Show you're a real creator with a real plan
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mb-2 font-semibold">Complete your project</h3>
                <p className="text-sm text-muted-foreground">
                  A finished page builds confidence
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button variant="link" className="gap-1">
              Configure your wallet
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              A few simple tools can make a big difference
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Geyser gives you useful ways to make your fundraiser stronger
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="group border-2 transition-all hover:border-primary/50 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
                  <Target className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Goals</h3>
                <p className="text-muted-foreground">
                  Help people see what support unlocks
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 transition-all hover:border-primary/50 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
                  <Gift className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Rewards</h3>
                <p className="text-muted-foreground">
                  Give people more ways to participate
                </p>
              </CardContent>
            </Card>

            <Card className="group border-2 transition-all hover:border-primary/50 hover:shadow-xl">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary">
                  <Megaphone className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Updates</h3>
                <p className="text-muted-foreground">
                  Keep supporters involved and build momentum
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Button variant="link" className="gap-1">
              See all features
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Launch Momentum Section */}
      <section className="bg-muted/30 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              The best launches feel like an invitation, not just a page
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Start strong without turning this into a tactical playbook
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                1
              </div>
              <h3 className="mb-2 font-semibold">Launch with a clear ask</h3>
              <p className="text-sm text-muted-foreground">
                Make your goal and purpose obvious
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                2
              </div>
              <h3 className="mb-2 font-semibold">Invite your first supporters</h3>
              <p className="text-sm text-muted-foreground">
                Reach out personally to people who care
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                3
              </div>
              <h3 className="mb-2 font-semibold">Share early momentum</h3>
              <p className="text-sm text-muted-foreground">
                Let people see the excitement building
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-bold">
                4
              </div>
              <h3 className="mb-2 font-semibold">Post updates</h3>
              <p className="text-sm text-muted-foreground">
                Treat launch day like the beginning
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button variant="link" className="gap-1">
              Read the launch guide
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Launch Plans Section */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Pick the level of support that fits your launch
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Optional support to help you launch stronger
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            <Card className="border-2 transition-all hover:shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge variant="outline">Starter</Badge>
                </div>
                <h3 className="mb-2 text-2xl font-bold">$25</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Do it yourself, get the basic exposure
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Access to all Geyser tooling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Get discovered on platform</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/50 transition-all hover:shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge>Growth</Badge>
                </div>
                <h3 className="mb-2 text-2xl font-bold">$60</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Visibility boost
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>1 week front-page spotlight</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Newsletter feature (5000+ subscribers)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>1 social media post (15k+ followers)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary transition-all hover:shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge>Pro</Badge>
                </div>
                <h3 className="mb-2 text-2xl font-bold">$90</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Maximum visibility + feedback
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Everything in Growth</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Spotlight email to interested users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Project feedback from Geyser Team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-xs italic">Picked by 40% of Top 100 projects</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  Limited to 5 per month
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:shadow-xl">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge variant="secondary">Partnership</Badge>
                </div>
                <h3 className="mb-2 text-2xl font-bold">$1,000+</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Hands-on support + network amplification
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Personalized launch strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Project feedback</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>Marketing support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button variant="link" className="gap-1">
              Learn about launch modes
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Full Playbook Section */}
      <section className="bg-muted/30 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">
              Go deeper when you're ready
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Detailed help is available whenever you need it
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Launch a project</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Complete guide to getting started
                </p>
                <Button variant="link" className="h-auto gap-1 p-0 text-sm">
                  Read guide
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Create an Open Fundraiser</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Flexible ongoing fundraising
                </p>
                <Button variant="link" className="h-auto gap-1 p-0 text-sm">
                  Read guide
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Create an All-or-Nothing campaign</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Goal-focused fundraising
                </p>
                <Button variant="link" className="h-auto gap-1 p-0 text-sm">
                  Read guide
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Configure your wallet</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Set up withdrawals and funding
                </p>
                <Button variant="link" className="h-auto gap-1 p-0 text-sm">
                  Read guide
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 transition-all hover:border-primary/50 hover:shadow-lg">
              <CardContent className="p-6">
                <h3 className="mb-2 font-semibold">Launch modes on Geyser</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  Compare all launch options
                </p>
                <Button variant="link" className="h-auto gap-1 p-0 text-sm">
                  Read guide
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 space-y-4">
            <h2 className="text-3xl font-bold lg:text-4xl">
              Ready to start your project?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              You do not need to have everything figured out before you begin. Start with your idea, make your page clear, and build momentum from there.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="group gap-2">
              Start your project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Read the guide
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="mb-4 font-semibold">Get Started</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-foreground">Start your project</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Launch plans</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Features</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Learn</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-foreground">Guide</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Success stories</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">About</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="transition-colors hover:text-foreground">About Geyser</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Community</a></li>
                <li><a href="#" className="transition-colors hover:text-foreground">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                  <Users className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 Geyser. Built with clarity and care.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
