/**
 * Created by PanJiaChen on 16/11/18.
 */

const numArray = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

/**
 * Slice Array
 * @param {Array} array
 * @param {Number} pageIndex
 * @param {Number} pageSize
 */
export function sliceArray(array, pageIndex, pageSize) {
  if (pageSize == null || pageIndex == null) {
    return array
  }
  let start = (pageIndex - 1) * pageSize
  if (start < 0) {
    start = 0
  } else if (start > array.length) {
    start = array.length
  }
  let end = Number(start) + Number(pageSize)
  if (end > array.length) {
    end = array.length
  }
  // console.log(pageIndex, pageSize, start, end)
  return array.slice(start, end)
}

/**
 * Format Flow Level Title
 * @param {number} index
 */
export function formatFlowLevelTitle(index) {
  var i = index + 1
  var s = ''
  if (i > 10) {
    if (parseInt(i % 10) === 0) {
      s = numArray[i / 10] + '十'
    } else if (i < 20) {
      s = '十' + numArray[parseInt(i % 10)]
    } else {
      s =
        numArray[parseInt(i / 10)] +
        '十' +
        numArray[parseInt(i % 10)]
    }
  } else {
    s = numArray[i]
  }
  return '第' + s + '级审批'
}

export function formatUsersToString(uers, delimiter) {
  var s = ''
  for (let i = 0; i < uers.length; i++) {
    if (s.length === 0) {
      s = uers[i]
    } else {
      s = s + delimiter + uers[i]
    }
  }
  return s
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}
