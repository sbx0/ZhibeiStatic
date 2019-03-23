const i18N = {
  table: {
    user: 'User',
    tag: 'Tag',
    category: 'Category',
    certification: 'Certification',
    demand: 'Demand',
    role: 'Role',
    permission: 'Permission',
    file: 'File',
    log: 'Log',
    article: 'Article',
    comment: 'Comment',
    verify: 'Verify',
    message: 'Message',
    question: 'Question',
    answer: 'Answer'
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
      id: 'ID',
      name: 'Name',
      introduction: 'Introduction',
      cover: 'Cover',
      father: 'Father'
    },
    demand: {
      id: 'ID',
      title: 'Time',
      time: 'Time',
      cover: 'Cover',
      content: 'Content',
      endTime: 'endTime',
      budget: 'Budget',
      category: 'Category',
      poster: 'poster'
    },
    tag: {
      id: 'ID',
      name: 'Name',
      introduction: 'Introduction',
      cover: 'Cover'
    },
    verify: {
      id: 'ID',
      type: 'Type',
      md5: 'MD5',
      used: 'Used',
      parameter: 'Parameter',
      time: 'Time'
    },
    message: {
      id: 'ID',
      content: 'Content',
      ip: 'IP',
      sendUser: 'Sender',
      receiveUser: 'Receiver',
      sendTime: 'SendTime',
      receiveTime: 'ReceiveTime',
      type: 'Type'
    },
    alipay: {
      id: 'id',
      outTradeNo: 'outTradeNo',
      tradeNo: 'tradeNo',
      createTime: 'createTime',
      endTime: 'endTime',
      buyer: 'buyer',
      type: 'type',
      products: 'products',
      amount: 'amount'
    },
    product: {
      id: 'id',
      name: 'name',
      price: 'price',
      startTime: 'startTime',
      endTime: 'endTime',
      seller: 'seller'
    },
    wallet: {
      id: 'id',
      money: 'money',
      owner: 'owner'
    },
    question: {
      id: 'id',
      title: 'title',
      description: 'description',
      time: 'time',
      price: 'price',
      quizzer: 'quizzer',
      appoint: 'appoint',
      tags: 'tags'
    },
    answer: {
      id: 'id',
      content: 'content',
      answerer: 'answerer',
      question: 'question',
      likes: 'likes',
      dislikes: 'dislikes',
      top: 'top'
    }
  },
  user: 'User',
  website_name: 'ZhiBei',
  website_slogan: 'Communication platform between industrial technology practitioners and domain experts',
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
  lost_password_title: 'Send Success,please check your email box.',
  lost_password: 'Lost Password',
  send: 'Send',
  give_me_power: 'Give Me Power',
  others: 'Others',
  download: 'Download',
  help: 'Help',
  support: 'Support',
  have_read: 'Have Read',
  have_read_user: 'Read All By User',
  refresh: 'Refresh',
  answer: 'Answer',
  markdown_edit: 'Markdown Edit',
  question_appoint_title: '\'s exclusive question, pay to see the answer.',
  question_pay_title: 'Payment destination: Respondent 50% Questioner 40% Platform 10%.',
  pay: 'Pay',
  not_mobile_alert: 'For your best experience, please use this phone to access this site.',
  male: 'male',
  female: 'female',
  secret: 'secret',
  the_best_of_the_game: 'The best',
  date_to_time_click: {
    already: 'Has already',
    just: 'Just',
    over: ' over',
    there_are_still: 'There are still',
    month: 'month',
    week: 'week',
    day: 'day',
    hour: 'hour',
    min: 'minute'
  },
  date_to_time_show: {
    just: 'Just',
    before: ' ago',
    month: 'month',
    week: 'week',
    day: 'day',
    hour: 'hour',
    min: 'minute'
  },
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
    'Successful operation',
    'Operation failed',
    'Error',
    'Not registered yet',
    'Exceed the limit',
    'Check no results',
    'No permission',
    'Repeat operation',
    'Operation timeout',
    'Parameter exception',
    'Insufficient balance'
  ]
}
export default i18N
