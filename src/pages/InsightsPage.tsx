import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { TrendingUp, Calendar, Brain } from "lucide-react";
import { monthlyMoodData, heatmapData, emotionDistribution } from "@/lib/mock-data";

const moodToColor = (mood: number) => {
  if (mood > 0.3) return "hsl(40, 70%, 70%)";
  if (mood > 0) return "hsl(40, 50%, 60%)";
  if (mood > -0.3) return "hsl(210, 65%, 70%)";
  return "hsl(0, 60%, 70%)";
};

const InsightsPage = () => {
  return (
    <div className="p-8 max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-heading text-foreground mb-1">Insights</h1>
        <p className="text-sm text-muted-foreground mb-8">A bird's-eye view of your emotional patterns.</p>

        {/* Mood Timeline */}
        <div className="mb-8 p-6 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-medium text-foreground">Mood Timeline — 30 Days</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyMoodData}>
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(240, 5%, 55%)" }} tickLine={false} axisLine={false} interval={4} />
              <YAxis domain={[-1, 1]} tick={{ fontSize: 10, fill: "hsl(240, 5%, 55%)" }} tickLine={false} axisLine={false} width={30} />
              <Tooltip
                contentStyle={{
                  background: "hsl(240, 6%, 11%)",
                  border: "1px solid hsl(240, 5%, 18%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontFamily: "DM Mono",
                }}
                labelStyle={{ color: "hsl(240, 5%, 55%)" }}
              />
              <Line
                type="monotone"
                dataKey="mood"
                stroke="hsl(75, 89%, 67%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "hsl(75, 89%, 67%)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Week Heatmap */}
        <div className="mb-8 p-6 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-cool" />
            <h2 className="text-sm font-medium text-foreground">Month Heatmap</h2>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div key={d} className="text-center text-[10px] font-mono text-muted-foreground pb-1">{d}</div>
            ))}
            {heatmapData.map((d) => (
              <div
                key={d.day}
                className="aspect-square rounded-md flex items-center justify-center text-[10px] font-mono transition-colors"
                style={{
                  backgroundColor: d.hasEntry ? moodToColor(d.mood) : "hsl(240, 5%, 12%)",
                  opacity: d.hasEntry ? 0.8 : 0.3,
                  color: d.hasEntry ? "hsl(240, 7%, 5%)" : "hsl(240, 5%, 35%)",
                }}
              >
                {d.day}
              </div>
            ))}
          </div>
        </div>

        {/* Emotion Distribution */}
        <div className="p-6 rounded-lg bg-card border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-warm" />
            <h2 className="text-sm font-medium text-foreground">Emotion Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={emotionDistribution} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(240, 5%, 55%)" }} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "hsl(240, 5%, 75%)", fontFamily: "DM Mono" }} tickLine={false} axisLine={false} width={70} />
              <Tooltip
                contentStyle={{
                  background: "hsl(240, 6%, 11%)",
                  border: "1px solid hsl(240, 5%, 18%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontFamily: "DM Mono",
                }}
              />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                {emotionDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Narrative */}
        <motion.div
          className="mt-8 p-6 rounded-lg bg-card border border-primary/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <Brain className="w-3 h-3 text-primary-foreground" />
            </div>
            <h2 className="text-sm font-medium text-foreground">Weekly Narrative</h2>
          </div>
          <p className="text-sm text-foreground/70 leading-relaxed">
            This past week you've shown a strong oscillation between productive highs and stress-induced lows. Your best moments came during social interactions — particularly mid-week — while evening entries trend more reflective and occasionally heavy. Your word count has remained consistent, which suggests you're maintaining the journaling habit even on harder days. Consider protecting your morning energy; that's where your highest mood scores consistently land.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InsightsPage;
