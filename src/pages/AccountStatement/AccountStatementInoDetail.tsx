import React, { useState, useEffect } from 'react';
import { history, useLocation, KeepAlive } from 'umi';
import { LeftOutline, CloseOutline } from 'antd-mobile-icons';
import MyBaseTable from '@/components/CustomTables/MyBaseTable';
import {
  getsaleoutinfo1,
  getdiscountinfo,
  getreceivedetaillist,
  getsaleoutinfo,
} from './service';
import { PullToRefresh, Result, Image, Toast } from 'antd-mobile';
import { sleep } from 'antd-mobile/es/utils/sleep';
import CustomNavBar from '@/components/CustomNavBar';
import { drumbeat } from '@drbt/android-h5-sdk';
import styles from './index.less';
import {
  getTimestampFun,
  MonyInIt,
  formateDateymd,
  accAdd,
} from '@/utils/common';
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
  const [columns, setColumns] = useState<any[]>([]);

  // 查询
  const queryAreaDataFun = async () => {
    setLoading(true);
    let FncName: any;

    if (
      location.query.BillType === 5 ||
      location.query.BillType === 1 ||
      location.query.BillType === 7 ||
      location.query.BillType === 3
    ) {
      //  出库
      FncName = getsaleoutinfo;
      let columns5 = [
        {
          lock: true,
          code: 'ShortName',
          name: '货品信息',
          width: 100,
          align: 'center',
          render: (value: any, record: any, rowIndex: number) => {
            return `${record.ShortName} ${record.Color} ${record.Standard}`;
          },
        },
        {
          code: 'Amount',
          name: '数量',
          width: 100,
          align: 'center',
        },
        {
          code: 'SellMoney',
          name: '总金额',
          width: 100,
          align: 'center',
          //  features: { sortable: true },
          render: (value: any, record: any, rowIndex: number) => {
            return MonyInIt(value);
          },
        },
        {
          code: 'DiscountMoney',
          name: '折扣',
          width: 100,
          align: 'center',
          render: (value: any, record: any, rowIndex: number) => {
            return MonyInIt(value);
          },
        },
      ];
      setColumns(columns5);
    } else if (location.query.BillType === 0) {
      // 收款单
      FncName = getreceivedetaillist;
      let columns0 = [
        {
          lock: true,
          code: 'BopName',
          name: '名称',
          width: 100,
          align: 'center',
        },
        {
          code: 'ReceiveMoney',
          name: '金额',
          width: 100,
          align: 'center',
          //  features: { sortable: true },
          render: (value: any, record: any, rowIndex: number) => {
            return MonyInIt(value);
          },
        },
      ];
      setColumns(columns0);
    } else if (location.query.BillType === 4) {
      // 补差单
      FncName = getdiscountinfo;
      let columns4 = [
        {
          lock: true,
          code: 'ShortName',
          name: '货品信息',
          width: 100,
          align: 'center',
          render: (value: any, record: any, rowIndex: number) => {
            return `${record.ShortName} ${record.Color} ${record.Standard}`;
          },
        },
        {
          code: 'Amount',
          name: '数量',
          width: 100,
          align: 'center',
        },
        {
          code: 'SellMoney',
          name: '总金额',
          width: 100,
          align: 'center',
          //  features: { sortable: true },
          render: (value: any, record: any, rowIndex: number) => {
            return MonyInIt(value);
          },
        },
      ];
      setColumns(columns4);
    } else if (location.query.BillType === 2 || location.query.BillType === 6) {
      // 退货单
      let columns4 = [
        {
          lock: true,
          code: 'ShortName',
          name: '货品信息',
          width: 100,
          align: 'center',
          render: (value: any, record: any, rowIndex: number) => {
            return `${record.ShortName} ${record.Color} ${record.Standard}`;
          },
        },
        {
          code: 'Amount',
          name: '数量',
          width: 100,
          align: 'center',
        },
        {
          code: 'SellMoney',
          name: '总金额',
          width: 100,
          align: 'center',
          //  features: { sortable: true },
          render: (value: any, record: any, rowIndex: number) => {
            return MonyInIt(value);
          },
        },
      ];
      setColumns(columns4);
      FncName = getsaleoutinfo1;
    } else {
      Toast.show({
        icon: 'fail',
        content: '单据不存在！',
      });
      return;
    }
    const res = await FncName(query_obj);
    setLoading(false);
    if (res.StatusCode === 200 && res.Entity) {
      let resData = JSON.parse(res.Entity);
      console.log(resData);
      setDataSource(resData.Detail ? resData.Detail : []);
      // if(location.query.BillType===5 || location.query.BillType===4 || location.query.BillType===2 || location.query.BillType===1 ){  //  出库
      if (location.query.BillType === 0) {
        let anumber: number = 0,
          monny: number = 0;
        resData.Detail.forEach(
          (element: { Amount: number; ReceiveMoney: number }) => {
            anumber = anumber + 1;
            monny = accAdd(monny, element.ReceiveMoney);
          },
        );
        resData.Main.AmountAll = anumber;
        resData.Main.MoneyAll = monny;
      } else {
        let anumber: number = 0,
          monny: number = 0;
        resData.Detail.forEach(
          (element: { Amount: number; SellMoney: number }) => {
            anumber = anumber + element.Amount;
            monny = accAdd(monny, element.SellMoney);
          },
        );
        resData.Main.AmountAll = anumber;
        resData.Main.MoneyAll = monny;
      }
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

  // 标题返回触发
  const navBack = () => {
    if (topClose) {
      drumbeat.close();
    } else {
      history.goBack();
    }
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
        val = '销售收款单';
        break;
      case 1:
        val = '销售出库单';
        break;
      case 2:
        val = '销售退货单';
        break;
      case 3:
        val = '客户期初单';
        break;
      case 4:
        val = '折扣补差单';
        break;
      case 5:
        val = '销售出库单';
        break;
      case 6:
        val = '销售退货单';
        break;
      case 7:
        val = '销售出库单';
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
          <CustomNavBar
            title={location.query.title || '交易详情'}
            onBack={navBack}
            backArrow={
              topClose ? (
                <CloseOutline fontSize={22} />
              ) : (
                <LeftOutline fontSize={22} />
              )
            }
            backTop={backToArea}
          />
          <div className={styles.accInfoBoxMainInfo}>
            <div className={styles.accInfoBoxImg}>
              <Image
                src={
                  location.query.BillType === 5 ||
                  location.query.BillType === 1 ||
                  location.query.BillType === 7 ||
                  location.query.BillType === 3
                    ? require('./../../assets/1.png')
                    : location.query.BillType === 0
                    ? require('./../../assets/3.png')
                    : location.query.BillType === 4
                    ? require('./../../assets/2.png')
                    : location.query.BillType === 2 ||
                      location.query.BillType === 6
                    ? require('./../../assets/4.png')
                    : require('./../../assets/2.png')
                }
                width={40}
                height={40}
                fit="cover"
                style={{ borderRadius: 32 }}
              />
              <p className={styles.accInfoBoxImgP1}>
                {stateType(location.query.BillType)}
              </p>
              <p className={styles.accInfoBoxImgP2}>
                {MonyInIt(main.MoneyAll)}
              </p>
            </div>
            <div className={styles.accInfoBoxbottom}>
              <p className={styles.accInfoBoxbottomLeft}>总计数量</p>
              <p className={styles.accInfoBoxbottomRight}>{main.AmountAll}</p>
            </div>
            <div className={styles.accInfoBoxbottom}>
              <p className={styles.accInfoBoxbottomLeft}>总金额</p>
              <p className={styles.accInfoBoxbottomRight}>
                {MonyInIt(main.MoneyAll)}
              </p>
            </div>

            {(location.query.BillType === 5 ||
              location.query.BillType === 1 ||
              location.query.BillType === 7 ||
              location.query.BillType === 3) && (
              <>
                <div className={styles.accInfoBoxbottom}>
                  <p className={styles.accInfoBoxbottomLeft}>折扣金额</p>
                  <p className={styles.accInfoBoxbottomRight}>
                    {MonyInIt(main.DiscountMoney)}
                  </p>
                </div>
                <div className={styles.accInfoBoxbottom}>
                  <p className={styles.accInfoBoxbottomLeft}>合计金额</p>
                  <p className={styles.accInfoBoxbottomRight}>
                    {MonyInIt(main.MoneyAll)}
                  </p>
                </div>
              </>
            )}
            <div className={styles.accInfoBoxbottom}>
              <p className={styles.accInfoBoxbottomLeft}>单据编码</p>
              <p className={styles.accInfoBoxbottomRight}>{main.BillNumber}</p>
            </div>
            <div className={styles.accInfoBoxbottom}>
              <p className={styles.accInfoBoxbottomLeft}>备注信息</p>
              <p className={styles.accInfoBoxbottomRight}>{main.Description}</p>
            </div>
            <div className={styles.accInfoBoxbottom}>
              <p className={styles.accInfoBoxbottomLeft}>交易时间</p>
              <p className={styles.accInfoBoxbottomRight}>
                {moment(main.CreateDate).format('YYYY-MM-DD HH:mm:ss')}
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
