import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { useState } from 'react';
import { DEFAULT_USER } from '@/assets/assets';
import { SignInReq } from '@/api/services/userService';
import { useSignIn } from '@/store/userStore';



import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';

function LoginForm() {
  const [loading, setLoading] = useState(false);

  const { loginState, setLoginState } = useLoginStateContext();
  const signIn = useSignIn();

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async ({ username, password }:SignInReq) => {
    setLoading(true);
    try {
      await signIn({ username, password });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl mb-10">欢迎登录</div>
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: true,
          username: DEFAULT_USER.username,
          password: DEFAULT_USER.password,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请填写账号" }]}
        >
          <Input placeholder="账号" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请填写密码" }]}
        >
          <Input.Password type="password" placeholder="密码" />
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <button className="!underline">忘记密码?</button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            登录
          </Button>
        </Form.Item>
        <Form.Item>
        <button className="!text-sm !underline" onClick={() => setLoginState(LoginStateEnum.REGISTER)}>没有账号？立即注册</button>
        </Form.Item>


      </Form>
    </>
  );
}

export default LoginForm;
