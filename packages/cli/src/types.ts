export interface EngineeringLoopConfig {
  $schema?: string;
  version: string;
  project: {
    name: string;
    description?: string;
    architecture_style?: string;
  };
  memory: {
    directory: string;
    required_files: string[];
  };
  pipeline?: {
    pre_code?: string[];
    post_code?: string[];
  };
  commands?: {
    test?: string;
    lint?: string;
    build?: string;
    format?: string;
    [key: string]: string | undefined;
  };
  language_policy?: {
    code?: string;
    comments?: string;
    docs?: string;
    commits?: string;
    [key: string]: string | undefined;
  };
  agents?: {
    allow_auto_fix?: boolean;
    max_repair_iterations?: number;
  };
  adapters?: AdapterId[];
}

export type AdapterId = "claude" | "cursor" | "aider" | "codex" | "gemini" | "windsurf";
