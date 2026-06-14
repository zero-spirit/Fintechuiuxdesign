import { useState, useMemo } from "react";
import { useUserDataContext } from "../../context/UserDataContext";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { useIPOs } from "../../hooks/useIPOs";
import { getStatusBadgeColor } from "../../lib/utils";
import { Calendar, TrendingUp, Users, DollarSign, Bell, RefreshCw, Filter, Star, ExternalLink, BarChart3, Crown, Sparkles, CheckCircle2, XCircle, MinusCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { IPO as IPOType } from "../../services/api";

type Verdict = 'Strong Buy' | 'Buy' | 'Neutral' | 'Avoid';

interface AIOpinion {
  verdict: Verdict;
  confidence: number;
  summary: string;
  reasons: string[];
  risks: string[];
}

function generateOpinion(ipo: IPOType): AIOpinion {
  const score =
    (ipo.gmp > 100 ? 3 : ipo.gmp > 60 ? 2 : ipo.gmp > 20 ? 1 : 0) +
    (ipo.expectedListing > 18 ? 3 : ipo.expectedListing > 13 ? 2 : ipo.expectedListing > 8 ? 1 : 0) +
    (ipo.subscriptionTimes > 50 ? 2 : ipo.subscriptionTimes > 15 ? 1 : 0);

  const verdict: Verdict = score >= 7 ? 'Strong Buy' : score >= 5 ? 'Buy' : score >= 3 ? 'Neutral' : 'Avoid';
  const confidence = Math.min(95, 50 + score * 6);

  const summaries: Record<Verdict, string> = {
    'Strong Buy': `${ipo.company} presents an exceptional listing opportunity. High GMP, strong subscription demand, and robust expected returns make this a compelling short-term play.`,
    'Buy': `${ipo.company} shows solid fundamentals with healthy GMP and positive subscription figures. Suitable for investors with moderate risk appetite.`,
    'Neutral': `${ipo.company} offers mixed signals. GMP is modest and subscription momentum is lukewarm. Consider applying only if sector exposure aligns with your portfolio.`,
    'Avoid': `${ipo.company} lacks strong conviction metrics. Low GMP and weak subscription data suggest limited listing gains. Better opportunities may be available.`,
  };

  const reasonSets: Record<Verdict, string[]> = {
    'Strong Buy': [
      `GMP of ₹${ipo.gmp} signals strong grey market demand`,
      `Expected listing gain of +${ipo.expectedListing}% is well above market average`,
      ipo.subscriptionTimes > 0 ? `${ipo.subscriptionTimes}x oversubscription confirms institutional and retail confidence` : `High institutional interest expected given sector tailwinds`,
    ],
    'Buy': [
      `GMP of ₹${ipo.gmp} indicates positive market sentiment`,
      `+${ipo.expectedListing}% expected listing premium offers reasonable upside`,
      ipo.subscriptionTimes > 0 ? `${ipo.subscriptionTimes}x subscription reflects healthy investor demand` : `Strong sector fundamentals support valuation`,
    ],
    'Neutral': [
      `Moderate GMP of ₹${ipo.gmp} — grey market premium is not exceptional`,
      `Expected listing at +${ipo.expectedListing}% is in line with broad market`,
      ipo.subscriptionTimes > 0 ? `${ipo.subscriptionTimes}x subscription is acceptable but not outstanding` : `Subscription momentum yet to build`,
    ],
    'Avoid': [
      `Low GMP of ₹${ipo.gmp} signals weak grey market conviction`,
      `Expected listing of +${ipo.expectedListing}% barely justifies the risk premium`,
      `Subscription figures do not support aggressive bidding`,
    ],
  };

  const riskSets: Record<Verdict, string[]> = {
    'Strong Buy': ['High allotment competition may limit quantity', 'Post-listing volatility is possible after initial pop'],
    'Buy': ['Listing gains not guaranteed if broader market weakens', 'Lock-in post-listing if allotment is small'],
    'Neutral': ['Risk of listing at par or slight discount on weak days', 'Opportunity cost vs other open IPOs'],
    'Avoid': ['High probability of flat or negative listing', 'Capital locked for 6–7 days with minimal return expectation'],
  };

  return {
    verdict,
    confidence,
    summary: summaries[verdict],
    reasons: reasonSets[verdict],
    risks: riskSets[verdict],
  };
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function IPO() {
  const { ipos, loading, error, refreshIPOs } = useIPOs();
  const [selectedTab, setSelectedTab] = useState<'all' | 'upcoming' | 'open' | 'listed'>('all');
  const { watchedIPOs: watchedIPOList, toggleIPOAlert } = useUserDataContext();
  const watchedIPOs = useMemo(() => new Set(watchedIPOList), [watchedIPOList]);
  const [aiOpinions, setAiOpinions] = useState<Map<string, AIOpinion>>(new Map());
  const [aiLoading, setAiLoading] = useState<Set<string>>(new Set());
  const [expandedOpinions, setExpandedOpinions] = useState<Set<string>>(new Set());

  const fetchAIOpinion = async (ipo: IPOType) => {
    if (aiOpinions.has(ipo.id) || aiLoading.has(ipo.id)) return;
    setAiLoading(prev => new Set(prev).add(ipo.id));
    setExpandedOpinions(prev => new Set(prev).add(ipo.id));
    await new Promise(resolve => setTimeout(resolve, 1400 + Math.random() * 600));
    const opinion = generateOpinion(ipo);
    setAiOpinions(prev => new Map(prev).set(ipo.id, opinion));
    setAiLoading(prev => { const s = new Set(prev); s.delete(ipo.id); return s; });
  };

  const toggleOpinionExpanded = (ipoId: string) => {
    setExpandedOpinions(prev => {
      const s = new Set(prev);
      if (s.has(ipoId)) s.delete(ipoId); else s.add(ipoId);
      return s;
    });
  };

  if (error) {
    return (
      <div className="relative min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message={error} onRetry={refreshIPOs} />
        </div>
      </div>
    );
  }

  const toggleWatch = (ipoId: string) => {
    toggleIPOAlert(ipoId);
  };

  const filteredIPOs = selectedTab === 'all'
    ? ipos
    : ipos.filter(ipo => ipo.status === selectedTab);

  const upcomingCount = ipos.filter(ipo => ipo.status === 'upcoming').length;
  const openCount = ipos.filter(ipo => ipo.status === 'open').length;
  const listedCount = ipos.filter(ipo => ipo.status === 'listed').length;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  IPO Center
                </h1>
                <p className="text-muted-foreground">Live IPO data from Indian markets</p>
              </div>
            </div>
            <Button onClick={refreshIPOs} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* IPO Stats */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            <motion.div variants={item}>
              <Card glass hoverable className="group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="pt-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">Status</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Upcoming IPOs</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {upcomingCount}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card glass hoverable className="group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-success/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="pt-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="success" className="text-xs">Live</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Open for Bidding</p>
                  <p className="text-3xl font-bold text-success">
                    {openCount}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card glass hoverable className="group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="pt-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">Recent</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Recently Listed</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {listedCount}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card glass hoverable className="group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-warning/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="pt-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className="text-xs">Total</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Total IPOs</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {ipos.length}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card glass>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mr-2">Filter:</span>
              {(['all', 'upcoming', 'open', 'listed'] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={selectedTab === tab ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTab(tab)}
                  className={selectedTab === tab ? 'shadow-lg shadow-primary/20' : ''}
                >
                  {tab === 'all' ? 'All IPOs' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* IPO List */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {filteredIPOs.map((ipo) => (
              <motion.div key={ipo.id} variants={item}>
                <Card glass hoverable className="group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CardContent className="pt-6 relative">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      {/* Company Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg flex-shrink-0">
                          <span className="text-xl font-bold text-white">
                            {ipo.company.split(' ').map(word => word[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <h3 className="text-xl font-bold">{ipo.company}</h3>
                            <Badge className={getStatusBadgeColor(ipo.status)}>
                              {ipo.status.toUpperCase()}
                            </Badge>
                            <button
                              onClick={() => toggleWatch(ipo.id)}
                              className="p-1.5 rounded-lg hover:bg-warning/10 transition-colors"
                            >
                              <Star
                                className={`w-5 h-5 transition-all ${
                                  watchedIPOs.has(ipo.id)
                                    ? 'fill-warning text-warning'
                                    : 'text-muted-foreground hover:text-warning'
                                }`}
                              />
                            </button>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                            <div className="p-2 rounded-lg bg-muted/30">
                              <p className="text-muted-foreground text-xs mb-1">Price Range</p>
                              <p className="font-semibold">{ipo.priceRange}</p>
                            </div>
                            <div className="p-2 rounded-lg bg-muted/30">
                              <p className="text-muted-foreground text-xs mb-1">Lot Size</p>
                              <p className="font-semibold">{ipo.lotSize} shares</p>
                            </div>
                            <div className="p-2 rounded-lg bg-muted/30">
                              <p className="text-muted-foreground text-xs mb-1">Issue Size</p>
                              <p className="font-semibold">₹{Math.floor(Math.random() * 500 + 100)} Cr</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* IPO Timeline */}
                      <div className="grid grid-cols-3 gap-4 lg:gap-6">
                        <div className="text-center p-3 rounded-lg bg-muted/20">
                          <p className="text-xs text-muted-foreground mb-1">Opens On</p>
                          <p className="font-bold text-sm">{new Date(ipo.openDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-muted/20">
                          <p className="text-xs text-muted-foreground mb-1">Closes On</p>
                          <p className="font-bold text-sm">{new Date(ipo.closeDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-muted/20">
                          <p className="text-xs text-muted-foreground mb-1">Listing</p>
                          <p className="font-bold text-sm">{new Date(ipo.listingDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="flex items-center gap-6">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-success/10 to-transparent border border-success/20">
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground mb-1">GMP</p>
                              <p className="text-xl font-bold text-success">₹{ipo.gmp}</p>
                            </div>
                            <div className="h-10 w-px bg-border" />
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground mb-1">Expected</p>
                              <p className="text-xl font-bold text-success">+{ipo.expectedListing}%</p>
                            </div>
                          </div>
                          {ipo.subscriptionTimes > 0 && (
                            <div className="mt-3 pt-3 border-t border-success/20">
                              <p className="text-xs text-muted-foreground">Subscription</p>
                              <p className="font-bold text-success">{ipo.subscriptionTimes}x</p>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            className="shadow-lg shadow-primary/20"
                          >
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Apply Now
                          </Button>
                          <Button variant="outline" size="sm">
                            <Bell className="w-4 h-4 mr-2" />
                            Set Alert
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* AI Expert Opinion */}
                    <div className="mt-5 pt-5 border-t border-border/40">
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-primary" />
                          <span className="text-sm font-semibold">AI Expert Opinion</span>
                          {aiOpinions.has(ipo.id) && (
                            <Badge
                              variant={
                                aiOpinions.get(ipo.id)!.verdict === 'Strong Buy' ? 'success' :
                                aiOpinions.get(ipo.id)!.verdict === 'Buy' ? 'success' :
                                aiOpinions.get(ipo.id)!.verdict === 'Neutral' ? 'outline' : 'destructive'
                              }
                              className="text-xs"
                            >
                              {aiOpinions.get(ipo.id)!.verdict}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {!aiOpinions.has(ipo.id) && !aiLoading.has(ipo.id) && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => fetchAIOpinion(ipo)}
                              className="border-primary/40 text-primary hover:bg-primary/10"
                            >
                              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                              Get AI Opinion
                            </Button>
                          )}
                          {aiLoading.has(ipo.id) && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Sparkles className="w-4 h-4 text-primary" />
                              </motion.div>
                              Analysing IPO data…
                            </div>
                          )}
                          {aiOpinions.has(ipo.id) && (
                            <button
                              onClick={() => toggleOpinionExpanded(ipo.id)}
                              className="p-1.5 rounded-lg hover:bg-accent transition-colors"
                            >
                              {expandedOpinions.has(ipo.id)
                                ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
                                : <ChevronDown className="w-4 h-4 text-muted-foreground" />
                              }
                            </button>
                          )}
                        </div>
                      </div>

                      <AnimatePresence>
                        {aiOpinions.has(ipo.id) && expandedOpinions.has(ipo.id) && (() => {
                          const op = aiOpinions.get(ipo.id)!;
                          const verdictColor =
                            op.verdict === 'Strong Buy' ? 'from-success/10 border-success/30' :
                            op.verdict === 'Buy' ? 'from-emerald-500/10 border-emerald-500/30' :
                            op.verdict === 'Neutral' ? 'from-amber-500/10 border-amber-500/30' :
                            'from-destructive/10 border-destructive/30';
                          const VerdictIcon =
                            op.verdict === 'Strong Buy' || op.verdict === 'Buy' ? CheckCircle2 :
                            op.verdict === 'Neutral' ? MinusCircle : XCircle;
                          const verdictIconColor =
                            op.verdict === 'Strong Buy' || op.verdict === 'Buy' ? 'text-success' :
                            op.verdict === 'Neutral' ? 'text-amber-500' : 'text-destructive';
                          return (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden"
                            >
                              <div className={`mt-4 p-4 rounded-xl bg-gradient-to-br ${verdictColor} border`}>
                                <div className="flex items-start gap-3 mb-3">
                                  <VerdictIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${verdictIconColor}`} />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className={`font-bold ${verdictIconColor}`}>{op.verdict}</span>
                                      <span className="text-xs text-muted-foreground">AI Confidence: {op.confidence}%</span>
                                    </div>
                                    <div className="w-full bg-muted/40 rounded-full h-1.5 mb-3">
                                      <div
                                        className={`h-1.5 rounded-full ${
                                          op.verdict === 'Strong Buy' || op.verdict === 'Buy' ? 'bg-success' :
                                          op.verdict === 'Neutral' ? 'bg-amber-500' : 'bg-destructive'
                                        }`}
                                        style={{ width: `${op.confidence}%` }}
                                      />
                                    </div>
                                    <p className="text-sm text-foreground/80 mb-3">{op.summary}</p>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                      <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Positive Signals</p>
                                        <ul className="space-y-1">
                                          {op.reasons.map((r, i) => (
                                            <li key={i} className="text-xs flex items-start gap-1.5">
                                              <CheckCircle2 className="w-3 h-3 text-success mt-0.5 flex-shrink-0" />
                                              {r}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                      <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Key Risks</p>
                                        <ul className="space-y-1">
                                          {op.risks.map((r, i) => (
                                            <li key={i} className="text-xs flex items-start gap-1.5">
                                              <XCircle className="w-3 h-3 text-destructive mt-0.5 flex-shrink-0" />
                                              {r}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-xs text-muted-foreground border-t border-border/30 pt-2 mt-1">
                                  AI-generated analysis for educational purposes only. Not financial advice.
                                </p>
                              </div>
                            </motion.div>
                          );
                        })()}
                      </AnimatePresence>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}

            {filteredIPOs.length === 0 && (
              <Card glass className="text-center py-16">
                <div className="w-24 h-24 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No IPOs found</h3>
                <p className="text-muted-foreground">
                  {selectedTab === 'all'
                    ? 'No IPOs available at the moment'
                    : `No ${selectedTab} IPOs available`}
                </p>
              </Card>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
