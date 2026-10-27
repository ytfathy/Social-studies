export type QuestionCategory = 
  | 'direct' // سؤال وجواب مباشر
  | 'why' // بم تفسر؟
  | 'results' // ما النتائج المترتبة على؟
  | 'compare' // قارن بين
  | 'prove' // دلل على صحة العبارة
  | 'terms' // ما المقصود بالمصطلح؟
  | 'complete' // أكمل العبارات
  | 'mcq' // اختر الإجابة الصحيحة
  | 'true_false' // صح أم خطأ مع التصويب
  | 'map' // أسئلة الخرائط
  | 'critical'; // أسئلة التفكير والاستنتاج

export interface QuestionItem {
  id: string;
  category: QuestionCategory;
  question: string;
  answer: string;
  explanation?: string;
  source: string; // e.g., 'كتاب الوزارة ص 15' or 'تدريب إضافي متقدم'
  isTextbookOriginal: boolean;
  options?: string[]; // for mcq
  correctOptionIndex?: number;
  isCorrect?: boolean; // for true/false
  correction?: string; // for false correction
}

export interface MapPoint {
  id: string;
  name: string;
  arabicName: string;
  type: 'mountain' | 'plateau' | 'river' | 'sea' | 'strait' | 'city' | 'region' | 'mineral' | 'biome';
  coordinates: { x: number; y: number }; // percentage 0-100 on the SVG map
  description: string;
  curriculumNotes: string;
  categoryKey: string;
}

export interface ComparisonRow {
  aspect: string; // وجه المقارنة
  itemA: string;
  itemB: string;
  itemC?: string;
}

export interface ComparisonTable {
  id: string;
  title: string;
  subtitle?: string;
  entityA: string;
  entityB: string;
  entityC?: string;
  similarities?: string[];
  rows: ComparisonRow[];
  summaryNote: string;
}

export interface InfographicNode {
  title: string;
  description: string;
  iconName?: string;
  tag?: string;
  items?: string[];
}

export interface InfographicSection {
  id: string;
  title: string;
  summary: string;
  flowSteps?: { step: number; title: string; detail: string }[];
  categories?: { name: string; items: string[]; badgeColor?: string }[];
  causesAndResults?: { cause: string; effect: string }[];
  keyFiguresOrDates?: { label: string; text: string }[];
  takeaway: string;
}

export interface Flashcard {
  id: string;
  topic: string;
  type: 'term' | 'date' | 'location' | 'cause_result' | 'fact';
  front: string;
  back: string;
  hint?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true_false' | 'fill';
  question: string;
  options?: string[];
  correctAnswer: string | number | boolean;
  explanation: string;
  source: string;
}

export interface LessonContent {
  id: string;
  unitId: string;
  title: string;
  lessonNumber: number;
  pageRange: string;
  heroIntro: string;
  learningObjectives: string[];
  
  // Section A - Detailed Explanation
  explanationSections: {
    heading: string;
    subheading?: string;
    paragraphs: string[];
    bulletPoints?: string[];
    highlightCallout?: {
      title: string;
      content: string;
      type: 'info' | 'enrichment' | 'rule';
    };
  }[];
  keyTerms: { term: string; definition: string }[];
  causesAndEffects: { cause: string; effect: string }[];
  datesAndFigures?: { dateOrName: string; significance: string }[];
  finalSummary: string[];

  // Section B - Interactive Map / Visualizer
  mapData: {
    mapTitle: string;
    mapType: 'eurasia_topography' | 'minerals_energy' | 'near_east_civilizations' | 'ancient_yemen' | 'far_east_trade' | 'islamic_caliphate' | 'eurasia_forests' | 'eurasia_grasslands_deserts' | 'eurasia_water_systems' | 'ancient_greece' | 'ancient_rome';
    points: MapPoint[];
    interactiveQuestions: {
      prompt: string;
      targetPointId: string;
      feedback: string;
    }[];
  };

  // Section C - Comparison Tables
  comparisons: ComparisonTable[];

  // Section D - Infographic Data
  infographic: InfographicSection;

  // Section E - Question & Answer Bank
  questions: QuestionItem[];

  // Section F - Interactive Quiz
  quiz: QuizQuestion[];

  // Section G - Flashcards
  flashcards: Flashcard[];

  // Section H - Quick Revision Sheet
  revisionSheet: {
    coreIdeas: string[];
    keyTerms: string[];
    topExamQuestions: { q: string; a: string; type: string }[];
  };
}

export interface Unit {
  id: string;
  unitNumber: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  learningObjectives: string[];
  lessons: LessonContent[];
  assessment: {
    title: string;
    page: string;
    questions: QuestionItem[];
  };
}

export interface StudentProgress {
  completedLessons: string[]; // lesson ids
  bookmarkedQuestions: string[];
  flashcardReviewList: string[]; // flashcard ids needing review
  flashcardKnownList: string[]; // flashcard ids known
  quizScores: Record<string, { highestScore: number; lastScore: number; attempts: number; total: number }>;
  unitAssessmentScores: Record<string, { highestScore: number; total: number }>;
  finalExamScore?: { score: number; total: number; date: string };
  lastActiveLessonId?: string;
}
