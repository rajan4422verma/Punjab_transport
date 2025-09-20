import { 
  User, 
  Edit, 
  History, 
  Heart, 
  Bell, 
  Globe, 
  Moon, 
  HelpCircle, 
  LogOut, 
  ChevronRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BottomNavigation } from "@/components/bottom-navigation";
import { useTheme } from "@/components/theme-provider";
import { useApp } from "@/contexts/app-context";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Profile() {
  const { theme, setTheme } = useTheme();
  const { user, setUser } = useApp();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const menuItems = [
    { 
      icon: Edit, 
      label: "Edit Profile", 
      onClick: () => toast({ title: "Edit Profile feature coming soon" }),
      testId: "button-edit-profile"
    },
    { 
      icon: History, 
      label: "Trip History", 
      onClick: () => toast({ title: "Trip History feature coming soon" }),
      testId: "button-trip-history"
    },
    { 
      icon: Heart, 
      label: "Favorite Routes", 
      iconColor: "text-punjab-saffron",
      onClick: () => toast({ title: "Favorite Routes feature coming soon" }),
      testId: "button-favorite-routes"
    },
    { 
      icon: Bell, 
      label: "Notifications", 
      onClick: () => toast({ title: "Notifications feature coming soon" }),
      testId: "button-notifications"
    },
    { 
      icon: Globe, 
      label: "Language", 
      rightText: "English",
      onClick: () => toast({ title: "Language selection feature coming soon" }),
      testId: "button-language"
    },
  ];

  const handleDarkModeToggle = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
    toast({ 
      title: checked ? "Dark mode enabled" : "Light mode enabled" 
    });
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      setUser(null);
      localStorage.clear();
      toast({ title: "Logged out successfully" });
      setTimeout(() => {
        setLocation("/onboarding");
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-punjab-saffron p-6 text-white">
        <div className="flex items-center space-x-4">
          {/* Profile photo placeholder */}
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold" data-testid="text-user-name">
              {user?.name || "User"}
            </h2>
            <p className="text-white/80" data-testid="text-user-phone">
              {user?.phone || "+91 XXXXXXXXXX"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Profile Menu */}
      <div className="flex-1 p-4 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={index}
              variant="ghost"
              data-testid={item.testId}
              onClick={item.onClick}
              className="w-full flex items-center justify-between p-4 h-auto bg-card rounded-xl border border-border hover:bg-accent transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className={`h-5 w-5 ${item.iconColor || "text-primary"}`} />
                <span className="font-medium">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                {item.rightText && (
                  <span className="text-sm text-muted-foreground">{item.rightText}</span>
                )}
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </Button>
          );
        })}
        
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
          <div className="flex items-center space-x-3">
            <Moon className="h-5 w-5 text-primary" />
            <span className="font-medium">Dark Mode</span>
          </div>
          <Switch
            data-testid="switch-dark-mode"
            checked={theme === "dark"}
            onCheckedChange={handleDarkModeToggle}
          />
        </div>
        
        {/* Help & Support */}
        <Button
          variant="ghost"
          data-testid="button-help-support"
          onClick={() => toast({ title: "Help & Support feature coming soon" })}
          className="w-full flex items-center justify-between p-4 h-auto bg-card rounded-xl border border-border hover:bg-accent transition-colors"
        >
          <div className="flex items-center space-x-3">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span className="font-medium">Help & Support</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Button>
        
        {/* Logout */}
        <Button
          variant="ghost"
          data-testid="button-logout"
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-4 h-auto bg-card rounded-xl border border-border hover:bg-accent transition-colors"
        >
          <div className="flex items-center space-x-3">
            <LogOut className="h-5 w-5 text-destructive" />
            <span className="font-medium text-destructive">Logout</span>
          </div>
        </Button>
      </div>
      
      <BottomNavigation />
    </div>
  );
}
