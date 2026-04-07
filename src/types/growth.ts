export interface GrowthIdea {
  title: string;
  description: string;
  whyItWorks: string;
  impact: "High" | "Medium" | "Low";
}

export interface Experiment {
  hypothesis: string;
  whatToTest: string;
  successMetric: string;
}

export interface ChannelStrategy {
  channel: string;
  whyItFits: string;
  budgetAllocation: number;
}

export interface QuickWin {
  title: string;
  description: string;
  timeframe: string;
}

export interface GrowthResults {
  growthIdeas: GrowthIdea[];
  experiments: Experiment[];
  channelStrategy: ChannelStrategy[];
  quickWins: QuickWin[];
}

export interface FormInputs {
  industry: string;
  product: string;
  audience: string;
  goal: string;
  channels: string[];
  budget: string;
  maturity: string;
  creativity: number;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  inputs: FormInputs;
  results: GrowthResults;
}
