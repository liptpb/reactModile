import React, { useState } from 'react';
import { Badge, TabBar } from 'antd-mobile';
import {
  AppOutline,
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
import s from './../../index.less';
import { history } from 'umi';

const TabBarInfo: React.FC = (props: any) => {
  const [activeKey, setActiveKey] = useState('home');

  const tabs = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
      link: '/home',
    },
    {
      key: 'todo',
      title: '发起新流程',
      icon: <UnorderedListOutline />,
      link: '/mystarted',
    },
    {
      key: 'message',
      title: '我的消息',
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
      badge: '99+',
      link: '/myNews',
    },
    {
      key: 'personalCenter',
      title: '个人中心',
      icon: <UserOutline />,
      link: '/myInfo',
    },
  ];
  const InfoActiveKey = (e: string) => {
    setActiveKey(e);
    let InfoActiveKeyData = tabs.filter((item) => item.key.includes(e));
    history.push(InfoActiveKeyData[0].link);
  };
  return (
    <div>
      {props.children}
      <div className={s.bottomName}>
        <TabBar activeKey={activeKey} onChange={InfoActiveKey}>
          {tabs.map((item) => {
            return (
              <TabBar.Item
                key={item.key}
                icon={item.icon}
                title={item.title}
                badge={item.badge}
              />
            );
          })}
        </TabBar>
      </div>
    </div>
  );
};
export default TabBarInfo;
