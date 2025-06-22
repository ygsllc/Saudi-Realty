"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, ChurchIcon as Mosque, TrendingUp } from "lucide-react"

export function IslamicFinanceCalculator() {
  const [propertyPrice, setPropertyPrice] = useState<number>(1000000)
  const [downPayment, setDownPayment] = useState<number>(200000)
  const [financingTerm, setFinancingTerm] = useState<number>(25)
  const [profitRate, setProfitRate] = useState<number>(4.5)
  const [results, setResults] = useState({
    monthlyPayment: 0,
    totalPayment: 0,
    totalProfit: 0,
    financedAmount: 0,
  })

  useEffect(() => {
    calculatePayments()
  }, [propertyPrice, downPayment, financingTerm, profitRate])

  const calculatePayments = () => {
    const financedAmount = propertyPrice - downPayment
    const monthlyRate = profitRate / 100 / 12
    const numberOfPayments = financingTerm * 12

    // Islamic finance calculation (Murabaha-style)
    const monthlyPayment =
      (financedAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    const totalPayment = monthlyPayment * numberOfPayments + downPayment
    const totalProfit = totalPayment - propertyPrice

    setResults({
      monthlyPayment: Math.round(monthlyPayment),
      totalPayment: Math.round(totalPayment),
      totalProfit: Math.round(totalProfit),
      financedAmount: Math.round(financedAmount),
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <Badge className="mb-4 bg-[var(--saudi-green)] text-white">
          <Mosque className="h-3 w-3 mr-1" />
          Shariah Compliant
        </Badge>
        <h2 className="text-3xl font-bold mb-2">Islamic Finance Calculator</h2>
        <p className="text-lg font-arabic text-muted-foreground">حاسبة التمويل الإسلامي</p>
        <p className="text-muted-foreground mt-2">
          Calculate your Shariah-compliant property financing with major Saudi banks
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calculator className="h-5 w-5 mr-2" />
              Financing Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="property-price">Property Price (SAR)</Label>
              <Input
                id="property-price"
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="down-payment">Down Payment (SAR)</Label>
              <Input
                id="down-payment"
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="text-lg"
              />
              <p className="text-sm text-muted-foreground">
                Minimum 15% required • {((downPayment / propertyPrice) * 100).toFixed(1)}% of property price
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="financing-term">Financing Term (Years)</Label>
              <Input
                id="financing-term"
                type="number"
                value={financingTerm}
                onChange={(e) => setFinancingTerm(Number(e.target.value))}
                min="5"
                max="30"
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="profit-rate">Profit Rate (%)</Label>
              <Input
                id="profit-rate"
                type="number"
                step="0.1"
                value={profitRate}
                onChange={(e) => setProfitRate(Number(e.target.value))}
                className="text-lg"
              />
              <p className="text-sm text-muted-foreground">Current rates: 3.5% - 6.5% depending on bank and profile</p>
            </div>

            <Button className="w-full saudi-gradient text-white">Get Pre-Approval</Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Calculation Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[var(--saudi-green)]">
                  {results.monthlyPayment.toLocaleString()} SAR
                </div>
                <div className="text-sm text-muted-foreground">Monthly Payment</div>
                <div className="text-xs font-arabic text-muted-foreground">القسط الشهري</div>
              </div>

              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-[var(--saudi-green)]">
                  {results.financedAmount.toLocaleString()} SAR
                </div>
                <div className="text-sm text-muted-foreground">Financed Amount</div>
                <div className="text-xs font-arabic text-muted-foreground">المبلغ الممول</div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Payment:</span>
                <span className="font-semibold">{results.totalPayment.toLocaleString()} SAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Profit:</span>
                <span className="font-semibold">{results.totalProfit.toLocaleString()} SAR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Financing Ratio:</span>
                <span className="font-semibold">{((results.financedAmount / propertyPrice) * 100).toFixed(1)}%</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-semibold">Partner Banks:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Badge variant="outline">Al Rajhi Bank</Badge>
                <Badge variant="outline">Riyad Bank</Badge>
                <Badge variant="outline">SABB</Badge>
                <Badge variant="outline">SNB</Badge>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Mosque className="h-4 w-4 text-green-600 mr-2" />
                <span className="text-sm font-semibold text-green-800">Shariah Compliance</span>
              </div>
              <p className="text-xs text-green-700">
                This calculation follows Islamic banking principles with no interest (Riba). The profit rate represents
                the bank's margin in a Murabaha transaction.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
