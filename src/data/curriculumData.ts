import { Unit, LessonContent, QuestionItem, Flashcard, ComparisonTable } from '../types/curriculum';
import { unit1Data } from './units/unit1Data';
import { unit2Data } from './units/unit2Data';
import { unit3Data } from './units/unit3Data';
import { unit4Data } from './units/unit4Data';

export const allUnits: Unit[] = [
  unit1Data,
  unit2Data,
  unit3Data,
  unit4Data
];

export const allLessons: LessonContent[] = allUnits.flatMap(u => u.lessons);

export function getUnitById(unitId: string): Unit | undefined {
  return allUnits.find(u => u.id === unitId);
}

export function getLessonById(lessonId: string): LessonContent | undefined {
  return allLessons.find(l => l.id === lessonId);
}

export function getUnitByLessonId(lessonId: string): Unit | undefined {
  return allUnits.find(u => u.lessons.some(l => l.id === lessonId));
}

export function getAllComparisons(): { lessonTitle: string; unitTitle: string; table: ComparisonTable }[] {
  const result: { lessonTitle: string; unitTitle: string; table: ComparisonTable }[] = [];
  allUnits.forEach(u => {
    u.lessons.forEach(l => {
      l.comparisons.forEach(c => {
        result.push({
          lessonTitle: l.title,
          unitTitle: u.title,
          table: c
        });
      });
    });
  });
  return result;
}

export function getAllFlashcards(): { flashcard: Flashcard; lessonId: string; lessonTitle: string; unitTitle: string }[] {
  const result: { flashcard: Flashcard; lessonId: string; lessonTitle: string; unitTitle: string }[] = [];
  allUnits.forEach(u => {
    u.lessons.forEach(l => {
      l.flashcards.forEach(fc => {
        result.push({
          flashcard: fc,
          lessonId: l.id,
          lessonTitle: l.title,
          unitTitle: u.title
        });
      });
    });
  });
  return result;
}

export function getAllQuestions(): { question: QuestionItem; lessonId: string; lessonTitle: string; unitTitle: string }[] {
  const result: { question: QuestionItem; lessonId: string; lessonTitle: string; unitTitle: string }[] = [];
  allUnits.forEach(u => {
    u.lessons.forEach(l => {
      l.questions.forEach(q => {
        result.push({
          question: q,
          lessonId: l.id,
          lessonTitle: l.title,
          unitTitle: u.title
        });
      });
    });
  });
  return result;
}

export function searchCurriculum(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { lessons: [], terms: [], questions: [] };

  const matchedLessons = allLessons.filter(l => 
    l.title.toLowerCase().includes(q) ||
    l.heroIntro.toLowerCase().includes(q) ||
    l.explanationSections.some(s => s.heading.toLowerCase().includes(q) || s.paragraphs.some(p => p.toLowerCase().includes(q)))
  );

  const matchedTerms: { term: string; definition: string; lessonTitle: string; lessonId: string }[] = [];
  allLessons.forEach(l => {
    l.keyTerms.forEach(kt => {
      if (kt.term.toLowerCase().includes(q) || kt.definition.toLowerCase().includes(q)) {
        matchedTerms.push({
          term: kt.term,
          definition: kt.definition,
          lessonTitle: l.title,
          lessonId: l.id
        });
      }
    });
  });

  const matchedQuestions: { question: QuestionItem; lessonTitle: string; lessonId: string }[] = [];
  allLessons.forEach(l => {
    l.questions.forEach(qi => {
      if (qi.question.toLowerCase().includes(q) || qi.answer.toLowerCase().includes(q)) {
        matchedQuestions.push({
          question: qi,
          lessonTitle: l.title,
          lessonId: l.id
        });
      }
    });
  });

  return {
    lessons: matchedLessons,
    terms: matchedTerms,
    questions: matchedQuestions
  };
}
