(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-44e5e347"],{"3f22":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAjCAYAAABl/XGVAAAABHNCSVQICAgIfAhkiAAAA5xJREFUSEulV+1KG1EQvasiKEoTBH8IoVsEBUGaoP62j1CfoPoE2idofAN9guoT1EfQ3yppEQRFcUVQEMRIQgRR03MuO+nk7t3daAcWcr/mzJyZO3MTmByp1WqF5+fnxSAIvmJriK+Mr4Cvju83vqjdbu8MDAzsVSoVzqVKkLZCkNfX11UoWouV59lVh0EbfX19m2mgXrCDgwN68bNHENcIercyPz+/4y4kwPb396uw8IfeODQ0ZEZHR83w8LD9OH58fDStVst+jUbDjrVAR3Vubm69a04PXKD+/n4zMTFhxsfH7baXlxdzfn5ulRN8cnLScA/l9vbWXF9f2z0iAPwOwI3OWH7E1P2SMZWFYWgGBwc7hwlUr//LgUKhYAFFnp6eTBRF1hglS0KppZHJAIsuJEYEmpqaSiTEycmJaTabnfmRkREzPT2d2Hd8fKxprcP7T0waC6bpIy0zMzNdHom2q6srS5cI6S2VSgkwekhAoRQZvb6wsFANXK94WGKU0BLH5v7+3hSLxdx9NC6WOqgsBjpWzDJ65RNay3jR87GxMXN3d2ctZ9x0XPVZh84lgm1hwzduSqOFazpes7Oz5ujoyOrNMtChfTtAvHaRoos8yOyj1a7QK1HONSaGThSC+7yj98xOCuK2R8+Yyx84QQppqSu8Pzc3N156sxjhRSeVEjeCtWWEC+hVSK/oXZrQK3rnk8PDw850F5jPM8e6VMBezhKMbeJzWsyYcWdnZxZEx0lQGT+0FxtvKV2y5ovZFhZzs5Gg5N+ls1wuJ0AELJGN4HQZmcJ2kpnGXHfLFefS4sw1fc+Q8StSQSKs2YzMqiBvAWNZUxXkARSHtjbqi51VGwWMVUOqv88ztzYCYhvlallX/Y53eVWfHeH09NSGxgfmlCnrVafq85COHce+fkbPaLUuV/p+cY2Zq7s2YwWDmISm61kAOtlVVyWb3E7N5kkjWEMZEzZJaZ6+Tg09m6CPDyYriTeIjp9ses8bxAXygilK6aXN0DfKA6hbE+r02ax3Y4iLXMVme+F7lG1Qv/amd6NWHHfyXczZkpYifwDy5d0vYgewDC9raUgAAk6FNTZTUml0T7mZqta7Mi4LrWewmE5a/1EpvIRX5Tz6ZH/PYDwAQNLJ+DFLWRkYp1z63gUWA4b4CxWih0UAivLipNdzPYM3IVqQps6rH3frMg88F0w/iHK8sA/R/0oQgO3AM/7TzE7rICAY/9elyl/5oSadFYFfsAAAAABJRU5ErkJggg=="},"3fd5":function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return o}));var n="73c8cafe0bf281cfc6685ffed36baf6e",i=["0","1","2","3","4","5","6","7"],s="https://t{s}.tianditu.gov.cn/",r={init:{lon:117.48387645025284,lat:30.66751823064398,height:5e3,heading:0,pitch:-90,roll:0,duration:3},viewerOptions:{orderIndependentTranslucency:!1,contextOptions:{webgl:{alpha:!0}},geocoder:!1,sceneModePicker:!1,baseLayerPicker:!1,terrainProviderViewModels:[],imageryProviderViewModels:[],fullscreenButton:!1},baseLayers:[{name:"天地图影像",type:"URL",url:s+"DataServer?T=img_w&x={x}&y={y}&l={z}&tk="+n,subdomains:i,minimumLevel:1,maximumLevel:18,image:"./image/mapSwitch/tdt_img.png",visible:!1,stGroup:"天地图影像"}],layers:[{name:"影像",type:"URL",clampToGround:!0,url:"http://101.200.223.171/mapData/zhujishi/DOM_18/{z}/{x}/{y}.png",visible:!0},{name:"地形",type:"CESIUM_TERRAIN",clampToGround:!0,url:"http://101.200.223.171/mapData/zhujishi/DEM",visible:!0},{name:"桥",type:"C3DTILES",clampToGround:!0,url:"http://101.200.223.171/mapData/zhujishi/model/tileset.json",visible:!0},{name:"桩",type:"C3DTILES",clampToGround:!0,url:"http://101.200.223.171/mapData/zhujishi/model1/tileset.json",visible:!0,switchNone:!0}]},o={init:{zoom:13,center:{x:120.109532,y:29.706018},minZoom:3,maxZoom:17,centerAutoLevel:15,controls:[],crs:"EPSG:4326",basemaps:[],operationallayers:[]},baseLayers:[{name:"标准地图",type:"www_tdt",layer:"vec",visible:!0,img:"tdt_vec.png",key:[n],crs:"EPSG4326"},{name:"卫星地图",type:"www_tdt",layer:"img",visible:!1,img:"tdt_img.png",key:[n],crs:"EPSG4326"}],layers:[]}},"5db0":function(e,t,a){"use strict";a.r(t);var n,i=function(){var e=this,t=e._self._c;return t("div",{style:{height:e.scrollerHeight,position:"relative"}},[t("LeafLetMap",{ref:"leafLetMapRef"}),t("div",{staticClass:"to-back",on:{click:function(t){return e.toBack()}}}),t("div",{staticClass:"legend"},[t("van-row",{staticClass:"item"},[t("van-col",{staticClass:"img-conatiner",attrs:{span:"12"}},[t("img",{staticClass:"img",attrs:{src:e.onlineSrc}})]),t("van-col",{attrs:{span:"12"}},[e._v("在线")])],1),t("van-row",{staticClass:"item"},[t("van-col",{staticClass:"img-conatiner",attrs:{span:"12"}},[t("img",{staticClass:"img",attrs:{src:e.offlineSrc}})]),t("van-col",{attrs:{span:"12"}},[e._v("离线")])],1)],1)],1)},s=[],r=(a("d3b7"),a("159b"),a("b0c0"),a("7db0"),a("ac1f"),a("5319"),a("99af"),a("b24d")),o=a("24d2"),c={computed:{scrollerHeight:function(){return window.innerHeight+"px"}},components:{LeafLetMap:r["a"]},data:function(){return{isFirstIn:!0,canInit:!0,interval:null,onlineSrc:a("a3ed"),offlineSrc:a("3f22")}},destroyed:function(){this.interval&&clearInterval(this.interval)},mounted:function(){var e=this;n=L.markerClusterGroup([]).addTo(leafLetMap),this.init(),this.interval||(this.interval=setInterval((function(){e.init()}),1e4))},methods:{init:function(){var e=this;this.canInit&&(this.canInit=!1,Object(o["l"])().then((function(t){e.canInit=!0,e.drawPerson(t)})))},drawPerson:function(e){var t=this;if(e.forEach((function(e){var a=e.lon,n=e.lat,i=(e.name,e.updatetime);a&&n&&i&&t.draw(e)})),this.$store.state.locatePersonName){var a=n.getLayers().find((function(e){return e.options.data.name===t.$store.state.locatePersonName}));a&&leafLetMap.flyTo(a.getLatLng(),leafLetMap.getMaxZoom()),this.$store.state.locatePersonName="",this.isFirstIn=!1}else this.isFirstIn&&(this.isFirstIn=!1,leafLetMap.fitBounds(n.getBounds()))},isToday:function(e){var t=new Date(e.replace(/-/g,"/")),a=new Date;return t.setHours(0,0,0,0)==a.setHours(0,0,0,0)},isActive:function(e){return e&&Math.abs(new Date(e.replace(/-/g,"/"))-new Date)<18e4},draw:function(e){var t=e.lon,a=e.lat,i=e.name,s=e.updatetime,r=e.userid,o=this.isToday(s),c=n.getLayers().find((function(e){return e.options.data.userid===r}));if(o){var l=this.isActive(s),u=l?this.onlineSrc:this.offlineSrc,f=L.latLng(a,t),d=L.divIcon({html:"\n              <div class='person-icon-container'>\n                <span class='name'>".concat(i,"</span>\n                <img class='img' src='").concat(u,"' />\n              </div>\n            "),className:"my-div-icon",iconSize:60});c?(c.setLatLng(f),c.setIcon(d)):n.addLayer(L.marker(f,{icon:d,data:e}))}else c&&n.removeLayer(c)},toBack:function(){this.$router.go(-1)}}},l=c,u=(a("f46a"),a("2877")),f=Object(u["a"])(l,i,s,!1,null,"29452bb2",null);t["default"]=f.exports},"6c4a":function(e,t,a){},"838e":function(e,t,a){"use strict";a("f4b5")},a3ed:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAjCAYAAABl/XGVAAAABHNCSVQICAgIfAhkiAAABDZJREFUSEulV0tsU0cUveOXRhCFEj5CUNFiq4CEhJSYsEBV0mbbHUh8lk3aNU26hE3DBrYJrIFkyUciq3abNmnVBdRBQkKCgh2VT4poZUqUVCb29Jyx52Xe38CVouf3Zuae+zlz742SDBkql3rqIl+INI5q0Xklqg9HevBXxfsC3isiuRlP5KfZQrGapk4lLRJkTRqj2DDWUp5lF8BlokNyk0mgsWCD5dtHRdTVNkHCRsA7PTJXODwTXoiADZTvjOPj9+7GvZ0bpW/DJtmH597OLvN8WFuVP2or5rnw32v8Xg3ohpfj84X+c+7HAFgYqDvnyXDPLjn54Q5zZrlRl7MvHkH5MsC75fyOT4V7KNf/fSFT1edmj5WGyHe/FPon7LsP1grdLbtAZWe252VXR6d/mEDzK6/894GuzQbQyvO1mlx4WTHGrIs+ZkNqwJqMa5Rtjgh0cef+CCFOLz2Qu46iXuy7FLPv62f33bBWPckVSBoD5oaPYbn80YGARxb14j9P5CbCZeU4wvvt1t0Ro+jhNwC0IUX+ziF/4yrs1WkcPtHKUURLKzdzK1UZ7Orxcxm37waMugTjWlKdK/RvUW6uyLor8CpOaO08QOj5l93b5Mflv43lAwB18+qeDYZTHyPYFO7UV9xEj+hZnLj5urb7oJx6cs9sSzOQntHDpuhphXzNInEoRwL27TFWh4VeWeVcIzFcohA8zjt6f+HlYhMK5UwNPr5dFaU28wNDSEvDcgX3h3coSZKIwgtPorSkijDeAWhTfs4fitV34s978le9lgi2E3fxOryLk88rv/ufA2BxnoWsSwTkdWEZc4UljCSxwpyhTUgvP8TljIw7g8pBcfNkFTB/m8DQs6g2tnTZtWjO2mQjQUee3o+E84dPeiMgFizCRuRsGItsJ6k05nq4XKXlmWuhsjXSrCC6XrGMTKsgbwMWqCBav/KUhy4PcS82406ikGFhsWCs9rb6xzF4CfeSXq23Gz2Nyj+8XvUd77Kq/iQq/Sg6QFIYA+FreeVX/aZ367njOwHJMNdDerb0piY3Pj4ovHsU/rZCj9jzQl0bI0L/FPeEO/UEPozawwzpCDq17QJUxPGAnZudmeOAbZ7M0dVQp0a1mERr4cBkJDKDuPmzm1jCigDhcx9mED5p/UPMIHyW4meQAFAsmB9SrScsQyNMSfuAHOHcmA2duzVxbjxSLuU/kPq4bT/tAeppT7yxt5obXcWtYZVtyJS0OEFu7mI4HXrnidhV+lm51OdJo5QEVpdc8ddCcSHL+8Qwhg+iYAeYatfDjEsDbBvMhFM3FpSSPT6QlsUOlevLCl8i9dMsM+HU9VnDUrCurryhdsL3TmA8RJZ2iOTXRCq/FYqVrDy1RX27qXkFtB+6JOVvRC1mgWfmzB2IMrwwg+h7EQTla0aL4n+aqaJEA+ww/q9Llv8BydAeyV6Rh4IAAAAASUVORK5CYII="},b24d:function(e,t,a){"use strict";var n=function(){var e=this;e._self._c;return e._m(0)},i=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"container"},[t("div",{staticClass:"map",attrs:{id:"map"}}),e._v(" > ")])}],s=(a("d3b7"),a("159b"),a("b0c0"),a("14d9"),a("3fd5")),r={data:function(){return{baseLayers:[],layers:[]}},mounted:function(){this.initMap()},methods:{initMap:function(){var e=this;L.zlskmap.createMap({id:"map",data:s["b"].init,success:function(t,a){e.onMapSuccess(t)}})},onMapSuccess:function(e){var t=this;window.leafLetMap=e,s["b"].baseLayers.forEach((function(a){t.getLayer(e,a,!0)})),s["b"].layers.forEach((function(a){t.getLayer(e,a,!1)})),e.on("click",(function(e){}))},getLayer:function(e,t,a){var n=this,i=t.type,s=(t.name,t.visible),r=null;switch(i){case"tile":case"www_tdt":r=L.zlskmap.layer.createLayer(t);break;case"wms":t.crs=t.crs||L.CRS.EPSG4326,r=L.tileLayer.wms(t.url,t);break;case"wfs":r=L.wfsLayer(t),r.on("click",(function(e,t){var a=e.layer.feature.id,i=e.layer.feature.properties.name;n.$router.push({path:"/panorama",query:{name:i,id:a}})}));break}return r.setZIndex&&(this.layerIndex++,r.setZIndex(this.layerIndex)),a?this.baseLayers.push({params:t,layer:r}):this.layers.push({params:t,layer:r}),s&&r.addTo(e),r},gotoPoint:function(e,t,a,n){leafLetMap.flyTo({lng:e,lat:t},a||17,{duration:n||1.5})}}},o=r,c=(a("838e"),a("2877")),l=Object(c["a"])(o,n,i,!1,null,null,null);t["a"]=l.exports},f46a:function(e,t,a){"use strict";a("6c4a")},f4b5:function(e,t,a){}}]);