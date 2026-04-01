import { useState } from "react";
import WelcomeDialog from "@/components/WelcomeDialog";
import SymptomForm from "@/components/SymptomForm";
import { Stethoscope, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserData {
  name: string;
  email: string;
  city: string;
}

const Index = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const showDialog = !user;

  return (
    <div className="min-h-screen bg-background">
      <WelcomeDialog open={showDialog} onComplete={setUser} />

      {user && (
        <>
          {/* Top Nav */}
          <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <span className="font-display text-xl font-bold text-foreground">MediConnect</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{user.city}</span>
                <span className="text-border">|</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUser(null)}
                  className="text-muted-foreground"
                >
                  Sign out
                </Button>
              </div>
            </div>
          </header>

          <SymptomForm userName={user.name.split(" ")[0]} city={user.city} />
        </>
      )}
    </div>
  );
};

export default Index;
