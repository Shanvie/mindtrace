import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Droplet = ({ delay, x, size, duration }: { delay: number; x: number; size: number; duration: number }) => (
  <motion.div
    className="absolute rounded-full"
    style={{
      left: `${x}%`,
      top: -20,
      width: size,
      height: size * 1.6,
      background: `radial-gradient(ellipse at 30% 20%, hsl(var(--primary) / 0.35), hsl(var(--primary) / 0.08))`,
      filter: `blur(${size > 6 ? 1 : 0}px)`,
    }}
    initial={{ y: -20, opacity: 0, scaleY: 1.4 }}
    animate={{
      y: ["0vh", "105vh"],
      opacity: [0, 0.8, 0.8, 0],
      scaleY: [1.4, 1.2, 1.6, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeIn",
    }}
  />
);

const Ripple = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <motion.div
    className="absolute rounded-full border"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      borderColor: `hsl(var(--primary) / 0.15)`,
    }}
    initial={{ width: 0, height: 0, opacity: 0.6, x: "-50%", y: "-50%" }}
    animate={{
      width: [0, 80, 140],
      height: [0, 30, 50],
      opacity: [0.5, 0.2, 0],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeOut",
    }}
  />
);

const droplets = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  delay: Math.random() * 6,
  x: Math.random() * 100,
  size: 3 + Math.random() * 6,
  duration: 3 + Math.random() * 3,
}));

const ripples = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  delay: 1 + Math.random() * 5,
  x: 10 + Math.random() * 80,
  y: 70 + Math.random() * 25,
}));

const Index = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background flex items-center justify-center">
      {/* Water drip layer */}
      <div className="absolute inset-0 pointer-events-none">
        {droplets.map((d) => (
          <Droplet key={d.id} delay={d.delay} x={d.x} size={d.size} duration={d.duration} />
        ))}
        {ripples.map((r) => (
          <Ripple key={r.id} delay={r.delay} x={r.x} y={r.y} />
        ))}
      </div>

      {/* Ambient glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <AnimatePresence>
          {showContent && (
            <>
              {/* Logo icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", damping: 12, stiffness: 100, delay: 0 }}
                className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_40px_hsl(var(--primary)/0.4)]"
              >
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </motion.div>

              {/* Title */}
              <motion.h1
                className="font-heading text-6xl md:text-8xl tracking-tight text-foreground"
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Mind
                <span className="text-primary">Trace</span>
              </motion.h1>

              {/* Tagline */}
              <motion.p
                className="text-muted-foreground font-mono text-sm tracking-widest uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Your AI Mental Health Journal
              </motion.p>

              {/* Buttons */}
              <motion.div
                className="flex gap-4 mt-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                <Button
                  variant="signal"
                  size="lg"
                  className="text-base px-8"
                  onClick={() => navigate("/journal/new")}
                >
                  Start Writing
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8"
                  onClick={() => navigate("/journal")}
                >
                  Login
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;

