export default {
  pages: [
    'pages/home/index',
    'pages/study/index',
    'pages/courses/index',
    'pages/mine/index',
    'pages/teachers/index',
    'pages/success/index',
    'pages/materials/index',
    'pages/about/index'
  ],
  subPackages: [
    {
      root: 'pages/question-bank',
      pages: [
        'daily-question/index',
        'past-papers/index',
        'wrong-book/index'
      ],
      name: 'questionBank'
    },
    {
      root: 'pages/admin',
      pages: [
        'login/index',
        'dashboard/index',
        'page-editor/index',
        'list-editor/index',
        'item-editor/index',
        'question-bank-import/index'
      ],
      name: 'admin'
    }
  ],
  window: {
    navigationBarTitleText: '启航专转本',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f3f5fb',
    backgroundTextStyle: 'dark'
  },
  tabBar: {
    color: '#64748b',
    selectedColor: '#5b4dff',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页',
        iconPath: 'assets/tabbar/home.png',
        selectedIconPath: 'assets/tabbar/home-active.png'
      },
      {
        pagePath: 'pages/study/index',
        text: '题库',
        iconPath: 'assets/tabbar/materials.png',
        selectedIconPath: 'assets/tabbar/materials-active.png'
      },
      {
        pagePath: 'pages/courses/index',
        text: '课程',
        iconPath: 'assets/tabbar/courses.png',
        selectedIconPath: 'assets/tabbar/courses-active.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/tabbar/about.png',
        selectedIconPath: 'assets/tabbar/about-active.png'
      }
    ]
  }
};
