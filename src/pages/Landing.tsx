import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, Users, Zap, Target, BarChart3, Rocket, Brain, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Landing = () => {
  const services = ['Content Strategy', 'Editing', 'Branding', 'Management'];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-accent/5">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            kyzzen
          </Link>
          <div className="hidden md:flex gap-8 items-center">
            <a href="#home" className="text-foreground/80 hover:text-primary transition-colors">Home</a>
            <a href="#about" className="text-foreground/80 hover:text-primary transition-colors">About</a>
            <a href="#services" className="text-foreground/80 hover:text-primary transition-colors">Services</a>
            <Link to="/app">
              <Button variant="outline" size="sm" className="rounded-full">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Creator Operating System</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Build Your Empire
              <br />
              <span className="text-primary">Create. Grow. Monetize.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AI content tools, analytics, brand deals—everything you need in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/app">
                <Button size="lg" className="rounded-full text-lg px-10 py-6 shadow-xl hover:shadow-primary/50 transition-all group">
                  Start Free
                  <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline" className="rounded-full text-lg px-10 py-6">
                  Features
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              <Heart className="inline h-4 w-4 text-primary" /> Trusted by 10K+ creators
            </p>
          </div>

          {/* Services Marquee */}
          <div className="overflow-hidden py-8 border-y border-border/50 bg-accent/10">
            <div className="flex gap-8 animate-marquee whitespace-nowrap">
              {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                  {services.map((service, idx) => (
                    <React.Fragment key={`${i}-${idx}`}>
                      <span className="text-2xl font-semibold text-foreground/60">*</span>
                      <span className="text-2xl font-semibold">{service}</span>
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything to <span className="text-primary">Succeed</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful tools built for creators
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI Content Generator',
                description: 'Create engaging content instantly with AI that understands your brand.',
                color: 'text-blue-500'
              },
              {
                icon: BarChart3,
                title: 'Smart Analytics',
                description: 'Track growth with real-time insights and data-driven decisions.',
                color: 'text-green-500'
              },
              {
                icon: Zap,
                title: 'Content Pipeline',
                description: 'Organize and schedule content to stay consistent.',
                color: 'text-yellow-500'
              },
              {
                icon: Target,
                title: 'Brand Ventures',
                description: 'Manage partnerships and sponsorships in one dashboard.',
                color: 'text-purple-500'
              },
              {
                icon: TrendingUp,
                title: 'Growth Engine',
                description: 'Get personalized strategies to expand your reach.',
                color: 'text-pink-500'
              },
              {
                icon: Users,
                title: 'Talent Network',
                description: 'Connect with creators and build your team.',
                color: 'text-orange-500'
              }
            ].map((feature, idx) => (
              <Card key={idx} className="bg-card border-border hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/app">
              <Button size="lg" variant="outline" className="rounded-full group">
                Explore All Features
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 px-6 bg-accent/5">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built <span className="text-primary">By Creators</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand your journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-card to-accent/10 border-border shadow-xl">
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary mb-4" />
                <CardTitle className="text-2xl">Focus on Creating</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Stop juggling tools. Everything you need in one place so you can focus on creating.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-card to-primary/10 border-border shadow-xl">
              <CardHeader>
                <Zap className="h-8 w-8 text-primary mb-4" />
                <CardTitle className="text-2xl">Scale Smarter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  AI-powered automation helps you create more, reach more, and grow faster.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Creators</h2>
            <p className="text-lg text-muted-foreground">Real results from real creators</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Jake M.',
                initial: 'J',
                role: 'YouTube Creator',
                followers: '250K',
                text: 'Went from posting weekly to daily. Engagement tripled. Game-changer.',
                metric: '+300% Engagement'
              },
              {
                name: 'Sophia L.',
                initial: 'S',
                role: 'Instagram Influencer',
                followers: '500K',
                text: 'Brand deals used to be chaos. Now organized. Closed 5 partnerships this month.',
                metric: '5 New Deals/Month'
              },
              {
                name: 'Tom S.',
                initial: 'T',
                role: 'Digital Artist',
                followers: '150K',
                text: 'Analytics showed what works. Sales up 150%. Finally understand my audience.',
                metric: '+150% Sales'
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="bg-card border-border hover:shadow-xl hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-primary font-bold text-xl">
                        {testimonial.initial}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{testimonial.role} • {testimonial.followers}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 py-1">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{testimonial.metric}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-6 bg-gradient-to-b from-accent/5 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Free, <span className="text-primary">Scale Fast</span>
            </h2>
            <p className="text-lg text-muted-foreground">Choose your plan</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Basic',
                price: '$499/month',
                description: 'For Emerging Creators',
                features: [
                  'Social Media Management (1 Platform)',
                  '3 Posts per Week',
                  'Community Engagement',
                  'Basic Video Editing (up to 10 videos/month)',
                  'Monthly Performance Report'
                ]
              },
              {
                name: 'Essential',
                price: '$999/month',
                description: 'For Growing Creators',
                features: [
                  'Initial Consultation and Personalized Strategy',
                  'Social Media Management (2 Platforms)',
                  '5 Posts per Week',
                  'Community Engagement',
                  'Hashtag and Trend Research',
                  'Enhanced Video Editing (up to 4 videos/month)',
                  'SEO Optimization',
                  'Monthly Performance Report'
                ],
                popular: true
              },
              {
                name: 'Custom Plan',
                price: '$1999/month',
                description: 'Tailored to Your Needs',
                features: [
                  'Everything in Essential',
                  'Custom Services',
                  'Specialized Marketing Tactics',
                  'Dedicated Account Manager',
                  'Priority Support'
                ]
              }
            ].map((plan, idx) => (
              <Card key={idx} className={`bg-card border-border hover:shadow-xl transition-all ${plan.popular ? 'ring-2 ring-primary shadow-primary/20' : ''}`}>
                <CardHeader>
                  {plan.popular && (
                    <div className="text-primary text-sm font-semibold mb-2">MOST POPULAR</div>
                  )}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary my-4">{plan.price}</div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <span className="text-primary mt-1">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/app">
                    <Button className="w-full" variant={plan.popular ? 'default' : 'outline'}>
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Start in minutes, see results fast
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Lines */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            
            {[
              {
                step: '01',
                title: 'Sign Up',
                description: 'Create your free account in 30 seconds. Connect and go.',
                icon: Rocket
              },
              {
                step: '02',
                title: 'Create',
                description: 'Use AI tools to generate ideas, schedule posts, and organize.',
                icon: Sparkles
              },
              {
                step: '03',
                title: 'Grow',
                description: 'Track analytics, secure deals, and scale with insights.',
                icon: TrendingUp
              }
            ].map((step, idx) => (
              <div key={idx} className="relative text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative z-10 border-4 border-background">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <div className="text-5xl font-bold text-primary/20 mb-2">{step.step}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/app">
              <Button size="lg" className="rounded-full text-lg px-10 py-6 shadow-xl group">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-accent/10 to-background">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-accent/10 to-primary/20 rounded-3xl p-12 md:p-16 border border-primary/20 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent animate-pulse"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">Start Free Today</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Start Building
                <br />
                <span className="text-primary">Today</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                Join 10K+ creators building their dream businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/app">
                  <Button size="lg" className="rounded-full text-lg px-12 py-7 shadow-2xl hover:shadow-primary/50 transition-all group text-lg font-semibold">
                    Launch App
                    <Rocket className="ml-2 h-5 w-5 group-hover:translate-y-[-2px] transition-transform" />
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                ✨ Free forever • No credit card • 30 seconds setup
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="text-3xl font-bold text-primary mb-4">kyzzen</div>
              <p className="text-muted-foreground mb-4 max-w-sm">
                Complete creator operating system. Build, grow, monetize.
              </p>
              <div className="flex gap-2">
                <Link to="/app">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><Link to="/app" className="hover:text-primary transition-colors">Launch App</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-muted-foreground text-sm">
            <p>© 2025 Kyzzen Media. Made with <Heart className="inline h-4 w-4 text-primary" /> for creators worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
