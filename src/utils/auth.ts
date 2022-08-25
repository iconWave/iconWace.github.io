const TokenKey = 'x-auth-token';

export function getToken() {
  return localStorage.getItem(TokenKey) || '';
}

export function setToken(value: string) {
  localStorage.setItem(TokenKey, value);
}

export function removeToken() {
  localStorage.setItem(TokenKey, '');
}
