
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const routes: Record<string, string> = {
  "dashboard": "Dashboard",
  "words": "Words",
  "groups": "Word Groups",
  "study-activities": "Study Activities",
  "sessions": "Sessions",
  "settings": "Settings"
};

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  
  if (pathSegments.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center text-sm text-japanese-grey-dark py-2 px-6 bg-japanese-grey/10">
      <Link to="/dashboard" className="flex items-center hover:text-japanese-dark">
        <Home className="h-3 w-3 mr-1" />
        <span>Home</span>
      </Link>
      
      {pathSegments.map((segment, index) => {
        // Build the URL up to this segment
        const url = `/${pathSegments.slice(0, index + 1).join("/")}`;
        const isLast = index === pathSegments.length - 1;
        const isId = segment.length > 20 || !isNaN(Number(segment));
        
        // For ID segments or non-mapped segments, we'll handle differently
        const name = isId 
          ? "Details" 
          : (routes[segment] || segment.charAt(0).toUpperCase() + segment.slice(1));
          
        return (
          <div key={segment} className="flex items-center">
            <ChevronRight className="h-3 w-3 mx-1" />
            {isLast ? (
              <span className="font-medium text-japanese-dark">{name}</span>
            ) : (
              <Link to={url} className="hover:text-japanese-dark">
                {name}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Breadcrumbs;
