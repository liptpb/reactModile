/*
 * @Author: li
 * @Date: 2022-01-13 15:47:16
 * @LastEditors: li
 * @LastEditTime: 2022-01-14 09:29:40
 * @Description:
 */
import request from '@/utils/request';

const windowConfig = window.globalConfig;

//
export async function getreconciliation(data: any) {
  return request(
    `${windowConfig.middleapi.scaccountapi}/customerreconciliation/getreconciliationlistbyapp`,
    {
      method: 'post',
      data,
    },
  );
}
export async function getsinglecustomerrecon(params: any) {
  return request(
    `${windowConfig.middleapi.scaccountapi}/customerreconciliation/getsinglecustomerreconciliationcontainmaterialbyapp`,
    {
      method: 'get',
      params,
    },
  );
}
//  出库
export async function getsaleoutinfo(params: any) {
  return request(`billapi/saleout/getsaleoutinfo`, {
    method: 'get',
    params,
  });
}
//  收款单
export async function getreceivedetaillist(params: any) {
  return request(
    `${windowConfig.middleapi.scaccountapi}/receive/getreceivedetaillist`,
    {
      method: 'get',
      params,
    },
  );
}
//  补差单
export async function getdiscountinfo(params: any) {
  return request(`billapi/discount/getdiscountinfo`, {
    method: 'get',
    params,
  });
}
//  退货单
export async function getsaleoutinfo1(params: any) {
  return request(`billapi/saleout/getsaleoutinfo`, {
    method: 'get',
    params,
  });
}
