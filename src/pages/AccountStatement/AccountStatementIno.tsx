import React, { useState, useEffect } from 'react';
import { history, useLocation, KeepAlive } from 'umi';
import { LeftOutline, CloseOutline } from 'antd-mobile-icons';
import MyBaseTable from '@/components/CustomTables/MyBaseTable';
import { getsinglecustomerrecon, getreconciliation } from './service';
import { PullToRefresh, Toast } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import CustomNavBar from '@/components/CustomNavBar';
import { drumbeat } from '@drbt/android-h5-sdk';
import styles from './index.less';
import { getTimestampFun, MonyInIt, formateDateymd } from '@/utils/common';
import moment from 'moment';

const AgentSaleByArea: React.FC = () => {
  const location: any = useLocation();
  const query_obj = location.query.urlparams
    ? JSON.parse(location.query.urlparams)
    : '';
  const [filterData, setFilterData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [main, setMain] = useState<any>({});
  const [topClose, setTopClose] = useState<boolean>(false); // 导航栏关闭按钮
  const columns = [
    {
      lock: true,
      code: 'AccountDate',
      name: '日期',
      width: 60,
      align: 'center',
      render: (value: any, record: any, rowIndex: number) => {
        return moment(value).format('MM-DD');
      },
    },
    {
      code: 'InMoney',
      name: '收入金额',
      width: 100,
      align: 'center',
      //  features: { sortable: true },
      render: (value: any, record: any, rowIndex: number) => {
        return MonyInIt(value);
      },
    },
    {
      code: 'OutMoney',
      name: '支出金额 ',
      width: 100,
      align: 'center',
      //  features: { sortable: true },
      render: (value: any, record: any, rowIndex: number) => {
        return MonyInIt(value);
      },
    },
    {
      code: 'EndMoney',
      name: '结余金额',
      width: 100,
      align: 'center',
      //  features: { sortable: true },
      render: (value: any, record: any, rowIndex: number) => {
        return MonyInIt(value);
      },
    },
    {
      code: 'BillType',
      name: '单据类型',
      width: 80,
      align: 'center',
      render: (value: any, record: any, rowIndex: number) => {
        return stateType(value);
      },
    },
  ];
  // 头部筛选变动
  const topCheckSumbit = (top: any) => {
    let newfilter = { ...filterData.filter, ...top };
    if (top.query_date_type === 'Custom') {
    } else {
      setFilterData((vals: any) => {
        return { ...vals, filter: newfilter };
      });
    }
  };
  // 查询
  const queryAreaDataFun = async () => {
    setLoading(true);
    const res = await getsinglecustomerrecon({
      CompanyId: query_obj.CompanyId,
      CustomerId: query_obj.CustomerId,
      ReconciliationId: query_obj.ReconciliationId,
    });
    setLoading(false);
    if (res.StatusCode === 200 && res.Entity) {
      let resData = JSON.parse(res.Entity);
      console.log(resData);
      setDataSource(resData.Detail ? resData.Detail : []);
      setMain(resData.Main ? resData.Main : {});
    } else {
      setDataSource([]);
      setMain({});
    }
  };
  // 下拉刷新
  const refreshFun = () => {
    queryAreaDataFun();
  };
  // 排序
  // const sortChange = (sort_obj: SortItem[]) => {
  //   if (sort_obj.length > 0) {
  //     setFilterData((vals: any) => {
  //       return { ...vals, sidx: sort_obj[0].code, sord: sort_obj[0].order };
  //     });
  //   } else {
  //     setFilterData((vals: any) => {
  //       return { ...vals, sidx: '', sord: '' };
  //     });
  //   }
  //   queryAreaDataFun();
  // };
  // 行点击
  const jumpFun = (row: any) => {
    if (row) {
      let urlparams: any;
      //  出库
      if (
        row.BillType === 5 ||
        row.BillType === 1 ||
        row.BillType === 7 ||
        row.BillType === 3
      ) {
        urlparams = JSON.stringify({
          OutId: row.BillId,
        });
      } else if (row.BillType === 0) {
        // 收款单
        urlparams = JSON.stringify({
          ReceiveId: row.BillId,
          CompanyId: query_obj.CompanyId,
        });
      } else if (row.BillType === 4) {
        // 补差单
        urlparams = JSON.stringify({
          companyId: query_obj.CompanyId,
          customerId: query_obj.CustomerId,
          DiscountId: row.BillId,
        });
      } else if (row.BillType === 2 || row.BillType === 6) {
        // 直接销售退
        urlparams = JSON.stringify({
          OutId: row.BillId,
        });
      } else {
        Toast.show({
          icon: 'fail',
          content: '单据不存在！',
        });
        return;
      }
      history.push({
        pathname: '/accountDetail',
        query: {
          urlparams,
          BillType: row.BillType,
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
  // switch (BillType) {
  //   case 0:
  //     value = '销售收款单'
  //     break
  //   case 1:
  //     value = '直接销售出库'
  //     break
  //   case 2:
  //     value = '直接销售退'
  //     break
  //   case 3:
  //     value = '客户期初单'
  //     break
  //   case 4:
  //     value = '折扣补差单'
  //     break
  //   case 5:
  //     value = '销售出库'
  //     break
  //   case 6:
  //     value = '销售退货'
  //     break
  //  case 7:
  //     value = '消费链订单'
  //     break
  //   case 8:
  //     value = '代销结算单'
  //     break
  // }
  // 单据类型
  const stateType = (state: any) => {
    let val = '';
    switch (state) {
      case 0:
        val = '收款单';
        break;
      case 1:
        val = '出库单';
        break;
      case 2:
        val = '退货单';
        break;
      case 3:
        val = '期初单';
        break;
      case 4:
        val = '补差单';
        break;
      case 5:
        val = '出库单';
        break;
      case 6:
        val = '退货单';
        break;
      case 7:
        val = '出库单';
        break;
      default:
        val = '-';
        break;
    }
    return val;
  };
  // 回到区域层
  const backToArea = () => {
    var backlen = history.length - 1;
    history.go(-backlen);
  };
  useEffect(() => {
    queryAreaDataFun();
  }, []);
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
            title={location.query.title || '对账单详情'}
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
          <div className={styles.accInfoBoxMainInfo}>
            <div className={styles.accInfoBoxbottom}>
              <p
                className={styles.accInfoBoxbottomLeft}
                style={{ color: '#404040', fontWeight: 'bold' }}
              >
                {query_obj.dataTime}
              </p>
              <p
                className={styles.accInfoBoxbottomRight}
                style={{ color: '#c15816', fontWeight: 'bold' }}
              >
                {/* {stateValue(main.State)} */}
              </p>
            </div>
            <div className={styles.accInfoBoxbottom}>
              <p className={styles.accInfoBoxbottomLeft}>
                初期金额：{MonyInIt(main.BeginMoney)}
              </p>
              <p className={styles.accInfoBoxbottomRight}>
                期末金额：{MonyInIt(main.EndMoney)}
              </p>
            </div>
            <div className={styles.accInfoBoxbottom}>
              <p className={styles.accInfoBoxbottomLeft}>
                收入金额：{MonyInIt(main.InMoney)}
              </p>
              <p className={styles.accInfoBoxbottomRight}>
                支出金额：{MonyInIt(main.OutMoney)}
              </p>
            </div>
          </div>
          {/* 数据表 */}
          <MyBaseTable
            primaryKey="BillId"
            loading={loading}
            dataSource={dataSource}
            columns={columns}
            isSum={false}
            // sortClick={(sort) => sortChange(sort)}
            rowClick={(row) => jumpFun(row)}
          />
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
