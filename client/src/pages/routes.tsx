import { useState } from "react";
import { Search, Clock, Route, Users, MapPin, Heart, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/bottom-navigation";
import { useToast } from "@/hooks/use-toast";
import { useApp } from "@/contexts/app-context";

export default function Routes() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { favoriteRoutes, toggleFavorite } = useApp();
  const { toast } = useToast();

  const filters = [
    { id: "all", label: "All" },
    { id: "popular", label: "Popular" },
    { id: "religious", label: "Religious" },
    { id: "highway", label: "Highway" }
  ];

  const routes = [
    {
      id: "42",
      number: "Route #42",
      from: "Chandigarh",
      to: "Mohali",
      duration: "25 min",
      distance: "12.5 km",
      seats: "24 seats",
      status: "Active",
      statusColor: "text-punjab-green",
      statusDot: "bg-punjab-green",
      category: ["popular"]
    },
    {
      id: "108",
      number: "Route #108",
      from: "Gurudwara Sahib",
      to: "Golden Temple",
      duration: "45 min",
      distance: "18.2 km",
      seats: "30 seats",
      status: "En Route",
      statusColor: "text-punjab-saffron",
      statusDot: "bg-punjab-saffron",
      category: ["religious"]
    },
    {
      id: "156",
      number: "Route #156",
      from: "Ludhiana",
      to: "Delhi",
      duration: "180 min",
      distance: "95.4 km",
      seats: "40 seats",
      status: "Delayed",
      statusColor: "text-destructive",
      statusDot: "bg-destructive",
      category: ["highway", "popular"]
    }
  ];

  const filteredRoutes = routes.filter(route => 
    activeFilter === "all" || route.category.includes(activeFilter)
  );

  const handleTrackRoute = (routeNumber: string) => {
    toast({ title: `${routeNumber} tracked successfully` });
  };

  const handleShareRoute = (routeNumber: string) => {
    toast({ title: `${routeNumber} shared successfully` });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-card border-b border-border">
        <h1 className="text-2xl font-bold">Routes</h1>
        <Button 
          variant="ghost" 
          size="icon"
          data-testid="button-search-routes"
          onClick={() => toast({ title: "Search routes feature coming soon" })}
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Filter Chips */}
      <div className="p-4 bg-card border-b border-border">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              data-testid={`filter-${filter.id}`}
              variant={activeFilter === filter.id ? "default" : "secondary"}
              onClick={() => setActiveFilter(filter.id)}
              className="whitespace-nowrap text-sm font-medium"
            >
              {filter.label}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Routes List */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {filteredRoutes.map((route) => (
          <div 
            key={route.id}
            data-testid={`route-card-${route.id}`}
            className="bg-card rounded-xl p-4 border border-border shadow-sm"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">{route.number}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-muted-foreground">{route.from}</span>
                  <MapPin className="h-3 w-3 text-muted-foreground rotate-90" />
                  <span className="text-sm text-muted-foreground">{route.to}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${route.statusDot} ${route.status === 'Active' ? 'animate-pulse' : ''}`}></div>
                <span className={`text-sm font-medium ${route.statusColor}`}>
                  {route.status}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {route.duration}
              </span>
              <span className="flex items-center">
                <Route className="h-4 w-4 mr-1" />
                {route.distance}
              </span>
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {route.seats}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  data-testid={`button-track-${route.id}`}
                  onClick={() => handleTrackRoute(route.number)}
                  className="text-sm font-medium"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Track
                </Button>
                <Button
                  size="sm"
                  variant={favoriteRoutes.includes(route.id) ? "default" : "secondary"}
                  data-testid={`button-favorite-${route.id}`}
                  onClick={() => {
                    toggleFavorite(route.id);
                    toast({ 
                      title: favoriteRoutes.includes(route.id) 
                        ? "Route removed from favorites" 
                        : "Route added to favorites" 
                    });
                  }}
                  className={`text-sm font-medium ${
                    favoriteRoutes.includes(route.id) 
                      ? "bg-punjab-saffron hover:bg-punjab-saffron/90 text-white" 
                      : ""
                  }`}
                >
                  <Heart className={`h-4 w-4 mr-1 ${
                    favoriteRoutes.includes(route.id) ? "fill-current" : ""
                  }`} />
                  Favorite
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                data-testid={`button-share-${route.id}`}
                onClick={() => handleShareRoute(route.number)}
                className="h-8 w-8"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <BottomNavigation />
    </div>
  );
}
