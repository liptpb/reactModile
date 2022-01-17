import React, { useState } from 'react';
import { Empty } from 'antd-mobile';

const HomePage: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Empty
        style={{ padding: '64px 0' }}
        imageStyle={{ width: 128 }}
        description="暂无数据"
      />
    </div>
  );
};

export default HomePage;
