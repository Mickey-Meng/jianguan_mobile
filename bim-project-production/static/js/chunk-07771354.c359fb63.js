(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-07771354"],{"254a":function(t,e,s){"use strict";s("e164")},3658:function(t,e,s){"use strict";s.r(e);s("b0c0");var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"report-record"},[e("van-cell-group",{ref:"queryGroup",staticClass:"common-card",staticStyle:{"margin-bottom":"0"},attrs:{inset:""}},[e("van-field",{attrs:{label:"工程名称","is-link":"",readonly:"",placeholder:"请选择工程名称"},on:{click:function(e){t.showPorjectSelect=!0}},model:{value:t.queryItem.name,callback:function(e){t.$set(t.queryItem,"name",e)},expression:"queryItem.name"}}),e("van-field",{attrs:{label:"状态","is-link":"",readonly:"",placeholder:"请选择状态"},on:{click:function(e){t.showStatusSelect=!0}},model:{value:t.queryItem.statusName,callback:function(e){t.$set(t.queryItem,"statusName",e)},expression:"queryItem.statusName"}})],1),e("van-list",{staticClass:"common-list common-card",style:{height:t.scrollerHeight},attrs:{finished:t.finished,"finished-text":"我也是有底线的~~"},on:{load:t.onLoad}},t._l(t.listTemp,(function(s,a){return e("div",{key:a,class:"item "+(a===t.listTemp.length-1?"last":""),on:{click:function(e){return t.itemClick(s,0)}}},[e("div",{staticClass:"content"},[e("span",{staticClass:"name"},[t._v("工区名称：")]),e("span",{staticClass:"value"},[t._v(t._s(t.getGongQuName(s)))])]),e("div",{staticClass:"content"},[e("span",{staticClass:"name"},[t._v("工程名称：")]),e("span",{staticClass:"value"},[t._v(t._s(t.getProjectName(s)))])]),e("div",{staticClass:"content"},[e("span",{staticClass:"name"},[t._v("检查大项：")]),e("span",{staticClass:"value"},[t._v(t._s(s.qualityfirstname))])]),e("div",{staticClass:"content"},[e("span",{staticClass:"name"},[t._v("检查小项：")]),e("span",{staticClass:"value"},[t._v(t._s(s.qualitysecondname))])]),e("div",{staticClass:"content"},[e("span",{staticClass:"name"},[t._v("检查人员：")]),e("span",{staticClass:"value"},[t._v(t._s(s.uploadname))])]),e("div",{staticClass:"content"},[e("span",{staticClass:"name"},[t._v("检查日期：")]),e("span",{staticClass:"value"},[t._v(t._s(s.uploadtime))])]),e("div",{staticClass:"content"},[e("span",{staticClass:"name"},[t._v("整改人员：")]),e("span",{staticClass:"value"},[t._v(t._s(s.modifyname))])]),s.modifydate?e("div",{staticClass:"content"},[e("span",{staticClass:"name"},[t._v("整改期限：")]),e("span",{staticClass:"value"},[t._v(t._s(s.modifydate)+" (天)")])]):t._e(),s.modifytime?e("div",{staticClass:"content"},[e("span",{staticClass:"name"},[t._v("整改日期：")]),e("span",{staticClass:"value"},[t._v(t._s(s.modifytime))])]):t._e(),e("div",{staticClass:"content"},[e("span",{staticClass:"name"},[t._v("事件状态：")]),e("span",{class:"value "+t.statusColor[s.status||0]},[t._v(t._s(t.statusName[s.status||0]))])])])})),0),e("van-action-sheet",{attrs:{actions:t.projectActions},on:{select:t.onProjectSelect},model:{value:t.showPorjectSelect,callback:function(e){t.showPorjectSelect=e},expression:"showPorjectSelect"}}),e("van-action-sheet",{attrs:{actions:t.statusActions},on:{select:t.onStatusSelect},model:{value:t.showStatusSelect,callback:function(e){t.showStatusSelect=e},expression:"showStatusSelect"}})],1)},n=[],i=s("5530"),o=(s("e9c4"),s("d3b7"),s("159b"),s("14d9"),s("7db0"),s("4e82"),s("ac1f"),s("5319"),s("24d2")),c={components:{},data:function(){return{list:[],listTemp:[],refreshing:!1,finished:!1,showDelay:!1,delayItem:{},statusName:["提交事件","申请延期","提交整改","确认整改"],statusColor:["common-status-0","common-status-1","common-status-2","common-status-3"],queryItem:{},showPorjectSelect:!1,scrollerHeight:"",projectActions:[],gongQu:[],showStatusSelect:!1,statusActions:[{name:"所有状态",status:-1},{name:"待审核",status:1},{name:"待整改",status:2},{name:"确认整改",status:3}]}},mounted:function(){this.scrollerHeight=window.innerHeight-100-this.$refs["queryGroup"].offsetHeight+"px",this.onStatusSelect(JSON.parse(JSON.stringify(this.statusActions[0])))},created:function(){this.getAllGongQu()},methods:{getAllGongQu:function(){var t=this;Object(o["C"])().then((function(e){t.gongQu=e,t.getAllProject()}))},getAllProject:function(){var t=this;Object(o["Q"])().then((function(e){var s={name:"所有工程",projectid:null},a=[s];e.forEach((function(t){a.push(Object(i["a"])(Object(i["a"])({},t),{name:t.projectname}))})),t.projectActions=a,t.onProjectSelect(JSON.parse(JSON.stringify(s)))}))},getGongQuName:function(t){var e=this.gongQu.find((function(e){return e.id===t.gongquid}));return e?e.name:""},getProjectName:function(t){var e=this.projectActions.find((function(e){return e.groupid===t.singleProjectId}));return e?e.projectname:""},onProjectSelect:function(t){this.showPorjectSelect=!1,this.queryItem.name=t.name,this.queryItem.projectid=t.groupid,this.onLoad()},onStatusSelect:function(t){if(this.showStatusSelect=!1,this.queryItem.statusName=t.name,-1!==t.status){var e=[];this.list.forEach((function(s){1===t.status?2==s.status&&e.push(s):2===t.status?(0==s.status||1==s.status)&&e.push(s):3===t.status&&3==s.status&&e.push(s)})),this.listTemp=e}else this.listTemp=this.list},onLoad:function(){var t=this,e={projectId:this.$store.state.currentBiaoDuan.id};this.queryItem.projectid&&(e.singleProjectId=this.queryItem.projectid),Object(o["j"])(e).then((function(e){t.list=e.sort((function(t,e){return Date.parse(e["uploadtime"].replace(/-/g,"/"))-Date.parse(t["uploadtime"].replace(/-/g,"/"))})),t.listTemp=t.list,t.refreshing=!1,t.finished=!0}))},itemClick:function(t){var e=Object(i["a"])(Object(i["a"])({},t),{projectname:this.getProjectName(t),gongquname:this.getGongQuName(t)});this.$router.push({name:"detail",params:e})}}},r=c,u=(s("254a"),s("2877")),l=Object(u["a"])(r,a,n,!1,null,"f4612186",null);e["default"]=l.exports},"53ca":function(t,e,s){"use strict";s.d(e,"a",(function(){return a}));s("a4d3"),s("e01a"),s("d3b7"),s("d28b"),s("3ca3"),s("ddb0");function a(t){return a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a(t)}},5530:function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));s("b64b"),s("a4d3"),s("4de4"),s("d3b7"),s("e439"),s("14d9"),s("159b"),s("dbb4");var a=s("ade3");function n(t,e){var s=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,a)}return s}function i(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{};e%2?n(Object(s),!0).forEach((function(e){Object(a["a"])(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):n(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}},a38e:function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));var a=s("53ca");s("8172"),s("efec"),s("a4d3"),s("e01a"),s("d3b7"),s("d9e2"),s("a9e3");function n(t,e){if("object"!==Object(a["a"])(t)||null===t)return t;var s=t[Symbol.toPrimitive];if(void 0!==s){var n=s.call(t,e||"default");if("object"!==Object(a["a"])(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function i(t){var e=n(t,"string");return"symbol"===Object(a["a"])(e)?e:String(e)}},ade3:function(t,e,s){"use strict";s.d(e,"a",(function(){return n}));var a=s("a38e");function n(t,e,s){return e=Object(a["a"])(e),e in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}},e164:function(t,e,s){}}]);