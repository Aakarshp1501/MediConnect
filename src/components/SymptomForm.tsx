import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Search, Activity, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const SEVERITY_LEVELS = [
  { value: "mild", label: "Mild", description: "Minor discomfort, can carry out daily activities" },
  { value: "moderate", label: "Moderate", description: "Noticeable symptoms, some difficulty in routine" },
  { value: "severe", label: "Severe", description: "Significant pain or distress, needs urgent care" },
  { value: "critical", label: "Critical", description: "Emergency – life-threatening symptoms" },
];

const SymptomForm = ({ userName, city }: { userName: string; city: string }) => {
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState("");
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms || !severity || !date) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({
      title: "Finding your doctor…",
      description: `Matching doctors in ${city} for your symptoms. Backend integration coming soon!`,
    });
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Hi, {userName} 👋
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Tell us what's bothering you and our AI will match you with the right doctor in <span className="font-semibold text-primary">{city}</span>.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Symptoms Card */}
        <Card className="border shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-display">Describe Your Symptoms</CardTitle>
                <CardDescription>Be as specific as possible for an accurate match</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="e.g. I've been having a persistent headache for 3 days, along with mild fever and body aches…"
              className="min-h-[120px] resize-none text-base"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* Severity & Date Row */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Severity */}
          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-display">Severity Level</CardTitle>
                  <CardDescription>How serious are your symptoms?</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  {SEVERITY_LEVELS.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      <div>
                        <span className="font-medium">{s.label}</span>
                        <span className="ml-2 text-xs text-muted-foreground">– {s.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Appointment Date */}
          <Card className="border shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20 text-accent">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle className="text-lg font-display">Preferred Date</CardTitle>
                  <CardDescription>Choose an appointment date</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "h-12 w-full justify-start text-left text-base font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
        </div>

        {/* Submit */}
        <Button type="submit" size="lg" className="w-full text-lg font-semibold h-14">
          🔍 Find My Doctor
        </Button>
      </form>
    </div>
  );
};

export default SymptomForm;
