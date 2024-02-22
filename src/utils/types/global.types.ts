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

export type SignInData = {
  token: string
  user: User
}

export type FileType = "file" | "folder";

export type ProjectFile = {
  name: string
  extension: string | null,
  type: FileType | null,
  path: string,
}

export type NewFile = {
  file: ProjectFile
  projectName: string
}

export type User = {
  id: number;
  email: string;
  username?: string;
  name?: string;
  surname?: string;
  picture?: string;
}

export type FileActions = 'rename' | 'delete' | 'transfer' | 'edit';

export interface Changes {
  projectCodeName: string
  file: ProjectFile,
  action: FileActions

  changedFile: {
    name: string,
    extension: string | null,
    type: FileType | null,
    path: string,
    content: string | null,
    removed: boolean,
  }
}

export interface ServerToClientEvents {
  changes: (e: Changes) => void
  newFile: (e: NewFile) => void
  userJoin: (user: User) => void
  userLeave: (user: User) => void
}

export interface ClientToServerEvents {
  changes: (e: Changes) => void
  newFile: (e: NewFile) => void
  joinProject: (e: { user: User; projectName: string }) => void
}

export type ProjectRoomUser = {
  id: number;
  email: string;
  username?: string;
  name?: string;
  surname?: string;
  picture?: string;
  socket: string
};

export interface ProjectRoom {
  project: Project
  users: ProjectRoomUser[]
}

export interface FileNode {
  id: number;
  type: FileType;
  content: string | FileMap;
  placeholder?: boolean
}

export interface FileMap {
  [filename: string]: FileNode;
}

export type ContextMenuActionsTypes = 'rename' | 'delete';

export interface ContextMenuAction {
  action: ContextMenuActionsTypes,
  path: string,
  node: FileNode
}
