import request from '@/utils/request';

const windowConfig = window.globalConfig;

// demo post
export async function query(data: any) {
  return request(`${windowConfig.middleapi.app}/role/query`, {
    method: 'post',
    data,
  });
}

// demo get
export async function getdetail(params: any) {
  return request(`${windowConfig.middleapi.app}/role/query`, {
    method: 'get',
    params,
  });
}

// 筛选条件---区域查询
export async function getAreaList() {
  return request(`${windowConfig.middleapi.marketing}/serch/query_area`, {
    method: 'get',
  });
}

// 筛选条件---客户分类查询
export async function getCateList() {
  return request(
    `${windowConfig.middleapi.marketing}/serch/query_customer_category`,
    {
      method: 'get',
    },
  );
}

// 筛选条件---模块标签查询
export async function getTagList(params: any) {
  return request(`${windowConfig.middleapi.marketing}/serch/query_model_tags`, {
    method: 'get',
    params,
  });
}
