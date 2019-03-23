import i18N from './i18N/i18N'
import router from '@/router/index'

let minute = 1000 * 60
let hour = minute * 60
let day = hour * 24
let month = day * 30

const tools = {
  device: function () {
    let browser = {
      versions: (function () {
        let u = navigator.userAgent
        return { // 移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, // IE内核
          presto: u.indexOf('Presto') > -1, // opera内核
          webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
          iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, // 是否iPad
          webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
        }
      }()),
      language: (navigator.browserLanguage || navigator.language)
    }
    if (!browser.versions.mobile) {
      alert(i18N.not_mobile_alert)
    }
    return browser
  },
  go: function (url) {
    router.push({path: url})
  },
  timeClick: function (endDateStr) {
    let beginTimeStamp = new Date().getTime()
    let endTimeStamp = Date.parse(endDateStr.replace(/-/gi, '/'))
    let diffValue = endTimeStamp - beginTimeStamp
    if (diffValue < 0) {
      return i18N.date_to_time_click.already + i18N.date_to_time_click.over
    }
    let monthC = diffValue / month
    let weekC = diffValue / (7 * day)
    let dayC = diffValue / day
    let hourC = diffValue / hour
    let minC = diffValue / minute
    let result
    if (monthC >= 1) {
      result = i18N.date_to_time_click.there_are_still + ' ' + parseInt(monthC) + ' ' + i18N.date_to_time_click.month
    } else if (weekC >= 1) {
      result = i18N.date_to_time_click.there_are_still + ' ' + parseInt(weekC) + ' ' + i18N.date_to_time_click.week
    } else if (dayC >= 1) {
      result = i18N.date_to_time_click.there_are_still + ' ' + parseInt(dayC) + ' ' + i18N.date_to_time_click.day
    } else if (hourC >= 1) {
      result = i18N.date_to_time_click.there_are_still + ' ' + parseInt(hourC) + ' ' + i18N.date_to_time_click.hour
    } else if (minC >= 1) {
      result = i18N.date_to_time_click.there_are_still + ' ' + parseInt(minC) + ' ' + i18N.date_to_time_click.min
    } else {
      result = i18N.date_to_time_click.just + i18N.date_to_time_click.over
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
      result = parseInt(monthC) + ' ' + i18N.date_to_time_show.month + i18N.date_to_time_show.before
    } else if (weekC >= 1) {
      result = parseInt(weekC) + ' ' + i18N.date_to_time_show.week + i18N.date_to_time_show.before
    } else if (dayC >= 1) {
      result = parseInt(dayC) + ' ' + i18N.date_to_time_show.day + i18N.date_to_time_show.before
    } else if (hourC >= 1) {
      result = parseInt(hourC) + ' ' + i18N.date_to_time_show.hour + i18N.date_to_time_show.before
    } else if (minC >= 1) {
      result = parseInt(minC) + ' ' + i18N.date_to_time_show.min + i18N.date_to_time_show.before
    } else {
      result = i18N.date_to_time_show.just
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
      case 8:
      case 9:
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
