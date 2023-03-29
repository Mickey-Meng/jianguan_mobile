let token='73c8cafe0bf281cfc6685ffed36baf6e';
let subdomains = ['0', '1', '2', '3', '4', '5', '6', '7']
let tdtUrl = 'https://t{s}.tianditu.gov.cn/'

export const earthConfig = {
  init: {
    lon: 120.1095329338229,
    lat: 29.706018768457866,
    height: 5000,
    heading: 0,
    pitch: -90,
    roll: 0,
    duration: 3
  },
  viewerOptions: {
    orderIndependentTranslucency: false,
    contextOptions: {
      webgl: {
        alpha: true
      }
    },
    geocoder: false,
    sceneModePicker: false,
    baseLayerPicker: false,
    terrainProviderViewModels: [],
    imageryProviderViewModels: [],
    fullscreenButton: false
  },
  baseLayers: [
  {
    name: '天地图影像',
    type: 'URL',
    url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
    subdomains: subdomains,
    minimumLevel: 1,
    maximumLevel: 18,
    image: './image/mapSwitch/tdt_img.png',
    visible: false,
    stGroup: '天地图影像'
  }
  ],
  layers: [
    {
      name: '影像',
      type: 'URL',
      clampToGround: true,
      url: 'http://101.200.223.171/mapData/zhujishi/DOM_18/{z}/{x}/{y}.png',
      visible: true
    },
    {
      name: '地形',
      type: 'CESIUM_TERRAIN',
      clampToGround: true,
      url: 'http://101.200.223.171/mapData/zhujishi/DEM',
      visible: true
    },
    {
      name: '桥',
      type: 'C3DTILES',
      clampToGround: true,
      url: 'http://101.200.223.171/mapData/zhujishi/model/tileset.json',
      visible: true
    },
    {
      name: '桩',
      type: 'C3DTILES',
      clampToGround: true,
      url: 'http://101.200.223.171/mapData/zhujishi/model1/tileset.json',
      visible: true,
      switchNone: true
    }
  ]
}

export const leafLetConfig = {
  init: {
      zoom: 13,
      center: { x: 120.109532, y: 29.706018 },
      minZoom: 3,
      maxZoom: 17,
      centerAutoLevel: 15,
      controls: [],
      crs: "EPSG:4326",
      basemaps: [],
      operationallayers: []
  },
  baseLayers: [
      { name: '标准地图', type: 'www_tdt', layer: 'vec', visible: true, img: 'tdt_vec.png',key: [token],crs: "EPSG4326", },
      { name: '卫星地图', type: 'www_tdt', layer: 'img', visible: false, img: 'tdt_img.png',key: [token],crs: "EPSG4326", }
  ],
  layers: []
}
