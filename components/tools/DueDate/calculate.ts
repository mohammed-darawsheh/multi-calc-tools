export interface DueDateResult {
  dueDate: Date;
  conceivedDate: Date;
  trimester: number;
  weeksPregnant: number;
  daysUntilDue: number;
}

export function calculateDueDate(lmpDate: Date, cycleLength: number = 28): DueDateResult {
  const dueDate = new Date(lmpDate);
  dueDate.setDate(dueDate.getDate() + 280 + (cycleLength - 28));

  const conceivedDate = new Date(lmpDate);
  conceivedDate.setDate(conceivedDate.getDate() + 14 + (cycleLength - 28));

  const now = new Date();
  const diffMs = dueDate.getTime() - now.getTime();
  const daysUntilDue = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  const weeksPregnant = Math.max(0, Math.floor((280 - daysUntilDue) / 7));

  let trimester = 1;
  if (weeksPregnant >= 13 && weeksPregnant < 27) trimester = 2;
  else if (weeksPregnant >= 27) trimester = 3;

  return { dueDate, conceivedDate, trimester, weeksPregnant, daysUntilDue: Math.max(0, daysUntilDue) };
}
