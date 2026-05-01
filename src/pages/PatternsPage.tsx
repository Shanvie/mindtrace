import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, TrendingDown, Minus, Clock, Flame, Tag } from "lucide-react";
import { recurringThemes, peakWindows } from "@/lib/mock-data";

const burnoutScore = 42;
const burnoutFactors = [
  { label: "3 consecutive low-mood entries", points: 15, active: true },
  { label: "Anger dominant 2 of last 7", points: 10, active: true },
  { label: "Word count stable", points: 0, active: false },
  { label: "Arousal spikes detected", points: 10, active: true },
  { label: "Keywords: 'drained', 'exhausted'", points: 7, active: true },
  { label: "Journaling frequency normal", points: 0, active: false },
];

const trendIcon = (trend: "up" | "down" | "stable") => {
  if (trend === "up") return <TrendingUp className="w-3.5 h-3.5 text-danger" />;
  if (trend === "down") return <TrendingDown className="w-3.5 h-3.5 text-primary" />;
  return <Minus className="w-3.5 h-3.5 text-muted-foreground" />;
};

const moodBarColor = (mood: number) => {
  if (mood > 0.2) return "bg-warm";
  if (mood < -0.2) return "bg-danger";
  return "bg-cool";
};

const PatternsPage = () => {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (burnoutScore / 100) * circumference;
  const gaugeColor = burnoutScore > 70 ? "hsl(0, 60%, 70%)" : burnoutScore > 40 ? "hsl(40, 70%, 70%)" : "hsl(75, 89%, 67%)";

  return (
    <div className="p-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-heading text-foreground mb-1">Patterns</h1>
        <p className="text-sm text-muted-foreground mb-8">Deep signals from your emotional data.</p>

        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Burnout Gauge */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-6">
              <Flame className="w-4 h-4 text-warm" />
              <h2 className="text-sm font-medium text-foreground">Burnout Risk</h2>
            </div>
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(240, 5%, 18%)" strokeWidth="8" />
                  <motion.circle
                    cx="60" cy="60" r="54" fill="none"
                    stroke={gaugeColor}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-heading text-foreground">{burnoutScore}</span>
                  <span className="text-[10px] font-mono text-muted-foreground">/ 100</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {burnoutFactors.map((f) => (
                <div key={f.label} className={`flex items-center justify-between text-xs py-1.5 px-2 rounded ${f.active ? "bg-secondary/50" : ""}`}>
                  <span className={`font-mono ${f.active ? "text-foreground/80" : "text-muted-foreground/50"}`}>{f.label}</span>
                  <span className={`font-mono ${f.active ? "text-warm" : "text-muted-foreground/30"}`}>+{f.points}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recurring Themes */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-2 mb-6">
              <Tag className="w-4 h-4 text-cool" />
              <h2 className="text-sm font-medium text-foreground">Recurring Themes</h2>
            </div>
            <div className="space-y-4">
              {recurringThemes.map((t, i) => (
                <motion.div
                  key={t.theme}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground/80">{t.theme}</span>
                      <div className="flex items-center gap-2">
                        {trendIcon(t.trend)}
                        <span className="text-xs font-mono text-muted-foreground">{t.count} mentions</span>
                      </div>
                    </div>
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary/50 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(t.count / 15) * 100}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Peak Windows */}
        <div className="p-6 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-medium text-foreground">Peak Mood Windows</h2>
          </div>
          <div className="space-y-4">
            {peakWindows.map((w, i) => (
              <motion.div
                key={w.window}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4"
              >
                <span className="text-xs font-mono text-muted-foreground w-36 shrink-0">{w.window}</span>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden relative">
                  <motion.div
                    className={`h-full rounded-full ${moodBarColor(w.avgMood)}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${((w.avgMood + 1) / 2) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  />
                </div>
                <span className={`text-xs font-mono w-12 text-right ${w.avgMood > 0 ? "text-warm" : "text-danger"}`}>
                  {w.avgMood > 0 ? "+" : ""}{(w.avgMood * 100).toFixed(0)}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground w-16 text-right">{w.entries} entries</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Burnout Alert (conditional) */}
        {burnoutScore > 40 && (
          <motion.div
            className="mt-6 p-4 rounded-lg bg-warm/10 border border-warm/20 flex items-start gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <AlertTriangle className="w-4 h-4 text-warm mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warm">Moderate burnout risk detected</p>
              <p className="text-xs text-foreground/60 mt-1">
                Your recent entries suggest elevated stress levels. Consider scheduling breaks, protecting your morning routine, and reaching out for support if needed.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default PatternsPage;
