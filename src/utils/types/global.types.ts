export enum Theme {
  dark = "dark",
  light = "light",
}

export enum Variant {
  Primary = "button_primary",
  Secondary = "button_secondary",
  Contained = "button_contained",
  Outlined = "button_outlined",
  Text = "button_text",
}

export enum Size {
  Large = "button_large",
  Medium = "button_medium",
  Small = "button_small",
}

interface IButton {
  variant?: Variant,
  size?: typeof Size,
  onClick?: (event: MouseEvent) => void,
  className?: string,
}

export type {
  IButton,
}

export type Template = {
  id: number,
  name: string,
  codeName: string | null,
};

export type DefaultTemplates = Template[];

export type Project = {
  id: number;
  userId: number;
  teamId?: number;
  folderId?: number;
  name: string;
  codeName: string;
  template: boolean;
  public: boolean;
  description?: string;
  freezed: boolean;
};

export type UserTemplates = Project[];

export type Templates = {
  defaultTemplates: DefaultTemplates
  userTemplates: UserTemplates
}

export interface User {
  id: number;
  accessToken: string;
  githubAccessToken?: string;
  refreshToken?: string;
  email: string;
  username?: string;
  name?: string;
  surname?: string;
  picture?: string;
}

export interface Changes {
  user: User
  timeSent: string
  projectCodeName: string
  fileName: string,
  content: typeof Blob
}

export interface ServerToClientEvents {
  changes: (e: Changes) => void
}

export interface ClientToServerEvents {
  changes: (e: Changes) => void
  joinProject: (e: { user: User; projectName: string }) => void
}
