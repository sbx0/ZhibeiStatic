import zhCN from '@/assets/i18N/i18N_zh_CN'
import zhTW from '@/assets/i18N/i18N_zh_TW'
import enUS from '@/assets/i18N/i18N_en_US'
import tools from '@/assets/tools'

let lib = [
  {name: 'zh_CN', text: '简体中文'},
  {name: 'zh_TW', text: '繁體中文'},
  {name: 'en_US', text: 'English'}
]

let i18NConfig = tools.getCookie('i18N_config')
if (i18NConfig === '') {
  tools.setCookie('i18N_config', lib[0].name, 30)
  i18NConfig = lib[0].name
}

let i18N = ''
switch (i18NConfig) {
  case 'zh_CN':
    i18N = zhCN
    break
  case 'zh_TW':
    i18N = zhTW
    break
  case 'en_US':
    i18N = enUS
    break
  default:
    i18N = zhCN
}

i18N.lib = lib

export default i18N
