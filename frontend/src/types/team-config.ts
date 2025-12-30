export interface TeamConfigRecord {
  id: string;
  maxPasses: number;
  maxHints: number;
  createdAt: string;
  updatedAt: string;
}

export interface TeamConfigLifelineRecord {
  id: string;
  configId: string;
  lifelineId: string;
  defaultCount: number;
  isEnabled: number;
  createdAt: string;
  updatedAt: string;
  slug: string;
  displayName: string;
  lifelineDescription?: string;
}

export interface TeamConfigResponse {
  config: TeamConfigRecord | null;
  lifelines: TeamConfigLifelineRecord[];
}

export interface UpdateTeamConfigPayload {
  maxPasses?: number;
  maxHints?: number;
}

export interface UpdateTeamConfigLifelinePayload {
  lifelineId: string;
  defaultCount?: number;
  isEnabled?: boolean;
}

export interface TeamConfigApi {
  get: () => Promise<TeamConfigResponse>;
  update: (payload: UpdateTeamConfigPayload) => Promise<TeamConfigRecord>;
  updateLifeline: (
    payload: UpdateTeamConfigLifelinePayload
  ) => Promise<TeamConfigLifelineRecord>;
}

declare global {
  interface Window {
    teamConfigApi?: TeamConfigApi;
  }
}
