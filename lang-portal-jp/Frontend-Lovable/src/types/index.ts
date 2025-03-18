
export type StudyActivity = {
  id: string;
  title: string;
  description: string;
  lastStudied?: Date;
  icon: string;
};

export type Word = {
  id: string;
  japanese: string;
  reading: string;
  meaning: string;
  notes?: string;
  dateAdded: Date;
  groupIds: string[];
  correctCount?: number;
  incorrectCount?: number;
};

export type WordGroup = {
  id: string;
  name: string;
  description: string;
  wordCount: number;
  dateCreated: Date;
};

export type StudySession = {
  id: string;
  date: Date;
  duration: number; // in minutes
  activityId: string;
  activityName: string;
  wordsReviewed: number;
  groupId?: string;
  groupName?: string;
};

export type UserProgress = {
  wordsLearned: number;
  totalStudyTime: number; // in minutes
  sessionsCompleted: number;
  lastActive: Date;
};
