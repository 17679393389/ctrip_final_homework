import {
    Card,
    Col,
    Form,
    Input,
    Modal,
    Popconfirm,
    Typography,
    Image,
    Row,
    Select,
    Space,
    message,
    Tooltip,
    Radio,
    Avatar,
    Button,
  } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import type { TableProps,GetProp } from 'antd';
import { TableRowSelection } from 'antd/es/table/interface';
import type { SearchProps } from 'antd/es/input/Search';
import { IconButton, Iconify } from '@/components/icon';
import { StorageEnum } from '#/enum';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { useEffect, useState } from 'react';
import ProTag from '@/theme/antd/components/tag';
import { getAllUser,searchUser } from '@/api/services/userService';

const { Search } = Input;
interface UserType {
    id: number;
    avatarUrl: string;
    username: string;
    nickname: string;
    phone: string;
    gender: number;
    like_count: number;
    follow_count: number;
}
//表格分页配置
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  category?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

//获取表格参数
const getRandomuserParams = (params: TableParams) => ({
  pageSize: params.pagination?.pageSize || 8,
  page: params.pagination?.current || 1,
  category: params.category || '7',
  ...params,
});

export default function UserManage() {
  const [userInfo,setUserInfo] = useState(getItem(StorageEnum.User));
  const [loading, setLoading] = useState(false);
  const [userData,setUserData] = useState([]);
  const [selectBatch,setSelectBatch] = useState<UserType[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current:1,
      pageSize:8,
    },
  });
  
  //获取用户
  const getUserList = async () => {
    const res = await getAllUser();
    const userInfo = res.data.users
    const like = res.data.likeInfo
    const follow = res.data.FollowInfo
    const userList = userInfo.map((item: any) => {
        const likecount = like.filter((likeItem: any) => likeItem.author_id === item.id)[0]?.count || 0;
        const followCount = follow.filter((followItem: any) => followItem.up_id === item.id)[0]?.count || 0;
        return {
          ...item,
          likeCount: likecount,
          followCount: followCount
        }
      })
    setUserData(userList)
    console.log(userList)
  };
  useEffect(() => {
    const pageParams = getRandomuserParams(tableParams)
    getUserList();
    setUserInfo(getItem(StorageEnum.User));
  }, [JSON.stringify(userInfo)]);


    //获取搜索框内容
    const onSearch: SearchProps['onSearch'] = (value, _e, info) =>{
      const searchParams = getRandomuserParams(tableParams)
      getSearchResult({keyword:value})
    };

    //获取搜索结果
    const getSearchResult = async (userSearch:any) => {
      try{
        setLoading(true);
      const searchRes = await searchUser(userSearch.keyword);
      const idList = searchRes.data.map((item:UserType)=>item.id)
      const userList = userData.filter((item:UserType)=>idList.includes(item.id))
      setUserData(userList)
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
        },
      })
      }catch(error){
        console.log('搜索失败',error)
        setLoading(false);
      }
      
    }




    //表格设置
    const columns: ColumnsType<UserType> = [
        { title: '', dataIndex: 'userimage',width:80,render: (_,user) => (
            <Avatar src={<img src={user.avatarUrl} alt="avatar" />} size={{sm: 20, md: 30, lg: 45, xl: 55, xxl: 80 }} />
          ) },
        {
          title:"用户名",
          dataIndex: 'username',
          align: 'center',
          width:150,
        },
        {
          title:"性别",
          dataIndex: 'gender',
          align: 'center',
          width:120,
          render: (_,user) => (
            <ProTag color={user.gender === 1 ? 'success' : 'error'}>{user.gender === 1 ? '男' : '女'}</ProTag>
          )
        },
        {
          title:"昵称",
          dataIndex: 'nickname',
          align: 'center',
          width:120,
        },
        {
          title:"手机号",
          dataIndex: 'phone',
          align: 'center',
          width:150,
        },
        {
            title:"粉丝数",
            dataIndex: 'followCount',
            align: 'center',
            width:120,
            sorter: (a, b) => a.followCount - b.followCount,
          },
          {
            title:"获赞数",
            dataIndex: 'likeCount',
            align: 'center',
            width:120,
            sorter: (a, b) => a.likeCount - b.likeCount,
          },
    ];
    if(userInfo.role_index === 1){
      columns.push({
        title: '操作',
        key: 'operation',
        align: 'center',
        
        render: (_, record) => (
          <div className="flex w-full justify-center">
            <Popconfirm title="确定删除" okText="Yes" cancelText="No" placement="left" onConfirm={() => onDelete(record)}>
              <IconButton>
                <Iconify icon="mingcute:delete-2-fill" size={15} className="text-gray-400" />
              </IconButton>
            </Popconfirm>
          </div>
        ),
      },);
    }
    //获取表格内容
    const onChangeDiaryTable: TableProps<UserType>['onChange'] = (pagination, filters, sorter) => {
      console.log('表格数据改变情况', pagination, filters, sorter);
      setTableParams({
        pagination,
        filters,
        ...sorter,
      });
      if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        setUserData([]);
      }
    };

    //定义行选中
    const rowSelection: TableRowSelection<UserType> = {
      onSelect: (record, selected, selectedRows) => {
        
        setSelectBatch(selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        setSelectBatch(selectedRows)
      },
    };


    
    //单个删除游记 更新游记is_deleted
    const onDelete = (formValue: UserType) => {
        setUserData((prev) => prev.filter((item) => item['id'] !== formValue['id']));
      message.success('删除成功');
    };

    //批量删除游记 更新游记is_deleted
    const onBatchDelete = () => {
      const formValueList:UserType[] = selectBatch
      if (formValueList.length === 0) {
        message.warning('请选择要删除的游记');
        return;
      }
      setUserData((prev) => prev.filter((item) => !formValueList.includes(item)));
      message.success('批量删除成功');
    };


    
    return <Space direction="vertical" size="large" className="w-full">
    <Card bodyStyle={{ padding: 8 }}>
      <Form  size="large">
        <Row>
          <Col span={24} lg={24}>
            <Form.Item name="name" className="!mb-0">
              <Search placeholder="请输入搜索内容" allowClear enterButton="搜索" size="large" onSearch={onSearch} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>

    <Card>
      
        {userInfo.role_index === 1 &&(<Space>
        <Popconfirm title="确定删除" okText="Yes" cancelText="No" placement="left" onConfirm={() => onBatchDelete()}>
        <Button type="primary">删除</Button>
        </Popconfirm>
        </Space>)}
      <Table
        rowKey={(record) => record.id}
        size="middle"
        scroll={{ x: 'max-content' }}
        columns={columns}
        pagination={tableParams.pagination}
        dataSource={userData}
        rowSelection={{ ...rowSelection }}
        onChange={onChangeDiaryTable}
        loading={loading}
      />
    </Card>
  </Space>;
}