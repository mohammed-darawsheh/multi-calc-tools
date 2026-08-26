export type IddahType = 'death' | 'revocable' | 'pregnant';

export interface IddahResult {
  type: IddahType;
  periodMonths: number;
  periodDays: number;
  startDate: Date;
  endDate: Date | null;
  ruleKey: string;
}

const DEATH_DAYS = 130; // 4 lunar months and 10 days (~130 solar days)
const DIVORCE_DAYS = 90; // 3 menstrual cycles (~90 days)

export function calculateIddah(type: IddahType, startDate: Date): IddahResult {
  if (type === 'pregnant') {
    return {
      type,
      periodMonths: 0,
      periodDays: 0,
      startDate,
      endDate: null,
      ruleKey: 'pregnantNote',
    };
  }

  const days = type === 'death' ? DEATH_DAYS : DIVORCE_DAYS;
  const months = type === 'death' ? 4.33 : 3;

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + days);

  return {
    type,
    periodMonths: months,
    periodDays: days,
    startDate,
    endDate,
    ruleKey: type === 'death' ? 'deathRule' : 'divorceRule',
  };
}
