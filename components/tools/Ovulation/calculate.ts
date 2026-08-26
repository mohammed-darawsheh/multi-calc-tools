export interface OvulationResult {
  fertileWindowStart: Date;
  fertileWindowEnd: Date;
  ovulationDate: Date;
  nextPeriodDate: Date;
  lutealPhaseDays: number;
}

export function calculateOvulation(lmpDate: Date, cycleLength: number = 28): OvulationResult {
  const ovulationDate = new Date(lmpDate);
  ovulationDate.setDate(ovulationDate.getDate() + (cycleLength - 14));

  const fertileWindowStart = new Date(ovulationDate);
  fertileWindowStart.setDate(fertileWindowStart.getDate() - 5);

  const fertileWindowEnd = new Date(ovulationDate);
  fertileWindowEnd.setDate(fertileWindowEnd.getDate() + 1);

  const nextPeriodDate = new Date(lmpDate);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

  return {
    fertileWindowStart,
    fertileWindowEnd,
    ovulationDate,
    nextPeriodDate,
    lutealPhaseDays: 14,
  };
}
