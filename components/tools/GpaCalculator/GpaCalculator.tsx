'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateGpa, GRADE_POINTS_4, GRADE_POINTS_5, type Course, type GpaScale } from './calculate';

export default function GpaCalculator() {
  const t = useTranslations('tools.gpaCalculator.ui');

  const [scale, setScale] = useState<GpaScale>('4.0');
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: 'Course 1', credits: 3, grade: 'A' },
    { id: '2', name: 'Course 2', credits: 3, grade: 'B+' },
    { id: '3', name: 'Course 3', credits: 4, grade: 'A-' },
  ]);

  const grades = scale === '5.0' ? Object.keys(GRADE_POINTS_5) : Object.keys(GRADE_POINTS_4);
  const result = calculateGpa(courses, scale);

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: String(Date.now()),
        name: `Course ${courses.length + 1}`,
        credits: 3,
        grade: 'A',
      },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, val: any) => {
    setCourses(
      courses.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* Scale Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-muted border border-border">
          <button
            type="button"
            onClick={() => setScale('4.0')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              scale === '4.0' ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            {t('scale4')}
          </button>
          <button
            type="button"
            onClick={() => setScale('5.0')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              scale === '5.0' ? 'bg-accent text-accent-foreground shadow-sm' : 'text-muted-foreground'
            }`}
          >
            {t('scale5')}
          </button>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-2.5">
        {courses.map((c, i) => (
          <div
            key={c.id}
            className="grid grid-cols-[1fr,60px,70px,36px] sm:grid-cols-[2fr,1fr,1fr,auto] gap-2 items-center p-2.5 sm:p-3 rounded-xl border border-border bg-card shadow-sm"
          >
            <input
              type="text"
              value={c.name}
              onChange={(e) => updateCourse(c.id, 'name', e.target.value)}
              placeholder={`${t('courseName')} ${i + 1}`}
              className="p-2 sm:p-2.5 rounded-lg border border-border bg-background text-xs sm:text-sm font-medium"
            />
            <input
              type="number"
              inputMode="numeric"
              min="1"
              max="12"
              value={c.credits}
              onChange={(e) => updateCourse(c.id, 'credits', parseInt(e.target.value) || 1)}
              className="p-2 sm:p-2.5 rounded-lg border border-border bg-background text-xs sm:text-sm font-bold text-center"
              placeholder={t('credits')}
            />
            <select
              value={c.grade}
              onChange={(e) => updateCourse(c.id, 'grade', e.target.value)}
              className="p-2 sm:p-2.5 rounded-lg border border-border bg-background text-xs sm:text-sm font-bold text-center"
            >
              {grades.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeCourse(c.id)}
              disabled={courses.length <= 1}
              className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 disabled:opacity-30 transition-colors flex items-center justify-center text-sm"
              title={t('removeCourse')}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addCourse}
        className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-accent text-accent font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-1.5 active:scale-[0.99]"
      >
        <span>+</span>
        <span>{t('addCourse')}</span>
      </button>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
        <div className="p-4 sm:p-5 rounded-2xl bg-accent/10 border border-accent/20">
          <p className="text-xs text-muted-foreground font-semibold uppercase">{t('gpa')}</p>
          <p className="text-3xl sm:text-4xl font-black text-accent mt-1">{result.gpa}</p>
          <p className="text-[11px] text-muted-foreground">/ {scale}</p>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border">
          <p className="text-xs text-muted-foreground font-semibold uppercase">{t('percentage')}</p>
          <p className="text-2xl sm:text-3xl font-black text-foreground mt-1">{result.percentage}%</p>
        </div>
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border">
          <p className="text-xs text-muted-foreground font-semibold uppercase">{t('totalCredits')}</p>
          <p className="text-2xl sm:text-3xl font-black text-foreground mt-1">{result.totalCredits}</p>
        </div>
      </div>
    </div>
  );
}
