export interface OrgProfile {
  name: string;
  masterPin: string;
  imageUrl?: string | null;
}

export interface OrgRecord extends OrgProfile {
  id: string;
  themeModal?: string | null;
  statsModal?: string | null;
  selectedTheme?: string | null;
  sidebarSize?: number | null;
  topBarSize?: number | null;
  bottomPanelSize?: number | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export type PanelPosition = {
  x: number;
  y: number;
  mode: "px" | "percent";
};

declare global {
  interface Window {
    orgApi?: {
      getOrg: () => Promise<OrgRecord | null>;
      saveOrg: (payload: OrgProfile) => Promise<OrgRecord>;
      updatePanel: (payload: {
        panel: "theme" | "stats";
        position: PanelPosition;
      }) => Promise<OrgRecord>;
      updateResizablePanels: (payload: {
        sidebarSize?: number;
        topBarSize?: number;
        bottomPanelSize?: number;
      }) => Promise<OrgRecord>;
      updateTheme: (themeId: string) => Promise<OrgRecord>;
    };
  }
}
