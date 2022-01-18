/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import { getToken, clearAuthority } from './authority';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
// 错误提示fun
const typeNoticeFun = (code: string | number) => {
  let codeNum = Number(code);
  const errorText = codeMessage[codeNum];
  if (
    codeNum === 400 ||
    codeNum === 404 ||
    codeNum === 405 ||
    codeNum === 412
  ) {
    notification.warning({
      message: `Warning`,
      description: errorText,
    });
  } else if (codeNum >= 500 && codeNum <= 599) {
    notification.error({
      message: `Error`,
      description: codeMessage[code],
    });
  } else {
    notification.info({
      message: `Info`,
      description: errorText,
    });
  }
};
/**
 * request异常处理程序
 */
const errorHandler = (error: any): Response => {
  const { response } = error;
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
    return {} as Response;
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  prefix: (<any>window).globalConfig.baseapi || '',
  errorHandler, // 默认错误处理
  // credentials: 'include', // 默认请求是否带上cookie
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url: any, options: any) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization:
      'eyJUeXBlIjowLCJFbmNyeXB0TW9kZSI6MCwiVGltZVN0YW1wIjoiMjAyMi0wMS0xOCAxMToyNTowMiJ9.IntcIlVzZXJJZFwiOlwiYTU3NzFjZjAyMjE5NDExNDkxMjllYWE4NzFhZGUxMGRcIixcIkZ1bGxOYW1lXCI6XCLlr7notKYx5Y+3XCIsXCJSb2xlSWRcIjpcImExY2YwY2ZhNDNlYTRhYjRiMGQyZmFiMWFhMDkxYzZmXCIsXCJTeXNGbGFnXCI6bnVsbH0i.fLqOfTkbNhXRM5PJDVvLa9E8S7hMFNKoezSsePDdNik=',
  };
  return {
    url,
    options: {
      ...options,
      headers,
    },
  };
});

export type dataResponse = {
  code: number;
  data: any;
  message?: string;
};
/**
 * 返回体异常处理程序
 */
const dataHandler = (resBody: dataResponse): dataResponse => {
  const { code } = resBody;
  if (code && code !== 200) {
    typeNoticeFun(code);
  }
  return resBody;
};
// response拦截器, 处理response
request.interceptors.response.use(async (response) => {
  if (response && response.status === 401) {
    typeNoticeFun(401);
    setTimeout(() => {
      clearAuthority();
    }, 3000);
  } else if (response && response.status === 400) {
    typeNoticeFun(400);
  } else if (response && response.status === 403) {
    typeNoticeFun(403);
    return {} as Response;
  } else if (response && response.status === 404) {
    typeNoticeFun(404);
  } else if (response && response.status === 405) {
    typeNoticeFun(405);
  } else if (response && response.status === 412) {
    typeNoticeFun(412);
  } else {
    const data = await response.clone().json();
    dataHandler(data);
  }
  return response;
});

export default request;
