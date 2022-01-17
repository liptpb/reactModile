import { Result } from 'antd-mobile';
import { Link } from 'umi';

export default function IndexPage() {
  return (
    <div>
      <Result
        status="warning"
        title="404"
        description="当前路径不是有效地址，请返回！"
      />
    </div>
  );
}
