

export function getData(el,name,val){
  const prefix = 'data-'
  name = prefix + name
      if(val){
        return el.setAttribute(name.val)
      }else{
        return el.getAttribute(name)
      }
}

let elementStyle = document.createElement('div').style

let vendor=(() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for(let key in transformNames){
    if(elementStyle[transformNames[key]] !== undefined){
      return key
    }
  }
  return false
})()

export function prefixStyle(style){
  if(vendor === false){
    return false
  }
  if(vendor === 'standard'){
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export function shuffle(arr) {
  let _arr = arr.slice()//浅拷贝，不影响原数组
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debouce(func, delay) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}