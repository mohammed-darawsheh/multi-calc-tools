export interface Course {
  id: string;
  name?: string;
  grade: string;
  credits: number;
}

export type GpaScale = '4.0' | '5.0';

export interface GpaResult {
  gpa: number;
  scale: GpaScale;
  totalCredits: number;
  totalPoints: number;
  percentage: number;
}

export const GRADE_POINTS_4: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'F': 0,
};

export const GRADE_POINTS_5: Record<string, number> = {
  'A+': 5.0,
  'A': 4.75,
  'B+': 4.5,
  'B': 4.0,
  'C+': 3.5,
  'C': 3.0,
  'D+': 2.5,
  'D': 2.0,
  'F': 0,
};

export function calculateGpa(courses: Course[], scale: GpaScale = '4.0'): GpaResult {
  const pointsMap = scale === '5.0' ? GRADE_POINTS_5 : GRADE_POINTS_4;
  let totalPoints = 0;
  let totalCredits = 0;

  for (const course of courses) {
    const credits = Math.max(0, course.credits);
    const pointPerCredit = pointsMap[course.grade] ?? 0;
    totalPoints += pointPerCredit * credits;
    totalCredits += credits;
  }

  const maxScale = scale === '5.0' ? 5.0 : 4.0;
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
  const percentage = maxScale > 0 ? (gpa / maxScale) * 100 : 0;

  return {
    gpa: Math.round(gpa * 100) / 100,
    scale,
    totalCredits,
    totalPoints: Math.round(totalPoints * 100) / 100,
    percentage: Math.round(percentage * 10) / 10,
  };
}

export function getGradeOptions(scale: GpaScale): string[] {
  return Object.keys(scale === '5.0' ? GRADE_POINTS_5 : GRADE_POINTS_4);
}