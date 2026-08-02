import type { AdapterId, EngineeringLoopConfig } from "../types.js";

export interface Adapter {
  id: AdapterId;
  label: string;
  outputPath: string;
  render(config: EngineeringLoopConfig): string;
}
