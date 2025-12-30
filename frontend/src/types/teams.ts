export interface TeamRecord {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamPayload {
  name: string;
  logoUrl?: string;
}

export interface UpdateTeamPayload {
  id: string;
  name?: string;
  logoUrl?: string;
  displayOrder?: number;
}

export interface TeamsApi {
  list: () => Promise<TeamRecord[]>;
  get: (idOrSlug: string) => Promise<TeamRecord | null>;
  create: (payload: CreateTeamPayload) => Promise<TeamRecord>;
  update: (payload: UpdateTeamPayload) => Promise<TeamRecord>;
  delete: (id: string) => Promise<{ success: boolean }>;
  reorder: (orderedIds: string[]) => Promise<TeamRecord[]>;
}

declare global {
  interface Window {
    teamsApi?: TeamsApi;
  }
}
