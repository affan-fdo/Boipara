import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Package, TrendingUp, Plus, Edit, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StoreAdmin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'store_admin') {
    return <div>Access denied. Store Admin only.</div>;
  }

  const handleAction = (action: string) => {
    toast({
      title: "Feature Coming Soon",
      description: `${action} functionality will be available soon.`
    });
  };

  const stats = [
    { title: 'My Books', value: '234', icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Orders Today', value: '12', icon: Package, color: 'bg-green-500' },
    { title: 'Total Sales', value: '₹45,670', icon: TrendingUp, color: 'bg-purple-500' },
    { title: 'Customers', value: '89', icon: Users, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-vintage-brown mb-2">
            Store Management
          </h1>
          <p className="text-vintage-brown/70">Manage your bookstore inventory and orders</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="bg-white/95 backdrop-blur-sm shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-vintage-brown/70">{stat.title}</p>
                      <p className="text-2xl font-bold text-vintage-brown">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown">
                <Plus className="h-5 w-5" />
                Add New Book
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4">Add books to your store inventory</p>
              <Button 
                onClick={() => handleAction('Add Book')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white text-xs md:text-sm py-2 md:py-3"
              >
                Add Book
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown">
                <BookOpen className="h-5 w-5" />
                My Inventory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4">Manage your book collection</p>
              <Button className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white">
                View Books
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown">
                <Package className="h-5 w-5" />
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4">Track and manage customer orders</p>
              <Button className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white">
                View Orders
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown">
                <Edit className="h-5 w-5" />
                Store Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4">Update store information and details</p>
              <Button className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white">
                Edit Store
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown">
                <TrendingUp className="h-5 w-5" />
                Sales Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4">View your store performance</p>
              <Button className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown">
                <Users className="h-5 w-5" />
                Customers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4">View your customer base</p>
              <Button className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white">
                View Customers
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default StoreAdmin;