import { Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { getItem } from '@/utils/storage';
import { StorageEnum } from '#/enum';
import DiaryRecycle from './components/recycleDiary';
import Diary from './components/vaildDiary';
export default function DiaryLayout() {
  const [userInfo,setUserInfo] = useState(getItem(StorageEnum.User));
  const [flagSwitch,setFlagSwitch] = useState(true);
  
  const tabSwitch = (flag:boolean) =>{
    setFlagSwitch(flag);
  }

    return <Space direction="vertical" size="large" className="w-full">
    {flagSwitch?<Diary onTabSwitch={tabSwitch} />:<DiaryRecycle onTabSwitch={tabSwitch}/>}
  </Space>;
}