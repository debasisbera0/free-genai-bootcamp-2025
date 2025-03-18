import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import CustomButton from "@/components/ui/CustomButton";
import { Word } from "@/types";
import { 
  ArrowLeft, 
  Edit, 
  Trash, 
  Play, 
  Volume, 
  FileText, 
  FolderOpen 
} from "lucide-react";

// Mock data
const words: Record<string, Word> = {
  "1": {
    id: "1",
    japanese: "こんにちは",
    reading: "Konnichiwa",
    meaning: "Hello",
    notes: "Formal greeting used during the day. Literally means 'This day'.",
    dateAdded: new Date(Date.now() - 86400000 * 10),
    groupIds: ["1", "3"]
  },
  "2": {
    id: "2",
    japanese: "ありがとう",
    reading: "Arigatou",
    meaning: "Thank you",
    notes: "Casual form of 'thank you'. For more formal situations, use 'arigatou gozaimasu'.",
    dateAdded: new Date(Date.now() - 86400000 * 8),
    groupIds: ["1"]
  },
  "3": {
    id: "3",
    japanese: "すみません",
    reading: "Sumimasen",
    meaning: "Excuse me / I'm sorry",
    notes: "Can be used both as 'excuse me' to get attention or as an apology",
    dateAdded: new Date(Date.now() - 86400000 * 6),
    groupIds: ["1", "2"]
  }
};

// Mock groups data
const groups = {
  "1": { id: "1", name: "Greetings", description: "Common Japanese greetings" },
  "2": { id: "2", name: "Polite Expressions", description: "Formal and polite expressions" },
  "3": { id: "3", name: "JLPT N5", description: "Vocabulary for JLPT N5 level" },
  "4": { id: "4", name: "Everyday Words", description: "Common words used in daily life" },
  "5": { id: "5", name: "Verbs", description: "Action words in Japanese" }
};

const WordDetail = () => {
  const { id } = useParams<{ id: string }>();
  const word = id ? words[id] : null;
  
  if (!word) {
    return (
      <PageContainer title="Word Not Found">
        <div className="text-center py-10">
          <p className="text-japanese-grey-dark mb-4">
            The word you are looking for could not be found.
          </p>
          <Link to="/words">
            <CustomButton variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Words
            </CustomButton>
          </Link>
        </div>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer title="Word Details">
      <Link to="/words" className="inline-flex items-center text-japanese-grey-dark hover:text-japanese-dark mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        <span>Back to all words</span>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:col-span-2"
        >
          <div className="glass-card rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-japanese-red/80 mr-2" />
                  <h2 className="text-3xl font-jp font-bold text-japanese-dark">{word.japanese}</h2>
                  <button className="ml-2 p-1 rounded-full hover:bg-japanese-grey/20">
                    <Volume className="h-5 w-5 text-japanese-grey-dark" />
                  </button>
                </div>
                <p className="text-japanese-grey-dark">{word.reading}</p>
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
              <h3 className="font-medium text-japanese-dark mb-2">Meaning</h3>
              <p className="text-japanese-dark bg-japanese-grey/20 p-3 rounded-lg">
                {word.meaning}
              </p>
            </div>
            
            {word.notes && (
              <div className="mb-6">
                <h3 className="font-medium text-japanese-dark mb-2">Notes</h3>
                <p className="text-japanese-grey-dark bg-japanese-paper p-3 rounded-lg border border-japanese-grey/30">
                  {word.notes}
                </p>
              </div>
            )}
            
            <div>
              <h3 className="font-medium text-japanese-dark mb-2">Example Sentences</h3>
              <div className="bg-japanese-grey/20 p-3 rounded-lg text-japanese-dark">
                <p className="font-jp mb-1">おはよう、こんにちは！</p>
                <p className="text-sm text-japanese-grey-dark mb-4">Ohayou, konnichiwa! (Good morning, hello!)</p>
                
                <p className="font-jp mb-1">こんにちは、お元気ですか？</p>
                <p className="text-sm text-japanese-grey-dark">Konnichiwa, ogenki desu ka? (Hello, how are you?)</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="glass-card rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-japanese-dark mb-4">Word Groups</h3>
            
            <div className="space-y-3">
              {word.groupIds.map(groupId => {
                const group = groups[groupId];
                return (
                  <Link 
                    key={groupId} 
                    to={`/groups/${groupId}`}
                    className="block p-3 rounded-lg border border-japanese-grey/50 hover:bg-japanese-grey/10"
                  >
                    <div className="flex items-center">
                      <FolderOpen className="h-4 w-4 text-japanese-red/80 mr-2" />
                      <span className="font-medium">{group.name}</span>
                    </div>
                    <p className="text-sm text-japanese-grey-dark mt-1">
                      {group.description}
                    </p>
                  </Link>
                );
              })}
            </div>
            
            <button className="mt-4 w-full py-2 text-sm text-japanese-red border border-dashed border-japanese-red/50 rounded-lg hover:bg-japanese-red/5">
              + Add to another group
            </button>
          </div>
          
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold text-japanese-dark mb-4">Word Info</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-japanese-grey-dark">Added on</span>
                <span>{word.dateAdded.toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-japanese-grey-dark">Last studied</span>
                <span>3 days ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-japanese-grey-dark">Mastery level</span>
                <div className="flex items-center">
                  <div className="bg-japanese-red/20 h-2 w-16 rounded-full overflow-hidden">
                    <div className="bg-japanese-red h-full" style={{ width: "75%" }}></div>
                  </div>
                  <span className="ml-2">75%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <CustomButton className="w-full">
                <Play className="h-4 w-4 mr-2" />
                Practice This Word
              </CustomButton>
            </div>
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default WordDetail;
