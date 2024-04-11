import { Suspense, lazy } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { SvgIcon } from '@/components/icon';
import { CircleLoading } from '@/components/loading';

import { AppRouteObject } from '#/router';

const Diary = lazy(() => import('@/pages/management/diary'));
const DiaryRecycle = lazy(() => import('@/pages/management/diary/components/recycleDiary'));

const management: AppRouteObject = {
  order: 2,
  path: 'management',
  element: (
    <Suspense fallback={<CircleLoading />}>
      <Outlet />
    </Suspense>
  ),
  meta: {
    label: 'sys.menu.management',
    icon: <SvgIcon icon="ic-management" className="ant-menu-item-icon" size="24" />,
    key: '/management',
  },
  children: [
    {
      index: true,
      element: <Navigate to="diary" replace />,
    },
    {
      path: 'diary',
      element: <Diary />,
      meta: { label: 'sys.menu.diary', key: '/management/diary' },
    },
    // {
    //   path: 'diaryRecycle',
    //   element: <DiaryRecycle/>,
    //   meta: { label: '回收站', key: '/management/diary/components/recycleDiary' },
    // },
  ],
};

// export default management;
