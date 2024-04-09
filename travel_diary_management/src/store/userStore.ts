import { useMutation } from '@tanstack/react-query';
import { App } from 'antd';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';

import userService, { SignInReq, SignUpReq } from '@/api/services/userService';
import { getItem, removeItem, setItem } from '@/utils/storage';

import { UserInfo, UserToken } from '#/entity';
import { StorageEnum } from '#/enum';
import {PERMISSION_LIST,ADMIN_ROLE} from '@/_mock/assets';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;
  // 使用 actions 命名空间来存放所有的 action
  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>((set) => ({
  userInfo: getItem<UserInfo>(StorageEnum.User) || {},
  userToken: getItem<UserToken>(StorageEnum.Token) || {},
  actions: {
    setUserInfo: (userInfo) => {
      set({ userInfo });
      setItem(StorageEnum.User, userInfo);
    },
    setUserToken: (userToken) => {
      set({ userToken });
      setItem(StorageEnum.Token, userToken);
    },
    clearUserInfoAndToken() {
      set({ userInfo: {}, userToken: {} });
      removeItem(StorageEnum.User);
      removeItem(StorageEnum.Token);
    },
  },
}));

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserPermission = () => useUserStore(() => PERMISSION_LIST);
export const useUserActions = () => useUserStore((state) => state.actions);

export const useSignIn = () => {
  const navigatge = useNavigate();
  const { notification, message } = App.useApp();
  const { setUserToken, setUserInfo } = useUserActions();
  const signInMutation = useMutation(userService.signin);

  const signIn = async (data: SignInReq) => {
    try {
      const res = await signInMutation.mutateAsync(data);
      const { admin:user, token:accessToken } = res.data;
      // console.log(res.data.data)
      // const { user, accessToken } = res.data.data;
      //添加用户角色
      user.role_index = user.role
      user.role = ADMIN_ROLE;
      setUserToken({ accessToken });
      setUserInfo(user);
      navigatge(HOMEPAGE, { replace: true });

      notification.success({
        message: "登录成功",
        description: `欢迎回来: ${data.username}`,
        duration: 3,
      });
    } catch (err) {
     console.log(err)
    }
  };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(signIn, []);
};

export const useSignUp = () => {
const navigatge = useNavigate();
const { notification, message } = App.useApp();
const { setUserToken, setUserInfo } = useUserActions();
  const signUpMutation = useMutation(userService.signup);
const signUp = async (data: SignUpReq) => {
  try {
    const res = await signUpMutation.mutateAsync(data);
    const { newAdmin:user, token:accessToken } = res.data;
    console.log(user,accessToken)
    user.role_index = user.role
    user.role = ADMIN_ROLE;
    setUserToken({ accessToken });
    setUserInfo(user);
    navigatge(HOMEPAGE, { replace: true });

    notification.success({
      message: "注册成功",
      description: `欢迎来到旅游日记审核管理系统: ${data.username}`,
      duration: 3,
    });
  } catch (err) {
    console.log(err)
  }
};
// eslint-disable-next-line react-hooks/exhaustive-deps
return useCallback(signUp, []);
};
