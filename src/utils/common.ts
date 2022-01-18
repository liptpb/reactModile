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
/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const accAdd = (arg1: number, arg2: number) => {
  if (!(typeof arg1 === 'number' && !isNaN(arg1))) {
    arg1 = 0;
  }
  if (!(typeof arg2 === 'number' && !isNaN(arg2))) {
    arg2 = 0;
  }
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', '')) * cm;
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm;
      arg2 = Number(arg2.toString().replace('.', ''));
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''));
    arg2 = Number(arg2.toString().replace('.', ''));
  }
  return (arg1 + arg2) / m;
};
/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
export const accSub = (arg1: number, arg2: number) => {
  if (!(typeof arg1 === 'number' && !isNaN(arg1))) {
    arg1 = 0;
  }
  if (!(typeof arg2 === 'number' && !isNaN(arg2))) {
    arg2 = 0;
  }
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
};
/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
export const accMul = (arg1: number, arg2: number) => {
  if (!(typeof arg1 === 'number' && !isNaN(arg1))) {
    arg1 = 0;
  }
  if (!(typeof arg2 === 'number' && !isNaN(arg2))) {
    arg2 = 0;
  }
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) {}
  try {
    m += s2.split('.')[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
    Math.pow(10, m)
  );
};
/**
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
//  export const accDiv = (arg1: number, arg2: number) => {
//   var t1 = 0, t2 = 0, r1, r2;
//   try {
//       t1 = arg1.toString().split(".")[1].length;
//   }
//   catch (e) {
//   }
//   try {
//       t2 = arg2.toString().split(".")[1].length;
//   }
//   catch (e) {
//   }
//   with (Math) {
//       r1 = Number(arg1.toString().replace(".", ""));
//       r2 = Number(arg2.toString().replace(".", ""));
//       return (r1 / r2) * pow(10, t2 - t1);
//   }
// }
