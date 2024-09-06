import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { LatestExchangeProp } from "@/Types/utils"; // Ensure this import is correct

export default function ExchangeTable({
  latestExchange,
}: {
  latestExchange: LatestExchangeProp;
}) {
  console.log(latestExchange);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {latestExchange.map((bank) => (
        <Card key={bank.bank} className="shadow-lg md:max-w-[400px]">
          <CardHeader className="px-7 py-4 bg-gray-200 dark:bg-gray-800 text-primary-foreground rounded-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="text-gray-800 dark:text-gray-200">
                  {(() => {
                    switch (bank.bank) {
                      case "amhara_bank_rates":
                        return "Amhara Bank";
                      case "awash_bank_rates":
                        return "Awash Bank";
                      case "bank_of_abyssinia_rates":
                        return "Bank of Abyssinia";
                      case "cbe_rates":
                        return "Central Bank of Ethiopia";
                      case "dashen_bank_rates":
                        return "Dashen Bank";
                      case "nbe_exchange_rates":
                        return "National Bank of Ethiopia";
                      case "wegagen_bank_rates":
                        return "Wegagen Bank";
                      case "zemen_bank_rates":
                        return "Zemen Bank";
                      default:
                        return "";
                    }
                  })()}{" "}
                  Exchange Rates
                </CardTitle>
                <CardDescription>
                  Current buying and selling rates as of {bank.timestamp}.
                </CardDescription>
              </div>
              <Badge className="px-2 py-1 text-xs font-medium animate-pulse">
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table className="pt-2">
              <TableHeader>
                <TableRow>
                  <TableHead>Currency</TableHead>
                  <TableHead>Buying Rate</TableHead>
                  <TableHead>Selling Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bank.rates &&
                  Object.entries(bank.rates).map(([currencyCode, rate]) => (
                    <TableRow key={currencyCode}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src={`./assets/flags/${currencyCode.toLowerCase()}.svg`}
                            width={24}
                            height={24}
                            alt={`${currencyCode} flag`}
                            className="rounded-full"
                            style={{ aspectRatio: "24/24", objectFit: "cover" }}
                          />
                          <span>{currencyCode}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {Number(rate.cash_buying).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {Number(rate.cash_selling).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
