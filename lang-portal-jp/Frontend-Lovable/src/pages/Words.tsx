import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import CustomButton from "@/components/ui/CustomButton";
import PaginationControls from "@/components/ui/PaginationControls";
import { Word } from "@/types";
import { Plus, Search, FileText, Filter, SortAsc, SortDesc, Volume } from "lucide-react";

// Mock data
const wordsData: Word[] = [
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
    notes: "Can be used both as 'excuse me' to get attention or as an apology",
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
  },
  {
    id: "6",
    japanese: "水",
    reading: "Mizu",
    meaning: "Water",
    dateAdded: new Date(Date.now() - 86400000 * 3),
    groupIds: ["4"]
  },
  {
    id: "7",
    japanese: "猫",
    reading: "Neko",
    meaning: "Cat",
    dateAdded: new Date(Date.now() - 86400000 * 2),
    groupIds: ["4"]
  },
  {
    id: "8",
    japanese: "食べる",
    reading: "Taberu",
    meaning: "To eat",
    dateAdded: new Date(Date.now() - 86400000),
    groupIds: ["4", "5"]
  }
];

// Add more mock data to test pagination
for (let i = 9; i < 60; i++) {
  wordsData.push({
    id: `${i}`,
    japanese: `単語${i}`,
    reading: `Tango${i}`,
    meaning: `Word ${i}`,
    dateAdded: new Date(Date.now() - 86400000 * i),
    groupIds: [i % 3 === 0 ? "1" : i % 3 === 1 ? "2" : "3"]
  });
}

type SortField = "japanese" | "reading" | "meaning" | "dateAdded";
type SortOrder = "asc" | "desc";

const Words = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("dateAdded");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  
  const filteredWords = useMemo(() => {
    return wordsData
      .filter(word => 
        word.japanese.includes(searchQuery) ||
        word.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        word.meaning.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        const fieldA = a[sortField];
        const fieldB = b[sortField];
        
        if (fieldA instanceof Date && fieldB instanceof Date) {
          return sortOrder === "asc" 
            ? fieldA.getTime() - fieldB.getTime() 
            : fieldB.getTime() - fieldA.getTime();
        }
        
        if (typeof fieldA === "string" && typeof fieldB === "string") {
          return sortOrder === "asc"
            ? fieldA.localeCompare(fieldB)
            : fieldB.localeCompare(fieldA);
        }
        
        return 0;
      });
  }, [searchQuery, sortField, sortOrder]);
  
  const paginatedWords = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredWords.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredWords, currentPage]);
  
  const totalPages = Math.ceil(filteredWords.length / itemsPerPage);

  return (
    <PageContainer 
      title="Words" 
      description="Browse and manage your Japanese vocabulary"
    >
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-japanese-grey-dark h-4 w-4" />
          <input
            type="text"
            placeholder="Search words..."
            className="pl-10 pr-4 py-2 rounded-lg border border-japanese-grey/50 focus:outline-none focus:ring-2 focus:ring-japanese-red/30 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-3">
          <button className="flex items-center px-3 py-2 rounded-lg border border-japanese-grey/50 text-japanese-grey-dark hover:bg-japanese-grey/10">
            <Filter className="h-4 w-4 mr-1" />
            <span>Filter</span>
          </button>
          
          <CustomButton>
            <Plus className="h-4 w-4 mr-1" />
            Add Word
          </CustomButton>
        </div>
      </div>
      
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-japanese-grey/20 border-b border-japanese-grey/30">
                <th 
                  className="py-3 px-4 text-left text-sm font-medium text-japanese-dark cursor-pointer hover:bg-japanese-grey/30"
                  onClick={() => handleSort("japanese")}
                >
                  <div className="flex items-center">
                    Japanese
                    {sortField === "japanese" && (
                      sortOrder === "asc" ? <SortAsc className="h-3 w-3 ml-1" /> : <SortDesc className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left text-sm font-medium text-japanese-dark cursor-pointer hover:bg-japanese-grey/30"
                  onClick={() => handleSort("reading")}
                >
                  <div className="flex items-center">
                    Reading
                    {sortField === "reading" && (
                      sortOrder === "asc" ? <SortAsc className="h-3 w-3 ml-1" /> : <SortDesc className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left text-sm font-medium text-japanese-dark cursor-pointer hover:bg-japanese-grey/30"
                  onClick={() => handleSort("meaning")}
                >
                  <div className="flex items-center">
                    Meaning
                    {sortField === "meaning" && (
                      sortOrder === "asc" ? <SortAsc className="h-3 w-3 ml-1" /> : <SortDesc className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-left text-sm font-medium text-japanese-dark cursor-pointer hover:bg-japanese-grey/30"
                  onClick={() => handleSort("dateAdded")}
                >
                  <div className="flex items-center">
                    Date Added
                    {sortField === "dateAdded" && (
                      sortOrder === "asc" ? <SortAsc className="h-3 w-3 ml-1" /> : <SortDesc className="h-3 w-3 ml-1" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-japanese-dark">Groups</th>
              </tr>
            </thead>
            <tbody>
              {paginatedWords.map((word, index) => (
                <motion.tr 
                  key={word.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-japanese-grey/20 hover:bg-japanese-grey/10"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Link to={`/words/${word.id}`} className="flex items-center">
                        <FileText className="h-4 w-4 text-japanese-red/80 mr-2" />
                        <span className="font-jp text-lg">{word.japanese}</span>
                      </Link>
                      <button className="ml-2 p-1 rounded-full hover:bg-japanese-grey/20">
                        <Volume className="h-4 w-4 text-japanese-grey-dark" />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-japanese-dark">{word.reading}</td>
                  <td className="py-3 px-4 text-japanese-dark">{word.meaning}</td>
                  <td className="py-3 px-4 text-sm text-japanese-grey-dark">
                    {word.dateAdded.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    {word.groupIds.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {word.groupIds.map(groupId => (
                          <span 
                            key={groupId} 
                            className="inline-block px-2 py-1 text-xs rounded-full bg-japanese-grey/20 text-japanese-grey-dark"
                          >
                            Group {groupId}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-japanese-grey-dark text-sm">None</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <PaginationControls 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </PageContainer>
  );
};

export default Words;
