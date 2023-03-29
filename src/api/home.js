const name = {
  project: '诸暨建设集团项目管理',
  center: '项目数据中心'
}

const iosAppId = {
  project: '1613264195',
  center: '1594315244'
}

const constantField = {
  projectTypes: [
    { name: '桥梁', value: 'QL' },
    { name: '道路', value: 'LM' },
    { name: '隧道', value: 'SD' },
    { name: '其他', value: 'other' }
  ],
  wholeName: '项目全生命周期数字管理平台',
  name: name[process.env.VUE_APP_TYPE],
  iosAppId: iosAppId[process.env.VUE_APP_TYPE],
  versionInfo: {
    ios: {
      project: {
        version: {
          name: '3.2',
          code: 3200
        },
        remark: ['新增人员位置']
      },
      center: {
        version: {
          name: '1.7',
          code: 1700
        },
        remark: ['首页区分工程类型']
      }
    },
    android: {
      project: {
        version: {
          name: '5.3',
          code: 5300
        },
        remark: ['新增人员位置']
      },
      center: {
        version: {
          name: '2.8',
          code: 2800
        },
        remark: ['首页区分工程类型']
      }
    }
  }
}

export default constantField
