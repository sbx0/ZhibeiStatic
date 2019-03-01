import i18N from './i18N/i18N'

let minute = 1000 * 60
let hour = minute * 60
let day = hour * 24
let month = day * 30

const tools = {
  timeClick: function (endDateStr) {
    let beginTimeStamp = new Date().getTime()
    let endTimeStamp = Date.parse(endDateStr.replace(/-/gi, '/'))
    let diffValue = endTimeStamp - beginTimeStamp
    if (diffValue < 0) {
      return '已结束'
    }
    let monthC = diffValue / month
    let weekC = diffValue / (7 * day)
    let dayC = diffValue / day
    let hourC = diffValue / hour
    let minC = diffValue / minute
    let result
    if (monthC >= 1) {
      result = '还有 ' + parseInt(monthC) + ' 个月'
    } else if (weekC >= 1) {
      result = '还有 ' + parseInt(weekC) + ' 周'
    } else if (dayC >= 1) {
      result = '还有 ' + parseInt(dayC) + ' 天'
    } else if (hourC >= 1) {
      result = '还有 ' + parseInt(hourC) + ' 小时'
    } else if (minC >= 1) {
      result = '还有 ' + parseInt(minC) + ' 分钟'
    } else {
      result = '刚刚结束'
    }
    return result
  },
  timeShow: function (dateStr) {
    let dateTimeStamp = Date.parse(dateStr.replace(/-/gi, '/'))
    let now = new Date().getTime()
    let diffValue = now - dateTimeStamp
    if (diffValue < 0) {
      return dateStr
    }
    let monthC = diffValue / month
    let weekC = diffValue / (7 * day)
    let dayC = diffValue / day
    let hourC = diffValue / hour
    let minC = diffValue / minute
    let result
    if (monthC >= 1) {
      result = '发表于 ' + parseInt(monthC) + ' 个月前'
    } else if (weekC >= 1) {
      result = '发表于 ' + parseInt(weekC) + ' 周前'
    } else if (dayC >= 1) {
      result = '发表于 ' + parseInt(dayC) + ' 天前'
    } else if (hourC >= 1) {
      result = '发表于 ' + parseInt(hourC) + ' 个小时前'
    } else if (minC >= 1) {
      result = '发表于 ' + parseInt(minC) + ' 分钟前'
    } else {
      result = '刚刚发表'
    }
    return result
  },
  setCookie: function (cName, cValue, exDays) {
    let d = new Date()
    d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000))
    let expires = 'expires=' + d.toGMTString()
    document.cookie = cName + '=' + cValue + '; ' + expires + ';path=/'
  },
  getCookie: function (cname) {
    let name = cname + '='
    let ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim()
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  },
  statusCodeToAlert: function (status) {
    switch (status) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return i18N.status[status]
      default:
        return i18N.status[1]
    }
  },
  statusCodeToBool: function (status) {
    switch (status) {
      case 0:
        return true
      default:
        return false
    }
  },
  formatDate: function (date, fmt) {
    date = new Date(date)
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
      }
    }
    return fmt
  },
  padLeftZero: function (str) {
    return ('00' + str).substr(str.length)
  }
}

export default tools
