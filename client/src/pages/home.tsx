import { MapPin, Search, Route, Car, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNavigation } from "@/components/bottom-navigation";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const nearbyStops = [
    { name: "Chandigarh Bus Stand", distance: "0.2 km away", eta: "2 min", status: "active" },
    { name: "Sector 17 Plaza", distance: "0.5 km away", eta: "5 min", status: "warning" },
    { name: "Railway Station", distance: "1.2 km away", eta: "12 min", status: "delayed" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-punjab-green";
      case "warning": return "bg-punjab-saffron";
      case "delayed": return "bg-destructive";
      default: return "bg-muted-foreground";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "active": return "text-punjab-green";
      case "warning": return "text-punjab-saffron";
      case "delayed": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Map Section */}
      <div className="flex-1 relative map-placeholder">
        {/* Map placeholder with grid pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 dark:bg-black/90 px-4 py-2 rounded-lg shadow-lg">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-1" />
            <p className="text-sm font-medium">Map Loading...</p>
          </div>
        </div>
        
        {/* Location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg animate-pulse"></div>
        </div>
        
        {/* Current location button */}
        <Button
          size="icon"
          data-testid="button-current-location"
          className="absolute bottom-24 right-4 bg-white dark:bg-card text-primary shadow-lg border border-border"
          onClick={() => toast({ title: "Current location updated" })}
        >
          <LocateFixed className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Search and Action Section */}
      <div className="bg-background p-4 rounded-t-3xl -mt-6 relative z-10 shadow-lg border-t border-border">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="flex items-center bg-muted rounded-xl px-4 py-3 border border-border">
            <Search className="h-5 w-5 text-muted-foreground mr-3" />
            <Input
              data-testid="input-search"
              type="text"
              placeholder="Where to?"
              className="flex-1 bg-transparent border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              onClick={() => toast({ title: "Search functionality coming soon" })}
            />
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex space-x-3 mb-6">
          <Button 
            data-testid="button-find-routes"
            onClick={() => setLocation("/routes")}
            className="flex-1 py-3 font-semibold flex items-center justify-center space-x-2 min-h-[44px]"
          >
            <Route className="h-5 w-5" />
            <span>Find Routes</span>
          </Button>
          <Button 
            data-testid="button-book-ride"
            onClick={() => toast({ title: "Book Ride feature coming soon" })}
            className="flex-1 bg-punjab-saffron hover:bg-punjab-saffron/90 text-white py-3 font-semibold flex items-center justify-center space-x-2 min-h-[44px]"
          >
            <Car className="h-5 w-5" />
            <span>Book Ride</span>
          </Button>
        </div>
        
        {/* Nearby Stops */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Nearby Stops</h3>
          <div className="space-y-3">
            {nearbyStops.map((stop, index) => (
              <div 
                key={index}
                data-testid={`nearby-stop-${index}`}
                className="flex items-center justify-between p-3 bg-card rounded-xl border border-border"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(stop.status)} ${stop.status === 'active' ? 'animate-pulse' : ''}`}></div>
                  <div>
                    <p className="font-medium">{stop.name}</p>
                    <p className="text-sm text-muted-foreground">{stop.distance}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${getStatusTextColor(stop.status)}`}>
                    {stop.eta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}
