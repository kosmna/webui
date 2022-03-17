export interface PasswordStrength {
  password?: string;
  isSufficient?: boolean;
  score?: number;
  requirements?: {
    capitalLetter?: Requirement;
    length?: Requirement;
    number?: Requirement;
  };
}

export interface Requirement {
  actual: number;
  min: number;
  ok: boolean;
}
