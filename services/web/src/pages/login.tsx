import Button, {
  FacebookLoginButton,
  GithubLoginButton,
} from "@components/ui/button";
import Form from "@components/ui/form";
import Input from "@components/ui/input";
import Link from "@components/ui/link";
import { FormButtonSpace } from "@components/ui/space";
import type { NextPage } from "next";

const Login: NextPage = () => {
  return (
    <div>
      <div>
        <h1>Login</h1>
      </div>
      <Form layout="vertical">
        <Form.Item
          label="メールアドレス"
          name="email"
          rules={[
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
        <div>または</div>
        <div>
          <GithubLoginButton text="Githubアカウントでログイン" />
        </div>
      </div>
    </div>
  );
};

export default Login;
