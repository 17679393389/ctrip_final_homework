import { BasicStatus, PermissionType } from './enum';

export interface UserToken {
  accessToken?: string;
  // refreshToken?: string;
}

export interface UserInfo {
  id: number;
  username: string;
  password?: string;
  avatar?: string;
  role?: number;
  name?:string;
  permissions?:Permission[]
}

export interface Permission {
  id: string;
  parentId: string;
  name: string;
  label: string;
  type: PermissionType;
  route: string;
  status?: BasicStatus;
  order?: number;
  icon?: string;
  component?: string;
  hide?: boolean;
  frameSrc?: string;
  newFeature?: boolean;
  children?: Permission[];
}

export interface Role {
  id: string;
  name: string;
  label: string;
  status: BasicStatus;
  order?: number;
  desc?: string;
  permission?: Permission[];
}
