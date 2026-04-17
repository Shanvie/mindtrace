export interface JournalEntry {
  id: string;
  date: string;
  preview: string;
  moodScore: number; // -1 to 1
  arousal: number; // 0 to 1
  dominantEmotion: string;
  emotions: { label: string; score: number }[];
  wordCount: number;
  burnoutFlag: boolean;
  crisisFlag: boolean;
}

export const mockEntries: JournalEntry[] = [
  {
    id: "1",
    date: "2025-04-04",
    preview: "Today felt lighter than usual. Had a productive morning meeting and actually enjoyed the walk home...",
    moodScore: 0.72,
    arousal: 0.45,
    dominantEmotion: "joy",
    emotions: [
      { label: "joy", score: 0.68 },
      { label: "optimism", score: 0.22 },
      { label: "neutral", score: 0.1 },
    ],
    wordCount: 342,
    burnoutFlag: false,
    crisisFlag: false,
  },
  {
    id: "2",
    date: "2025-04-03",
    preview: "Struggled to focus all day. The deadline pressure is mounting and I can feel the tension in my shoulders...",
    moodScore: -0.35,
    arousal: 0.71,
    dominantEmotion: "fear",
    emotions: [
      { label: "fear", score: 0.45 },
      { label: "anger", score: 0.32 },
      { label: "sadness", score: 0.23 },
    ],
    wordCount: 528,
    burnoutFlag: true,
    crisisFlag: false,
  },
  {
    id: "3",
    date: "2025-04-02",
    preview: "A quiet day. Nothing remarkable happened, but nothing bad either. Sometimes stillness is enough...",
    moodScore: 0.05,
    arousal: 0.2,
    dominantEmotion: "neutral",
    emotions: [
      { label: "neutral", score: 0.65 },
      { label: "sadness", score: 0.2 },
      { label: "joy", score: 0.15 },
    ],
    wordCount: 187,
    burnoutFlag: false,
    crisisFlag: false,
  },
  {
    id: "4",
    date: "2025-04-01",
    preview: "Feeling really drained after the weekend. Didn't sleep well and the mornings are getting harder...",
    moodScore: -0.58,
    arousal: 0.3,
    dominantEmotion: "sadness",
    emotions: [
      { label: "sadness", score: 0.55 },
      { label: "fear", score: 0.25 },
      { label: "neutral", score: 0.2 },
    ],
    wordCount: 412,
    burnoutFlag: true,
    crisisFlag: false,
  },
  {
    id: "5",
    date: "2025-03-31",
    preview: "Great conversation with an old friend today. Reminded me why connection matters so much...",
    moodScore: 0.85,
    arousal: 0.6,
    dominantEmotion: "joy",
    emotions: [
      { label: "joy", score: 0.75 },
      { label: "optimism", score: 0.15 },
      { label: "surprise", score: 0.1 },
    ],
    wordCount: 290,
    burnoutFlag: false,
    crisisFlag: false,
  },
  {
    id: "6",
    date: "2025-03-30",
    preview: "Work keeps piling up. I don't know how much longer I can keep this pace. Everything feels heavy...",
    moodScore: -0.72,
    arousal: 0.55,
    dominantEmotion: "anger",
    emotions: [
      { label: "anger", score: 0.48 },
      { label: "sadness", score: 0.32 },
      { label: "disgust", score: 0.2 },
    ],
    wordCount: 615,
    burnoutFlag: true,
    crisisFlag: false,
  },
];

export const weeklyMoodData = [
  { day: "Mon", mood: 0.72, entries: 1 },
  { day: "Tue", mood: 0.05, entries: 1 },
  { day: "Wed", mood: -0.35, entries: 1 },
  { day: "Thu", mood: 0.42, entries: 2 },
  { day: "Fri", mood: -0.58, entries: 1 },
  { day: "Sat", mood: 0.85, entries: 1 },
  { day: "Sun", mood: -0.12, entries: 0 },
];

export const monthlyMoodData = Array.from({ length: 30 }, (_, i) => ({
  date: `Mar ${i + 1}`,
  mood: Math.sin(i * 0.4) * 0.5 + Math.random() * 0.4 - 0.2,
}));

export const heatmapData = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  mood: Math.random() * 2 - 1,
  hasEntry: Math.random() > 0.25,
}));

export const emotionDistribution = [
  { name: "Joy", value: 28, fill: "hsl(var(--warm))" },
  { name: "Sadness", value: 22, fill: "hsl(var(--cool))" },
  { name: "Fear", value: 18, fill: "hsl(var(--danger))" },
  { name: "Anger", value: 12, fill: "hsl(210, 10%, 50%)" },
  { name: "Neutral", value: 15, fill: "hsl(var(--muted-foreground))" },
  { name: "Surprise", value: 5, fill: "hsl(var(--primary))" },
];

export const recurringThemes = [
  { theme: "Work pressure", count: 14, trend: "up" as const },
  { theme: "Sleep quality", count: 11, trend: "down" as const },
  { theme: "Social connection", count: 9, trend: "up" as const },
  { theme: "Physical health", count: 7, trend: "stable" as const },
  { theme: "Creative expression", count: 5, trend: "up" as const },
];

export const peakWindows = [
  { window: "Morning (6–9am)", avgMood: 0.35, entries: 18 },
  { window: "Midday (11am–1pm)", avgMood: 0.12, entries: 8 },
  { window: "Afternoon (2–5pm)", avgMood: -0.22, entries: 12 },
  { window: "Evening (7–10pm)", avgMood: 0.45, entries: 22 },
  { window: "Night (10pm+)", avgMood: -0.38, entries: 6 },
];
