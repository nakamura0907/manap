import Button, { GithubLoginButton } from "@components/ui/button";
import Divider from "@components/ui/divider";
import Form from "@components/ui/form";
import Input from "@components/ui/input";
import Link from "@components/ui/link";
import { FormButtonSpace } from "@components/ui/space";
import { loginByEmail, setToken } from "@features/auth";
import type { NextPage } from "next";

type Values = {
  email: string;
  password: string;
};

const Login: NextPage = () => {
  const [form] = Form.useForm<Values>();

  const handleFinish = async (values: Values) => {
    try {
      const result = await loginByEmail({
        email: values.email,
        password: values.password,
      });
      setToken(result.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGithubLogin = async () => {
    window.location.href = "http://localhost:3001/api/v1/auth/github";
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
      </div>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="メールアドレス"
          name="email"
          rules={[
            {
              type: "email",
              message: "メールアドレスの形式で入力してください",
            },
            {
              required: true,
              message: "メールアドレスを入力してください",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="パスワード"
          name="password"
          rules={[
            {
              required: true,
              message: "パスワードを入力してください",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <FormButtonSpace>
            <Link href="/signup">アカウントの作成</Link>
            <Button type="primary" htmlType="submit">
              ログイン
            </Button>
          </FormButtonSpace>
        </Form.Item>
      </Form>

      <div>
        <Divider />
        <div>
          <GithubLoginButton
            text="Githubアカウントでログイン"
            onClick={handleGithubLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
