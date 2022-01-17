window.globalConfig = {
  baseapi: 'http://open.drumbeatsoft.com:8887/',
  // baseapi: 'http://192.168.70.203:8887/',
  middleapi: {
    scaccountapi: 'scaccountapi',
  },
  defaultPagination: {
    showSizeChanger: true,
    defaultPageSize: 10,
    defaultCurrent: 1,
    pageSizeOptions: ['10', '20', '50', '100'],
    sidx: '', // 排序列
    sord: 'ASC', // 排序类型
    records: 0, // 总记录数
  },
};
