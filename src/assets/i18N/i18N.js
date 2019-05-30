import zhCN from '@/assets/i18N/i18N_zh_CN'
import zhTW from '@/assets/i18N/i18N_zh_TW'
import enUS from '@/assets/i18N/i18N_en_US'
import tools from '@/assets/tools'

// let domain = 'http://192.168.3.2:8085'
let domain = 'http://zb.sbx0.cn'

let lib = [
  {name: 'zh_CN', text: '简体中文'},
  {name: 'zh_TW', text: '繁體中文'},
  {name: 'en_US', text: 'English'}
]

let i18NConfig = tools.getCookie('i18N_config')

let i18N = ''
switch (i18NConfig) {
  case 'zh_CN':
    i18N = zhCN
    tools.setCookie('i18N_config', 'zh_CN', 365)
    break
  case 'zh_TW':
    i18N = zhTW
    tools.setCookie('i18N_config', 'zh_TW', 365)
    break
  case 'en_US':
    i18N = enUS
    tools.setCookie('i18N_config', 'en_US', 365)
    break
  default:
    i18N = zhCN
    tools.setCookie('i18N_config', 'zh_CN', 365)
}

i18N.lib = lib
i18N['domain'] = domain

export default i18N
