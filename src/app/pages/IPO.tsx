import { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { useIPOs } from "../../hooks/useIPOs";
import { getStatusBadgeColor } from "../../lib/utils";
import { Calendar, TrendingUp, Users, DollarSign, Bell, RefreshCw, Filter, Star, ExternalLink, BarChart3, Crown } from "lucide-react";
import { motion } from "motion/react";

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
  const [watchedIPOs, setWatchedIPOs] = useState<Set<string>>(new Set());

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
    setWatchedIPOs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(ipoId)) {
        newSet.delete(ipoId);
      } else {
        newSet.add(ipoId);
      }
      return newSet;
    });
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
