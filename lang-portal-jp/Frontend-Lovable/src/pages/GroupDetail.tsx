
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import CustomButton from "@/components/ui/CustomButton";
import { WordGroup, Word } from "@/types";
import { 
  ArrowLeft, 
  Edit, 
  Trash, 
  Plus, 
  FileText, 
  Download, 
  FolderOpen, 
  Search,
  SortAsc
} from "lucide-react";

// Mock group data
const wordGroups: Record<string, WordGroup> = {
  "1": {
    id: "1",
    name: "Greetings",
    description: "Common Japanese greetings and expressions used in everyday conversations. This group covers both formal and informal greetings for different times of day and social contexts.",
    wordCount: 15,
    dateCreated: new Date(Date.now() - 86400000 * 30)
  },
  "2": {
    id: "2",
    name: "Polite Expressions",
    description: "Formal and polite expressions for business and formal situations",
    wordCount: 25,
    dateCreated: new Date(Date.now() - 86400000 * 25)
  },
  "3": {
    id: "3",
    name: "JLPT N5",
    description: "Vocabulary for JLPT N5 level examination",
    wordCount: 100,
    dateCreated: new Date(Date.now() - 86400000 * 20)
  }
};

// Mock words data for the group
const groupWords: Record<string, Word[]> = {
  "1": [
    {
      id: "1",
      japanese: "こんにちは",
      reading: "Konnichiwa",
      meaning: "Hello",
      dateAdded: new Date(Date.now() - 86400000 * 10),
      groupIds: ["1", "3"]
    },
    {
      id: "2",
      japanese: "ありがとう",
      reading: "Arigatou",
      meaning: "Thank you",
      dateAdded: new Date(Date.now() - 86400000 * 8),
      groupIds: ["1"]
    },
    {
      id: "3",
      japanese: "すみません",
      reading: "Sumimasen",
      meaning: "Excuse me / I'm sorry",
      dateAdded: new Date(Date.now() - 86400000 * 6),
      groupIds: ["1", "2"]
    },
    {
      id: "4",
      japanese: "おはよう",
      reading: "Ohayou",
      meaning: "Good morning",
      dateAdded: new Date(Date.now() - 86400000 * 5),
      groupIds: ["1"]
    },
    {
      id: "5",
      japanese: "さようなら",
      reading: "Sayounara",
      meaning: "Goodbye",
      dateAdded: new Date(Date.now() - 86400000 * 4),
      groupIds: ["1"]
    }
  ],
  "2": [],
  "3": []
};

const GroupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const group = id ? wordGroups[id] : null;
  const words = id ? groupWords[id] : [];
  
  if (!group) {
    return (
      <PageContainer title="Group Not Found">
        <div className="text-center py-10">
          <p className="text-japanese-grey-dark mb-4">
            The word group you are looking for could not be found.
          </p>
          <Link to="/groups">
            <CustomButton variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Word Groups
            </CustomButton>
          </Link>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer title={group.name}>
      <Link to="/groups" className="inline-flex items-center text-japanese-grey-dark hover:text-japanese-dark mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to all groups</span>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2"
        >
          <div className="glass-card rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <FolderOpen className="h-5 w-5 text-japanese-red/80 mr-2" />
                  <h2 className="text-2xl font-bold text-japanese-dark">{group.name}</h2>
                </div>
                <p className="text-sm text-japanese-grey-dark">
                  Created: {group.dateCreated.toLocaleDateString()} · {group.wordCount} words
                </p>
              </div>
              
              <div className="flex space-x-2">
                <CustomButton variant="outline" size="sm">
                  <Edit className="h-3.5 w-3.5 mr-1" />
                  Edit
                </CustomButton>
                <CustomButton variant="outline" size="sm">
                  <Trash className="h-3.5 w-3.5 mr-1" />
                  Delete
                </CustomButton>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium text-japanese-dark mb-2">Description</h3>
              <p className="text-japanese-grey-dark bg-japanese-grey/20 p-3 rounded-lg">
                {group.description}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <CustomButton>
                <Plus className="h-4 w-4 mr-1" />
                Add Words
              </CustomButton>
              <CustomButton variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Export Words
              </CustomButton>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-japanese-dark">Words in this Group</h3>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-japanese-grey-dark h-3 w-3" />
                  <input
                    type="text"
                    placeholder="Filter..."
                    className="pl-7 pr-2 py-1 text-sm rounded-md border border-japanese-grey/50 focus:outline-none focus:ring-1 focus:ring-japanese-red/30 bg-white w-40"
                  />
                </div>
                <button className="flex items-center p-1 text-sm text-japanese-grey-dark hover:text-japanese-dark">
                  <SortAsc className="h-3 w-3 mr-1" />
                  <span>Sort</span>
                </button>
              </div>
            </div>
            
            <div className="glass-card rounded-xl overflow-hidden">
              {words.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-japanese-grey/20 border-b border-japanese-grey/30">
                        <th className="py-3 px-4 text-left text-sm font-medium text-japanese-dark">Japanese</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-japanese-dark">Reading</th>
                        <th className="py-3 px-4 text-left text-sm font-medium text-japanese-dark">Meaning</th>
                      </tr>
                    </thead>
                    <tbody>
                      {words.map((word, index) => (
                        <motion.tr 
                          key={word.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className="border-b border-japanese-grey/20 hover:bg-japanese-grey/10"
                        >
                          <td className="py-3 px-4">
                            <Link to={`/words/${word.id}`} className="flex items-center">
                              <FileText className="h-4 w-4 text-japanese-red/80 mr-2" />
                              <span className="font-jp text-lg">{word.japanese}</span>
                            </Link>
                          </td>
                          <td className="py-3 px-4 text-japanese-dark">{word.reading}</td>
                          <td className="py-3 px-4 text-japanese-dark">{word.meaning}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-8 text-center text-japanese-grey-dark">
                  <p>No words in this group yet.</p>
                  <button className="mt-2 text-japanese-red text-sm hover:underline">
                    Add your first word
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass-card rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-japanese-dark mb-4">Group Stats</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-japanese-grey-dark">Total words</span>
                <span className="font-semibold">{group.wordCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-japanese-grey-dark">Mastered</span>
                <span className="font-semibold">8 (53%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-japanese-grey-dark">In progress</span>
                <span className="font-semibold">5 (33%)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-japanese-grey-dark">Not started</span>
                <span className="font-semibold">2 (13%)</span>
              </div>
            </div>
            
            <div className="mt-4 bg-japanese-grey/20 rounded-full h-2 overflow-hidden">
              <div className="flex h-full">
                <div className="bg-green-500 h-full" style={{ width: "53%" }}></div>
                <div className="bg-yellow-500 h-full" style={{ width: "33%" }}></div>
                <div className="bg-japanese-grey-dark h-full" style={{ width: "13%" }}></div>
              </div>
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-6"
          >
            <h3 className="text-lg font-semibold text-japanese-dark mb-4">Study Options</h3>
            
            <div className="space-y-3">
              <button className="w-full p-3 rounded-lg border border-japanese-red/20 bg-japanese-red/5 text-japanese-red hover:bg-japanese-red/10 transition-colors flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2" />
                <span>Flashcard Review</span>
              </button>
              
              <button className="w-full p-3 rounded-lg border border-japanese-grey-dark/20 bg-japanese-grey/10 text-japanese-grey-dark hover:bg-japanese-grey/20 transition-colors flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2" />
                <span>Meaning Quiz</span>
              </button>
              
              <button className="w-full p-3 rounded-lg border border-japanese-grey-dark/20 bg-japanese-grey/10 text-japanese-grey-dark hover:bg-japanese-grey/20 transition-colors flex items-center justify-center">
                <FileText className="h-4 w-4 mr-2" />
                <span>Reading Practice</span>
              </button>
            </div>
            
            <div className="mt-6 pt-4 border-t border-japanese-grey/30">
              <h4 className="font-medium text-japanese-dark mb-2">Related Groups</h4>
              
              <div className="space-y-2">
                <Link 
                  to="/groups/3" 
                  className="block p-2 rounded-lg hover:bg-japanese-grey/20 text-japanese-grey-dark"
                >
                  <div className="flex items-center">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    <span>JLPT N5</span>
                  </div>
                </Link>
                <Link 
                  to="/groups/2" 
                  className="block p-2 rounded-lg hover:bg-japanese-grey/20 text-japanese-grey-dark"
                >
                  <div className="flex items-center">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    <span>Polite Expressions</span>
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default GroupDetail;
