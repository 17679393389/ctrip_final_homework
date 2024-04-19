import { faker } from '@faker-js/faker';

import { BasicStatus, PermissionType } from '#/enum';
/**
 * User permission mock
 */
const DASHBOARD_PERMISSION = {
  id: '9100714781927703',
  parentId: '',
  label: 'sys.menu.dashboard',
  name: 'Dashboard',
  icon: 'ic-analysis',
  type: PermissionType.CATALOGUE,
  route: 'dashboard',
  order: 1,
  children: [
    {
      id: '8426999229400979',
      parentId: '9100714781927703',
      label: 'sys.menu.workbench',
      name: 'Workbench',
      type: PermissionType.MENU,
      route: 'workbench',
      component: '/dashboard/workbench/index.tsx',
    },
  ],
};
const MANAGEMENT_PERMISSION = {
  id: '0901673425580518',
  parentId: '',
  label: 'sys.menu.management',
  name: 'Management',
  icon: 'ic-management',
  type: PermissionType.CATALOGUE,
  route: 'management',
  order: 2,
  children: [
    {
      id: '2781684678535711',
      parentId: '0901673425580518',
      label: 'sys.menu.diary',
      name: 'Diary',
      type: PermissionType.MENU,
      route: 'diary',
      component: '/management/diary/index.tsx',
    },
    {
      id: '278168467555555',
      parentId: '0901673425580518',
      label: 'sys.menu.user.index',
      name: 'User',
      type: PermissionType.MENU,
      route: 'user',
      component: '/management/user/index.tsx',
    },
  ],
};

export const PERMISSION_LIST = [DASHBOARD_PERMISSION, MANAGEMENT_PERMISSION];

/**
 * User role mock
 */
export const ADMIN_ROLE = {
  id: '4281707933534332',
  name: 'Admin',
  label: 'admin',
  status: BasicStatus.ENABLE,
  order: 1,
  desc: 'Super Admin',
  permission: [DASHBOARD_PERMISSION, MANAGEMENT_PERMISSION],
};

/**
 * User data mock
 */
export const DEFAULT_USER = {
  id: faker.string.uuid(),
  username: 'admin@gmail.com',
  email: faker.internet.email(),
  avatar: 'http://img-blog.csdnimg.cn/direct/b8a65f8b767f4791865dad1985e6a473.png',
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.recent(),
  password: '12345678',
  role: ADMIN_ROLE,
  permissions: ADMIN_ROLE.permission,
};
