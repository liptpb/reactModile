/*
 * @Author: li
 * @Date: 2022-01-13 15:47:16
 * @LastEditors: li
 * @LastEditTime: 2022-01-17 11:04:06
 * @Description:
 */
import React, { ReactNode } from 'react';
import { Helmet } from 'umi';
import { LeftOutline, LocationOutline } from 'antd-mobile-icons';
import { NavBar, Space } from 'antd-mobile';
import styles from './index.less';
import { drumbeat } from '@drbt/android-h5-sdk';

type TabBarType = {
  title: string;
  subTitle?: string;
  backArrow?: boolean | ReactNode;
  onBack: () => void;
  backTop?: () => void;
};
const CustomNavBar: React.FC<TabBarType> = (props: any) => {
  const { title, subTitle, backArrow, onBack, backTop } = props;
  let customeTitle = drumbeat.getTitleBarText();

  const right = backTop && (
    <div style={{ fontSize: 22 }}>
      <Space>
        <div
          onClick={backTop}
          style={{
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LocationOutline />
        </div>
      </Space>
    </div>
  );
  return (
    <div style={{ width: '100%', height: '70px' }}>
      <Helmet>
        <title>{customeTitle || title}</title>
      </Helmet>
      <NavBar
        style={{
          width: '100%',
          padding: '25px 12px 0',
          height: '70px',
          position: 'fixed',
          zIndex: 999,
          backgroundColor: 'white',
        }}
        backArrow={backArrow || <LeftOutline fontSize={22} />}
        onBack={onBack}
        // right={right}
      >
        <div>
          <div>{customeTitle || title}</div>
          {subTitle && <div className={styles.subtitle}>{subTitle}</div>}
        </div>
      </NavBar>
    </div>
  );
};
export default CustomNavBar;
