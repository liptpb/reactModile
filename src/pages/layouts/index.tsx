/*
 * @Author: li
 * @Date: 2022-01-17 14:38:08
 * @LastEditors: li
 * @LastEditTime: 2022-01-20 14:24:06
 * @Description:
 */
import React, { Component } from 'react';
import { drumbeat } from '@drbt/android-h5-sdk';
import { setToken } from '@/utils/authority';
// import TabBarInfo from '@/components/TabBarNav';

// const ULR_NO_LAYOUT = ['/', '/home']; // 判断哪些路由需要出现底部导航

class Index extends Component {
  componentDidMount() {}
  renderBody = () => {
    const { token } = (this.props.location as any).query;
    if (token) {
      localStorage.removeItem('drumbeat-centralizer-authority');
      setToken(token as any);
      // setToken(
      //   'eyJUeXBlIjowLCJFbmNyeXB0TW9kZSI6MCwiVGltZVN0YW1wIjoiMjAyMi0wMS0yMCAwMjoxMjo0NyJ9.eyJVc2VySWQiOiIyMjIiLCJGdWxsTmFtZSI6ImNzYyBBUFAiLCJSb2xlSWQiOiIxMTEiLCJTeXNGbGFnIjpudWxsfQ==.oaX4a2PqkCSPA+uVyKH1WtxRmzEs/nROIeEALfc+Qb8=',
      // );
    }
    const {
      location: { pathname },
      children,
    } = this.props;
    // if (ULR_NO_LAYOUT.includes(pathname)) {
    //   return  (<TabBarInfo {...this.props} />);
    // }
    return <React.Fragment>{children}</React.Fragment>;
  };

  render() {
    return <React.Fragment>{this.renderBody()}</React.Fragment>;
  }
}

export default Index;
