export function debounce(func: Function, wait: number) {
  let timer: number
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-ignore
      func.apply(this, arguments)
    }, wait)
  }
}
