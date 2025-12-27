export interface SetRecord {
  id: string;
  name: string;
  description?: string | null;
  isActive: number | boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface CreateSetPayload {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateSetPayload {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
}

declare global {
  interface Window {
    setsApi?: {
      list: () => Promise<SetRecord[]>;
      get: (id: string) => Promise<SetRecord | null>;
      create: (payload: CreateSetPayload) => Promise<SetRecord>;
      update: (payload: UpdateSetPayload) => Promise<SetRecord>;
      delete: (id: string) => Promise<{ success: boolean }>;
      setActive: (id: string) => Promise<SetRecord>;
    };
  }
}
