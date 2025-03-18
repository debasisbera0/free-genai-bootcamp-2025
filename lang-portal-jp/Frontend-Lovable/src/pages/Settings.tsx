
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import PageContainer from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Moon, Sun, RefreshCw, AlertTriangle } from "lucide-react";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetConfirmText, setResetConfirmText] = useState("");
  
  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    toast.success(`${!isDarkMode ? "Dark" : "Light"} mode enabled`);
    
    // Here we would add actual dark mode implementation
    // document.documentElement.classList.toggle("dark");
  };
  
  const handleResetConfirm = () => {
    if (resetConfirmText.toLowerCase() === "reset me") {
      // Reset database logic would go here
      toast.success("Application data has been reset successfully");
      setIsResetDialogOpen(false);
      setResetConfirmText("");
    } else {
      toast.error("Please type 'reset me' to confirm");
    }
  };
  
  return (
    <PageContainer title="Settings" description="Customize your application preferences">
      <div className="max-w-3xl space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-japanese-dark mb-4">Appearance</h2>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-japanese-grey-dark">
                Switch between light and dark theme
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-japanese-grey-dark" />
              <Switch 
                id="dark-mode" 
                checked={isDarkMode} 
                onCheckedChange={handleDarkModeToggle} 
              />
              <Moon className="h-4 w-4 text-japanese-grey-dark" />
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-xl p-6"
        >
          <h2 className="text-xl font-semibold text-japanese-dark mb-4">Data Management</h2>
          
          <div className="space-y-4">
            <div className="space-y-1">
              <Label className="text-japanese-dark">Reset Application Data</Label>
              <p className="text-sm text-japanese-grey-dark">
                This will delete all your study progress, words, and sessions.
                This action cannot be undone.
              </p>
            </div>
            
            <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center text-destructive">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Reset Application Data
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. All your study progress, words,
                    groups, and sessions will be permanently deleted.
                    <div className="mt-4 mb-2">
                      <p className="font-medium mb-2">Type "reset me" to confirm:</p>
                      <Input 
                        value={resetConfirmText}
                        onChange={(e) => setResetConfirmText(e.target.value)}
                        placeholder="reset me"
                      />
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={handleResetConfirm}
                  >
                    Reset All Data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Settings;
