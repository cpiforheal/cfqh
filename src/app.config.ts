export default {
  pages: [
    'pages/home/index',
    'pages/courses/index',
    'pages/teachers/index',
    'pages/success/index',
    'pages/materials/index',
    'pages/about/index'
  ],
  window: {
    navigationBarTitleText: '启航',
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
        pagePath: 'pages/materials/index',
        text: '教材',
        iconPath: 'assets/tabbar/materials.png',
        selectedIconPath: 'assets/tabbar/materials-active.png'
      }
    ]
  }
};
