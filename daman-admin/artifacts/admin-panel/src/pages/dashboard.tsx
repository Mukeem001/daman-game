import { useGetBids, useGetDashboardStats } from "@/lib/api-hooks";
import { Users, Ticket, TrendingUp, Store, ArrowDownToLine, ArrowUpFromLine, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface DashboardStats {
  totalUsers: number;
  totalBidsToday: number;
  totalProfit: number;
  activeMarkets: number;
  depositsToday: number;
  withdrawalsToday: number;
  recentBids: any[];
}

interface Market {
  id: number;
  name: string;
  autoUpdate?: boolean;
}

interface ScraperStatus {
  status: string;
  lastUpdated: string;
  error?: string;
}

export default function Dashboard() {
  const { data: statsData } = useGetDashboardStats();
  const { data: bidsData } = useGetBids({ page: 1, limit: 6 });

  const stats = statsData || { totalUsers: 0, totalBidsToday: 0, totalProfit: 0, activeMarkets: 0, depositsToday: 0, withdrawalsToday: 0 };
  const markets = []; // TODO: Add markets API
  const recentBids = bidsData || [];

  const statCards = [
    { title: "Total Users", value: stats.totalUsers ?? 0, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { title: "Bids Today", value: stats.totalBidsToday ?? 0, icon: Ticket, color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { title: "Total Profit", value: `₹${(stats.totalProfit ?? 0).toLocaleString()}`, icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { title: "Active Markets", value: stats.activeMarkets ?? 0, icon: Store, color: "text-amber-500", bg: "bg-amber-500/10" },
    { title: "Deposits Today", value: `₹${(stats.depositsToday ?? 0).toLocaleString()}`, icon: ArrowDownToLine, color: "text-violet-500", bg: "bg-violet-500/10" },
    { title: "Withdrawals Today", value: `₹${(stats.withdrawalsToday ?? 0).toLocaleString()}`, icon: ArrowUpFromLine, color: "text-rose-500", bg: "bg-rose-500/10" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <h3 className="text-3xl font-display font-bold text-foreground mt-1">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bids */}
        <div className="lg:col-span-2">
          <Card className="border-border/50 shadow-sm overflow-hidden h-full">
            <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
              <CardTitle className="text-lg font-display">Recent Bids</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableHead className="pl-6">User</TableHead>
                    <TableHead>Market</TableHead>
                    <TableHead>Game</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(stats.recentBids ?? []).slice(0, 8).map((bid) => (
                    <TableRow key={bid.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="pl-6 font-medium">{bid.userName}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{bid.marketName}</TableCell>
                      <TableCell><Badge variant="outline" className="text-xs">{bid.gameType}</Badge></TableCell>
                      <TableCell className="text-right font-semibold text-emerald-600">₹{bid.amount}</TableCell>
                      <TableCell>
                        <Badge variant={bid.status === "won" ? "default" : bid.status === "lost" ? "destructive" : "secondary"} className="text-xs">
                          {bid.status.toUpperCase()}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {(stats.recentBids ?? []).length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">No recent bids found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Markets Overview */}
        <div>
          <Card className="border-border/50 shadow-sm">
            <CardHeader className="bg-muted/30 border-b border-border/50 pb-4">
              <CardTitle className="text-lg font-display">Active Markets</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {markets.length === 0 ? (
                <div className="px-5 py-8 text-center text-muted-foreground">
                  <Store className="w-8 h-8 mx-auto mb-3 opacity-25" />
                  <p className="text-sm font-medium">No markets available</p>
                </div>
              ) : (
                <div className="divide-y divide-border/40">
                  {markets.map((market) => (
                    <div key={market.id} className="px-5 py-4 flex items-center justify-between hover:bg-muted/20 transition-colors">
                      <p className="text-sm font-medium">{market.name}</p>
                      <Badge variant={market.autoUpdate ? "default" : "outline"} className="text-xs">
                        {market.autoUpdate ? "Auto" : "Manual"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
              <div className="px-5 py-3 border-t border-border/40">
                <Link href="/markets" className="text-xs text-primary hover:underline font-medium">
                  Manage markets →
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
