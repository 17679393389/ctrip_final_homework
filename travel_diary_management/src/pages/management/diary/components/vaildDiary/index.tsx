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
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProTag from '@/theme/antd/components/tag';
import { DiaryList, getAllDiary,DiarySearchList,updateDiary,searchDiary,getDiaryByStatus } from '@/api/services/diaryService';

const { Search } = Input;
interface DiaryType {
    id: number;
    checked_status: number;
    photoList: Array<string>;
    title: string;
    content: string;
    username: string;
    checked_by: number;
    checked_person: string|"";
    checked_at: string|"";
    checked_opinion: string|"";
    label:string;
    diaryInfo?: any;
    is_deleted: number;
    update_time?: string;
}

//状态映射
const statusMap: any = {
  "-1":'待审核',
  "1":'通过',
  "0":'拒绝',
};
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

export default function Diary({onTabSwitch}) {
  const [userInfo,setUserInfo] = useState(getItem(StorageEnum.User));
  const [loading, setLoading] = useState(false);
  const [layout,setLayout] = useState("full");
  const [diaryData,setDiaryData] = useState([]);
  const [filterFlag,setFilterFlag] = useState(false); //筛选状态
  const [searchFlag,setSearchFlag] = useState(false); //筛选状态
  const [selectBatch,setSelectBatch] = useState<DiaryType[]>([]);
  const navigator = useNavigate();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current:1,
      pageSize:8,
    },
    category:'7',
  });
  
  //获取游记列表
  const getDiaryList = async (data: DiaryList) => {
    try{
      setLoading(true);
      const res = await getAllDiary(data);
      let diaryInfoList = [];
      for (let i = 0; i < res.data.diaries.length; i++) {
        const {id,checked_status,photoList,title,content,username,checked_by,checked_person,checked_at,checked_opinion,label,is_deleted} = res.data.diaries[i];
        diaryInfoList.push({
          id,
          checked_status,
          photoList,
          title,
          content,
          username,
          checked_by,
          checked_person,
          checked_at,
          checked_opinion,
          label,
          diaryInfo: res.data.diaries[i],
        });
      }
      setDiaryData(diaryInfoList);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.data.totalCount,
        },
      })
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  useEffect(() => {
    if(!filterFlag && !searchFlag){  //页面重新加载都要把筛选状态重置
      const pageParams = getRandomuserParams(tableParams)
      getDiaryList({page:pageParams.page,pageSize:pageParams.pageSize,category:pageParams.category,user_id:userInfo.id});
    }
    setUserInfo(getItem(StorageEnum.User));
  }, [JSON.stringify(tableParams)]);



    //记录要搜索的字段
    const [selectSearchInfo,setSelectSearchInfo] = useState({ value: 'title', label: '游记标题' });
    //获取搜索选项
    const handleChangeSelectSearch = (info: { value: string; label: string }) => {setSelectSearchInfo(info)};
    //定义搜索选项值 { value: 'content', label: '游记内容' },
    const options=[{ value: 'title', label: '游记标题' },{ value: 'username', label: '游记作者' }]
   //搜索选项组件  
    const selectSearch = (
    <Select defaultValue={{ value: 'title', label: '游记标题' }} options={options} onChange={handleChangeSelectSearch} />
    );
    //获取搜索框内容
    const onSearch: SearchProps['onSearch'] = (value, _e, info) =>{
      if(value == ""){
        setSearchFlag(false);
      }
      const searchParams = getRandomuserParams(tableParams)
      setSearchFlag(true);
      getSearchResult({page:1,pageSize:searchParams.pageSize,keyword:value,user_id:userInfo.id})
    };

    //获取搜索结果
    const getSearchResult = async (DiarySearchList:DiarySearchList) => {
      try{
        setLoading(true);
      const searchRes = await searchDiary(DiarySearchList);
      console.log(searchRes);
      setLoading(false);
      setDiaryData(searchRes.data.diaries.map((item:DiaryType)=>({...item,diaryInfo:item})));
      console.log(tableParams)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: searchRes.data.totalCount,
        },
      });
      }catch(error){
        console.log('搜索失败',error)
        setLoading(false);
      }
      
    }




    //表格设置
    const { Title, Paragraph } = Typography;
    const columns: ColumnsType<DiaryType> = [
        { title: '', dataIndex: 'diaryInfo',width:80,render: (_,diary) => (
          <Image.PreviewGroup items={diary.photoList}>
            <Image className="rounded object-cover"
            height={50}
            width={50}
            src={diary.photoList[0]}
            fallback="data:image/png;base64,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"
            />
          </Image.PreviewGroup>
          ) },
        {
          title:"游记标题",
          dataIndex: 'title',
          align: 'center',
          width:200,
          render:(_,record)=>(<div onClick={() => onDetail(record)}>{record.title}</div>)
        },
        {
          title:"发布人",
          dataIndex: 'username',
          align: 'center',
          width:100,
        },
        {
          title:"审核人",
          dataIndex: 'checked_person',
          align: 'center',
          width:100,
        },
        {
          title:"审核时间",
          dataIndex: 'checked_at',
          align: 'center',
          width:150,
        },
        {
          title:"审核意见",
          dataIndex: 'checked_opinion',
          align: 'center',
          width:120,
          ellipsis: {
            showTitle: false,
          },
          render: (opinion) => (
            <Tooltip placement="topLeft" title={opinion}>
              {opinion}
            </Tooltip>
          ),
        },
          {
          title: '审核状态',
          dataIndex: 'checked_status',
          align: 'center',
          width:100,
          filters: [
            {
              text: '待审核',
              value: '-1',
            },
            {
              text: '通过',
              value: '1',
            },
            {
              text: '拒绝',
              value: '0',
            },
          ],
          render: (checked_status) => (
            <ProTag color={checked_status === 1 ? 'success' : checked_status === 0 ? 'error':'processing'} 
            icon={checked_status === 1 ?<CheckCircleOutlined />:checked_status === 0 ? <CloseCircleOutlined />: <SyncOutlined spin />}>
            {statusMap[checked_status.toString()]}</ProTag>
          ),
        },
        {
          title: '操作',
          key: 'operation',
          align: 'center',
          
          render: (_, record) => (
            <div className="flex w-full justify-center">
              <Popconfirm title="确定审核通过" okText="Yes" cancelText="No" placement="left" onConfirm={() => onPass(record)}>
              <Button type="link">通过</Button>
                {/* <IconButton>
                  <Iconify icon="bitcoin-icons:verify-filled" size={30} className="text-success" />
                </IconButton> */}
              </Popconfirm>
                <Button type="text" danger onClick={() => onEdit(record)}>拒绝</Button>
                {/* <IconButton onClick={() => onEdit(record)}>
                  <Iconify icon="icon-park-outline:error" size={20} className="text-error" />
                </IconButton> */}
          
              {userInfo.role_index == 1?(<Popconfirm title="删除此游记" okText="Yes" cancelText="No" placement="left" onConfirm={() => onDelete(record)}>
                {/* <IconButton>
                  <Iconify icon="mingcute:delete-2-fill" size={20} className="text-gray-400" />
                </IconButton> */}
                <Button type="text" >删除</Button>
              </Popconfirm>):""}
              
            </div>
          ),
        },
    ];
    //获取表格内容
    const onChangeDiaryTable: TableProps<DiaryType>['onChange'] = (pagination, filters, sorter) => {
      console.log('表格数据改变情况', pagination, filters, sorter);
      setTableParams({
        pagination,
        filters,
        ...sorter,
      });
      //判断是否需要筛选
      if (filters.checked_status && filters.checked_status.length > 0) {
        setFilterFlag(true);
        onFilterDiaryTable({ status: filters.checked_status, pageSize:pagination.pageSize,page:pagination.current });
      }else{
        setFilterFlag(false);
      }
      if (pagination.pageSize !== tableParams.pagination?.pageSize) {
        setDiaryData([]);
      }
    };
    //获取筛选结果
    const onFilterDiaryTable = async (filters:any) => {
      //调接口获取筛选结果
      setLoading(true);
      const searchStatusReq = {
        pageSize: filters.pageSize,
        page: filters.page,
        status: filters.status?.join(','),
      }
      const searchStatusRes = await getDiaryByStatus(searchStatusReq);
      // console.log(searchStatusRes)
      setLoading(false);
      setDiaryData(searchStatusRes.data.diaries.map((item:DiaryType) => ({...item,diaryInfo:item})));
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          pageSize: filters.pageSize,
          current:filters.page,
          total: searchStatusRes.data.totalCount,
        },
      });
      
    };

    //定义行选中
    const rowSelection: TableRowSelection<DiaryType> = {
      onSelect: (record, selected, selectedRows) => {
        
        setSelectBatch(selectedRows)
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        setSelectBatch(selectedRows)
      },
    };



    //单个审核通过操作
    const onPass = (formValue: DiaryType) => {
      //修改审核状态
      if (formValue.checked_status === 1) {
        message.warning('这篇游记已经审核通过啦');
      }else{
        //获取当前时间
        setDiaryData((prev) => prev.map((item) => item['id'] === formValue['id'] ? {...item, checked_status: 1, checked_opinion: '通过', checked_person: userInfo.name,checked_by: userInfo.id,checked_at:new Date().toLocaleString()} : item));
        const newStatusForm = {...formValue, checked_status: 1, checked_opinion: '通过', checked_person: userInfo.name,checked_by: userInfo.id};
        onDiarypUpdate([newStatusForm])
        message.success('审核通过');
      }
    }
    //批量审核通过
    const onBatChpass =  () => {
      const formValueList:DiaryType[] = selectBatch
      if (formValueList.length === 0) {
        message.warning('请选择批量审核通过的游记');
        return;
      }
      const newStatusForm = formValueList.filter((item) => item.checked_status !== 1).map((item) => {
        // 使用解构赋值排除 diaryinfo 属性  
        const { diaryInfo, ...rest } = item;  
        // 返回一个新的对象，其中不包含 diaryinfo  
        return { ...rest,checked_status: 1,checked_opinion: '通过', checked_person: userInfo.name,checked_by: userInfo.id}
      });
      setDiaryData((prev) => prev.map((item) => formValueList.includes(item) ? {...item, checked_status: 1, checked_opinion: '通过', checked_person: userInfo.name,checked_by: userInfo.id,checked_at:new Date().toLocaleString()} : item));
      onDiarypUpdate(newStatusForm)
      message.success('审核通过');
    }


     //拒绝原因模态框初始化
     const [DiaryRejectReasonModalProps, setDiaryRejectReasonModalProps] = useState<DiaryModalProps>({
      formValue: {id: 0,
      checked_status: 0,
      photoList: [],
      title: "",
      content: "",
      username: "",
      checked_person: userInfo.name,
      checked_by: userInfo.id,
      checked_at: "",
      checked_opinion: "",
      label: "",
      is_deleted: 0,
      diaryInfo: {}},
      title: '拒绝原因',
      show: false,
      onOk: (formValue:DiaryType|DiaryType[],reject:string) => {
        setDiaryRejectReasonModalProps((prev) => ({ ...prev, show: false }));
        console.log("用户信息0",userInfo)
        //修改审核状态
        if (formValue instanceof Array) {
          let newStatusForm = formValue.map((item) => {  
            // 使用解构赋值排除 diaryinfo 属性  
            const { diaryInfo, ...rest } = item;  
            // 返回一个新的对象，其中不包含 diaryinfo  
            return { ...rest, checked_status: 0, checked_person: userInfo.name,checked_by: userInfo.id,checked_opinion: reject};  
          });
          onDiarypUpdate(newStatusForm)
          setDiaryData((prev) => prev.map((item) => formValue.includes(item)  ? {...item, checked_status: 0, checked_opinion: reject, checked_person: userInfo.name,checked_by: userInfo.id,checked_at:new Date().toLocaleString()} : item));
          
        }else{
          const newStatusForm = {...formValue, checked_status: 0, checked_person: userInfo.name,checked_by: userInfo.id,checked_opinion: reject};
          delete newStatusForm['diaryInfo']
          onDiarypUpdate([newStatusForm])
          setDiaryData((prev) => prev.map((item) => item['id'] === formValue['id'] ? {...item, checked_status: 0, checked_opinion: reject, checked_person: userInfo.name,checked_by: userInfo.id,checked_at:new Date().toLocaleString()} : item));
        }
        },
      onCancel: () => {
        setDiaryRejectReasonModalProps((prev) => ({ ...prev, show: false }));
      },
    });
    //单个拒绝原因模态框
    const onEdit = (formValue: DiaryType) => {
      setDiaryRejectReasonModalProps((prev) => ({
        ...prev,
        show: true,
        title: formValue.title,
        formValue,
      }));
    };
    //批量拒绝原因模态框
    const onBatchEdit = () => {
      
      const formValueList:DiaryType[] = selectBatch
      if (formValueList.length === 0) {
        message.warning('请选择需要设置拒绝原因的游记');
        return;
      }
      setDiaryRejectReasonModalProps((prev) => ({
        ...prev,
        show: true,
        title: '拒绝原因',
        formValue: formValueList,
      }));
    };

    
    //单个删除游记 更新游记is_deleted
    const onDelete = (formValue: DiaryType) => {
      const newStatusForm = {...formValue, checked_person: userInfo.name,is_deleted: 1,checked_by: userInfo.id};
      onDiarypUpdate([newStatusForm])
      setDiaryData((prev) => prev.filter((item) => item['id'] !== formValue['id']));
      message.success('删除成功');
    };

    //批量删除游记 更新游记is_deleted
    const onBatchDelete = () => {
      const formValueList:DiaryType[] = selectBatch
      if (formValueList.length === 0) {
        message.warning('请选择要删除的游记');
        return;
      }
      const newStatusForm = formValueList.map((item) => {
        // 使用解构赋值排除 diaryinfo 属性  
        const { diaryInfo, ...rest } = item;  
        // 返回一个新的对象，其中不包含 diaryinfo  
        return { ...rest, checked_person: userInfo.name,is_deleted: 1,checked_by: userInfo.id };
      });
      onDiarypUpdate(newStatusForm)
      setDiaryData((prev) => prev.filter((item) => !formValueList.includes(item)));
      message.success('批量删除成功');
    };

     //更新游记状态 或 拒绝原因
     const onDiarypUpdate = async (formValueList: DiaryType[]) => {
      try{
        const updateRes = await updateDiary(formValueList);
      }catch(error){
        console.log(error)
      }
     }

    //查看游记详情
    const onDetail = (formValue:any) => {
      setDiaryInfoModalProps((prev) => ({
        ...prev,
        show: true,
        title: formValue.title,
        formValue,
      }));
    };


    //游记详情
    const [DiaryInfoModalProps, setDiaryInfoModalProps] = useState<DiaryModalProps>({
      formValue: {
        id: 0,
        checked_status: 0,
        photoList: [],
        title: "",
        content: "",
        username: "",
        checked_person: userInfo.name,
        checked_by: userInfo.id,
        checked_at: "",
        label: "",
        checked_opinion: "",
        is_deleted: 0,
        diaryInfo: {}
      },
      title: '游记详情',
      show: false,
      onOk: (data: any) => {
        setDiaryInfoModalProps((prev) => ({ ...prev, show: false }));

      },
      onCancel: () => {
        setDiaryInfoModalProps((prev) => ({ ...prev, show: false }));
      },
    })
    
    return <Space direction="vertical" size="large" className="w-full">
    <Card bodyStyle={{ padding: 8 }}>
      <Form  size="large">
        <Row>
          <Col span={24} lg={24}>
            <Form.Item name="name" className="!mb-0">
              <Search addonBefore={selectSearch} placeholder="请输入搜索内容" allowClear enterButton="搜索" size="large" onSearch={onSearch} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>

    <Card>
      
        <Space>
        <Popconfirm title="确定批量审核通过" okText="Yes" cancelText="No" placement="left" onConfirm={() => onBatChpass()}>
        <Button type="primary">通过</Button>
        </Popconfirm>
        <Popconfirm title="确定批量拒绝" okText="Yes" cancelText="No" placement="left" onConfirm={() => onBatchEdit()}>
        <Button type="primary">拒绝</Button>
        </Popconfirm>
        {userInfo.role_index == 1&&(<Popconfirm title="确定批量删除" okText="Yes" cancelText="No" placement="left" onConfirm={() => onBatchDelete()}>
        <Button type="primary">删除</Button>
        </Popconfirm>)}
        </Space>
        {userInfo.role_index == 1&&(<IconButton className='float-right' onClick={() => onTabSwitch(false)} title={'回收站'}>
              <Iconify icon="mingcute:delete-2-fill" size={18} className="text-gray" />
        </IconButton>)}
      <Table
        rowKey={(record) => record.id}
        size="middle"
        scroll={{ x: 'max-content' }}
        columns={columns}
        pagination={tableParams.pagination}
        dataSource={diaryData}
        rowSelection={{ ...rowSelection }}
        onChange={onChangeDiaryTable}
        loading={loading}
      />
    </Card>
    <DiaryRejectReasonModal {...DiaryRejectReasonModalProps} />
    <DiaryInfoModal {...DiaryInfoModalProps} />
  </Space>;
}

