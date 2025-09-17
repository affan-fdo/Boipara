import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, Calendar, CreditCard, MapPin, ShoppingBag, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useOrder } from '@/contexts/OrderContext';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Orders = () => {
  const { user } = useAuth();
  const { state, cancelOrder } = useOrder();

  if (!user) {
    return <div>Please login to view orders</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'confirmed': return 'bg-purple-500';
      case 'pending': return 'bg-yellow-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const canCancelOrder = (status: string) => {
    return status === 'pending' || status === 'confirmed';
  };

  const handleCancelOrder = (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
    }
  };

  if (state.orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
            <h1 className="text-3xl font-bold text-vintage-brown">No orders yet</h1>
            <p className="text-lg text-muted-foreground">
              Start shopping to see your purchase history here
            </p>
            <Link to="/books">
              <Button className="bg-vintage-brown hover:bg-vintage-burgundy">
                Browse Books
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-vintage-brown mb-2">
              Purchase History
            </h1>
            <p className="text-vintage-brown/70">Track your book orders and purchases</p>
          </div>

          <div className="space-y-6">
            {state.orders.map((order) => (
              <Card key={order.id} className="bg-white/95 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-vintage-brown">Order #{order.id}</CardTitle>
                      <div className="flex items-center gap-4 mt-2 text-sm text-vintage-brown/70">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(order.orderDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <CreditCard className="h-4 w-4" />
                          ₹{order.total}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={`${getStatusColor(order.status)} text-white`}>
                        {order.status.toUpperCase()}
                      </Badge>
                      {canCancelOrder(order.status) && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-vintage-cream/30 rounded-lg">
                        <div>
                          <h4 className="font-medium text-vintage-brown">{item.title}</h4>
                          <p className="text-sm text-vintage-brown/70">by {item.author}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-vintage-brown">{item.price}</p>
                          <p className="text-sm text-vintage-brown/70">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>


        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Orders;