import { useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleSendOTP = () => {
    if (!phone || phone.length !== 10) {
      toast({ 
        title: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }
    
    // Store phone number for OTP screen
    localStorage.setItem('phone', `+91 ${phone}`);
    toast({ title: "OTP sent successfully" });
    setLocation("/otp");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-6">
        <Button 
          variant="ghost" 
          size="icon"
          data-testid="button-back"
          onClick={() => setLocation("/onboarding")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Login</h1>
        <div></div>
      </div>
      
      <div className="flex-1 px-6 pt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-muted-foreground">Enter your phone number to continue</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium mb-2">Phone Number</Label>
            <div className="flex">
              <div className="bg-muted px-3 py-3 rounded-l-xl border border-r-0 border-border flex items-center">
                <span className="text-sm font-medium">+91</span>
              </div>
              <Input
                data-testid="input-phone"
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="flex-1 rounded-l-none border-l-0 focus:ring-2 focus:ring-ring focus:border-transparent"
                maxLength={10}
              />
            </div>
          </div>
          
          <Button 
            data-testid="button-send-otp"
            onClick={handleSendOTP}
            className="w-full py-3 font-semibold"
          >
            Send OTP
          </Button>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <button className="text-primary">Terms of Service</button>{" "}
            and{" "}
            <button className="text-primary">Privacy Policy</button>
          </p>
        </div>
      </div>
    </div>
  );
}
