import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Store, BookOpen, Package, TrendingUp, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== 'super_admin') {
    return <div>Access denied. Super Admin only.</div>;
  }

  const handleAction = (action: string) => {
    toast({
      title: "Feature Coming Soon",
      description: `${action} functionality will be available soon.`
    });
  };

  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { title: 'Active Stores', value: '56', icon: Store, color: 'bg-green-500' },
    { title: 'Total Books', value: '12,456', icon: BookOpen, color: 'bg-purple-500' },
    { title: 'Orders Today', value: '89', icon: Package, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold text-vintage-brown mb-2">
            Super Admin Dashboard
          </h1>
          <p className="text-vintage-brown/70">Manage the entire Boi Para platform</p>
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
          <Card className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm md:text-base">
                <Users className="h-4 w-4 md:h-5 md:w-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4 text-xs md:text-sm">Manage all users, roles, and permissions</p>
              <Button 
                onClick={() => handleAction('User Management')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white text-xs md:text-sm py-2 md:py-3"
              >
                Manage Users
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm md:text-base">
                <Store className="h-4 w-4 md:h-5 md:w-5" />
                Store Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4 text-xs md:text-sm">Add, edit, and verify bookstores</p>
              <Button 
                onClick={() => navigate('/bookstores')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white text-xs md:text-sm py-2 md:py-3"
              >
                Manage Stores
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm md:text-base">
                <BookOpen className="h-4 w-4 md:h-5 md:w-5" />
                Book Catalog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4 text-xs md:text-sm">Oversee all books and categories</p>
              <Button 
                onClick={() => navigate('/books')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white text-xs md:text-sm py-2 md:py-3"
              >
                Manage Books
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm md:text-base">
                <Package className="h-4 w-4 md:h-5 md:w-5" />
                Order Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4 text-xs md:text-sm">Monitor all orders and transactions</p>
              <Button 
                onClick={() => handleAction('Order Management')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white text-xs md:text-sm py-2 md:py-3"
              >
                View Orders
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm md:text-base">
                <TrendingUp className="h-4 w-4 md:h-5 md:w-5" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4 text-xs md:text-sm">View platform statistics and reports</p>
              <Button 
                onClick={() => handleAction('Analytics')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white text-xs md:text-sm py-2 md:py-3"
              >
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-vintage-brown text-sm md:text-base">
                <Settings className="h-4 w-4 md:h-5 md:w-5" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-vintage-brown/70 mb-4 text-xs md:text-sm">Configure platform settings</p>
              <Button 
                onClick={() => handleAction('System Settings')}
                className="w-full bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white text-xs md:text-sm py-2 md:py-3"
              >
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;