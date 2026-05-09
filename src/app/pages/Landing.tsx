import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import {
  TrendingUp,
  Shield,
  Sparkles,
  BarChart3,
  ShoppingBag,
  Newspaper,
  CheckCircle,
  Star,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";
import { MiniChart } from "../components/MiniChart";

const generateMockChart = () => {
  const data = [];
  let value = 100;
  for (let i = 0; i < 20; i++) {
    value = value * (1 + (Math.random() - 0.4) * 0.1);
    data.push({ time: `${i}`, value });
  }
  return data;
};

export function Landing() {
  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Recommendations",
      description: "Get personalized stock picks powered by advanced machine learning algorithms"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Access live market data and sophisticated charting tools"
    },
    {
      icon: ShoppingBag,
      title: "Curated Baskets",
      description: "Invest in professionally managed themed stock portfolios"
    },
    {
      icon: Newspaper,
      title: "Market Intelligence",
      description: "Stay informed with AI-summarized news and market insights"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Bank-grade security with 99.9% uptime guarantee"
    },
    {
      icon: TrendingUp,
      title: "IPO Tracking",
      description: "Never miss an IPO opportunity with our comprehensive tracker"
    }
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: "₹0",
      period: "/month",
      features: [
        "Basic stock tracking",
        "Limited watchlists",
        "Daily market news",
        "Community access"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "₹999",
      period: "/month",
      features: [
        "All Free features",
        "AI recommendations",
        "Unlimited watchlists",
        "Real-time alerts",
        "Advanced charts",
        "IPO analysis"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Elite",
      price: "₹2,999",
      period: "/month",
      features: [
        "All Pro features",
        "Premium stock baskets",
        "Dedicated support",
        "Portfolio insights",
        "Early IPO access",
        "Exclusive research"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Retail Investor",
      content: "Ani.AMC helped me grow my portfolio by 45% in just 6 months. The AI recommendations are spot on!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Day Trader",
      content: "The real-time analytics and IPO tracker are game-changers. I've never felt more confident in my investment decisions.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Long-term Investor",
      content: "The curated baskets make diversification so easy. Great platform for both beginners and experienced investors.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI-Powered Stock Advisory Platform</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
              Invest Smarter with AI-Driven Insights
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Make informed investment decisions with real-time market data, AI recommendations, and expertly curated stock baskets
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" variant="primary">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>

            <div className="mt-12 bg-card/50 backdrop-blur-lg border border-border rounded-2xl p-6 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-3xl font-bold text-primary">50K+</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">₹500Cr+</p>
                  <p className="text-sm text-muted-foreground">Assets Tracked</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">92%</p>
                  <p className="text-sm text-muted-foreground">Accuracy Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-secondary">24/7</p>
                  <p className="text-sm text-muted-foreground">Market Monitoring</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-muted-foreground">
              Powerful features designed for modern investors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card hoverable glass>
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free and upgrade as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <Card className={plan.popular ? "border-primary shadow-xl" : ""}>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-end justify-center gap-1 mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground mb-1">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button
                      variant={plan.popular ? "primary" : "outline"}
                      className="w-full"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Investors
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Investing Smarter?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of investors making better decisions with Ani.AMC
            </p>
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/stocks" className="hover:text-primary">Stocks</Link></li>
                <li><Link to="/ipo" className="hover:text-primary">IPOs</Link></li>
                <li><Link to="/baskets" className="hover:text-primary">Baskets</Link></li>
                <li><Link to="/news" className="hover:text-primary">News</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">API Docs</a></li>
                <li><a href="#" className="hover:text-primary">Community</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
                <li><a href="#" className="hover:text-primary">Security</a></li>
                <li><a href="#" className="hover:text-primary">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>&copy; 2026 Ani.AMC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
