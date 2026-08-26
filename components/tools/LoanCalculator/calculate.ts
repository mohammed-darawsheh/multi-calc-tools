export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationRow[];
}

export function calculateLoan(
  loanAmount: number,
  annualInterestRate: number,
  years: number
): LoanResult {
  const monthlyRate = annualInterestRate / 100 / 12;
  const totalMonths = years * 12;

  if (monthlyRate === 0) {
    const payment = loanAmount / totalMonths;
    const schedule: AmortizationRow[] = [];
    let balance = loanAmount;
    for (let month = 1; month <= totalMonths; month++) {
      const principal = payment;
      balance -= principal;
      schedule.push({
        month,
        payment: Math.round(payment * 100) / 100,
        principal: Math.round(principal * 100) / 100,
        interest: 0,
        balance: Math.round(Math.max(0, balance) * 100) / 100,
      });
    }
    return {
      monthlyPayment: Math.round(payment * 100) / 100,
      totalPayment: loanAmount,
      totalInterest: 0,
      amortizationSchedule: schedule,
    };
  }

  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;

  for (let month = 1; month <= totalMonths; month++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    schedule.push({
      month,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principal * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      balance: Math.round(Math.max(0, balance) * 100) / 100,
    });
  }

  const totalPayment = monthlyPayment * totalMonths;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalInterest: Math.round((totalPayment - loanAmount) * 100) / 100,
    amortizationSchedule: schedule,
  };
}