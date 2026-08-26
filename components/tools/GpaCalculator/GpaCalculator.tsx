'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { calculateGpa, getGradeOptions, type Course, type GpaScale } from './calculate';

export default function GpaCalculator() {
  const t = useTranslations('tools.gpaCalculator.ui');

  const [scale, setScale] = useState<GpaScale>('4.0');
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: 'A+', credits: 3 },
    { id: '2', name: '', grade: 'A', credits: 3 },
    { id: '3', name: '', grade: 'B+', credits: 3 },
    { id: '4', name: '', grade: 'B', credits: 3 },
  ]);

  const grades = getGradeOptions(scale);
  const result = calculateGpa(courses, scale);

  const addCourse = () => {
    setCourses((prev) => [
      ...prev,
      { id: String(Date.now()), name: '', grade: grades[0] || 'A', credits: 3 },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof Course, val: any) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: val } : c))
    );
  };

  return (
    <div className="space-y-6">
      {/* Scale Selector */}
      <div className="p-4 rounded-xl border border-border bg-card space-y-2">
        <label className="block text-xs font-semibold text-muted-foreground uppercase">{t('scale')}</label>
        <div className="grid sm:grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setScale('4.0')}
            className={`p-3 rounded-lg text-sm font-medium border transition-all text-start ${
              scale === '4.0'
                ? 'border-accent bg-accent/10 text-accent font-bold'
                : 'border-border bg-background hover:bg-muted text-muted-foreground'
            }`}
          >
            {t('scale4')}
          </button>
          <button
            type="button"
            onClick={() => setScale('5.0')}
            className={`p-3 rounded-lg text-sm font-medium border transition-all text-start ${
              scale === '5.0'
                ? 'border-accent bg-accent/10 text-accent font-bold'
                : 'border-border bg-background hover:bg-muted text-muted-foreground'
            }`}
          >
            {t('scale5')}
          </button>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-3">
        {courses.map((c, index) => (
          <div key={c.id} className="p-3.5 rounded-xl border border-border bg-card flex flex-wrap sm:flex-nowrap gap-3 items-center">
            <span className="text-xs font-bold text-muted-foreground w-6">#{index + 1}</span>
            <input
              type="text"
              placeholder={t('courseName')}
              value={c.name || ''}
              onChange={(e) => updateCourse(c.id, 'name', e.target.value)}
              className="flex-1 min-w-[120px] p-2 rounded-lg border border-border bg-background text-sm"
            />
            <div className="w-24">
              <select
                value={c.grade}
                onChange={(e) => updateCourse(c.id, 'grade', e.target.value)}
                className="w-full p-2 rounded-lg border border-border bg-background text-sm font-semibold"
              >
                {grades.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="w-24">
              <input
                type="number"
                min="1"
                max="12"
                value={c.credits}
                onChange={(e) => updateCourse(c.id, 'credits', parseInt(e.target.value) || 0)}
                className="w-full p-2 rounded-lg border border-border bg-background text-sm text-center font-medium"
                title={t('credits')}
              />
            </div>
            <button
              type="button"
              onClick={() => removeCourse(c.id)}
              disabled={courses.length <= 1}
              className="p-2 rounded-lg hover:bg-destructive/10 text-destructive text-sm disabled:opacity-30"
              title={t('remove')}
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addCourse}
          className="w-full py-3 rounded-xl border-2 border-dashed border-border hover:border-accent text-sm font-semibold text-accent hover:bg-accent/5 transition-colors"
        >
          {t('addCourse')}
        </button>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="p-6 rounded-2xl bg-accent/10 border border-accent/20 text-center space-y-1">
          <p className="text-xs text-muted-foreground font-medium">{t('gpa')}</p>
          <p className="text-4xl sm:text-5xl font-black text-accent">
            {result.gpa.toFixed(2)} <span className="text-xl font-bold text-muted-foreground">/ {scale}</span>
          </p>
          <p className="text-xs text-muted-foreground pt-1">
            النسبة المئوية التقريبية: <span className="font-bold text-foreground">{result.percentage}%</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">{t('totalCredits')}</p>
            <p className="text-xl font-bold">{result.totalCredits}</p>
          </div>
          <div className="p-4 rounded-xl border border-border bg-card">
            <p className="text-xs text-muted-foreground mb-1">{t('totalPoints')}</p>
            <p className="text-xl font-bold">{result.totalPoints}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
