import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mountain, TrendingUp, Zap, Target, Rocket, Play, Star, Check, ArrowUpRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LandingModuleSelector } from '@/components/LandingModuleSelector';
import { useAuth } from '@/contexts/AuthContext';

type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

const getTimeOfDay = (): TimeOfDay => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 7) return 'dawn';
  if (hour >= 7 && hour < 18) return 'day';
  if (hour >= 18 && hour < 20) return 'dusk';
  return 'night';
};

const Landing = () => {
  const { isAuthenticated } = useAuth();
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add('landing-page');
    const interval = setInterval(() => setTimeOfDay(getTimeOfDay()), 60000);
    return () => {
      document.body.classList.remove('landing-page');
      clearInterval(interval);
    };
  }, []);

  const showBirds = timeOfDay !== 'night';

  const stats = [
    { value: '10K+', label: 'Creators' },
    { value: '50M+', label: 'Content Pieces' },
    { value: '99%', label: 'Satisfaction' },
  ];

  const features = [
    { icon: Target, title: 'Analytics', desc: 'Deep insights into your audience' },
    { icon: Zap, title: 'Automation', desc: 'Save 10+ hours per week' },
    { icon: TrendingUp, title: 'Insights', desc: 'Data-driven content strategies' },
    { icon: Rocket, title: 'Growth', desc: 'Scale your influence faster' },
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden landing-gradient sky-${timeOfDay}`}>
      {/* Night Sky Elements */}
      {timeOfDay === 'night' && (
        <div className="night-sky">
          <div className="stars"></div>
          <div className="moon"></div>
          <div className="shooting-star shooting-star-1"></div>
          <div className="shooting-star shooting-star-2"></div>
          <div className="shooting-star shooting-star-3"></div>
          <div className="shooting-star shooting-star-4"></div>
          <div className="shooting-star shooting-star-5"></div>
        </div>
      )}
      
      {/* Birds */}
      {showBirds && (
        <div className="sky-birds">
          {[1,2,3,4,5,6,7,8].map(i => <div key={i} className={`bird bird-${i}`}></div>)}
          <div className="bird-flock bird-flock-1"></div>
          <div className="bird-flock bird-flock-2"></div>
        </div>
      )}

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-background/60 border-b border-border/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-insight-teal to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-insight-teal bg-clip-text text-transparent">kaizen</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Reviews</a>
            </div>

            <div className="hidden md:flex items-center gap-3">
              {isAuthenticated ? (
                <Link to="/app">
                  <Button className="rounded-full px-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                    Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth">
                    <Button variant="ghost" className="rounded-full">Sign in</Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="rounded-full px-6 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                      Start Free <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pt-4 pb-2 space-y-3 animate-fade-in">
              <a href="#features" className="block py-2 text-muted-foreground">Features</a>
              <a href="#pricing" className="block py-2 text-muted-foreground">Pricing</a>
              <Link to="/auth" className="block">
                <Button className="w-full rounded-full mt-2">Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-1.5 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span className="text-sm font-medium">Now with AI-powered tools</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-6">
              <span className="block">Create.</span>
              <span className="block bg-gradient-to-r from-primary via-insight-teal to-accent bg-clip-text text-transparent">
                Grow.
              </span>
              <span className="block">Dominate.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              The all-in-one operating system for modern creators. 
              Build your empire with tools that actually work.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="#choose-features">
                <Button size="lg" className="rounded-full text-base px-8 py-6 shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all group">
                  Build Your Workspace
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Button size="lg" variant="outline" className="rounded-full text-base px-8 py-6 backdrop-blur-sm bg-background/50 hover:bg-background/80 transition-all group">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="group relative p-6 rounded-3xl bg-background/60 backdrop-blur-xl border border-border/50 hover:border-primary/30 hover:bg-background/80 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-insight-teal/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Selector */}
      <section id="choose-features" className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Modular Design</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mt-2 mb-4">
              Pick Your <span className="bg-gradient-to-r from-primary to-insight-teal bg-clip-text text-transparent">Powers</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Only pay for what you use. Start minimal, scale infinitely.
            </p>
          </div>
          
          <LandingModuleSelector />
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Wall of Love</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2">
              Trusted by <span className="bg-gradient-to-r from-primary to-insight-teal bg-clip-text text-transparent">Creators</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Jake M.', role: 'YouTube • 250K', text: 'Tripled my engagement in 2 months. The AI tools are insane.', metric: '+300%' },
              { name: 'Sophia L.', role: 'Instagram • 500K', text: 'Finally organized my brand deals. Closed 5 partnerships this month.', metric: '5 deals' },
              { name: 'Tom S.', role: 'TikTok • 1M', text: 'The analytics helped me understand my audience. Revenue up 150%.', metric: '+150%' },
            ].map((t, i) => (
              <div key={i} className="group relative p-6 rounded-3xl bg-background/60 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-300">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                    {t.metric}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Simple Pricing</span>
            <h2 className="text-4xl md:text-5xl font-black mt-2">
              Start Free, <span className="bg-gradient-to-r from-primary to-insight-teal bg-clip-text text-transparent">Scale Fast</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '$0', period: '/forever', features: ['3 modules', 'Basic analytics', 'Community support'], popular: false },
              { name: 'Pro', price: '$29', period: '/month', features: ['Unlimited modules', 'Advanced analytics', 'AI tools', 'Priority support', 'Custom branding'], popular: true },
              { name: 'Team', price: '$99', period: '/month', features: ['Everything in Pro', 'Team collaboration', 'API access', 'Dedicated manager', 'White-label'], popular: false },
            ].map((plan, i) => (
              <div 
                key={i}
                className={`relative p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 hover:-translate-y-1 ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-primary/10 to-background/80 border-primary/50 shadow-2xl shadow-primary/20' 
                    : 'bg-background/60 border-border/50 hover:border-primary/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-lg font-bold mb-2">{plan.name}</div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/app">
                  <Button 
                    className={`w-full rounded-full ${plan.popular ? 'shadow-lg shadow-primary/25' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-16 bg-gradient-to-br from-primary via-primary to-insight-teal text-primary-foreground">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                Ready to Level Up?
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-10 max-w-xl mx-auto">
                Join 10,000+ creators who are building their empires with Kaizen.
              </p>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="rounded-full text-base px-10 py-6 bg-white text-primary hover:bg-white/90 shadow-2xl hover:scale-105 transition-all group">
                  Start Building Now
                  <ArrowUpRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </Link>
              <p className="text-sm opacity-75 mt-6">
                Free forever • No credit card required • Setup in 30 seconds
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-12 px-6 backdrop-blur-sm bg-background/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-insight-teal to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                <Mountain className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold bg-gradient-to-r from-primary to-insight-teal bg-clip-text text-transparent">kaizen</span>
            </div>
            
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>

            <p className="text-sm text-muted-foreground">
              © 2025 Kaizen. Made for creators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
