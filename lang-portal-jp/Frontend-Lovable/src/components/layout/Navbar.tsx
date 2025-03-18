
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  FolderOpen, 
  Clock, 
  Settings 
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Study Activities", path: "/study-activities", icon: BookOpen },
  { name: "Words", path: "/words", icon: FileText },
  { name: "Word Groups", path: "/groups", icon: FolderOpen },
  { name: "Sessions", path: "/sessions", icon: Clock },
  { name: "Settings", path: "/settings", icon: Settings },
];

const Navbar = () => {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-japanese-grey/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <span className="text-japanese-red font-bold text-2xl mr-1">日本語</span>
              <span className="text-japanese-dark font-medium">Journey</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "text-japanese-red bg-japanese-red/5" 
                      : "text-japanese-grey-dark hover:text-japanese-dark hover:bg-japanese-grey/50"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 mr-1.5 transition-all",
                    isActive ? "text-japanese-red" : "text-japanese-grey-dark"
                  )} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
