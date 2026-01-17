
export enum AppStage {
  LANDING = 'LANDING',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
  WISH = 'WISH',
  ORACLE = 'ORACLE'
}

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    type: SpiritType;
  }[];
}

export enum SpiritType {
  AUTONOMY = 'autonomy',
  COMPETENCE = 'competence',
  RELATEDNESS = 'relatedness',
  GROWTH = 'growth'
}

export interface SpiritInfo {
  name: string;
  story: string;
  strength: string;
  caution: string;
  advice: string[];
  color: string;
  traits: string[];
  motto: string;
}

export interface QuizResult {
  dominantType: SpiritType;
  scores: Record<SpiritType, number>;
}
