import type { OrgProfile, OrgRecord, PanelPosition } from "./org";

declare global {
  interface Window {
    orgApi?: {
      getOrg?: () => Promise<OrgRecord | null>;
      saveOrg?: (payload: OrgProfile) => Promise<OrgRecord>;
      updatePanel?: (payload: {
        panel: "theme" | "stats";
        position: PanelPosition;
      }) => Promise<OrgRecord>;
    };
  }
}

export {};
