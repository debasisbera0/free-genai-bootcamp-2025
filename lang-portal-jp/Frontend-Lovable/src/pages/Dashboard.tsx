
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { 
  BarChart3, 
  Clock, 
  BookOpenCheck, 
  Pencil,
  Calendar, 
  TrendingUp 
} from "lucide-react";
import { UserProgress } from "@/types";

// Mock data for demonstration
const userProgress: UserProgress = {
  wordsLearned: 428,
  totalStudyTime: 2460,
  sessionsCompleted: 34,
  lastActive: new Date(Date.now() - 86400000)
};

const recentActivities = [
  { id: "1", name: "Hiragana Practice", date: new Date(Date.now() - 86400000 * 2) },
  { id: "2", name: "JLPT N5 Vocabulary", date: new Date(Date.now() - 86400000 * 4) },
  { id: "3", name: "Basic Phrases", date: new Date(Date.now() - 86400000 * 7) }
];

const Dashboard = () => {
  return (
    <PageContainer 
      title="Dashboard" 
      description="Track your Japanese learning progress"
    >
      <div className="mb-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl font-medium mb-4"
        >
          Your Progress
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <DashboardCard title="Words Learned">
              <div className="flex items-center">
                <BookOpenCheck className="h-10 w-10 text-japanese-red/80 mr-3" />
                <div>
                  <p className="text-3xl font-bold text-japanese-dark">
                    {userProgress.wordsLearned}
                  </p>
                  <p className="text-sm text-japanese-grey-dark">vocabulary items</p>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <DashboardCard title="Study Time">
              <div className="flex items-center">
                <Clock className="h-10 w-10 text-japanese-red/80 mr-3" />
                <div>
                  <p className="text-3xl font-bold text-japanese-dark">
                    {Math.floor(userProgress.totalStudyTime / 60)}
                  </p>
                  <p className="text-sm text-japanese-grey-dark">hours of learning</p>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <DashboardCard title="Sessions Completed">
              <div className="flex items-center">
                <Calendar className="h-10 w-10 text-japanese-red/80 mr-3" />
                <div>
                  <p className="text-3xl font-bold text-japanese-dark">
                    {userProgress.sessionsCompleted}
                  </p>
                  <p className="text-sm text-japanese-grey-dark">study sessions</p>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <DashboardCard title="Study Statistics" className="h-full">
            <div className="flex justify-center items-center h-64 bg-japanese-grey/30 rounded-lg">
              <BarChart3 className="h-16 w-16 text-japanese-grey-dark" />
              <p className="ml-4 text-japanese-grey-dark">
                Study statistics visualization placeholder
              </p>
            </div>
          </DashboardCard>
        </motion.div>
        
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <DashboardCard title="Recent Activities">
              <ul className="space-y-3">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-japanese-grey/30 transition-colors">
                    <div className="flex items-center">
                      <Pencil className="h-4 w-4 text-japanese-red/80 mr-2" />
                      <span>{activity.name}</span>
                    </div>
                    <span className="text-sm text-japanese-grey-dark">
                      {activity.date.toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-end">
                <a href="/study-activities" className="text-japanese-red text-sm font-medium hover:underline flex items-center">
                  <span>View all activities</span>
                  <TrendingUp className="ml-1 h-3 w-3" />
                </a>
              </div>
            </DashboardCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <DashboardCard title="Start Learning">
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="/study-activities"
                  className="p-3 rounded-lg border border-japanese-red/20 bg-japanese-red/5 text-japanese-red hover:bg-japanese-red/10 transition-colors flex items-center justify-center"
                >
                  <BookOpenCheck className="h-5 w-5 mr-2" />
                  <span className="font-medium">Study Now</span>
                </a>
                <a 
                  href="/words"
                  className="p-3 rounded-lg border border-japanese-grey-dark/20 bg-japanese-grey/10 text-japanese-grey-dark hover:bg-japanese-grey/20 transition-colors flex items-center justify-center"
                >
                  <Pencil className="h-5 w-5 mr-2" />
                  <span className="font-medium">Add Words</span>
                </a>
              </div>
            </DashboardCard>
          </motion.div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
