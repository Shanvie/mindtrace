import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockEntries } from "@/lib/mock-data";

const moodClass = (score: number) => {
  if (score > 0.2) return "mood-positive";
  if (score < -0.2) return "mood-negative";
  return "mood-neutral";
};

const moodLabel = (score: number) => {
  if (score > 0.5) return "Great";
  if (score > 0.2) return "Good";
  if (score > -0.2) return "Neutral";
  if (score > -0.5) return "Low";
  return "Rough";
};

const moodColor = (score: number) => {
  if (score > 0.2) return "text-warm";
  if (score < -0.2) return "text-danger";
  return "text-cool";
};

const JournalPage = () => {
  return (
    <div className="p-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading text-foreground">Journal</h1>
            <p className="text-muted-foreground mt-1 text-sm">Your emotional landscape, one entry at a time.</p>
          </div>
          <Link to="/journal/new">
            <Button variant="signal" className="gap-2">
              <Plus className="w-4 h-4" />
              New Entry
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {mockEntries.map((entry, i) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link to={`/journal/${entry.id}`}>
                <div
                  className={`group p-5 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer ${moodClass(entry.moodScore)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className={`text-xs font-mono font-medium ${moodColor(entry.moodScore)}`}>
                          {moodLabel(entry.moodScore)}
                        </span>
                        {entry.burnoutFlag && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-danger/15 text-danger">
                            Burnout risk
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed truncate">
                        {entry.preview}
                      </p>
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-1">
                      <span className={`text-2xl font-heading ${moodColor(entry.moodScore)}`}>
                        {entry.moodScore > 0 ? "+" : ""}
                        {(entry.moodScore * 100).toFixed(0)}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground capitalize">
                        {entry.dominantEmotion}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    {entry.emotions.map((em) => (
                      <div
                        key={em.label}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-secondary/50 text-[11px] font-mono text-muted-foreground"
                      >
                        <span className="capitalize">{em.label}</span>
                        <span className="text-foreground/50">{(em.score * 100).toFixed(0)}%</span>
                      </div>
                    ))}
                    <span className="ml-auto text-[11px] font-mono text-muted-foreground">
                      {entry.wordCount} words
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default JournalPage;
