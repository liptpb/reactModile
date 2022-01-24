import React, { useState, useEffect } from 'react';
import { history, useLocation, KeepAlive } from 'umi';
import { LeftOutline, CloseOutline } from 'antd-mobile-icons';
import {
  getsinglecustomerrecon,
  getreconciliation,
  convertcsctoken,
} from './service';
import { PullToRefresh, Empty } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import CustomNavBar from '@/components/CustomNavBar';
import { drumbeat } from '@drbt/android-h5-sdk';
import styles from './index.less';
import { getTimestampFun, MonyInIt } from '@/utils/common';
import { getToken, clearAuthority } from '@/utils/authority';

const AgentSaleByArea: React.FC = () => {
  const location: any = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [topClose, setTopClose] = useState<boolean>(false); // 导航栏关闭按钮
  const [convert, setConvert] = useState<{ Item1: string; Item2: string }>();

  const convertCSCTokenFN = async () => {
    const token = getToken();
    const res = await convertcsctoken({
      token: token,
    });
    if (res.StatusCode === 200 && res.Entity) {
      let resData = JSON.parse(res.Entity);
      queryAreaDataFun(resData);
      setConvert({ ...resData });
    }
  };
  //
  const queryAreaDataFun = async (convert1: {
    Item1: string;
    Item2: string;
  }) => {
    setLoading(true);
    console.log(convert1);
    const res = await getreconciliation({
      CompanyId: convert1?.Item1 || '',
      CustomerId: convert1?.Item2 || '',
    });
    setLoading(false);
    if (res.StatusCode === 200) {
      if (res.Entity) {
        let resData = JSON.parse(res.Entity);
        resData.forEach((element: any) => {
          element.CustomerId = convert1?.Item2 || '';
        });
        setDataSource(resData);
      } else {
        setDataSource([]);
      }
    } else {
    }
  };
  // 下拉刷新
  const refreshFun = () => {
    queryAreaDataFun(convert);
  };
  // 点击
  const jumpFun = (row: any) => {
    let urlparams = JSON.stringify({
      CompanyId: row.CompanyId,
      CustomerId: row.CustomerId,
      ReconciliationId: row.ReconciliationId,
      dataTime: row.IntervalName,
    });
    if (row) {
      history.push({
        pathname: '/accountStatementIno',
        query: {
          urlparams,
          v: getTimestampFun(),
        },
      });
    }
  };

  // 标题返回触发
  const navBack = () => {
    if (topClose) {
      drumbeat.close();
    } else {
      history.goBack();
    }
  };
  // 回到
  const backToArea = () => {
    var backlen = history.length - 1;
    history.go(-backlen);
  };
  const stateValue = (data: number) => {
    let typeValue = '';
    switch (data) {
      case 0:
        typeValue = '待对账';
        break;
      case 1:
        typeValue = '已对账';
        break;
      case 2:
        typeValue = '有异议';
        break;
      case 9:
        typeValue = '全部';
        break;
      default:
        typeValue = '-';
        break;
    }
    return typeValue;
  };

  useEffect(() => {
    convertCSCTokenFN();
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     queryAreaDataFun()
  //   }, 2000);
  // },[])
  return (
    <KeepAlive>
      <PullToRefresh
        onRefresh={async () => {
          await sleep(1000);
          refreshFun();
        }}
      >
        <div>
          {/* <CustomNavBar
            title={location.query.title || '对账单'}
            subTitle={''}
            onBack={navBack}
            backArrow={
              topClose ? (
                <CloseOutline fontSize={22} />
              ) : (
                <LeftOutline fontSize={22} />
              )
            }
            backTop={backToArea}
          /> */}
          {/* 数据表 */}
          {dataSource &&
            dataSource.map((item, index) => {
              return (
                <div className={styles.accInfoBox} key={index}>
                  <div className={styles.accInfoBoxMain}>
                    <div className={styles.accInfoBoxTop}>
                      <p className={styles.accInfoBoxTopLeft}>
                        {item.IntervalName}
                      </p>
                      <p className={styles.accInfoBoxTopRight}>
                        {/* {stateValue(item.State)} */}
                      </p>
                    </div>
                    <div className={styles.accInfoBoxbottom}>
                      <p className={styles.accInfoBoxbottomLeft}>
                        初期金额：{MonyInIt(item.BeginMoney)}
                      </p>
                      <p className={styles.accInfoBoxbottomRight}>
                        期末金额：{MonyInIt(item.EndMoney)}
                      </p>
                    </div>
                    <div className={styles.accInfoBoxbottom}>
                      <p className={styles.accInfoBoxbottomLeft}>
                        收入金额：{MonyInIt(item.InMoney)}
                      </p>
                      <p className={styles.accInfoBoxbottomRight}>
                        支出金额：{MonyInIt(item.OutMoney)}
                      </p>
                    </div>
                    <div className={styles.accInfoBoxbtn}>
                      <div
                        className={styles.btnInfo}
                        onClick={() => jumpFun(item)}
                      >
                        查看详情
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          {!dataSource ||
            (dataSource.length < 1 && <Empty description="暂无数据" />)}
        </div>
      </PullToRefresh>
    </KeepAlive>
  );
};

export default (props: any) => {
  return (
    <KeepAlive
      id={props.location.query.urlparams || props.location.pathname}
      when={() => {
        if (props.history.action == 'POP') {
          return false;
        }
        return true;
      }}
      saveScrollPosition="screen"
    >
      <AgentSaleByArea />
    </KeepAlive>
  );
};
