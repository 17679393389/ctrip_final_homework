import { Card, Col, Row, Space } from 'antd';

import AreaDownload from './area-download';
import BannerCard from './banner-card';
import { Applications, Conversion } from './conversion_applications';
import CurrentDownload from './current-download';
import ChartBar from '@/pages/components/chart/view/chart-bar';
import ChartBar_Up_Fans from '@/pages/components/chart/view/chart-up-fans';
import ChartRadar from '@/pages/components/chart/view/chart-radar';
import NewInvoice from './new-invoice';
import TopAuthor from './top-authors';
import TopInstalled from './top-installed';
import TopRelated from './top-related';
import TotalCard from './total-card';
import { useEffect, useState } from 'react';
import { getTotalDiary, getToBeCheckedDiary } from '@/api/services/diaryService' 

function Workbench() {


  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col span={24} md={24}>
          <BannerCard />
        </Col>
        <Col span={24} md={8}>
          <Space direction="vertical" size="middle" className="h-full w-full">
            {/* <Conversion /> */}
            {/* <Applications /> */}
          </Space>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={8}>
          <TotalCard
            title="用户总数"
            increase
            count="18,765"
            percent="2.6%"
            chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
          />
        </Col>

        <Col span={24} md={8}>
          <TotalCard
            title="游记总数量"
            increase
            count='2882'
            percent="0.2%"
            chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]}
          />
        </Col>

        <Col span={24} md={8}>
          <TotalCard
            title="待审核笔记总数"
            increase={false}
            count='89990'
            percent="0.1%"
            chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={12} lg={8}>
          <CurrentDownload />
        </Col>
        <Col span={24} md={12} lg={16}>
          <Card title="不同分类游记数量">
            <ChartBar />
          </Card>
        </Col>
        {/* <Col span={24} md={12} lg={16}>
          <AreaDownload />
        </Col> */}
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        {/* <Col span={24} md={12}>
          <TopInstalled />
        </Col> */}
        <Col span={24} md={12} lg={16}>
          <Card title="博主关注度 / 粉丝数量分层分析">
            <ChartBar_Up_Fans />
          </Card>
        </Col>
        <Col span={24} md={12} lg={8}>
          <TopAuthor />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={23} md={24}>
          <NewInvoice />
        </Col>
        {/* <Col span={23} md={12} lg={8}>
          <TopRelated />
        </Col> */}
      </Row>

      
    </>
  );
}

export default Workbench;
