import { NavLink, useLocation } from "react-router-dom";
import { BookOpen, PenLine, BarChart3, Brain, Settings, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/journal", icon: BookOpen, label: "Journal" },
  { to: "/journal/new", icon: PenLine, label: "New Entry" },
  { to: "/insights", icon: BarChart3, label: "Insights" },
  { to: "/patterns", icon: Brain, label: "Patterns" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col z-40">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-heading text-xl text-foreground tracking-tight">MindTrace</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.to === "/journal/new"
              ? location.pathname === "/journal/new"
              : item.to === "/journal"
                ? location.pathname === "/journal" || (location.pathname.startsWith("/journal/") && location.pathname !== "/journal/new")
                : location.pathname.startsWith(item.to);

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-lg bg-secondary/50 border border-border">
        <p className="text-xs text-muted-foreground font-mono">Burnout Risk</p>
        <div className="mt-2 flex items-end gap-1">
          <span className="text-2xl font-heading text-warm">42</span>
          <span className="text-xs text-muted-foreground mb-1">/100</span>
        </div>
        <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-warm rounded-full" style={{ width: "42%" }} />
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
