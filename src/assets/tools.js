import i18N from './i18N/i18N'

const tools = {
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
  }
}

export default tools
