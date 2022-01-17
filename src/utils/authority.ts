// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage
      ? localStorage.getItem('drumbeat-centralizer-authority')
      : str;
  let authority;
  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }
  if (typeof authority === 'string') {
    return [authority];
  }
  return authority;
}

export function setAuthority(authority: string | string[]): void {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem(
    'drumbeat-centralizer-authority',
    JSON.stringify(proAuthority),
  );
  // auto reload
  window.location.reload();
}

export function clearAuthority(): void {
  localStorage.removeItem('drumbeat-centralizer-authority');
  // auto reload
  window.location.reload();
}

export function getAuthorityInfo(): AuthorityInfo {
  const authority = localStorage.getItem('drumbeat-centralizer-authority');
  const jsonAuth = JSON.parse(authority || '{}');
  const splitAuthArr = (jsonAuth.token || '').split('.');
  if (splitAuthArr.length <= 1) {
    return <AuthorityInfo>{};
  }
  const accountInfo = JSON.parse(
    Buffer.from(splitAuthArr[1], 'base64').toString(),
  );
  accountInfo.ud = JSON.parse(accountInfo.ud);
  const AuthInfo = <AuthorityInfo>{
    name: accountInfo.name, // 用户名
    adm: accountInfo.adm,
    id: accountInfo.id, // 用户id
    exp: accountInfo.exp, // 有效期
    iat: accountInfo.iat,
    ud: accountInfo.ud, // 账号信息
  };
  return AuthInfo;
}

export interface AuthorityInfo {
  name: string;
  adm: string;
  id: number;
  exp: number;
  iat: number;
  ud: {
    appId?: string;
    devic: number;
    tenantId: number;
  };
}

export function getToken() {
  let token = '';
  const tokenString =
    localStorage.getItem('drumbeat-centralizer-authority') || '';
  if (tokenString) {
    token = JSON.parse(tokenString).token;
  }
  return token;
}

export function setToken(token: string) {
  if (token) {
    return localStorage.setItem(
      'drumbeat-centralizer-authority',
      JSON.stringify({ token }),
    );
  }
}
