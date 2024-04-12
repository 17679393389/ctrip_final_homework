import { Card, Col, Row, Space } from 'antd';
import BannerCard from './banner-card';
import CurrentDownload from './current-download';
import ChartBar from '@/pages/components/chart/view/chart-bar';
import ChartBar_Up_Fans from '@/pages/components/chart/view/chart-up-fans';
import TopAuthor from './top-authors';
import TotalCard from './total-card';
import { useEffect, useState } from 'react';
import { getTotalDiary, getDiaryVerify } from '@/api/services/diaryService';
import { getAllUser } from '@/api/services/userService';

function Workbench() {
  const [totalDiary, setTotalDiary] = useState(0);
  const [checkedDiary, setCheckedDiary] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [userInfo, setUserInfo] = useState([]);
  const [genderNumber, setGenderNumber] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [fansNumber, setFansNumber] = useState([2,0,0,0,0,0,0]);
useEffect(() => {
  getTotalDiaryInterface()
  getToBeCheckedDiaryInterface()
  getTotalUserInterface()
},[])

const getTotalDiaryInterface = async () => {
  const res = await getTotalDiary()
  setTotalDiary(res.data.totalCount)
  setCategoryData(res.data.categoryCount)

}
const getToBeCheckedDiaryInterface = async () => {
    const res = await getDiaryVerify();
      setCheckedDiary(res.data.diaryCount)
}
const getTotalUserInterface = async () => {
  const res = await getAllUser();
  const userInfo = res.data.users
  const like = res.data.likeInfo
  const follow = res.data.FollowInfo
  console.log(like,follow)
  const userList = userInfo.map((item: any) => {
    const likecount = like.filter((likeItem: any) => likeItem.author_id === item.id)[0]?.count || 0;
    const followCount = follow.filter((followItem: any) => followItem.up_id === item.id)[0]?.count || 0;
    return {
      ...item,
      likeCount: likecount,
      followCount: followCount
    }
  })
  // const fansCount = follow.map((item: any) => {
  //   if (item.count < 100) {
  //     return item.fans_id
  //   }
  // })
  // setFansNumber([fansCount])

  const sortedUserList = userList.sort((a: any, b: any) => b.likeCount - a.likeCount);
  setUserInfo(sortedUserList)
  setTotalUser(res.data.users.length)
  const female = res.data.users.filter((item: any) => item.gender === 0).length
  const male = res.data.users.filter((item: any) => item.gender === 1).length
  setGenderNumber([female, male])
}
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
            count={totalUser.toString()}
            percent="2.6%"
            chartData={[22, 8, 35, 50, 82, 84, 77, 12, 87, 43]}
          />
        </Col>

        <Col span={24} md={8}>
          <TotalCard
            title="游记总数量"
            increase
            count={totalDiary.toString()}
            percent="0.2%"
            chartData={[45, 52, 38, 24, 33, 26, 21, 20, 6]}
          />
        </Col>

        <Col span={24} md={8}>
          <TotalCard
            title="待审核笔记总数"
            increase={false}
            count={checkedDiary.toString()}
            percent="0.1%"
            chartData={[35, 41, 62, 42, 13, 18, 29, 37, 36]}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={12} lg={8}>
          <CurrentDownload series={genderNumber}/>
        </Col>
        <Col span={24} md={12} lg={16}>
          <Card title="不同分类游记数量">
            <ChartBar seriesCategory={categoryData}/>
          </Card>
        </Col>

      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={12} lg={16}>
          <Card title="博主关注度 / 粉丝数量分层分析">
            <ChartBar_Up_Fans series={fansNumber}/>
          </Card>
        </Col>
        <Col span={24} md={12} lg={8}>
          <TopAuthor data={userInfo}/>
        </Col>
      </Row>

      
    </>
  );
}

export default Workbench;
