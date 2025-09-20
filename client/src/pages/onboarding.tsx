import { useLocation } from "wouter";
import { Bus, MapPin, Bell, Route } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Onboarding() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: MapPin,
      title: "Real-time Tracking",
      description: "Live bus locations and ETAs",
      color: "text-punjab-saffron"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Never miss your bus again",
      color: "text-punjab-green"
    },
    {
      icon: Route,
      title: "Journey Planning",
      description: "Optimal routes and timings",
      color: "text-white"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-punjab-saffron flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center text-white">
        {/* Logo Placeholder */}
        <div className="w-24 h-24 bg-white/20 rounded-xl mb-8 flex items-center justify-center border-2 border-white/30">
          <Bus className="h-12 w-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-bold mb-2">Punjab Transport</h1>
        <p className="text-xl text-white/80 mb-12">Smart Travel • Made Easy</p>
        
        {/* Feature Cards */}
        <div className="space-y-4 w-full max-w-sm mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                  <div className="text-left">
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-white/70">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="p-6">
        <Button 
          data-testid="button-get-started"
          onClick={() => setLocation("/login")}
          className="w-full bg-white text-primary py-4 rounded-xl font-semibold text-lg shadow-lg hover:bg-gray-50 transition-colors"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
