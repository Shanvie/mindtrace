import { motion } from "framer-motion";
import { Download, Trash2, Shield, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  return (
    <div className="p-8 max-w-2xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-heading text-foreground mb-1">Settings</h1>
        <p className="text-sm text-muted-foreground mb-8">Manage your data and privacy.</p>

        <div className="space-y-6">
          {/* Export */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Download className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-medium text-foreground">Export Data</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Download all your journal entries, mood scores, and insights as a JSON file.
            </p>
            <Button
              variant="outline"
              onClick={() => toast({ title: "Export started", description: "Your data is being prepared for download." })}
            >
              Export as JSON
            </Button>
          </div>

          {/* Privacy */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="w-4 h-4 text-cool" />
              <h2 className="text-sm font-medium text-foreground">Privacy & Encryption</h2>
            </div>
            <div className="space-y-3 text-xs text-muted-foreground">
              <p>• All journal text is encrypted with AES-256-GCM before storage</p>
              <p>• Raw text is never sent to any AI model — only emotion labels and scores</p>
              <p>• Your encryption key is stored separately from your data</p>
            </div>
          </div>

          {/* Timezone */}
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="flex items-center gap-3 mb-3">
              <Moon className="w-4 h-4 text-warm" />
              <h2 className="text-sm font-medium text-foreground">Timezone</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Current: <span className="font-mono text-foreground/70">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
            </p>
          </div>

          {/* Delete Account */}
          <div className="p-6 rounded-lg bg-card border border-danger/20">
            <div className="flex items-center gap-3 mb-3">
              <Trash2 className="w-4 h-4 text-danger" />
              <h2 className="text-sm font-medium text-danger">Delete Account</h2>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <Button
              variant="destructive"
              onClick={() => toast({ title: "Are you sure?", description: "This action is irreversible.", variant: "destructive" })}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
