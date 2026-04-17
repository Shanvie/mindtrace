import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, AlertTriangle } from "lucide-react";
import { mockEntries } from "@/lib/mock-data";

const moodColor = (score: number) => {
  if (score > 0.2) return "text-warm";
  if (score < -0.2) return "text-danger";
  return "text-cool";
};

const moodBg = (score: number) => {
  if (score > 0.2) return "bg-warm/10";
  if (score < -0.2) return "bg-danger/10";
  return "bg-cool/10";
};

const EntryDetailPage = () => {
  const { id } = useParams();
  const entry = mockEntries.find((e) => e.id === id) || mockEntries[0];

  return (
    <div className="p-8 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link to="/journal" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to journal
        </Link>

        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading text-foreground">
              {new Date(entry.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            </h1>
            <div className="flex items-center gap-4 mt-2 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{entry.date}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{entry.wordCount} words</span>
            </div>
          </div>

          <div className={`text-right p-4 rounded-lg ${moodBg(entry.moodScore)}`}>
            <span className={`text-4xl font-heading ${moodColor(entry.moodScore)}`}>
              {entry.moodScore > 0 ? "+" : ""}{(entry.moodScore * 100).toFixed(0)}
            </span>
            <p className="text-xs font-mono text-muted-foreground mt-1 capitalize">{entry.dominantEmotion}</p>
          </div>
        </div>

        {entry.burnoutFlag && (
          <div className="mb-6 p-4 rounded-lg bg-danger/10 border border-danger/20 flex items-center gap-3">
            <AlertTriangle className="w-4 h-4 text-danger" />
            <p className="text-sm text-danger">Burnout indicators detected in this entry.</p>
          </div>
        )}

        <div className="mb-8 p-6 rounded-lg bg-card border border-border">
          <p className="text-foreground/80 leading-relaxed">{entry.preview}</p>
          <p className="text-foreground/60 leading-relaxed mt-4">
            This is a preview of the encrypted entry content. In the full application, the complete text would be decrypted and displayed here with full formatting support.
          </p>
        </div>

        <h2 className="text-lg font-heading text-foreground mb-4">Emotion Breakdown</h2>
        <div className="grid grid-cols-3 gap-3 mb-8">
          {entry.emotions.map((em, i) => (
            <motion.div
              key={em.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-lg bg-card border border-border text-center"
            >
              <p className="text-2xl font-heading text-foreground">{(em.score * 100).toFixed(0)}%</p>
              <p className="text-xs font-mono text-muted-foreground mt-1 capitalize">{em.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs font-mono text-muted-foreground mb-1">Arousal Level</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-cool rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${entry.arousal * 100}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <span className="text-sm font-mono text-cool">{(entry.arousal * 100).toFixed(0)}%</span>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-card border border-border">
            <p className="text-xs font-mono text-muted-foreground mb-1">Word Count</p>
            <p className="text-2xl font-heading text-foreground">{entry.wordCount}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EntryDetailPage;
