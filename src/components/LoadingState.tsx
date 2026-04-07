import { Sparkles } from "lucide-react";

export function LoadingState() {
  return (
    <div className="glass-card rounded-xl p-12 flex flex-col items-center justify-center space-y-4 animate-pulse-glow">
      <div className="p-4 rounded-full bg-primary/10">
        <Sparkles className="w-8 h-8 text-primary animate-spin" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">Generating growth strategies...</h3>
        <p className="text-sm text-muted-foreground">
          Analyzing your inputs and crafting tailored ideas
        </p>
      </div>
      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-primary animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
