import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Save, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEntries } from "@/hooks/use-entries";

const mockAnalyze = (text: string) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const score = Math.sin(words * 0.1) * 0.5 + (text.includes("happy") || text.includes("good") ? 0.3 : text.includes("sad") || text.includes("tired") ? -0.3 : 0);
  const clamp = Math.max(-1, Math.min(1, score));
  return {
    moodScore: clamp,
    arousal: Math.min(1, words * 0.005 + 0.2),
    dominantEmotion: clamp > 0.2 ? "joy" : clamp < -0.2 ? "sadness" : "neutral",
    emotions: [
      { label: clamp > 0.2 ? "joy" : clamp < -0.2 ? "sadness" : "neutral", score: 0.55 + Math.random() * 0.2 },
      { label: "fear", score: 0.15 + Math.random() * 0.15 },
      { label: "anger", score: 0.05 + Math.random() * 0.1 },
    ],
    wordCount: words,
  };
};

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

const NewEntryPage = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<ReturnType<typeof mockAnalyze> | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const { toast } = useToast();
  const { addEntry } = useEntries();

  const runAnalysis = useCallback((value: string) => {
    if (value.trim().split(/\s+/).filter(Boolean).length < 5) {
      setAnalysis(null);
      return;
    }
    setAnalyzing(true);
    setTimeout(() => {
      setAnalysis(mockAnalyze(value));
      setAnalyzing(false);
    }, 600);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => runAnalysis(text), 800);
    return () => clearTimeout(timer);
  }, [text, runAnalysis]);

  const handleSave = () => {
    if (!analysis || text.trim().length < 10) {
      toast({ 
        title: "Entry too short", 
        description: "Please write a bit more before saving.",
        variant: "destructive"
      });
      return;
    }

    addEntry({
      preview: text.substring(0, 150) + (text.length > 150 ? "..." : ""),
      moodScore: analysis.moodScore,
      arousal: analysis.arousal,
      dominantEmotion: analysis.dominantEmotion,
      emotions: analysis.emotions,
      wordCount: analysis.wordCount,
      burnoutFlag: analysis.moodScore < -0.4 && analysis.arousal > 0.6,
      crisisFlag: false,
    });

    toast({ title: "Entry saved", description: "Your journal entry has been recorded." });
    navigate("/journal");
  };

  return (
    <div className="h-screen flex">
      {/* Editor - 60% */}
      <motion.div
        className="w-[60%] p-8 flex flex-col"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-heading text-foreground">New Entry</h1>
            <p className="text-xs font-mono text-muted-foreground mt-1">
              {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>
          <Button variant="signal" onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How are you feeling today? Write freely — your words stay private and encrypted..."
          className="flex-1 w-full bg-transparent text-foreground/90 text-base leading-relaxed resize-none focus:outline-none placeholder:text-muted-foreground/40 font-body"
        />

        <div className="mt-4 flex items-center gap-4 text-xs font-mono text-muted-foreground">
          <span>{text.trim().split(/\s+/).filter(Boolean).length} words</span>
          <span>{text.length} chars</span>
        </div>
      </motion.div>

      {/* Analysis Panel - 40% */}
      <motion.div
        className="w-[40%] border-l border-border bg-card/50 p-8 overflow-y-auto"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-medium text-foreground">Live Analysis</h2>
          {analyzing && <Loader2 className="w-3 h-3 animate-spin text-primary ml-auto" />}
        </div>

        {!analysis ? (
          <div className="text-center py-20">
            <p className="text-sm text-muted-foreground">Write at least 5 words to see analysis...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Mood Score */}
            <div className={`p-4 rounded-lg ${moodBg(analysis.moodScore)}`}>
              <p className="text-xs font-mono text-muted-foreground mb-1">Mood Score</p>
              <div className="flex items-end gap-2">
                <span className={`text-4xl font-heading ${moodColor(analysis.moodScore)}`}>
                  {analysis.moodScore > 0 ? "+" : ""}
                  {(analysis.moodScore * 100).toFixed(0)}
                </span>
                <span className="text-xs text-muted-foreground mb-2">/ 100</span>
              </div>
            </div>

            {/* Dominant Emotion */}
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-2">Dominant Emotion</p>
              <span className="text-lg font-heading text-foreground capitalize">{analysis.dominantEmotion}</span>
            </div>

            {/* Emotion Breakdown */}
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-3">Emotion Breakdown</p>
              <div className="space-y-3">
                {analysis.emotions.map((em) => (
                  <div key={em.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-mono capitalize text-foreground/70">{em.label}</span>
                      <span className="text-xs font-mono text-muted-foreground">{(em.score * 100).toFixed(0)}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-primary/60 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${em.score * 100}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arousal */}
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-2">Arousal Level</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-cool rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${analysis.arousal * 100}%` }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <span className="text-xs font-mono text-cool">{(analysis.arousal * 100).toFixed(0)}%</span>
              </div>
            </div>

            {/* Word Count */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs font-mono text-muted-foreground mb-1">Word Count</p>
              <span className="text-lg font-heading text-foreground">{analysis.wordCount}</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NewEntryPage;
