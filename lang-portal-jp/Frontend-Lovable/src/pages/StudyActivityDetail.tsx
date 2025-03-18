import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import CustomButton from "@/components/ui/CustomButton";
import { StudyActivity } from "@/types";
import { 
  BookOpen, 
  BookText, 
  Scroll, 
  PencilRuler, 
  Lightbulb,
  ArrowLeft, 
  Clock, 
  Play, 
  Edit, 
  BarChart4,
  ExternalLink
} from "lucide-react";

const studyActivities: Record<string, StudyActivity> = {
  "1": {
    id: "1",
    title: "Hiragana Practice",
    description: "Master the basic Japanese syllabary with interactive exercises. This course covers all 46 basic hiragana characters and their variations with dakuten and handakuten marks. Practice through writing exercises, recognition drills, and reading simple words and sentences.",
    lastStudied: new Date(Date.now() - 86400000 * 2),
    icon: "BookOpen"
  },
  "2": {
    id: "2",
    title: "JLPT N5 Vocabulary",
    description: "Learn essential vocabulary for the JLPT N5 examination. This activity focuses on the approximately 800 words required for the most basic level of Japanese language proficiency. Includes word recognition, usage in context, and memorization exercises.",
    lastStudied: new Date(Date.now() - 86400000 * 4),
    icon: "BookText"
  },
  "3": {
    id: "3",
    title: "Basic Phrases",
    description: "Practice everyday conversational phrases in Japanese. This activity covers greetings, introductions, shopping phrases, restaurant phrases, and travel-related expressions. Learn how to navigate common social situations with confidence.",
    lastStudied: new Date(Date.now() - 86400000 * 7),
    icon: "Scroll"
  },
  "4": {
    id: "4",
    title: "Kanji Fundamentals",
    description: "Learn the most common kanji characters used in everyday Japanese. This activity focuses on the 80 basic kanji that appear frequently in daily life, including numbers, directions, time, and basic concepts.",
    icon: "PencilRuler"
  },
  "5": {
    id: "5",
    title: "Grammar Patterns",
    description: "Study essential Japanese grammar patterns and sentence structures. This activity introduces the building blocks of Japanese grammar, including particles, verb conjugations, and basic sentence patterns.",
    icon: "Lightbulb"
  }
};

const iconMap: Record<string, any> = {
  BookOpen,
  BookText,
  Scroll,
  PencilRuler,
  Lightbulb
};

const wordGroups = [
  { id: "1", name: "Greetings" },
  { id: "2", name: "Polite Expressions" },
  { id: "3", name: "JLPT N5" },
  { id: "4", name: "Everyday Words" },
  { id: "5", name: "Verbs" },
];

const recentSessions = [
  { id: "1", date: new Date(Date.now() - 86400000 * 2), duration: 25, wordsReviewed: 42 },
  { id: "2", date: new Date(Date.now() - 86400000 * 5), duration: 15, wordsReviewed: 30 },
  { id: "3", date: new Date(Date.now() - 86400000 * 9), duration: 20, wordsReviewed: 38 },
];

const StudyActivityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const activity = id ? studyActivities[id] : null;
  
  const handleLaunchActivity = (groupId: string) => {
    window.open(`http://localhost:8081?group_id=${groupId}`, "_blank");
  };
  
  if (!activity) {
    return (
      <PageContainer title="Activity Not Found">
        <div className="text-center py-10">
          <p className="text-japanese-grey-dark mb-4">
            The study activity you are looking for could not be found.
          </p>
          <Link to="/study-activities">
            <CustomButton variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Study Activities
            </CustomButton>
          </Link>
        </div>
      </PageContainer>
    );
  }
  
  const Icon = iconMap[activity.icon] || BookOpen;
  
  return (
    <PageContainer title={activity.title}>
      <Link to="/study-activities" className="inline-flex items-center text-japanese-grey-dark hover:text-japanese-dark mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to all activities</span>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2"
        >
          <div className="glass-card rounded-xl p-6">
            <div className="flex items-center mb-4">
              <div className="h-12 w-12 rounded-full bg-japanese-red/10 flex items-center justify-center text-japanese-red mr-4">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-japanese-dark">{activity.title}</h2>
                {activity.lastStudied && (
                  <p className="text-sm text-japanese-grey-dark">
                    Last studied: {activity.lastStudied.toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
            
            <p className="text-japanese-grey-dark mb-6">{activity.description}</p>
            
            <div className="flex flex-col space-y-4">
              <div>
                <h3 className="font-medium text-japanese-dark mb-2">Select Word Group to Study</h3>
                <div className="flex flex-wrap gap-3">
                  {wordGroups.map(group => (
                    <button
                      key={group.id}
                      onClick={() => handleLaunchActivity(group.id)}
                      className="flex items-center px-4 py-2 bg-japanese-red/10 text-japanese-red rounded-lg hover:bg-japanese-red/20 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      <span>{group.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-4">
                <CustomButton>
                  <Play className="h-4 w-4 mr-2" />
                  Start Study Session
                </CustomButton>
                <CustomButton variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Activity
                </CustomButton>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-6 mt-6"
          >
            <h3 className="text-lg font-semibold text-japanese-dark mb-4">Study Progress</h3>
            <div className="h-64 bg-japanese-grey/30 rounded-lg flex items-center justify-center">
              <BarChart4 className="h-16 w-16 text-japanese-grey-dark" />
              <p className="ml-4 text-japanese-grey-dark">
                Progress chart visualization placeholder
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-japanese-dark mb-4">Recent Sessions</h3>
            
            {recentSessions.length > 0 ? (
              <ul className="space-y-4">
                {recentSessions.map(session => (
                  <li key={session.id} className="p-3 rounded-lg border border-japanese-grey/50 bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{session.date.toLocaleDateString()}</span>
                      <div className="flex items-center text-japanese-grey-dark text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{session.duration} min</span>
                      </div>
                    </div>
                    <p className="text-sm text-japanese-grey-dark">
                      Reviewed {session.wordsReviewed} items
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-japanese-grey-dark text-center py-6">
                No study sessions recorded yet.
              </p>
            )}
            
            <div className="mt-4">
              <Link to="/sessions" className="text-japanese-red text-sm font-medium hover:underline">
                View all sessions
              </Link>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-6 mt-6"
          >
            <h3 className="text-lg font-semibold text-japanese-dark mb-4">Activity Stats</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-japanese-grey-dark">Total sessions</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-japanese-grey-dark">Time studied</span>
                <span className="font-semibold">4.5 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-japanese-grey-dark">Items mastered</span>
                <span className="font-semibold">86</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-japanese-grey-dark">Completion</span>
                <span className="font-semibold">64%</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default StudyActivityDetail;
