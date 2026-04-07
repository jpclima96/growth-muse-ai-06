import { useState } from "react";
import { Rocket, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { FormInputs } from "@/types/growth";

const INDUSTRIES = [
  "SaaS / Software", "E-commerce", "Fintech", "Healthcare", "Education",
  "Real Estate", "Food & Beverage", "Travel", "Media & Entertainment", "Other",
];

const GOALS = [
  "Increase sales", "Generate leads", "Improve retention",
  "Increase engagement", "Launch new product",
];

const CHANNELS = [
  "Paid Ads", "SEO", "Social Media", "Email Marketing",
  "Influencer Marketing", "Organic Content",
];

const MATURITY_LEVELS = ["Early stage", "Growth stage", "Mature"];

interface GrowthFormProps {
  onSubmit: (inputs: FormInputs) => void;
  isLoading: boolean;
}

export function GrowthForm({ onSubmit, isLoading }: GrowthFormProps) {
  const [industry, setIndustry] = useState("");
  const [customIndustry, setCustomIndustry] = useState("");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [goal, setGoal] = useState("");
  const [channels, setChannels] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [maturity, setMaturity] = useState("");
  const [creativity, setCreativity] = useState([50]);

  const toggleChannel = (ch: string) => {
    setChannels((prev) =>
      prev.includes(ch) ? prev.filter((c) => c !== ch) : [...prev, ch]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      industry: industry === "Other" ? customIndustry : industry,
      product,
      audience,
      goal,
      channels,
      budget,
      maturity,
      creativity: creativity[0],
    });
  };

  const isValid = (industry === "Other" ? customIndustry : industry) && product && audience && goal && channels.length > 0 && maturity;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Industry</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map((i) => (
                <SelectItem key={i} value={i}>{i}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {industry === "Other" && (
            <Input
              placeholder="Enter your industry"
              value={customIndustry}
              onChange={(e) => setCustomIndustry(e.target.value)}
              className="bg-secondary border-border mt-2"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label>Business Goal</Label>
          <Select value={goal} onValueChange={setGoal}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Select goal" />
            </SelectTrigger>
            <SelectContent>
              {GOALS.map((g) => (
                <SelectItem key={g} value={g}>{g}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Product / Service Description</Label>
        <Textarea
          placeholder="Describe your product or service in detail..."
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="bg-secondary border-border min-h-[80px] resize-none"
        />
      </div>

      <div className="space-y-2">
        <Label>Target Audience</Label>
        <Textarea
          placeholder="Who are your ideal customers? Demographics, psychographics..."
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
          className="bg-secondary border-border min-h-[80px] resize-none"
        />
      </div>

      <div className="space-y-3">
        <Label>Marketing Channels</Label>
        <div className="flex flex-wrap gap-2">
          {CHANNELS.map((ch) => (
            <button
              key={ch}
              type="button"
              onClick={() => toggleChannel(ch)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                channels.includes(ch)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {ch}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Monthly Budget (optional)</Label>
          <Input
            type="number"
            placeholder="e.g. 5000"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="bg-secondary border-border"
          />
        </div>

        <div className="space-y-2">
          <Label>Business Maturity</Label>
          <Select value={maturity} onValueChange={setMaturity}>
            <SelectTrigger className="bg-secondary border-border">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {MATURITY_LEVELS.map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Creativity Level</Label>
          <span className="text-sm text-muted-foreground">
            {creativity[0] <= 30 ? "Conservative" : creativity[0] <= 60 ? "Balanced" : creativity[0] <= 80 ? "Bold" : "Aggressive"}
          </span>
        </div>
        <Slider
          value={creativity}
          onValueChange={setCreativity}
          max={100}
          step={1}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Safe & proven</span>
          <span>Wild & experimental</span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isValid || isLoading}
        className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 transition-all"
        size="lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 animate-spin" />
            Generating growth strategies...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Rocket className="w-5 h-5" />
            Generate Growth Strategy
          </span>
        )}
      </Button>
    </form>
  );
}
