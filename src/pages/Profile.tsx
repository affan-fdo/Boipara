import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Shield, Store, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <div>Please login to view profile</div>;
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-500';
      case 'store_admin': return 'bg-green-500';
      default: return 'bg-blue-500';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'super_admin': return Shield;
      case 'store_admin': return Store;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon(user.role);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-vintage-sepia/10 via-vintage-cream/20 to-vintage-brown/5">
      <Navbar />
      
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardHeader className="text-center p-4 md:p-6">
              <div className="mx-auto w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-vintage-brown to-vintage-burgundy rounded-full flex items-center justify-center mb-3 md:mb-4">
                <User className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <CardTitle className="font-serif text-xl md:text-2xl text-vintage-brown">
                Profile Settings
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
              <div className="grid gap-3 md:gap-4">
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-vintage-cream/30 rounded-lg">
                  <User className="h-4 w-4 md:h-5 md:w-5 text-vintage-brown" />
                  <div>
                    <p className="text-xs md:text-sm text-vintage-brown/70">Full Name</p>
                    <p className="font-medium text-sm md:text-base text-vintage-brown">{user.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-vintage-cream/30 rounded-lg">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-vintage-brown" />
                  <div>
                    <p className="text-xs md:text-sm text-vintage-brown/70">Email Address</p>
                    <p className="font-medium text-sm md:text-base text-vintage-brown break-all">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-vintage-cream/30 rounded-lg">
                  <RoleIcon className="h-4 w-4 md:h-5 md:w-5 text-vintage-brown" />
                  <div className="flex-1">
                    <p className="text-xs md:text-sm text-vintage-brown/70">Account Type</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`${getRoleColor(user.role)} text-white text-xs md:text-sm px-2 py-1`}>
                        {user.role.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 md:gap-4">
                <Button 
                  onClick={handleEditProfile}
                  className="flex-1 bg-gradient-to-r from-vintage-brown to-vintage-burgundy hover:from-vintage-burgundy hover:to-vintage-brown text-white text-xs md:text-sm py-2 md:py-3 px-3 md:px-4 transition-all duration-300 hover:shadow-lg"
                >
                  <Edit className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  <span className="hidden sm:inline">Edit Profile</span>
                  <span className="sm:hidden">Edit</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;