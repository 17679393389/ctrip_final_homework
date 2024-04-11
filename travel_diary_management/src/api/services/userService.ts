import apiClient from '../apiClient';

import { UserInfo, UserToken } from '#/entity';

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
  SignUp = '/admin',
  getAllUser = '/user/getAllUser',
}

const signin = (data: SignInReq) => apiClient.post({ url: UserApi.SignIn, data });
const signup = (data: SignUpReq) => apiClient.post({ url: UserApi.SignUp, data });
const getAllUser = () => apiClient.get({ url: UserApi.getAllUser });

export default {
  signin,
  signup,
  getAllUser
};
