import { faker } from '@faker-js/faker';
import { Typography } from 'antd';
import Color from 'color';

import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import { useThemeToken } from '@/theme/hooks';

export default function TopAuthor({ data }: any) {
  console.log(data)
  const themeToken = useThemeToken();
  const getTrophyIconColor = (index: number) => {
    switch (index) {
      case 1:
        return {
          color: themeToken.colorInfo,
          bg: themeToken.colorInfoBgHover,
        };
      case 2: {
        return {
          color: themeToken.colorError,
          bg: themeToken.colorErrorBgHover,
        };
      }
      case 3: {
        return {
          color: themeToken.colorError,
          bg: themeToken.colorErrorBgHover,
        };
      }
      case 4: {
        return {
          color: themeToken.colorError,
          bg: themeToken.colorErrorBgHover,
        };
      }
      default:
        return {
          color: themeToken.colorPrimary,
          bg: themeToken.colorPrimaryBgHover,
        };
    }
  };
  return (
    <Card className="flex-col">
      <header className="self-start">
        <Typography.Title level={5}>Top Up主</Typography.Title>
      </header>
      <main className="w-full">
        { data.map((_, index) => (
          <div key={index} className="mb-4 flex">
            <img src={_.avatarUrl} alt="" className="h-10 w-10 rounded-full" />
            <div className="ml-2 flex flex-col">
              <span>{_.username}</span>
              <div className="flex items-center  text-gray">
                <Iconify icon="icon-park-solid:like" size={14} />
                <span className="ml-2">
                {_.likeCount}
                </span>
              </div>
            </div>

            <div
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                background: Color(getTrophyIconColor(index).bg).alpha(0.4).toString(),
              }}
            >
              <Iconify
                icon="solar:cup-star-bold"
                size={24}
                color={getTrophyIconColor(index).color}
              />
            </div>
          </div>
        ))}
      </main>
    </Card>
  );
}
