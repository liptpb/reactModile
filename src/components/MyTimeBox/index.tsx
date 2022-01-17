import { DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';

type TimeType = {
  timeVal: number;
  max?: number;
  min?: number;
  timeType?: string;
  visible: boolean;
  onCancel: () => void;
  onSumbit: (vals: number) => void;
};
const MyTimeBox: React.FC<TimeType> = (props) => {
  const { timeVal, max, min, timeType, visible, onCancel, onSumbit } = props;
  const dateValue = new Date(timeVal);
  // const dateValue = timeVal && typeof timeVal === 'string' ? moment(timeVal) : timeVal;
  // const defaultDateValue = defaultValue && typeof defaultValue === 'string' ? moment(defaultValue) : defaultValue;
  return (
    <>
      <DatePicker
        defaultValue={dateValue}
        max={max}
        min={min}
        precision={timeType}
        visible={visible}
        onClose={onCancel}
        onConfirm={(val: Date) => {
          onSumbit(Number(new Date(val)));
        }}
      />
    </>
  );
};

export default MyTimeBox;
