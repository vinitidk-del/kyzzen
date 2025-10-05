import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Download, TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  taxDeductible?: boolean;
}

const expenseCategories = ['Equipment', 'Software', 'Travel', 'Marketing', 'Office', 'Other'];
const incomeCategories = ['Sponsorship', 'AdRevenue', 'Merchandise', 'Coaching', 'Affiliate', 'Other'];

export function FinancialTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'income', category: 'Sponsorship', amount: 5000, description: 'Brand Deal - TechCo', date: '2025-04-01', taxDeductible: false },
    { id: '2', type: 'income', category: 'AdRevenue', amount: 2800, description: 'YouTube Ad Revenue', date: '2025-04-05', taxDeductible: false },
    { id: '3', type: 'expense', category: 'Equipment', amount: 1200, description: 'New Camera Lens', date: '2025-04-07', taxDeductible: true },
    { id: '4', type: 'expense', category: 'Software', amount: 299, description: 'Adobe Creative Cloud', date: '2025-04-10', taxDeductible: true },
    { id: '5', type: 'income', category: 'Affiliate', amount: 450, description: 'Amazon Affiliate Commission', date: '2025-04-12', taxDeductible: false },
  ]);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    type: 'income' as 'income' | 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    taxDeductible: false,
  });

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit = totalIncome - totalExpenses;
  const profitMargin = totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : '0';

  const taxDeductibleExpenses = transactions
    .filter(t => t.type === 'expense' && t.taxDeductible)
    .reduce((sum, t) => sum + t.amount, 0);

  // Group expenses by category
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const categoryData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['hsl(var(--info))', 'hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--accent))', 'hsl(var(--error))'];

  const addTransaction = () => {
    if (!newTransaction.category || !newTransaction.amount || !newTransaction.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type: newTransaction.type,
      category: newTransaction.category,
      amount: parseFloat(newTransaction.amount),
      description: newTransaction.description,
      date: newTransaction.date,
      taxDeductible: newTransaction.taxDeductible,
    };

    setTransactions([transaction, ...transactions]);
    setShowAddDialog(false);
    setNewTransaction({
      type: 'income',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      taxDeductible: false,
    });

    toast({
      title: "Transaction Added",
      description: `${newTransaction.type === 'income' ? 'Income' : 'Expense'} recorded`,
    });
  };

  const exportData = () => {
    toast({
      title: "Exporting Data",
      description: "Generating financial report...",
    });

    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "financial-report.csv downloaded",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Financial Tracker</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportData}>
            <Download className="w-4 h-4 mr-2" />
            Export for Tax
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-success" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Income</h3>
                <p className="text-2xl font-bold text-success">${totalIncome.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <TrendingDown className="w-8 h-8 text-error" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Total Expenses</h3>
                <p className="text-2xl font-bold text-error">${totalExpenses.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-info" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Net Profit</h3>
                <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-success' : 'text-error'}`}>
                  ${netProfit.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <PieChart className="w-8 h-8 text-warning" />
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Profit Margin</h3>
                <p className="text-2xl font-bold text-warning">{profitMargin}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expense Breakdown */}
        <Card className="lg:col-span-2 bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tax Info */}
        <Card className="bg-gradient-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Tax Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Tax Deductible Expenses</p>
              <p className="text-2xl font-bold text-success">${taxDeductibleExpenses.toLocaleString()}</p>
            </div>
            <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Estimated Tax (30%)</p>
              <p className="text-2xl font-bold text-info">${(netProfit * 0.3).toLocaleString()}</p>
            </div>
            <Button variant="outline" className="w-full">
              Generate Invoice
            </Button>
            <Button variant="outline" className="w-full">
              Download Tax Documents
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expenses</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-2">
              {transactions.map(transaction => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border hover:border-accent transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{transaction.description}</p>
                      <Badge className={transaction.type === 'income' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}>
                        {transaction.category}
                      </Badge>
                      {transaction.taxDeductible && (
                        <Badge className="bg-info/20 text-info">Tax Deductible</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                  <p className={`text-xl font-bold ${transaction.type === 'income' ? 'text-success' : 'text-error'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="income" className="space-y-2">
              {transactions.filter(t => t.type === 'income').map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-xl font-bold text-success">+${transaction.amount.toLocaleString()}</p>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="expense" className="space-y-2">
              {transactions.filter(t => t.type === 'expense').map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-xl font-bold text-error">-${transaction.amount.toLocaleString()}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add Transaction Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Type</Label>
              <Select value={newTransaction.type} onValueChange={(value: 'income' | 'expense') => setNewTransaction({ ...newTransaction, type: value, category: '' })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Category</Label>
              <Select value={newTransaction.category} onValueChange={(value) => setNewTransaction({ ...newTransaction, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {(newTransaction.type === 'income' ? incomeCategories : expenseCategories).map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                placeholder="Brief description"
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              />
            </div>
            {newTransaction.type === 'expense' && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newTransaction.taxDeductible}
                  onChange={(e) => setNewTransaction({ ...newTransaction, taxDeductible: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label>Tax Deductible</Label>
              </div>
            )}
            <div className="flex gap-2">
              <Button onClick={addTransaction} className="flex-1">Add</Button>
              <Button variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}