import { Clock, Trash2 } from "lucide-react";
import { HistoryEntry } from "@/types/growth";

interface HistorySidebarProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
  selectedId?: string;
}

export function HistorySidebar({ history, onSelect, onClear, selectedId }: HistorySidebarProps) {
  if (history.length === 0) return null;

  return (
    <div className="glass-card rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold">History</h3>
        </div>
        <button onClick={onClear} className="text-muted-foreground hover:text-destructive transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
        {history.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            className={`w-full text-left p-2.5 rounded-lg text-sm transition-colors ${
              selectedId === entry.id ? "bg-primary/10 text-primary border border-primary/20" : "hover:bg-accent text-muted-foreground"
            }`}
          >
            <p className="font-medium truncate text-foreground">{entry.inputs.industry}</p>
            <p className="text-xs truncate">{entry.inputs.goal} · {new Date(entry.timestamp).toLocaleDateString()}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
