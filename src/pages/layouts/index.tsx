import React, { Component } from 'react';
import { drumbeat } from '@drbt/android-h5-sdk';
import { setToken } from '@/utils/authority';
// import TabBarInfo from '@/components/TabBarNav';

// const ULR_NO_LAYOUT = ['/', '/home']; // 判断哪些路由需要出现底部导航

class Index extends Component {
  componentDidMount() {}
  renderBody = () => {
    // const { token } = (this.props.location as any).query;
    // if (token) {
    //   setToken(token as any);
    //   // setToken(
    //   //   'eyJ0eXAiOiJKV1QiLCJ2ZXJzaW9uIjoidjMiLCJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoi6LaF57qn566h55CG5ZGYIiwiYWRtIjoiMSIsImlkIjoiMSIsImV4cCI6MTYzNzQ3MjczNCwiaWF0IjoxNjM3MjEzNDc0LCJ1ZCI6IntcImFwcElkXCI6XCIxMjU0MzgyNjAzMDU0Njk0NDBcIixcInRlbmFudElkXCI6XCIxMDAwMDAwMDAwMDAwMDAwMDBcIixcImRldmljZVwiOjIyfSJ9.WOg7jjJ52NJDgkCYzzoBkjk_K2Hkh2BFSb0cNk22214FF6ycWXmz8P0ySa6ZX67ZLckedzc6iBpwCaRRPgRPMMZGkmeGO6z-_9dJau3nQOR8aO0INtE9BZ7W8ilvw2YOCunyKoJJcc-4SFOhqYI2ilNtUYwboCyuAiVJIcQ5GUK_5qhiWu_ueLy9l_mXep8NBSS1_nlTVEeVRnDoGMUYiSfwv3ta-2JGr1TooiH20Ht08RepwoXivCZcr8vvoMh3cnRcL8VzHEdvIN7HGEz1wWORikxggPB9hWCaRPqbBLMgg7RrYGmSMK4C2D9GUK51jCUWuEEe4dTISA1a_Fn2JA',
    //   // );
    // } else {
    //   let androidToken = drumbeat.getToken();
    //   setToken(androidToken as any);
    //   // setToken(
    //   //   'eyJ0eXAiOiJKV1QiLCJ2ZXJzaW9uIjoidjMiLCJhbGciOiJSUzI1NiJ9.eyJuYW1lIjoi6LaF57qn566h55CG5ZGYIiwiYWRtIjoiMSIsImlkIjoiMSIsImV4cCI6MTYzNzQ3MjczNCwiaWF0IjoxNjM3MjEzNDc0LCJ1ZCI6IntcImFwcElkXCI6XCIxMjU0MzgyNjAzMDU0Njk0NDBcIixcInRlbmFudElkXCI6XCIxMDAwMDAwMDAwMDAwMDAwMDBcIixcImRldmljZVwiOjIyfSJ9.WOg7jjJ52NJDgkCYzzoBkjk_K2Hkh2BFSb0cNk22214FF6ycWXmz8P0ySa6ZX67ZLckedzc6iBpwCaRRPgRPMMZGkmeGO6z-_9dJau3nQOR8aO0INtE9BZ7W8ilvw2YOCunyKoJJcc-4SFOhqYI2ilNtUYwboCyuAiVJIcQ5GUK_5qhiWu_ueLy9l_mXep8NBSS1_nlTVEeVRnDoGMUYiSfwv3ta-2JGr1TooiH20Ht08RepwoXivCZcr8vvoMh3cnRcL8VzHEdvIN7HGEz1wWORikxggPB9hWCaRPqbBLMgg7RrYGmSMK4C2D9GUK51jCUWuEEe4dTISA1a_Fn2JA',
    //   // );
    // }
    const {
      location: { pathname },
      children,
    } = this.props;
    console.log(this.props);
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
