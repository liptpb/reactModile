/**
 * @description 字符串左边不足补0
 * @param {*} str 字符串
 */
export const padLeftZero = (str: any) => {
  return ('00' + str).substr(str.length);
};
/**
 * @description 日期格式化
 * @param {Date,String} date 日期
 * @param {*} fmt 格式化样式 yyyy-MM-dd HH:mm:ss
 */
export const formatDate = (
  dateStr: string | number | Date | undefined,
  fmt: string,
) => {
  if (dateStr === undefined) return '';
  const date = new Date(dateStr);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (const k in o) {
    const str = o[k] + '';
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str),
      );
    }
  }
  return fmt;
};
// 根据value【】返回指定数组
export const filterValueHasFun = (arr1: any[], arr2: string[]) => {
  return arr1.filter(
    (itema) => arr2.filter((itemb) => itemb === itema.value).length > 0,
  );
};

// 根据date转换年月日
export const formateDateymd = (date: Date) => {
  let year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if (Number(month) < 10) {
    month = '0' + month;
  }
  if (Number(day) < 10) {
    day = '0' + day;
  }
  return Number(year + month + day);
};

// 根据 20200101 转 2020-01-01
export const formateIntToStringFun = (time: number) => {
  if (time > 0) {
    let timeStr = time.toString();
    let _year = timeStr.substr(0, 4);
    let _month = timeStr.substr(4, 2);
    let _day = timeStr.substr(6, 2);
    let newtime = _year + '-' + _month + '-' + _day;
    return newtime;
  }
  return '';
};

// 获取时间戳string
export const getTimestampFun = () => {
  return new Date().getTime().toString();
};
/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
export const MonyInIt = (num: any) => {
  if (!num) {
    return '0.00';
  }
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num)) num = '0';
  let sign: any = num == (num = Math.abs(num));
  num = Math.floor(num * 100 + 0.50000000001);
  let cents: any = num % 100;
  num = Math.floor(num / 100).toString();
  if (cents < 10) cents = '0' + cents;
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num =
      num.substring(0, num.length - (4 * i + 3)) +
      ',' +
      num.substring(num.length - (4 * i + 3));
  return formatnumber((sign ? '' : '-') + num + '.' + cents, 2);
};
// 金额千位符
export const MonyInIt1 = (num: any) => {
  if (!num) {
    return '0.00';
  }
  var decimal = String(num).split('.')[1] || ''; //小数部分
  var tempArr = [];
  var revNumArr = String(num).split('.')[0].split('').reverse(); //倒序
  for (let i in revNumArr) {
    tempArr.push(revNumArr[i]);
    if ((i + 1) % 3 === 0 && i != revNumArr.length - 1) {
      tempArr.push(',');
    }
  }
  var zs = tempArr.reverse().join(''); //整数部分
  return formatnumber(decimal ? zs + '.' + decimal : zs, 2);
};
// 小数点补齐
export const formatnumber = (value: string, num: number) => {
  let _value = value.toString();
  let _dot = _value.indexOf('.');
  let _valueLen = _value.length;
  if (num == 0) {
    if (_dot != -1) {
      _value = _value.substring(0, _dot);
    }
  } else {
    //如果没有小数点
    if (_dot == -1) {
      _value = _value + '.';
      for (let i = 1; i <= num; i++) {
        _value = _value + '0';
      }
    } else {
      //有小数点，超出位数自动截取，否则补0
      _value = _value.substring(0, _dot + num + 1);
      for (let i = _valueLen; i <= _dot + num; i++) {
        _value = _value + '0';
      }
    }
  }
  return _value;
};
