import React, { useState, useEffect } from 'react';
import {
  Button,
  Collapse,
  DatePicker,
  Empty,
  Popup,
  Selector,
  Space,
} from 'antd-mobile';
import {
  filterValueHasFun,
  formatDate,
  formateDateymd,
  formateIntToStringFun,
} from '@/utils/common';
import styles from './index.less';
import MyCheckBox from '../MyCheckBox';
import { getAreaList, getCateList, getTagList } from '@/pages/service';

type ModalType = {
  visible: boolean;
  startTime?: number;
  endTime?: number;
  onCancel: () => void;
  onSumbit: (vals: any) => void;
};
// 转换数组
export const exchangeTagSelectorArrFun = (arr: TagOptionItem[]) => {
  let newArr: OptionItem[] = [];
  if (arr.length > 0) {
    newArr = arr.map((item) => {
      return {
        label: item.tag_name,
        value: item.tag_classify_id,
      };
    });
  }
  return newArr;
};
const ModalAgent: React.FC<ModalType> = (props) => {
  const { visible, startTime, endTime, onCancel, onSumbit } = props;
  let init_start, init_end, init_areaIds;
  if (startTime && startTime > 0) {
    init_start = new Date(formateIntToStringFun(startTime));
  }
  if (endTime && endTime > 0) {
    init_end = new Date(formateIntToStringFun(endTime));
  }
  const [startTimeDate, setStartTimeDate] = useState<Date>(
    init_start || new Date(),
  ); // 开始时间需要转时间戳
  const [startTimeVisible, setStartTimeVisible] = useState<boolean>(false);
  const [endTimeDate, setEndTimeDate] = useState<Date>(init_end || new Date()); // 结束时间需要转时间戳
  const [endTimeVisible, setEndTimeVisible] = useState<boolean>(false);
  const [areaVisible, setAreaVisible] = useState<boolean>(false);
  const [areaName, setAreaName] = useState<string>('请选择');
  const [areaIds, setAreaIds] = useState<string[]>([]); // 区域ids
  const [defActiveKey, setDefActiveKey] = useState<string[]>(['category']);
  const [areaList, setAreaList] = useState<OptionItem[]>([]); // 区域元数据
  const [category, setCategory] = useState<(string | number)[]>([]); // 客户分类元ids
  const [customerList, setCustomerList] = useState<OptionItem[]>([]); // 客户分类元数据
  const [tagList, setTagList] = useState<TagItem[]>([]); // 动态标签元数据
  const [tagIds, setTagIds] = useState<string[]>([]); // 动态标签tag_ids

  // 重置
  const restFun = () => {
    setStartTimeDate(new Date());
    setEndTimeDate(new Date());
    setAreaName('请选择');
    setAreaIds([]);
    setCategory([]);
    setTagIds([]);
    let newArr: TagItem[] = [];
    tagList.forEach((v: TagItem) => {
      newArr.push({
        is_multiple: v.is_multiple,
        tag_group_name: v.tag_group_name,
        custom_arr: [],
        tags_outputs: v.tags_outputs,
      });
    });
    setTagList(newArr);
  };
  // 确定提交
  const submitFun = () => {
    onSumbit({
      query_date_type: 'Custom',
      area_id: areaIds[0] || '',
      category: category[0],
      tag_ids: tagIds,
      start_date: formateDateymd(startTimeDate),
      end_date: formateDateymd(endTimeDate),
    });
  };

  // 区域数据
  const getAreaListFun = async () => {
    const areaRes = await getAreaList();
    if (areaRes.code === 200) {
      let newList = areaRes.data.map(
        (rs: { area_name: string; area_id: string }) => {
          return {
            label: rs.area_name,
            value: rs.area_id,
          };
        },
      );
      setAreaList(newList);
    }
  };
  // 客户分类数据
  const getCustomerListFun = async () => {
    const cusRes = await getCateList();
    if (cusRes.code === 200) {
      let newList = cusRes.data.map(
        (rs: { category_name: string; category_value: string }) => {
          return {
            label: rs.category_name,
            value: rs.category_value,
          };
        },
      );
      setCustomerList(newList);
    }
  };
  // 客户分类选中回绑
  const cusSelect = (cus: (string | number)[]) => {
    setCategory(cus);
  };
  // 动态标签数据
  const getTagListFun = async () => {
    const tagRes = await getTagList({
      model_type: 0,
    });
    if (tagRes.code === 200) {
      let newArr: TagItem[] = [];
      let expantArr: string[] = [];
      tagRes.data.forEach((v: TagItem) => {
        newArr.push({
          is_multiple: v.is_multiple,
          tag_group_name: v.tag_group_name,
          custom_arr: [], // 为了绑定选中ids
          tags_outputs: v.tags_outputs,
        });
        expantArr.push(v.tag_group_name);
      });
      setTagList(newArr);
      setDefActiveKey((vals: any) => {
        return [...vals, ...expantArr];
      });
    }
  };
  // 动态标签选中回绑
  const tagSelect = (tags: (string | number)[], idx: number) => {
    let newArr = JSON.parse(JSON.stringify(tagList));
    newArr[idx].custom_arr = tags;
    setTagList(newArr);
    let arr2: string[] = [];
    newArr.forEach((t: { custom_arr: string[] }) => {
      t.custom_arr.forEach((tt) => {
        arr2.push(tt);
      });
    });
    setTagIds(arr2);
  };
  // 区域数据处理
  const areaSumbit = (vals: string[]) => {
    setAreaIds(vals);
    let newList = filterValueHasFun(areaList, vals);
    if (newList.length > 0) {
      let names: string[] = [];
      newList.forEach((vv) => {
        names.push(vv.label);
      });
      setAreaName(names.join('、'));
    } else {
      setAreaName('请选择');
    }
  };
  useEffect(() => {
    getAreaListFun();
    getCustomerListFun();
    getTagListFun();
  }, []);
  return (
    <>
      <Popup
        visible={visible}
        onMaskClick={() => {
          onCancel();
        }}
        position="right"
        bodyStyle={{
          width: '81vw',
          padding: '35px 8px 5px 10px',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
        }}
      >
        {/* 内容添加滚动条 */}
        <div className={styles.middlebox}>
          <p style={{ marginBottom: '10px', fontSize: '14px' }}>选择时间</p>
          <Space justify="center" block align="center">
            <div
              className={styles.time}
              onClick={() => setStartTimeVisible(true)}
            >
              {formatDate(startTimeDate, 'yyyy-MM-dd')}
            </div>
            <div
              style={{
                width: '15px',
                height: '1px',
                borderBottom: '1px solid #b1acac',
              }}
            ></div>
            <div
              className={styles.time}
              onClick={() => setEndTimeVisible(true)}
            >
              {formatDate(endTimeDate, 'yyyy-MM-dd')}
            </div>
          </Space>
          {/* 区域 */}
          <p style={{ margin: '10px 0', fontSize: '14px' }}>区域</p>
          <p className={styles.area} onClick={() => setAreaVisible(true)}>
            {areaName}
          </p>
          {/* 折叠 */}
          <Collapse
            className={styles.cusCollaspe}
            defaultActiveKey={defActiveKey}
          >
            <Collapse.Panel key="category" title="客户分类">
              {customerList.length > 0 ? (
                <Selector
                  columns={3}
                  value={category}
                  options={customerList}
                  multiple={false}
                  onChange={(arr) => cusSelect(arr)}
                />
              ) : (
                <Empty />
              )}
            </Collapse.Panel>
            {tagList.length > 0 &&
              tagList.map((tag, idx) => (
                <Collapse.Panel
                  key={tag.tag_group_name}
                  title={tag.tag_group_name}
                >
                  <Selector
                    columns={3}
                    value={tag.custom_arr}
                    options={exchangeTagSelectorArrFun(tag.tags_outputs)}
                    multiple={Boolean(tag.is_multiple)}
                    onChange={(arr) => tagSelect(arr, idx)}
                  />
                </Collapse.Panel>
              ))}
          </Collapse>
        </div>
        {/* 日期选择器组件 */}
        <DatePicker
          key="startTime"
          defaultValue={startTimeDate}
          visible={startTimeVisible}
          onClose={() => {
            setStartTimeVisible(false);
          }}
          onConfirm={(val) => {
            setStartTimeDate(val);
          }}
        />
        <DatePicker
          key="endTime"
          defaultValue={endTimeDate}
          visible={endTimeVisible}
          onClose={() => {
            setEndTimeVisible(false);
          }}
          onConfirm={(val) => {
            setEndTimeDate(val);
          }}
        />
        <MyCheckBox
          mult={false}
          visible={areaVisible}
          data={areaList}
          defaultArr={areaIds}
          onCancel={() => {
            setAreaVisible(false);
          }}
          onSumbit={(val) => {
            areaSumbit(val);
          }}
        />
        {/* 底部添加操作按钮区域 */}
        <div className={styles.bottombox}>
          <div className={styles.divider}></div>
          <div className={styles.btnbox}>
            <Button className={styles.subtn} onClick={restFun}>
              重置
            </Button>
            <Button className={styles.subtn} onClick={submitFun} color="danger">
              确定
            </Button>
          </div>
        </div>
      </Popup>
    </>
  );
};
export default ModalAgent;
