// react-query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// react
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
// react helmet
import { HelmetProvider } from 'react-helmet-async';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';
import { Analytics } from '@vercel/analytics/react';

import App from '@/App';

// i18n
import './locales/i18n';
// tailwind css
import './theme/index.css';

// 创建一个 client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // 失败重试次数
      cacheTime: 300_000, // 缓存有效期 5m
      staleTime: 10_1000, // 数据变得 "陈旧"（stale）的时间 10s
      refetchOnWindowFocus: false, // 禁止窗口聚焦时重新获取数据
      refetchOnReconnect: false, // 禁止重新连接时重新获取数据
      refetchOnMount: false, // 禁止组件挂载时重新获取数据
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <Suspense>
        <Analytics />
        <App />
      </Suspense>
    </QueryClientProvider>
  </HelmetProvider>,
);
