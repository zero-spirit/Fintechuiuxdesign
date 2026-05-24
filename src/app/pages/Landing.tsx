import { Link } from "react-router-dom";
import { Button } from "../components/ui/CustomButton";
import { Card } from "../components/ui/CustomCard";
import {
  TrendingUp,
  Shield,
  Sparkles,
  BarChart3,
  ShoppingBag,
  Newspaper,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  Globe,
  Award,
  Users,
  TrendingDown,
  DollarSign
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { MiniChart } from "../components/MiniChart";
import { useRef } from "react";

const generateMockChart = () => {
  const data = [];
  let value = 100;
  for (let i = 0; i < 20; i++) {
    value = value * (1 + (Math.random() - 0.4) * 0.1);
    data.push({ time: `${i}`, value });
  }
  return data;
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function Landing() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      description: "Advanced machine learning algorithms analyze market patterns to provide intelligent stock recommendations",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Live market data with sophisticated charting tools and technical indicators at your fingertips",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: ShoppingBag,
      title: "Curated Baskets",
      description: "Professionally managed themed portfolios designed for specific investment goals and risk profiles",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Newspaper,
      title: "Market Intelligence",
      description: "AI-summarized news and market insights to keep you ahead of market movements",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Enterprise-level encryption and security protocols ensure your data stays protected",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "IPO Tracker",
      description: "Never miss an opportunity with comprehensive IPO tracking and analysis tools",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  const stats = [
    { value: "50K+", label: "Active Investors", icon: Users },
    { value: "₹500Cr+", label: "Assets Tracked", icon: DollarSign },
    { value: "92%", label: "Accuracy Rate", icon: Award },
    { value: "24/7", label: "Market Coverage", icon: Globe }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "₹0",
      period: "/month",
      description: "Perfect for beginners exploring the market",
      features: [
        "Basic stock tracking",
        "Limited watchlists (3)",
        "Daily market summaries",
        "Community access",
        "Mobile app access"
      ],
      cta: "Get Started Free",
      popular: false
    },
    {
      name: "Professional",
      price: "₹999",
      period: "/month",
      description: "For serious investors seeking growth",
      features: [
        "Everything in Starter",
        "AI-powered recommendations",
        "Unlimited watchlists",
        "Real-time price alerts",
        "Advanced charting tools",
        "IPO analysis & tracking",
        "Priority support"
      ],
      cta: "Start 14-Day Trial",
      popular: true
    },
    {
      name: "Elite",
      price: "₹2,999",
      period: "/month",
      description: "Premium experience for professionals",
      features: [
        "Everything in Professional",
        "Premium stock baskets",
        "Dedicated account manager",
        "Custom portfolio insights",
        "Early IPO access",
        "Exclusive research reports",
        "API access",
        "White-glove onboarding"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Portfolio Manager",
      company: "Mumbai",
      content: "Ani.AMC's AI recommendations have consistently outperformed my expectations. The platform's intuitive interface makes complex analysis simple.",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Priya Sharma",
      role: "Day Trader",
      company: "Bangalore",
      content: "Real-time analytics and IPO tracking are game-changers. I've never felt more confident about my investment decisions.",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Amit Patel",
      role: "Long-term Investor",
      company: "Delhi",
      content: "The curated baskets make diversification effortless. Excellent platform for both beginners and experienced investors alike.",
      rating: 5,
      avatar: "AP"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm mb-8"
          >
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AI-Powered Stock Advisory Platform
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent">
                Invest Smarter
              </span>
              <br />
              <span className="text-foreground">with Data-Driven Insights</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Harness the power of AI and real-time market data to make informed investment decisions in the Indian stock market
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-6 shadow-2xl shadow-primary/20">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                View Live Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={index} variants={item}>
                  <Card glass className="text-center hover:border-primary/50 transition-all duration-300">
                    <Icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                    <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools and features designed for modern investors
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card hoverable glass className="h-full group">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32 relative bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pricing
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Start free and scale as you grow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}
                <Card className={`h-full ${plan.popular ? 'border-primary shadow-2xl shadow-primary/20 scale-105' : ''}`}>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{plan.description}</p>
                    <div className="flex items-end gap-2 mb-6">
                      <span className="text-5xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground mb-2">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup" className="block">
                    <Button
                      variant={plan.popular ? "primary" : "outline"}
                      className="w-full"
                      size="lg"
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
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Thousands
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              See what investors are saying about Ani.AMC
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card glass hoverable className="h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Investment Journey?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Join thousands of smart investors making data-driven decisions with Ani.AMC
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-2xl px-8 py-6 text-lg">
                  Start Your Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Explore Platform
                </Button>
              </Link>
            </div>
            <p className="text-white/70 text-sm mt-6">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Product</h4>
              <ul className="space-y-3">
                <li><Link to="/stocks" className="text-muted-foreground hover:text-primary transition-colors">Stocks</Link></li>
                <li><Link to="/ipo" className="text-muted-foreground hover:text-primary transition-colors">IPOs</Link></li>
                <li><Link to="/baskets" className="text-muted-foreground hover:text-primary transition-colors">Baskets</Link></li>
                <li><Link to="/news" className="text-muted-foreground hover:text-primary transition-colors">News</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Press Kit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">API Docs</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Community</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Security</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Ani.AMC
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                © 2026 Ani.AMC. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
