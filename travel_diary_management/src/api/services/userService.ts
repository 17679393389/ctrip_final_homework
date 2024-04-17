import apiClient from '../apiClient';

export interface SignInReq {
  username: string;
  password: string;
}


export interface SignUpReq extends SignInReq {
  name: string;
  avatar?: string;
  role:number;
}

export enum UserApi {
  SignIn = '/admin/login',
  SignUp = '/admin/',
  getTotalUser = '/user/getAllUser',
  searchUser = '/user/searchUser',
  deleteUser = '/user/'
}
export const getAllUser = () => apiClient.get({ url: UserApi.getTotalUser });
export const searchUser = (value: string) => apiClient.get({url: `${UserApi.searchUser}?value=${value}`});
export const deleteUser = (id: number) => apiClient.delete({url: `${UserApi.deleteUser}/${id}`});
export const signin = (data: SignInReq) => apiClient.post({ url: UserApi.SignIn, data });
export const signup = (data: SignUpReq) => apiClient.post({ url: UserApi.SignUp, data });
