export enum CalculatorMode {
  STANDARD = 'STANDARD',
  AI_SOLVER = 'AI_SOLVER'
}

export enum ButtonType {
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
  FUNCTION = 'FUNCTION', // AC, +/-, %
  ACTION = 'ACTION' // =
}

export interface CalculationHistoryItem {
  expression: string;
  result: string;
  timestamp: number;
}

export interface AISolution {
  answer: string;
  reasoning: string;
}
