
import { useState } from "react";
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import { StudySession } from "@/types";
import { Calendar, Clock, BarChart4, Search, BookOpen } from "lucide-react";

// Mock data
const studySessions: StudySession[] = [
  {
    id: "1",
    date: new Date(Date.now() - 86400000 * 2),
    duration: 25,
    activityId: "1",
    activityName: "Hiragana Practice",
    wordsReviewed: 42
  },
  {
    id: "2",
    date: new Date(Date.now() - 86400000 * 3),
    duration: 15,
    activityId: "2",
    activityName: "JLPT N5 Vocabulary",
    wordsReviewed: 30
  },
  {
    id: "3",
    date: new Date(Date.now() - 86400000 * 5),
    duration: 20,
    activityId: "3",
    activityName: "Basic Phrases",
    wordsReviewed: 25
  },
  {
    id: "4",
    date: new Date(Date.now() - 86400000 * 7),
    duration: 35,
    activityId: "2",
    activityName: "JLPT N5 Vocabulary",
    wordsReviewed: 50
  },
  {
    id: "5",
    date: new Date(Date.now() - 86400000 * 9),
    duration: 15,
    activityId: "4",
    activityName: "Kanji Fundamentals",
    wordsReviewed: 20
  },
  {
    id: "6",
    date: new Date(Date.now() - 86400000 * 10),
    duration: 30,
    activityId: "1",
    activityName: "Hiragana Practice",
    wordsReviewed: 46
  },
  {
    id: "7",
    date: new Date(Date.now() - 86400000 * 12),
    duration: 25,
    activityId: "5",
    activityName: "Grammar Patterns",
    wordsReviewed: 35
  }
];

// Calculate stats
const totalSessions = studySessions.length;
const totalDuration = studySessions.reduce((acc, session) => acc + session.duration, 0);
const totalWords = studySessions.reduce((acc, session) => acc + session.wordsReviewed, 0);
const avgSessionLength = Math.round(totalDuration / totalSessions);

const Sessions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSessions = studySessions.filter(session => 
    session.activityName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer 
      title="Study Sessions" 
      description="Track your learning activity over time"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-medium text-japanese-grey-dark mb-2">Total Sessions</h3>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-japanese-red/80 mr-3" />
              <span className="text-3xl font-bold text-japanese-dark">{totalSessions}</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-medium text-japanese-grey-dark mb-2">Total Study Time</h3>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-japanese-red/80 mr-3" />
              <span className="text-3xl font-bold text-japanese-dark">{totalDuration} min</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-medium text-japanese-grey-dark mb-2">Words Reviewed</h3>
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-japanese-red/80 mr-3" />
              <span className="text-3xl font-bold text-japanese-dark">{totalWords}</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-card rounded-xl p-5">
            <h3 className="text-sm font-medium text-japanese-grey-dark mb-2">Avg. Session Length</h3>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-japanese-red/80 mr-3" />
              <span className="text-3xl font-bold text-japanese-dark">{avgSessionLength} min</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      <div className="mb-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card rounded-xl p-6"
        >
          <h3 className="text-lg font-semibold text-japanese-dark mb-4">Study Progress</h3>
          <div className="h-64 bg-japanese-grey/30 rounded-lg flex items-center justify-center">
            <BarChart4 className="h-16 w-16 text-japanese-grey-dark" />
            <p className="ml-4 text-japanese-grey-dark">
              Progress chart visualization placeholder
            </p>
          </div>
        </motion.div>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-japanese-dark">Session History</h3>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-japanese-grey-dark h-4 w-4" />
            <input
              type="text"
              placeholder="Search sessions..."
              className="pl-10 pr-4 py-2 rounded-lg border border-japanese-grey/50 focus:outline-none focus:ring-2 focus:ring-japanese-red/30 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-japanese-grey/20 border-b border-japanese-grey/30">
                  <th className="py-3 px-4 text-left text-sm font-medium text-japanese-dark">Date</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-japanese-dark">Activity</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-japanese-dark">Duration</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-japanese-dark">Words Reviewed</th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session, index) => (
                  <motion.tr 
                    key={session.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="border-b border-japanese-grey/20 hover:bg-japanese-grey/10"
                  >
                    <td className="py-3 px-4 text-japanese-dark">
                      {session.date.toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-japanese-red/80 mr-2" />
                        <span className="text-japanese-dark">{session.activityName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center text-japanese-dark">
                        <Clock className="h-4 w-4 text-japanese-grey-dark mr-1" />
                        <span>{session.duration} min</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-japanese-dark">{session.wordsReviewed}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default Sessions;
