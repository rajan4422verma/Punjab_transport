import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function OTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const phone = localStorage.getItem('phone') || '+91 XXXXXXXXXX';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast({ 
        title: "Please enter complete OTP",
        variant: "destructive"
      });
      return;
    }
    
    // Mock validation: Accept any 6-digit OTP
    toast({ title: "OTP verified successfully" });
    setLocation("/home");
  };

  const handleResendOTP = () => {
    if (countdown === 0) {
      setCountdown(30);
      toast({ title: "OTP resent successfully" });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex items-center justify-between p-6">
        <Button 
          variant="ghost" 
          size="icon"
          data-testid="button-back"
          onClick={() => setLocation("/login")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Verify OTP</h1>
        <div></div>
      </div>
      
      <div className="flex-1 px-6 pt-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Enter OTP</h2>
          <p className="text-muted-foreground">
            We sent a code to <span className="font-medium">{phone}</span>
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <Input
                key={index}
                data-testid={`input-otp-${index}`}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
                maxLength={1}
              />
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Didn't receive the code?</p>
            <Button
              variant="link"
              data-testid="button-resend-otp"
              onClick={handleResendOTP}
              disabled={countdown > 0}
              className="text-primary font-medium p-0"
            >
              Resend OTP {countdown > 0 && (
                <span className="text-muted-foreground ml-1">({countdown}s)</span>
              )}
            </Button>
          </div>
          
          <Button 
            data-testid="button-verify-otp"
            onClick={handleVerifyOTP}
            className="w-full py-3 font-semibold"
          >
            Verify & Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
