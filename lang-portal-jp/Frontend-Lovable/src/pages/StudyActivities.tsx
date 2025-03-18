
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import CustomButton from "@/components/ui/CustomButton";
import { StudyActivity } from "@/types";
import { Plus, Search, BookOpen, BookText, Scroll, PencilRuler, Lightbulb } from "lucide-react";

// Mock data
const studyActivities: StudyActivity[] = [
  {
    id: "1",
    title: "Hiragana Practice",
    description: "Master the basic Japanese syllabary with interactive exercises",
    lastStudied: new Date(Date.now() - 86400000 * 2),
    icon: "BookOpen"
  },
  {
    id: "2",
    title: "JLPT N5 Vocabulary",
    description: "Learn essential vocabulary for the JLPT N5 examination",
    lastStudied: new Date(Date.now() - 86400000 * 4),
    icon: "BookText"
  },
  {
    id: "3",
    title: "Basic Phrases",
    description: "Practice everyday conversational phrases in Japanese",
    lastStudied: new Date(Date.now() - 86400000 * 7),
    icon: "Scroll"
  },
  {
    id: "4",
    title: "Kanji Fundamentals",
    description: "Learn the most common kanji characters used in everyday Japanese",
    icon: "PencilRuler"
  },
  {
    id: "5",
    title: "Grammar Patterns",
    description: "Study essential Japanese grammar patterns and sentence structures",
    icon: "Lightbulb"
  }
];

const iconMap: Record<string, any> = {
  BookOpen,
  BookText,
  Scroll,
  PencilRuler,
  Lightbulb
};

const StudyActivities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredActivities = studyActivities.filter(activity => 
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer 
      title="Study Activities" 
      description="Choose an activity to practice your Japanese"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-japanese-grey-dark h-4 w-4" />
          <input
            type="text"
            placeholder="Search activities..."
            className="pl-10 pr-4 py-2 rounded-lg border border-japanese-grey/50 focus:outline-none focus:ring-2 focus:ring-japanese-red/30 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <CustomButton>
          <Plus className="h-4 w-4 mr-1" />
          New Activity
        </CustomButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((activity, index) => {
          const Icon = iconMap[activity.icon] || BookOpen;
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/study-activities/${activity.id}`}>
                <div className="glass-card rounded-xl p-5 h-full cursor-pointer hover:shadow-md transition-all duration-300">
                  <div className="flex items-center mb-3">
                    <div className="h-10 w-10 rounded-full bg-japanese-red/10 flex items-center justify-center text-japanese-red mr-3">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-japanese-dark">{activity.title}</h3>
                  </div>
                  
                  <p className="text-japanese-grey-dark text-sm mb-4">{activity.description}</p>
                  
                  {activity.lastStudied && (
                    <div className="text-xs text-japanese-grey-dark mt-2">
                      Last studied: {activity.lastStudied.toLocaleDateString()}
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default StudyActivities;
