import { useState } from "react";
import { Copy, Check, Lightbulb, FlaskConical, Radio, Zap, TrendingUp } from "lucide-react";
import { GrowthResults } from "@/types/growth";
import { toast } from "sonner";

function ImpactBadge({ impact }: { impact: string }) {
  const cls =
    impact === "High" ? "impact-high bg-[hsl(var(--impact-high)/0.1)] border-[hsl(var(--impact-high)/0.3)]" :
    impact === "Medium" ? "impact-medium bg-[hsl(var(--impact-medium)/0.1)] border-[hsl(var(--impact-medium)/0.3)]" :
    "impact-low bg-[hsl(var(--impact-low)/0.1)] border-[hsl(var(--impact-low)/0.3)]";
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
      <TrendingUp className="w-3 h-3" />
      {impact}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
      {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function SectionHeader({ icon: Icon, title, copyText }: { icon: React.ElementType; title: string; copyText: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold">{title}</h3>
      </div>
      <CopyButton text={copyText} />
    </div>
  );
}

function formatGrowthIdeas(ideas: GrowthResults["growthIdeas"]) {
  return ideas.map((i) => `**${i.title}**\n${i.description}\nWhy: ${i.whyItWorks}\nImpact: ${i.impact}`).join("\n\n");
}
function formatExperiments(exps: GrowthResults["experiments"]) {
  return exps.map((e) => `Hypothesis: ${e.hypothesis}\nTest: ${e.whatToTest}\nMetric: ${e.successMetric}`).join("\n\n");
}
function formatChannels(chs: GrowthResults["channelStrategy"]) {
  return chs.map((c) => `${c.channel} (${c.budgetAllocation}%): ${c.whyItFits}`).join("\n\n");
}
function formatQuickWins(qw: GrowthResults["quickWins"]) {
  return qw.map((q) => `${q.title} (${q.timeframe}): ${q.description}`).join("\n\n");
}

interface ResultsSectionProps {
  results: GrowthResults;
}

export function ResultsSection({ results }: ResultsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Growth Ideas */}
      <div className="glass-card rounded-xl p-6 fade-in" style={{ animationDelay: "0ms" }}>
        <SectionHeader icon={Lightbulb} title="Growth Ideas" copyText={formatGrowthIdeas(results.growthIdeas)} />
        <div className="space-y-4">
          {results.growthIdeas.map((idea, i) => (
            <div key={i} className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-foreground">{idea.title}</h4>
                <ImpactBadge impact={idea.impact} />
              </div>
              <p className="text-sm text-muted-foreground">{idea.description}</p>
              <p className="text-xs text-primary/80 italic">💡 {idea.whyItWorks}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Experiments */}
      <div className="glass-card rounded-xl p-6 fade-in" style={{ animationDelay: "100ms" }}>
        <SectionHeader icon={FlaskConical} title="Experimentation Plan" copyText={formatExperiments(results.experiments)} />
        <div className="space-y-4">
          {results.experiments.map((exp, i) => (
            <div key={i} className="p-4 rounded-lg bg-secondary/50 border border-border space-y-2">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground"><span className="text-primary font-semibold">Hypothesis:</span> {exp.hypothesis}</p>
                <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Test:</span> {exp.whatToTest}</p>
                <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Success Metric:</span> {exp.successMetric}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Channel Strategy */}
      <div className="glass-card rounded-xl p-6 fade-in" style={{ animationDelay: "200ms" }}>
        <SectionHeader icon={Radio} title="Channel Strategy" copyText={formatChannels(results.channelStrategy)} />
        <div className="space-y-3">
          {results.channelStrategy.map((ch, i) => (
            <div key={i} className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-foreground">{ch.channel}</h4>
                <span className="text-sm font-bold text-primary">{ch.budgetAllocation}%</span>
              </div>
              <div className="w-full bg-background rounded-full h-1.5 mb-2">
                <div className="bg-primary h-1.5 rounded-full transition-all" style={{ width: `${ch.budgetAllocation}%` }} />
              </div>
              <p className="text-sm text-muted-foreground">{ch.whyItFits}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Wins */}
      <div className="glass-card rounded-xl p-6 fade-in" style={{ animationDelay: "300ms" }}>
        <SectionHeader icon={Zap} title="Quick Wins" copyText={formatQuickWins(results.quickWins)} />
        <div className="space-y-3">
          {results.quickWins.map((qw, i) => (
            <div key={i} className="p-4 rounded-lg bg-secondary/50 border border-border flex items-start gap-3">
              <div className="p-1.5 rounded-md bg-warning/10 mt-0.5">
                <Zap className="w-4 h-4 text-warning" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">{qw.title}</h4>
                  <span className="text-xs text-muted-foreground bg-accent px-2 py-0.5 rounded-full">{qw.timeframe}</span>
                </div>
                <p className="text-sm text-muted-foreground">{qw.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
