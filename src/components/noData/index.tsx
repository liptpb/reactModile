import React from 'react';
import styles from './index.less';
interface AppProps {
  value?: string;
}

const noData: React.FC<AppProps> = (props: AppProps) => {
  return (
    <div className={styles.noDatadiv}>
      <div className={styles.imgIno}>
        <img src={require('./../../../assets/no-data.png')} />
      </div>
    </div>
  );
};
export default noData;
