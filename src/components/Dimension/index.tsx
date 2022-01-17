import React from 'react';
import styles from './index.less';
import { history } from 'umi';

const Dimension: React.FC = () => {
  const filterClick = (dd) => {
    console.log(dd);
    history.push({
      pathname: '/demo1',
    });
  };
  return (
    <div className={styles.middlefixbox}>
      <div className={styles.middleitem} onClick={() => filterClick(1)}>
        区域
      </div>
      <div className={styles.middleitem} onClick={() => filterClick(2)}>
        商圈
      </div>
      <div className={styles.middleitem} onClick={() => filterClick(3)}>
        门店
      </div>
      <div className={styles.middleitem} onClick={() => filterClick(4)}>
        系列
      </div>
    </div>
  );
};
export default Dimension;
