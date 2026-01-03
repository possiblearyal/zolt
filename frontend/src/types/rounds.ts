export interface PassPolicy {
  enabled: boolean;
  reducesPassQuota?: boolean;
}

export interface TimePolicy {
  baseTime: number; 
  afterPassTimeMode?: "static" | "dynamic";
  afterPassTime?: number[]; 
  staticAfterPassTime?: number; 
}

export interface ScoringPolicy {
  correct: number;
  incorrect: number;
  pass?: number;
  correctWhenPassed?: number;
  correctWhenPassedMultiple?: number[]; 
}

export interface HintPolicy {
  enabled: boolean;
  progressiveReveal?: boolean;
  maxHints?: number;
  reducesHintQuota?: boolean;
}

export interface QuestionFormat {
  promptType: "text" | "image" | "audio" | "video";
  responseType: "text" | "choice" | "number" | "boolean";
}

export interface AnswerPolicy {
  mode: "single" | "multiple" | "open";
}

export interface AllowedLifelines {
  [lifelineSlug: string]: number; 
}

export interface RoundConfiguration {
  passPolicy: PassPolicy;
  timePolicy: TimePolicy;
  scoringPolicy: ScoringPolicy;
  hintPolicy: HintPolicy;
  questionFormat: QuestionFormat;
  answerPolicy: AnswerPolicy;
  allowedLifelines?: AllowedLifelines;
}

export interface RoundCategoryRecord {
  id: string;
  name: string;
  description?: string;
  contentMode: "single-question" | "question-set";
  defaultConfiguration: RoundConfiguration;
  createdAt: string;
  updatedAt: string;
}

export interface RoundRecord {
  id: string;
  setId: string;
  categoryId: string;
  name: string;
  description?: string;
  position: number;
  configuration: RoundConfiguration;
  confirmationRequired: boolean;
  createdAt: string;
  categoryName?: string;
  categoryContentMode?: "single-question" | "question-set";
}

export interface CreateRoundPayload {
  setId: string;
  categoryId: string;
  name: string;
  description?: string;
  configuration?: Partial<RoundConfiguration>;
  confirmationRequired?: boolean;
}

export interface UpdateRoundPayload {
  id: string;
  categoryId?: string;
  name?: string;
  description?: string;
  configuration?: Partial<RoundConfiguration>;
  confirmationRequired?: boolean;
}

export interface ReorderRoundsPayload {
  setId: string;
  roundIds: string[];
}

export interface RoundsApi {
  list: (setId?: string) => Promise<RoundRecord[]>;
  get: (id: string) => Promise<RoundRecord | null>;
  create: (payload: CreateRoundPayload) => Promise<RoundRecord>;
  update: (payload: UpdateRoundPayload) => Promise<RoundRecord>;
  delete: (id: string) => Promise<void>;
  reorder: (payload: ReorderRoundsPayload) => Promise<void>;
}

export interface RoundCategoriesApi {
  list: () => Promise<RoundCategoryRecord[]>;
  get: (id: string) => Promise<RoundCategoryRecord | null>;
}

declare global {
  interface Window {
    roundsApi?: RoundsApi;
    roundCategoriesApi?: RoundCategoriesApi;
  }
}

export {};
