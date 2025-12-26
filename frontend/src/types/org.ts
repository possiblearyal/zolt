export interface OrgProfile {
  name: string;
  masterPin: string;
  imageUrl?: string | null;
}

export interface OrgRecord extends OrgProfile {
  id: string;
  themeModal?: string | null;
  statsModal?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type PanelPosition = {
  x: number;
  y: number;
  mode: "px" | "percent";
};
