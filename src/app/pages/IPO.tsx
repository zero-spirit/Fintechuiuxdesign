import { Card, CardContent } from "../components/ui/CustomCard";
import { Badge } from "../components/ui/CustomBadge";
import { Button } from "../components/ui/CustomButton";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { useIPOs } from "../../hooks/useIPOs";
import { getStatusBadgeColor } from "../../lib/utils";
import { Calendar, TrendingUp, Users, DollarSign, Bell, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

export function IPO() {
  const { ipos, loading, error, refreshIPOs } = useIPOs();

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message={error} onRetry={refreshIPOs} />
        </div>
      </div>
    );
  }

  const upcomingCount = ipos.filter(ipo => ipo.status === 'upcoming').length;
  const openCount = ipos.filter(ipo => ipo.status === 'open').length;
  const listedCount = ipos.filter(ipo => ipo.status === 'listed').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Upcoming IPOs</h1>
            <p className="text-muted-foreground">Live IPO data from Indian markets</p>
          </div>
          <Button onClick={refreshIPOs} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* IPO Stats */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <p className="text-2xl font-bold">{upcomingCount}</p>
                <p className="text-sm text-muted-foreground">Upcoming IPOs</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
                <p className="text-2xl font-bold">{openCount}</p>
                <p className="text-sm text-muted-foreground">Open for Bidding</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <p className="text-2xl font-bold">{listedCount}</p>
                <p className="text-sm text-muted-foreground">Recently Listed</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <DollarSign className="w-8 h-8 text-warning" />
                </div>
                <p className="text-2xl font-bold">{ipos.length}</p>
                <p className="text-sm text-muted-foreground">Total IPOs</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* IPO List */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="space-y-6">
            {ipos.map((ipo, index) => (
            <motion.div
              key={ipo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card hoverable>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    {/* Company Info */}
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {ipo.company.split(' ').map(word => word[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{ipo.company}</h3>
                          <Badge className={getStatusBadgeColor(ipo.status)}>
                            {ipo.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Price Range</p>
                            <p className="font-semibold">{ipo.priceRange}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Lot Size</p>
                            <p className="font-semibold">{ipo.lotSize} shares</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* IPO Details */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Opens On</p>
                        <p className="font-semibold">{new Date(ipo.openDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Closes On</p>
                        <p className="font-semibold">{new Date(ipo.closeDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Listing Date</p>
                        <p className="font-semibold">{new Date(ipo.listingDate).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</p>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">GMP</p>
                          <p className="text-lg font-bold text-success">₹{ipo.gmp}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Expected Gain</p>
                          <p className="text-lg font-bold text-success">+{ipo.expectedListing}%</p>
                        </div>
                      </div>
                      {ipo.subscriptionTimes > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground">Subscription</p>
                          <p className="font-semibold">{ipo.subscriptionTimes}x</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      <Button variant="primary" size="sm">
                        Apply Now
                      </Button>
                      <Button variant="outline" size="sm">
                        <Bell className="w-4 h-4 mr-2" />
                        Set Alert
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
