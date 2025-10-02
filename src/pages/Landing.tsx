import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
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
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              We make brands shine
              <br />
              <span className="text-primary">& competitors envious</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Innovative Digital Marketing Solutions for Creators, Artists, and Influencers
            </p>
            <Link to="/app">
              <Button size="lg" className="rounded-full text-lg px-8 py-6 shadow-lg hover:shadow-primary/50 transition-all">
                Launch App
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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

      {/* Good Morning Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary/5 to-accent/10">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-center">
              Good Morning <span className="text-primary">legends!</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-8">
              "Enhance your online presence with tailored social media strategies, content creation, and community engagement"
            </p>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold mb-8 text-center">Why Us?</h2>
          <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-card">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every creator has a vision, but bringing that vision to life can be challenging. At Kyzzen Media, we specialize in turning your creative dreams into reality. Let us handle the editing, social media management, and branding, so you can focus on what you do best: creating! With Kyzzen Media by your side, your vision will shine brilliantly in the digital world.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-accent/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold mb-12 text-center">What Our Customers Are Saying</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Jake M.',
                initial: 'J',
                text: 'kyzzen has improved the quality of my YouTube videos with their professional editing. Their SEO advice has also helped attract more viewers. They\'ve been a valuable part of my growth.'
              },
              {
                name: 'Sophia L.',
                initial: 'S',
                text: 'Kyzzen Media has helped me gradually grow my Instagram following. Their content ideas and strategies fit my brand well, and the team is always there to offer support and advice.'
              },
              {
                name: 'Tom S.',
                initial: 'T',
                text: 'Thanks to Kyzzen Media, my website traffic and art sales have seen a nice increase. Their marketing strategies have helped bring more visibility to my work.'
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                      {testimonial.initial}
                    </div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold mb-4 text-center">Choose the Perfect Plan</h2>
          <p className="text-xl text-muted-foreground mb-12 text-center">for Your Creative Journey</p>
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

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-accent/5">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-5xl font-bold mb-4 text-center">What We Offer</h2>
          <p className="text-xl text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            We specialize in empowering creators through a comprehensive suite of services designed to enhance their digital presence and maximize their impact.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Social Media Management',
                description: 'We manage your social media accounts, ensuring consistent posting and audience growth.'
              },
              {
                title: 'Video Editing',
                description: 'Our editors craft high-quality videos with professional cuts, effects, and transitions.'
              },
              {
                title: 'Content Strategy',
                description: 'We develop tailored strategies to drive engagement and increase visibility.'
              }
            ].map((service, idx) => (
              <Card key={idx} className="bg-card border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/20 rounded-3xl p-12 border border-border">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to elevate your digital presence?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of creators who trust Kyzzen Media to bring their vision to life.
            </p>
            <Link to="/app">
              <Button size="lg" className="rounded-full text-lg px-12 py-6 shadow-xl hover:shadow-primary/50 transition-all">
                Let's Elevate!
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6 bg-accent/5">
        <div className="container mx-auto text-center">
          <div className="text-2xl font-bold text-primary mb-4">kyzzen</div>
          <p className="text-muted-foreground">
            © 2025 Kyzzen Media. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
