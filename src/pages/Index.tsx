import { useState, useEffect } from "react";
import { RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GrowthForm } from "@/components/GrowthForm";
import { ResultsSection } from "@/components/ResultsSection";
import { HistorySidebar } from "@/components/HistorySidebar";
import { LoadingState } from "@/components/LoadingState";
import { FormInputs, GrowthResults, HistoryEntry } from "@/types/growth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const HISTORY_KEY = "growth-ideas-history";

function loadHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveHistory(history: HistoryEntry[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export default function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GrowthResults | null>(null);
  const [lastInputs, setLastInputs] = useState<FormInputs | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(loadHistory);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string>();

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const generate = async (inputs: FormInputs) => {
    setIsLoading(true);
    setResults(null);
    setLastInputs(inputs);
    setSelectedHistoryId(undefined);

    try {
      const { data, error } = await supabase.functions.invoke("generate-growth-ideas", {
        body: inputs,
      });

      if (error) throw new Error(error.message || "Failed to generate");
      if (data?.error) throw new Error(data.error);

      setResults(data as GrowthResults);

      const entry: HistoryEntry = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        inputs,
        results: data as GrowthResults,
      };
      setHistory((prev) => [entry, ...prev].slice(0, 20));
      setSelectedHistoryId(entry.id);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const selectHistory = (entry: HistoryEntry) => {
    setResults(entry.results);
    setLastInputs(entry.inputs);
    setSelectedHistoryId(entry.id);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
    toast.success("History cleared");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">AI Growth Ideas</h1>
              <p className="text-xs text-muted-foreground">Strategy generator for modern teams</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-6xl mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
            Generate <span className="gradient-text">growth strategies</span> in seconds
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Powered by AI. Tailored to your product, audience, and goals. Get actionable ideas, experiments, and quick wins.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_260px] gap-6">
          <div className="space-y-6">
            {/* Form */}
            <div className="glass-card rounded-xl p-6">
              <GrowthForm onSubmit={generate} isLoading={isLoading} />
            </div>

            {/* Loading */}
            {isLoading && <LoadingState />}

            {/* Results */}
            {results && !isLoading && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Your Growth Strategy</h2>
                  {lastInputs && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => generate(lastInputs)}
                      className="gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Regenerate
                    </Button>
                  )}
                </div>
                <ResultsSection results={results} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block space-y-4">
            <HistorySidebar
              history={history}
              onSelect={selectHistory}
              onClear={clearHistory}
              selectedId={selectedHistoryId}
            />
          </aside>
        </div>
      </main>
    </div>
  );
}
