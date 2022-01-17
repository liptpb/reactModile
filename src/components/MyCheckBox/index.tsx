import { CheckList, Empty, Popup } from 'antd-mobile';
import React from 'react';

type CheckBoxType = {
  mult?: boolean;
  visible: boolean;
  data: any;
  defaultArr?: string[];
  onCancel: () => void;
  onSumbit: (vals: any) => void;
};
const MyCheckBox: React.FC<CheckBoxType> = (props) => {
  const { mult, visible, data, defaultArr, onCancel, onSumbit } = props;
  const checkChange = (vs: any) => {
    onSumbit(vs);
  };
  return (
    <Popup
      visible={visible}
      onMaskClick={onCancel}
      bodyStyle={{
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        height: '50vh',
        overflowY: 'scroll',
      }}
    >
      {data.length > 0 ? (
        <CheckList multiple={mult} value={defaultArr} onChange={checkChange}>
          {data.map((item: { value: string; label: string }) => (
            <CheckList.Item key={item.value} value={item.value}>
              {item.label}
            </CheckList.Item>
          ))}
        </CheckList>
      ) : (
        <Empty />
      )}
    </Popup>
  );
};

export default MyCheckBox;
