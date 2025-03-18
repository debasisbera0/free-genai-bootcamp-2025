
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  FolderOpen, 
  Clock, 
  Settings 
} from "lucide-react";

const navigationItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Study Activities", path: "/study-activities", icon: BookOpen },
  { label: "Words", path: "/words", icon: FileText },
  { label: "Word Groups", path: "/groups", icon: FolderOpen },
  { label: "Sessions", path: "/sessions", icon: Clock },
  { label: "Settings", path: "/settings", icon: Settings },
];

const MainNavigation = () => {
  const location = useLocation();
  
  return (
    <div className="bg-white shadow-sm border-b border-japanese-grey/30 py-2 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <Link to="/dashboard" className="mr-6 flex items-center">
            <span className="text-2xl font-jp font-bold text-japanese-red">日本語</span>
            <span className="text-lg font-medium ml-2 text-japanese-dark">Learn</span>
          </Link>
          
          <nav className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
                
              return (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium flex items-center relative ${
                    isActive 
                      ? 'text-japanese-red' 
                      : 'text-japanese-grey-dark hover:text-japanese-dark hover:bg-japanese-grey/10'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-1.5" />
                  <span>{item.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="navigation-underline"
                      className="absolute bottom-0 left-1 right-1 h-0.5 bg-japanese-red"
                      transition={{ type: "spring", duration: 0.3 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MainNavigation;
