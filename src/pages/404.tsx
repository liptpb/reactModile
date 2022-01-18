/*
 * @Author: li
 * @Date: 2022-01-17 14:38:08
 * @LastEditors: li
 * @LastEditTime: 2022-01-18 11:32:25
 * @Description:
 */

import { Link } from 'umi';
import { ErrorBlock, Button } from 'antd-mobile';
import { history } from 'umi';

export default function IndexPage() {
  const backClick = () => {
    history.push('/');
  };
  return (
    <div>
      <ErrorBlock
        status="default"
        style={{
          '--image-height': '150px',
        }}
        description={<span>页面丢失了</span>}
      >
        <Button color="primary" onClick={backClick}>
          返回主页
        </Button>
      </ErrorBlock>
    </div>
  );
}
