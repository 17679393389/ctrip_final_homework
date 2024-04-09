import { Button, Form, Input,Radio, Col, Row } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { useState } from 'react';
import { SignUpReq } from '@/api/services/userService';

import { ReturnButton } from './components/ReturnButton';
import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';
import { useSignUp } from '@/store/userStore';

function RegisterForm() {
  const [roleValue, setRoleValue] = useState(0);
  const { loginState, backToLogin } = useLoginStateContext();
  const signUP = useSignUp();
  if (loginState !== LoginStateEnum.REGISTER) return null;

  const onFinish = async (values: any) => {
    delete values.confirmPassword
    values['avatar'] = "https://tse1-mm.cn.bing.net/th/id/OIP-C.Ohr_GhoAXi06FOb6-x4xcQAAAA?w=165&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    await signUP(values);
    // console.log('注册表单提交', values);
  };
  const onChangeRole = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setRoleValue(e.target.value);
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl mb-10">欢迎注册</div>
      <Form name="normal_login" size="large" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请填写账号"}]}
        >
          <Input placeholder="账号" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "请填写姓名"}]}
        >
          <Input placeholder="姓名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请填写密码" }]}
        >
          <Input.Password type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "请确认密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("密码不一致，请统一密码"));
              },
            }),
          ]}
        >
          <Input.Password type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item
        name="role"
        initialValue={0}>
          <Radio.Group onChange={onChangeRole} value={roleValue} className='w-full'>
            <Row>
              <Col span={12}>
              <Radio value={0}>审核员</Radio>
              </Col>
              <Col span={12} className='text-right'>
              <Radio value={1}>管理员</Radio>
              </Col>
            
          
          
            </Row>
          
            </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full justify-between">
            注册
          </Button>
        </Form.Item>

        <ReturnButton onClick={backToLogin} />
      </Form>
    </>
  );
}

export default RegisterForm;
