import { Collapse, Space } from 'antd-mobile';
import React, { useState } from 'react';
import styles from './index.less';

type TopCheckType = {
  onSumbit: (vals: any) => void;
  date_type?: string;
  model_type?: number;
};
let init_date_data: OptionItem[] = [
  { label: '昨日', value: 'Yesterday', checked: true },
  { label: '本月', value: 'ThisMonth', checked: false },
  { label: '筛选条件', value: 'Custom', checked: false },
];
let init_model_data: OptionItem[] = [
  { label: '手机', value: 1, checked: true },
  { label: 'IOT', value: 3, checked: false },
  { label: '全部', value: 99, checked: false },
];
const TopCheckBox: React.FC<TopCheckType> = (props) => {
  const { onSumbit, date_type, model_type } = props;
  if (date_type) {
    init_date_data.forEach((v) => {
      if (v.value === date_type) {
        v.checked = true;
      } else {
        v.checked = false;
      }
    });
  }
  if (model_type) {
    init_model_data.forEach((v) => {
      if (v.value === model_type) {
        v.checked = true;
      } else {
        v.checked = false;
      }
    });
  }
  const [dateData, setDateData] = useState<OptionItem[]>(init_date_data);
  const [modelData, setModelData] = useState<OptionItem[]>(init_model_data);

  const chooseFun = (type: string, index: number, val: string | number) => {
    if (type === 'date') {
      let newarr = JSON.parse(JSON.stringify(dateData));
      newarr.forEach((d: { checked: boolean }) => {
        return (d.checked = false);
      });
      newarr[index].checked = true;
      setDateData(newarr);
      onSumbit({
        query_date_type: val,
      });
    } else if (type === 'model') {
      let newarr2 = JSON.parse(JSON.stringify(modelData));
      newarr2.forEach((d: { checked: boolean }) => {
        return (d.checked = false);
      });
      newarr2[index].checked = true;
      setModelData(newarr2);
      onSumbit({
        model_type: val,
      });
    }
  };

  return (
    <Collapse defaultActiveKey={['1']} className={styles.mycollapse}>
      <Collapse.Panel key="1" title="数据查询">
        <div className={styles.checkBox}>
          <span>日期：</span>
          <Space style={{ '--gap': '12px' }}>
            {dateData.map((d, dix) => (
              <div
                key={d.value}
                className={[
                  d.checked ? styles.action_btn : styles.default_btn,
                  styles.base_btn,
                ].join(' ')}
                onClick={() => chooseFun('date', dix, d.value)}
              >
                {d.label}
              </div>
            ))}
          </Space>
        </div>
        <div className={styles.checkBox}>
          <span>类型：</span>
          <Space style={{ '--gap': '12px' }}>
            {modelData.map((d, dix) => (
              <div
                key={d.value}
                className={[
                  d.checked ? styles.action_btn : styles.default_btn,
                  styles.base_btn,
                ].join(' ')}
                onClick={() => chooseFun('model', dix, d.value)}
              >
                {d.label}
              </div>
            ))}
          </Space>
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};

export default TopCheckBox;
