export default {
  pages: [
    'pages/home/index',
    'pages/courses/index',
    'pages/teachers/index',
    'pages/success/index',
    'pages/about/index'
  ],
  window: {
    navigationBarTitleText: '淮安启航',
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    backgroundColor: '#f8fafc',
    backgroundTextStyle: 'dark'
  },
  tabBar: {
    color: '#94a3b8',
    selectedColor: '#4f46e5',
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
        pagePath: 'pages/courses/index',
        text: '方向',
        iconPath: 'assets/tabbar/courses.png',
        selectedIconPath: 'assets/tabbar/courses-active.png'
      },
      {
        pagePath: 'pages/teachers/index',
        text: '师资',
        iconPath: 'assets/tabbar/teachers.png',
        selectedIconPath: 'assets/tabbar/teachers-active.png'
      },
      {
        pagePath: 'pages/success/index',
        text: '成果',
        iconPath: 'assets/tabbar/success.png',
        selectedIconPath: 'assets/tabbar/success-active.png'
      },
      {
        pagePath: 'pages/about/index',
        text: '关于',
        iconPath: 'assets/tabbar/about.png',
        selectedIconPath: 'assets/tabbar/about-active.png'
      }
    ]
  }
};
