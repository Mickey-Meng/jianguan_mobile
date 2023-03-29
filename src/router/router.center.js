/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    component: () => import('@/views/project/index'),
    name: 'home',
    redirect: '/center',
    meta: {
      title: '首页',
      keepAlive: true
    },
    children: [
      {
        path: '/center',
        name: 'center',
        component: () => import('@/views/project/center/index'),
        meta: { title: '数据中心', keepAlive: true }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('@/views/project/menu'),
        meta: {
          title: '菜单',
          keepAlive: true
        }
      },
      {
        path: '/system',
        name: 'system',
        component: () => import('@/views/system/index'),
        meta: { title: '系统设置', keepAlive: true }
      },
      {
        path: '/center',
        name: 'center',
        component: () => import('@/views/project/center/index'),
        meta: { title: '数据中心', keepAlive: true }
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: () => import('@/views/system/index'),
    meta: { title: '系统设置', keepAlive: false }
  },
  {
    path: '/common', //带有公共头部（左箭头返回+title）  以及下拉刷新
    component: () => import('@/views/common/index'),
    name: 'common',
    children: [
      {
        path: '/weatherDetail',
        name: 'weatherDetail',
        component: () => import('@/views/common/weatherDetail'),
        meta: { title: '天气预报' }
      },
      {
        path: '/overview',
        name: 'overview',
        component: () => import('@/views/center/overview/index'),
        meta: { title: '项目概览', keepAlive: true }
      },
      {
        path: '/news',
        name: 'news',
        component: () => import('@/views/center/news/index'),
        meta: { title: '新闻动态', keepAlive: true }
      },
      {
        path: '/bim',
        name: 'bim',
        component: () => import('@/views/center/bim/index'),
        meta: { title: 'BIM中心', keepAlive: true }
      },
      {
        path: '/monitor',
        name: 'monitor',
        component: () => import('@/views/center/monitor/index'),
        meta: { title: '监控中心', keepAlive: true }
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
