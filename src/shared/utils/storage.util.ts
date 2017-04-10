export function storageSetJson(key:string, obj:any) {
  window.localStorage.setItem(key, JSON.stringify(obj));
}

export function storageGetJson(key) {
  let item = window.localStorage.getItem(key);
  return JSON.parse(item);
}

export function storageSet(key:string, value:string) {
  window.localStorage.setItem(key, value);
}

export function storageGet(key:string) {
  return window.localStorage.getItem(key);
}

export function storageRemove(key:string) {
  window.localStorage.removeItem(key)
}

