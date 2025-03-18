
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import CustomButton from "@/components/ui/CustomButton";
import { WordGroup } from "@/types";
import { Plus, Search, FolderOpen, FileText } from "lucide-react";

// Mock data
const wordGroups: WordGroup[] = [
  {
    id: "1",
    name: "Greetings",
    description: "Common Japanese greetings and expressions",
    wordCount: 15,
    dateCreated: new Date(Date.now() - 86400000 * 30)
  },
  {
    id: "2",
    name: "Polite Expressions",
    description: "Formal and polite expressions for business and formal situations",
    wordCount: 25,
    dateCreated: new Date(Date.now() - 86400000 * 25)
  },
  {
    id: "3",
    name: "JLPT N5",
    description: "Vocabulary for JLPT N5 level examination",
    wordCount: 100,
    dateCreated: new Date(Date.now() - 86400000 * 20)
  },
  {
    id: "4",
    name: "Everyday Words",
    description: "Common words used in daily life and conversations",
    wordCount: 50,
    dateCreated: new Date(Date.now() - 86400000 * 15)
  },
  {
    id: "5",
    name: "Verbs",
    description: "Action words in Japanese with conjugation patterns",
    wordCount: 40,
    dateCreated: new Date(Date.now() - 86400000 * 10)
  },
  {
    id: "6",
    name: "Food and Dining",
    description: "Vocabulary related to food, cooking, and restaurants",
    wordCount: 35,
    dateCreated: new Date(Date.now() - 86400000 * 5)
  }
];

const Groups = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredGroups = wordGroups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer 
      title="Word Groups" 
      description="Organize your vocabulary into meaningful collections"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-japanese-grey-dark h-4 w-4" />
          <input
            type="text"
            placeholder="Search groups..."
            className="pl-10 pr-4 py-2 rounded-lg border border-japanese-grey/50 focus:outline-none focus:ring-2 focus:ring-japanese-red/30 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <CustomButton>
          <Plus className="h-4 w-4 mr-1" />
          New Group
        </CustomButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/groups/${group.id}`}>
              <div className="glass-card rounded-xl p-5 h-full cursor-pointer hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-japanese-red/10 flex items-center justify-center text-japanese-red mr-3">
                    <FolderOpen className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-japanese-dark">{group.name}</h3>
                </div>
                
                <p className="text-japanese-grey-dark text-sm mb-4">{group.description}</p>
                
                <div className="flex justify-between items-center text-sm text-japanese-grey-dark">
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>{group.wordCount} words</span>
                  </div>
                  <span>Created: {group.dateCreated.toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
};

export default Groups;
