import { useLocation } from "wouter";
import { Home, Route, Ticket, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function BottomNavigation() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/routes", icon: Route, label: "Routes" },
    { 
      path: "/bookings", 
      icon: Ticket, 
      label: "Bookings",
      onClick: () => toast({ title: "Bookings feature coming soon" })
    },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="flex items-center justify-around bg-card border-t border-border px-4 py-3 safe-area-bottom">
      {navItems.map((item) => {
        const isActive = location === item.path;
        const Icon = item.icon;
        
        return (
          <button
            key={item.path}
            data-testid={`nav-${item.label.toLowerCase()}`}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              } else {
                setLocation(item.path);
              }
            }}
            className={`flex flex-col items-center space-y-1 transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className={`text-xs ${isActive ? "font-medium" : ""}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
