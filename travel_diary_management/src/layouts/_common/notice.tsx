import { faker } from '@faker-js/faker';
import { Badge, Button, Drawer, Space, Tabs, TabsProps } from 'antd';
import Color from 'color';
import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import CyanBlur from '@/assets/images/background/cyan-blur.png';
import RedBlur from '@/assets/images/background/red-blur.png';
import { IconButton, Iconify, SvgIcon } from '@/components/icon';
import ProTag from '@/theme/antd/components/tag';
import { useThemeToken } from '@/theme/hooks';
import { getDiaryVerify } from '@/api/services/diaryService';
import {LoadingOutlined} from '@ant-design/icons';

export default function NoticeButton() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const themeToken = useThemeToken();
  const [count, setCount] = useState(0);
  const [diaryCount, setDiaryCount] = useState(0);

  const style: CSSProperties = {
    backdropFilter: 'blur(20px)',
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundColor: Color(themeToken.colorBgContainer).alpha(0.9).toString(),
    backgroundPosition: 'right top, left bottom',
    backgroundSize: '50, 50%',
  };
  const bodyStyle: CSSProperties = {
    padding: 0,
  };
  useEffect(() => {
    getDiaryList()
    
  }, []);
  const getDiaryList = async () => {
    try{
      const res = await getDiaryVerify();
      if(res.data.diaryCount > 0){
        setDiaryCount(res.data.diaryCount)
        setCount(1)
      }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
      <IconButton onClick={() => setDrawerOpen(true)}>
        <Badge
          count={count}
          styles={{
            root: { color: 'inherit' },
            indicator: { color: '#fff' },
          }}
        >
          <Iconify icon="solar:bell-bing-bold-duotone" size={24} />
        </Badge>
      </IconButton>
      <Drawer
        placement="right"
        title="通知"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        closable={false}
        width={420}
        bodyStyle={bodyStyle}
        maskStyle={{ backgroundColor: 'transparent' }}
        style={style}
        extra={
          <IconButton
            style={{ color: themeToken.colorPrimary }}
            onClick={() => {
              setCount(0);
              setDrawerOpen(false);
              setDiaryCount(0)
            }}
          >
            <Iconify icon="solar:check-read-broken" size={20} />
          </IconButton>
        }
      >
        <NoticeTab diaryCount = {diaryCount}/>
      </Drawer>
    </div>
  );
}

function NoticeTab({diaryCount}) {
  const tabChildren: ReactNode = (
    <div className="text-sm">
      <div className="flex">
      <IconButton>
          <SvgIcon icon="ic_mail" size={30} />
        </IconButton>
        <div className="ml-2">
          <div>
          <span className="font-medium">您还有{diaryCount}条游记未审核</span>
          </div>
          <span className="text-xs font-light opacity-60">请尽快审核</span>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex flex-col px-6 m-4">
      {diaryCount > 0 && tabChildren}
    </div>
  );
}
