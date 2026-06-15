import { useState } from "react";
import { useGetMarkets, useGetResults } from "@/lib/api-hooks";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MarketResultHistory() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMarket, setSelectedMarket] = useState<string>("");

  const { data: markets } = useGetMarkets();
  const { data: results, isLoading } = useGetResults({ date: selectedDate });

  const filteredResults = selectedMarket
    ? results?.filter((r: any) => r.marketId === parseInt(selectedMarket))
    : results;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Market Result History</h2>
          <p className="text-muted-foreground">
            View historical results for all markets
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Date Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
              <SelectTrigger>
                <SelectValue placeholder="All Markets" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Markets</SelectItem>
                {markets?.map((market: any) => (
                  <SelectItem key={market.id} value={market.id.toString()}>
                    {market.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">Loading results...</p>
            </div>
          ) : filteredResults && filteredResults.length > 0 ? (
            <div className="rounded-md border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Market</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Open</TableHead>
                    <TableHead>Close</TableHead>
                    <TableHead>Jodi</TableHead>
                    <TableHead>Panna</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredResults.map((result: any) => (
                    <TableRow key={result.id}>
                      <TableCell className="font-medium">
                        {markets?.find((m: any) => m.id === result.marketId)?.name || result.marketId}
                      </TableCell>
                      <TableCell>{format(new Date(result.resultDate), 'yyyy-MM-dd')}</TableCell>
                      <TableCell>{result.openResult || "-"}</TableCell>
                      <TableCell>{result.closeResult || "-"}</TableCell>
                      <TableCell>{result.jodiResult || "-"}</TableCell>
                      <TableCell>{result.pannaResult || "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex items-center justify-center py-8">
              <p className="text-muted-foreground">No results found for the selected date and market</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

