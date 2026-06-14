import { usePageTitle } from "../../hooks/usePageTitle";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card } from "../components/ui/Card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export function Signup() {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const { error } = await signUp(formData.email, formData.password, formData.fullName);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
      // Auto-redirect after 2 seconds
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const passwordStrength = formData.password.length > 0 ?
    formData.password.length < 6 ? 'weak' :
    formData.password.length < 10 ? 'medium' : 'strong' : null;

  const benefits = [
    "Access to 5000+ stocks and ETFs",
    "AI-powered investment recommendations",
    "Real-time market data and alerts",
    "Expertly curated stock baskets",
    "IPO tracking and analysis",
    "24/7 customer support"
  ];

  usePageTitle("Sign Up");
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center mb-8">
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Ani.AMC
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">Start your investment journey today</p>
          </div>

          <Card>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {success && (
                <div className="p-3 rounded-lg bg-success/10 border border-success/20 flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-success">Account created successfully! Redirecting...</p>
                </div>
              )}

              <Input
                type="text"
                name="fullName"
                label="Full Name"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
                disabled={loading || success}
              />

              <Input
                type="email"
                name="email"
                label="Email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading || success}
              />

              <div>
                <Input
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={loading || success}
                />
                {passwordStrength && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          passwordStrength === 'weak' ? 'w-1/3 bg-destructive' :
                          passwordStrength === 'medium' ? 'w-2/3 bg-warning' :
                          'w-full bg-success'
                        }`}
                      />
                    </div>
                    <span className={`text-xs ${
                      passwordStrength === 'weak' ? 'text-destructive' :
                      passwordStrength === 'medium' ? 'text-warning' :
                      'text-success'
                    }`}>
                      {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                    </span>
                  </div>
                )}
              </div>

              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading || success}
              />

              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" className="mt-1 rounded border-border" required disabled={loading || success} />
                <span className="text-sm text-muted-foreground">
                  I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>

              <Button type="submit" variant="primary" className="w-full" disabled={loading || success}>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : success ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Account Created!
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading || success}>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Benefits */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex flex-1 bg-gradient-to-br from-primary/10 to-secondary/10 p-12 items-center justify-center"
      >
        <div className="max-w-lg">
          <h2 className="text-4xl font-bold mb-4">
            Join 50,000+ Investors
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Get everything you need to make informed investment decisions
          </p>
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <span className="text-foreground">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <Card glass className="mt-8">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">Trusted by investors managing</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ₹500+ Crores
              </p>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
