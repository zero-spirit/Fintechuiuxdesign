import { usePageTitle } from "../../hooks/usePageTitle";
import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { useNews } from "../../hooks/useNews";
import { Search, Bookmark, Share2, Sparkles, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

export function News() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { news, loading, error, refreshNews } = useNews(selectedCategory);

  const categories = ["all", "Markets", "Corporate", "Economy", "Global"];

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const featuredNews = news[0];

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorMessage message={error} onRetry={refreshNews} />
        </div>
      </div>
    );
  }

  usePageTitle("News");
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Market News</h1>
            <p className="text-muted-foreground">Latest news from Indian financial markets</p>
          </div>
          <Button onClick={refreshNews} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Featured News */}
        {loading ? (
          <LoadingSpinner />
        ) : featuredNews ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8">
                <Badge variant="success" className="mb-4">Featured</Badge>
                <h2 className="text-3xl font-bold mb-4">{featuredNews.title}</h2>
                <p className="text-muted-foreground mb-6">{featuredNews.summary}</p>
                {featuredNews.aiSummary && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium mb-1">AI Analysis</p>
                        <p className="text-sm text-muted-foreground">{featuredNews.aiSummary}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{featuredNews.source}</span>
                    <span>{featuredNews.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-64 md:h-full flex items-center justify-center">
                <div className="text-6xl opacity-20">📰</div>
              </div>
            </div>
          </Card>
        </motion.div>
        ) : null}

        {/* Search and Filter */}
        <Card className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search news..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </Card>

        {/* News Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((news, index) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hoverable className="h-full">
                <div className="mb-3">
                  <Badge variant="outline">{news.category}</Badge>
                </div>
                <h3 className="text-lg font-semibold mb-3">{news.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{news.summary}</p>

                {news.aiSummary && (
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-muted-foreground">{news.aiSummary}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm border-t border-border pt-4">
                  <div className="text-muted-foreground">
                    <p>{news.source}</p>
                    <p className="text-xs">{news.timestamp}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 hover:bg-accent rounded transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 hover:bg-accent rounded transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          </div>
        )}

        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No news found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