type DiaryModalProps = {
  formValue: DiaryType | DiaryType[];
  title: string;
  show: boolean;
  onOk: Function;
  onCancel: VoidFunction;
};

function DiaryRejectReasonModal({ title, show, formValue, onOk, onCancel }: DiaryModalProps) {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue]);
  return (
    <Modal title={title} open={show} onOk={() => onOk(formValue, form.getFieldValue('reject'))} onCancel={onCancel} forceRender>
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item name="reject" label="拒绝原因" initialValue="禁止发布违反规则的内容">
          <Input.TextArea rows={3}/>
        </Form.Item>
      </Form>
    </Modal>
  );
}



function DiaryInfoModal({ title, show, formValue, onOk, onCancel }: DiaryModalProps) {
  const [form] = Form.useForm();
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    form.setFieldsValue({ ...formValue });
  }, [formValue]);
  return (
    <Modal title={title} open={show} onOk={() => onOk(formValue)} onCancel={onCancel} forceRender>
      <Form
        initialValues={formValue}
        form={form}
        layout="horizontal"
        size="small"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item name="username" label="作者">
        <Tooltip placement="topRight" title={formValue.username}>
        <Avatar src={<img src={formValue.diaryInfo.avatarUrl} alt="avatar" />} size="large"/>
        </Tooltip>
          
          {/* <Typography.Text >{formValue.username}</Typography.Text> */}
        </Form.Item>
        <Form.Item name="photo" label="图片">
        <Image.PreviewGroup
              preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
              }}>
          {formValue.photoList ? formValue.photoList.slice(0,3).map((item:string, index:number) => (
              <Image src={item} key={index} className="rounded object-cover p-1"
              height={100}
              width={100}
              fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg=="
              />
            )):""}
        </Image.PreviewGroup>
        </Form.Item>
        <Form.Item name="content" label="内容">
          <div className='border border-2 rounded border-gray-300 min-h-[100px] p-1'>
          <Typography.Paragraph ellipsis={{
          rows: 3,
          expandable: 'collapsible',
          expanded,
          onExpand: (_, info) => setExpanded(info.expanded),
        }}>{formValue.content}</Typography.Paragraph>
          </div>
        </Form.Item>
        <Form.Item name="checked_status" label="审核状态">
        {/* <Radio.Group initialValues={formValue.checked_status ? formValue.checked_status.toString() : '-1'} buttonStyle="solid">
          <Radio.Button value="-1">待审核</Radio.Button>
          <Radio.Button value="1">通过</Radio.Button>
          <Radio.Button value="0">拒绝</Radio.Button>
        </Radio.Group> */}
        <Typography.Text >{statusMap[formValue.checked_status.toString()]}</Typography.Text>
        </Form.Item>
        {formValue.checked_status !== -1 &&(<Form.Item name="checked_by" label="审核人">
          <Typography.Text >{formValue.checked_person}</Typography.Text>
        </Form.Item>)}
        {formValue.checked_status !== -1 &&(<Form.Item name="checked_at" label="审核时间">
          <Typography.Text >{formValue.checked_at}</Typography.Text>
        </Form.Item>)}
        {formValue.checked_status !== -1 &&(<Form.Item name="checked_opinion" label="审核意见">
          <Input.TextArea value={formValue.checked_opinion} rows={3} className='rounded'/>
        </Form.Item>)}
      </Form>
    </Modal>
  );
}