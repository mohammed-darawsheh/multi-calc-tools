export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  excludeAmbiguous: boolean;
}

export interface PasswordResult {
  password: string;
  entropy: number;
  strength: 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
}

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const AMBIGUOUS = 'il1Lo0O';

function getStrengthLabel(entropy: number): PasswordResult['strength'] {
  if (entropy < 40) return 'Weak';
  if (entropy < 60) return 'Medium';
  if (entropy < 80) return 'Strong';
  return 'Very Strong';
}

function shuffleString(str: string): string {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

export function generatePassword(options: PasswordOptions): PasswordResult {
  let charset = '';
  const requiredChars: string[] = [];

  if (options.includeLowercase) {
    const pool = options.excludeAmbiguous
      ? LOWERCASE.replace(/[il1Lo0O]/g, '')
      : LOWERCASE;
    charset += pool;
    requiredChars.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  if (options.includeUppercase) {
    const pool = options.excludeAmbiguous
      ? UPPERCASE.replace(/[il1Lo0O]/g, '')
      : UPPERCASE;
    charset += pool;
    requiredChars.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  if (options.includeNumbers) {
    const pool = options.excludeAmbiguous
      ? NUMBERS.replace(/[01]/g, '')
      : NUMBERS;
    charset += pool;
    requiredChars.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  if (options.includeSymbols) {
    charset += SYMBOLS;
    requiredChars.push(SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)]);
  }

  // If no char types selected, default to lowercase
  if (charset === '') {
    charset = LOWERCASE;
    requiredChars.push(LOWERCASE[Math.floor(Math.random() * LOWERCASE.length)]);
  }

  // Fill remaining length with random chars
  const remainingLength = Math.max(options.length - requiredChars.length, 0);
  let password = requiredChars.join('');

  for (let i = 0; i < remainingLength; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }

  // Shuffle to distribute required chars
  password = shuffleString(password);

  // Calculate entropy: log2(charset_size^length)
  const charsetSize = charset.length;
  const entropy = Math.log2(Math.pow(charsetSize, password.length));

  return {
    password,
    entropy: Math.round(entropy * 100) / 100,
    strength: getStrengthLabel(entropy),
  };
}