export interface LifelineRecord {
  id: string;
  slug: string;
  displayName: string;
  description: string | null;
  isEnabled: number; 
  createdAt: string;
  updatedAt: string;
}

export interface CreateLifelinePayload {
  slug: string;
  displayName: string;
  description?: string;
  isEnabled?: boolean;
}

export interface UpdateLifelinePayload {
  id: string;
  slug?: string;
  displayName?: string;
  description?: string;
  isEnabled?: boolean;
}

export interface LifelinesApi {
  list: () => Promise<LifelineRecord[]>;
  get: (id: string) => Promise<LifelineRecord | null>;
  create: (payload: CreateLifelinePayload) => Promise<LifelineRecord>;
  update: (payload: UpdateLifelinePayload) => Promise<LifelineRecord>;
  delete: (id: string) => Promise<{ success: boolean }>;
}

declare global {
  interface Window {
    lifelinesApi?: LifelinesApi;
  }
}
