import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { industry, product, audience, goal, channels, budget, maturity, creativity } = await req.json();

    if (!industry || !product || !audience || !goal || !channels?.length) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const creativityLabel = creativity <= 30 ? "conservative and safe" : creativity <= 60 ? "balanced" : creativity <= 80 ? "creative and bold" : "highly aggressive and unconventional";

    const systemPrompt = `You are a world-class growth strategist with deep expertise in AARRR pirate metrics, CRO, funnel optimization, and modern growth hacking. You provide specific, actionable, non-generic advice tailored to the user's exact situation. Think like a senior growth lead at a top startup.

IMPORTANT: Return ONLY valid JSON matching the exact schema below. No markdown, no code fences, no extra text.

{
  "growthIdeas": [
    {
      "title": "string",
      "description": "string (2-3 sentences, specific to their product)",
      "whyItWorks": "string (reference specific growth frameworks)",
      "impact": "High" | "Medium" | "Low"
    }
  ],
  "experiments": [
    {
      "hypothesis": "string",
      "whatToTest": "string",
      "successMetric": "string"
    }
  ],
  "channelStrategy": [
    {
      "channel": "string",
      "whyItFits": "string",
      "budgetAllocation": number (percentage, all must sum to 100)
    }
  ],
  "quickWins": [
    {
      "title": "string",
      "description": "string",
      "timeframe": "string (e.g. '2 days', '1 week')"
    }
  ]
}

Generate 7 growth ideas, 4 experiments, channel strategies for each selected channel, and 3 quick wins.
Be ${creativityLabel} in your approach.`;

    const userPrompt = `Industry: ${industry}
Product/Service: ${product}
Target Audience: ${audience}
Business Goal: ${goal}
Marketing Channels: ${channels.join(", ")}
${budget ? `Monthly Budget: $${budget}` : "Budget: Not specified"}
Business Maturity: ${maturity}

Generate a comprehensive, tailored growth strategy.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "Failed to generate ideas" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    let content = data.choices?.[0]?.message?.content || "";
    
    // Strip markdown code fences if present
    content = content.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();

    try {
      const parsed = JSON.parse(content);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(JSON.stringify({ error: "Failed to parse AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (e) {
    console.error("Edge function error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
