import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "@/pages/Index";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import JournalPage from "@/pages/JournalPage";
import NewEntryPage from "@/pages/NewEntryPage";
import EntryDetailPage from "@/pages/EntryDetailPage";
import InsightsPage from "@/pages/InsightsPage";
import PatternsPage from "@/pages/PatternsPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<AppLayout />}>
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/journal/new" element={<NewEntryPage />} />
            <Route path="/journal/:id" element={<EntryDetailPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/patterns" element={<PatternsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
