
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { AlertCircle, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LateFee {
  id: string;
  bookTitle: string;
  dueDate: string;
  daysOverdue: number;
  amount: number;
  status: "pending" | "paid";
}

const LateFees = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [lateFees, setLateFees] = useState<LateFee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchLateFees = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would fetch from Supabase
        // For demo purposes, we'll use mock data
        const mockLateFees: LateFee[] = [
          {
            id: "1",
            bookTitle: "The Great Gatsby",
            dueDate: "2025-04-01",
            daysOverdue: 14,
            amount: 7.00,
            status: "pending"
          },
          {
            id: "2",
            bookTitle: "To Kill a Mockingbird",
            dueDate: "2025-04-05",
            daysOverdue: 10,
            amount: 5.00,
            status: "pending"
          },
          {
            id: "3",
            bookTitle: "1984",
            dueDate: "2025-03-20",
            daysOverdue: 26,
            amount: 13.00,
            status: "paid"
          }
        ];
        
        setLateFees(mockLateFees);
      } catch (error) {
        console.error("Error fetching late fees:", error);
        toast.error("Failed to load late fees");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLateFees();
  }, [isLoggedIn, navigate]);

  const handlePayment = async (feeId: string) => {
    try {
      // In a real implementation, this would integrate with a payment gateway
      // For demo purposes, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLateFees(prev => 
        prev.map(fee => 
          fee.id === feeId ? { ...fee, status: "paid" } : fee
        )
      );
      
      toast.success("Payment successful");
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  const totalUnpaidFees = lateFees
    .filter(fee => fee.status === "pending")
    .reduce((total, fee) => total + fee.amount, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 px-4 md:px-8 bg-muted/20">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Late Fees Management</h1>
          
          {totalUnpaidFees > 0 && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Attention Required</AlertTitle>
              <AlertDescription>
                You have ${totalUnpaidFees.toFixed(2)} in unpaid late fees. Please make a payment to avoid account restrictions.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Unpaid Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalUnpaidFees.toFixed(2)}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {lateFees.filter(fee => fee.status === "pending").length}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Account Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Badge variant={totalUnpaidFees > 0 ? "destructive" : "default"} className="text-md">
                    {totalUnpaidFees > 0 ? "Restricted" : "Good Standing"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fee History</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : lateFees.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground">
                  No late fees found. Keep up the good work!
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book Title</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Days Overdue</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lateFees.map((fee) => (
                      <TableRow key={fee.id}>
                        <TableCell className="font-medium">{fee.bookTitle}</TableCell>
                        <TableCell>{new Date(fee.dueDate).toLocaleDateString()}</TableCell>
                        <TableCell>{fee.daysOverdue}</TableCell>
                        <TableCell>${fee.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={fee.status === "paid" ? "outline" : "destructive"}>
                            {fee.status === "paid" ? "Paid" : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {fee.status === "pending" ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="flex items-center" 
                              onClick={() => handlePayment(fee.id)}
                            >
                              <CreditCard className="mr-2 h-4 w-4" />
                              Pay Now
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">Completed</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LateFees;
