import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {

      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  // {
  //   path: '/',
  //   name: '_home',
  //   redirect: '/home',
  //   component: Main,
  //   meta: {
  //     hideInMenu: true,
  //     notCache: true
  //   },
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'home',
  //       meta: {
  //         hideInMenu: true,
  //         title: '首页',
  //         notCache: true,
  //         icon: 'md-home'
  //       },
  //       component: () => import('@/view/single-page/home')
  //     }
  //   ]
  // },
  // {
  //   path: '/index',
  //   name: 'index',
  //   meta: {
  //     hideInMenu: true,
  //     notCache: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: '/indexhome',
  //       name: 'indexhome',
  //       meta: {
  //         icon: 'md-home',
  //         title: '首页'
  //       },
  //       component: () => import('@/view/index/indexhome')
  //     }
  //   ]
  // },
  {
    path: '/map',
    name: '地图',
    // meta: {
    //   hideInMenu: true,
    //   notCache: true
    //     },
    component: Main,
    children: [
      {
        path: '/mapPage',
        name: '地图展示',
        meta: {
          icon: 'md-home',
          title: '地图'
        },
        component: () => import('@/view/map/mapPage.vue')
      }
    ]
  },
  {
    path: '/Ip',
    name: 'Ip',
    meta: {
      icon: 'logo-buffer',
      title: 'Ip',
      // hideInMenu: true,
      // notCache: true
    },
    component: Main,
    children: [
      {
        path: '/ippage',
        name: 'Ip查询',
        meta: {
          icon: 'logo-buffer',
          title: 'Ip查询'
        },
        component: () => import('@/view/Ip/ippage')
      }
    ]
  },
  {
    path: '/pManagement',
    name: '维修达人',
    meta: {
      icon: 'ios-hammer',
      title: '维修达人',
      // hideInMenu: true,
      // notCache: true
    },
    component: Main,
    children: [
      {
        path: '/p_management',
        name: '维修达人管理',
        meta: {
            icon: 'ios-hammer',
            title: '维修达人管理'
        },
        component: () => import('@/view/pManagement/p_management')
      }
    ]
  },
  {
    path: '/orderManagemnet',
    name: 'orderManagemnet',
    component: Main,
    children: [
      {
        path: '/o_management',
        name: '维修订单管理',
        meta: {
          icon: 'md-list',
          title: '维修订单管理'
        },
        component: () => import('@/view/orderManagemnet/o_management')
      }
    ]
  },
  {
    path: '/shouhou',
    name: 'shouhou',
    component: Main,
    children: [
      {
        path: '/shouhoupage',
        name: '售后订单管理',
        meta: {
          icon: 'logo-markdown',
          title: '售后订单管理'
        },
        component: () => import('@/view/shouhou/shouhoupage')
      }
    ]
  },
  {
    path: '/custom',
    name: 'custom',
    component: Main,
    children: [
      {
        path: '/custompage',
        name: '维修客户管理',
        meta: {
          icon: 'ios-people',
          title: '维修客户管理'
        },
        component: () => import('@/view/custom/custompage')
      }
    ]
  },
  {
    path: '/kaoqin',
    name: '考勤',
    component: Main,
    children: [
      {
        path: '/kaoqinpage',
        name: '考勤管理',
        meta: {
          icon: 'ios-infinite',
          title: '考勤管理'
        },
        component: () => import('@/view/kaoqin/kaoqinpage')
      }
    ]
  },
  {
    path: '/pay',
    name: '支付渠道',
    component: Main,
    children: [
      {
        path: '/pay_page',
        name: '支付渠道',
        meta: {
          icon: 'logo-buffer',
          title: '支付渠道管理'
        },
        component: () => import('@/view/pay/pay_page')
      }
    ]
  },
  {
    path: '/jixing',
    name: '机型表',
    meta: {
      icon: 'md-menu',
      title: '机型表'
    },
    component: Main,
    children: [
      {
        path: '/jixing_lei',
        name: '机型大类',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '机型大类'
        },
        component: () => import('@/view/jixing/jixing_lei')
      },
      {
        path: '/jixing_pinpai',
        name: '品牌',
        meta: {
          icon: 'ios-people',
          title: '品牌'
        },
        component: () => import('@/view/jixing/jixing_pinpai')
      },
      {
        path: '/jixing_page',
        name: '机型',
        meta: {
          icon: 'logo-markdown',
          title: '机型'
        },
        component: () => import('@/view/jixing/jixing_page')
      },
      {
        path: '/jixing_shebei',
        name: '设备',
        meta: {
          icon: 'md-pause',
          title: '设备'
        },
        component: () => import('@/view/jixing/jixing_shebei')
      }
    ]
  },
  {
    path: '/guzhang',
    name: '故障',
    component: Main,
    children: [
      {
        path: '/guzhangpage',
        name: '故障列表',
        meta: {
          icon: 'ios-bug',
          title: '故障列表'
        },
        component: () => import('@/view/guzhang/guzhangpage')
      }
    ]
  },
  {
    path: '/weixiu',
    name: '保修表',
    component: Main,
    children: [
      {
        path: '/weixiupage',
        name: '保修',
        meta: {
          icon: 'ios-hammer',
          title: '保修'
        },
        component: () => import('@/view/weixiu/weixiupage')
      }
    ]
  },
  {
    path: '/news',
    name: '金额表',
    component: Main,
    children: [
      {
        path: '/new',
        name: '维修金额',
        meta: {
          icon: 'md-grid',
          title: '维修金额'
        },
        component: () => import('@/view/news/new')
      }
    ]
  },
  // {
  //   path: '/orderContent',
  //   name: 'orderContent',
  //   component: Main,
  //   children: [
  //     {
  //       path: '/o_content',
  //       name: '订单内容维护',
  //       meta: {
  //         icon: 'logo-buffer',
  //         title: '订单内容'
  //       },
  //       component: () => import('@/view/orderContent/o_content')
  //     }
  //   ]
  // },
  {
    path: '/tableData',
    name: '交易',
    component: Main,
    children: [
      {
        path: 't_data',
        name: '交易记录',
        meta: {
          icon: 'md-trending-up',
          title: '交易记录'
        },
        component: () => import('@/view/tableData/t_data')
      }
    ]
  },
  {
    path: '/zhannei',
    name: '站内',
    component: Main,
    children: [
      {
        path: 'zhanneixin',
        name: '站内信',
        meta: {
          icon: 'ios-create',
          title: '站内信'
        },
        component: () => import('@/view/zhannei/zhanneixin')
      }
    ]
  },
  {
    path: '/money',
    name: '优惠券',
    meta: {
      icon: 'md-menu',
      title: '优惠券'
    },
    component: Main,
    children: [
      {
        path: '/moneytype_page',
        name: '优惠券类型',
        meta: {
          icon: 'md-funnel',
          title: '优惠券类型',
        },
        component: () => import('@/view/money/moneytype_page')
      },
      {
        path: '/money_page',
        name: '优惠券管理',
        meta: {
          icon: 'md-funnel',
          title: '优惠券管理'
        },
        component: () => import('@/view/money/money_page')
      }
    ]
  },
  // {
  //   path: '/multilevel',
  //   name: 'multilevel',
  //   meta: {
  //     icon: 'md-menu',
  //     title: '多级菜单'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'level_2_1',
  //       name: 'level_2_1',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-1'
  //       },
  //       component: () => import('@/view/multilevel/level-2-1.vue')
  //     },
  //     {
  //       path: 'level_2_2',
  //       name: 'level_2_2',
  //       meta: {
  //         access: ['super_admin'],
  //         icon: 'md-funnel',
  //         showAlways: true,
  //         title: '二级-2'
  //       },
  //       component: parentView,
  //       children: [
  //         {
  //           path: 'level_2_2_1',
  //           name: 'level_2_2_1',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'level_2_3',
  //       name: 'level_2_3',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-3'
  //       },
  //       component: () => import('@/view/multilevel/level-2-3.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
