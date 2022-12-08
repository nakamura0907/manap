import { Space, SpaceProps } from "antd";

/**
 * 入力フォームのボタン類を囲むラッパーコンポーネント
 *
 * @example
 * ```
 * <Form.Item>
 *  <FormButtonSpace>
 *    <Link href="/signup">アカウントの作成</Link>
 *   <Button type="primary" htmlType="submit">
 *      ログイン
 *   </Button>
 *  </FormButtonSpace>
 * </Form.Item>
 * ```
 */
export const FormButtonSpace = (props: SpaceProps) => {
  const { size, className, ...rest } = props;
  return (
    <Space
      size={size ?? "large"}
      className={(className ? `${className} ` : "") + "flex justify-end"}
      {...rest}
    />
  );
};

export default Space;
