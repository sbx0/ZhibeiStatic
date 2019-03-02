const i18N = {
  // domain: 'http://localhost:8085', // 请求地址
  domain: 'http://zb.sbx0.cn', // 请求地址
  table: {
    user: 'User Table',
    tag: 'Tag Table',
    category: 'Category Table',
    certification: 'Certification Table',
    demand: 'Demand Table',
    role: 'Role Table',
    permission: 'Permission Table',
    file: 'File Table',
    log: 'Log Table',
    article: 'Article Table',
    comment: 'Comment Table'
  },
  attribute: {
    user: {
      id: 'ID',
      name: 'Username',
      nickname: 'Nickname',
      password: 'Password',
      introduction: 'Introduction',
      registerTime: 'RegisterTime',
      banned: 'IsBanned',
      phone: 'Phone',
      email: 'Email',
      avatar: 'Avatar',
      sex: 'Sex',
      role: 'Role',
      birthday: 'Birthday',
      integral: 'Integral',
      level: 'Level',
      exp: 'Exp',
      exp_max: 'MaxExp'
    },
    role: {
      id: 'ID',
      name: 'Name',
      introduction: 'Introduction',
      registerTime: 'RegisterTime',
      available: 'IsAvailable',
      father: 'Father',
      permissions: 'Permissions'
    },
    permission: {
      id: 'ID',
      name: 'Name',
      introduction: 'Introduction',
      url: 'Url',
      str: 'Str',
      available: 'IsAvailable',
      father: 'Father'
    },
    certification: {
      id: 'ID',
      info: 'Info',
      type: 'Type',
      passed: 'IsPassed',
      start_time: 'StartTime',
      end_time: 'EndTime',
      user: 'SubmitUser',
      license: 'License',
      img: 'LicenseImg'
    },
    file: {
      id: 'ID',
      name: 'FileName',
      originalName: 'OriginalFileName',
      ext: 'Ext',
      type: 'Type',
      md5: 'MD5',
      size: 'Size',
      time: 'UploadTime',
      banned: 'IsBanned'
    },
    log: {
      id: 'ID',
      ip: 'IP',
      user: 'User',
      time: 'Time',
      runTime: 'RunTime',
      args: 'Args',
      method: 'Method',
      className: 'Classname',
      url: 'Url'
    },
    article: {
      id: 'ID',
      title: 'Title',
      time: 'Time',
      introduction: 'Introduction',
      content: 'Content',
      lastChangeTime: 'LastChangeTime',
      password: 'Password',
      views: 'Views',
      comments: 'Comments',
      likes: 'Likes',
      dislikes: 'Dislikes',
      top: 'Top',
      author: 'Author',
      tags: 'Tags'
    },
    comment: {
      id: 'ID',
      path: 'Path',
      time: 'Time',
      floor: 'Floor',
      content: 'Content',
      likes: 'Likes',
      dislikes: 'Dislikes',
      top: 'Top',
      father: 'Father',
      poster: 'Poster'
    },
    category: {
      id: '编号',
      name: '名称',
      introduction: '简介',
      cover: '封面',
      father: '父亲'
    },
    demand: {
      id: '编号',
      title: '标题',
      time: '发布时间',
      cover: '封面',
      content: '内容',
      endTime: '截止时间',
      budget: '预算',
      category: '分类'
    },
    tag: {
      id: '编号',
      name: '名称',
      introduction: '简介',
      cover: '封面'
    }
  },
  user: 'User',
  website_name: 'ZhiBei',
  admin_management_system: 'AMS',
  logout: 'Logout',
  search: 'Search',
  login: 'Login',
  login_title: 'Click Me To Register!!!',
  register: 'Register',
  register_title: 'Click Me To Login!!!',
  username: 'Username',
  password: 'Password',
  back: 'Back',
  confirm: 'Confirm',
  index: 'Index',
  network: 'Network',
  submit: 'Submit',
  certification: 'Certification',
  apply: 'Apply',
  close: 'Close',
  error_message: 'This is error page',
  admin_message: 'This is admin page',
  login_message: 'Already login',
  search_message: 'Please Input Keywords To Search',
  loading: 'Loading',
  result: 'Result',
  is: 'Is',
  null: 'Null',
  comment: 'Comment',
  replay: 'Replay',
  ask_question: 'Ask Question',
  notification: 'Notification',
  read_more: 'Read More',
  message: 'Message',
  post: 'Post',
  i_know: 'I know',
  setting: 'Setting',
  discover: 'Discover',
  view: 'View',
  watch: 'Watch',
  article: 'Article',
  hot: 'Hot',
  more: 'More',
  topic: 'Topic',
  question: 'Question',
  page_number: 'PageNumber',
  total_elements: 'TotalElements',
  page_size: 'PageSize',
  personal: 'Personal',
  information: 'Information',
  email: 'Email',
  introduction: 'Introduction',
  avatar: 'Avatar',
  upload: 'Upload',
  uploading: 'Uploading',
  save: 'Save',
  desktop: 'Desktop',
  mobile: 'Mobile',
  version: 'Version',
  integral: 'Integral',
  level: 'Level',
  type: 'Type',
  license: 'License',
  license_alert: 'Identity number or business license number or institution name or institution name',
  file: 'File',
  certification_file_alert: 'Please submit the corresponding ID card or organization code certificate scan',
  sort: 'Sort',
  asc: 'ASC',
  desc: 'DESC',
  direction: 'Direction',
  info: 'Info',
  under_review: 'Under Review',
  failed: 'Failed',
  role: 'Role',
  permission: 'Permission',
  log: 'Log',
  management: 'Management',
  please: 'Please',
  input: 'Input',
  name: 'Name',
  id: 'Id',
  available: 'Available',
  father: 'Father',
  permissions: 'Permissions',
  update: 'Update',
  delete: 'Delete',
  add: 'Add',
  no_more_result: 'No More Result',
  empty: 'Empty',
  reset: 'Reset',
  not: 'Not',
  message_board: 'Message Board',
  before_can_use: 'Before Can Use',

  certification_type: [
    {
      text: 'Personal Certification',
      value: 'personal'
    },
    {
      text: 'Admin Certification',
      value: 'admin'
    },
    {
      text: 'Enterprise Certification',
      value: 'enterprise'
    },
    {
      text: 'University Certification',
      value: 'university'
    },
    {
      text: 'Mechanism Certification',
      value: 'mechanism'
    }
  ],
  foot_html: 'ZhiBei 2019',
  alert: {
    empty: 'Empty',
    illegal: 'Illegal',
    special_str: 'SpecialStr',
    error: 'Error'
  },
  status: [
    'Successful Operation',
    'Operation Failed',
    'Error',
    'Not Login',
    'Exceed the limit',
    'Parameter Is Not Legal',
    'No Permission',
    'Repeat Operation'
  ]
}
export default i18N
