(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45a264ec"],{"06c5":function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));a("fb6a"),a("d3b7"),a("b0c0"),a("a630"),a("3ca3"),a("ac1f"),a("00b4");var n=a("6b75");function r(t,e){if(t){if("string"===typeof t)return Object(n["a"])(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(n["a"])(t,e):void 0}}},2909:function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));var n=a("6b75");function r(t){if(Array.isArray(t))return Object(n["a"])(t)}a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("a630");function i(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var o=a("06c5");a("d9e2");function c(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return r(t)||i(t)||Object(o["a"])(t)||c()}},"31c2":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t._self._c;return e("el-container",{staticClass:"container-box"},[e("van-list",{style:{height:t.scrollerHeight},attrs:{finished:t.finished,"finished-text":"没有更多了"},on:{load:t.query},model:{value:t.loading,callback:function(e){t.loading=e},expression:"loading"}},t._l(t.tableData,(function(a,n){return e("van-swipe-cell",{key:n,staticClass:"list",class:"item "+(n===t.tableData.length-1?"last":"")},[e("div",{staticClass:"item",on:{click:function(e){return t.gotoHandle(a)}}},[e("div",{staticClass:"block"},[e("span",{staticClass:"block-name"},[t._v("流程名称:")]),e("span",{staticClass:"block-value"},[t._v(t._s(a.processDefinitionName))])]),e("div",{staticClass:"block"},[e("span",{staticClass:"block-name"},[t._v("任务发起人:")]),e("span",{staticClass:"block-value"},[t._v(t._s(a.createUsername))])]),e("div",{staticClass:"block"},[e("span",{staticClass:"block-name"},[t._v("任务发起时间:")]),e("span",{staticClass:"block-value"},[t._v(t._s(a.createTime))])])])])})),1)],1)},r=[],i=a("2909"),o=a("5530"),c=(a("7db0"),a("d3b7"),a("b0c0"),a("99af"),a("14d9"),a("caad"),a("015e")),s=a("2f62"),u=a("9e55"),l=a("5f87"),d={data:function(){return{tableData:[],loading:!1,finished:!1,queryData:{orderParam:[{fieldName:"createTime",asc:1}],pageParam:{pageNum:1,totalPage:1,pageSize:10},read:!1},routes:null,detailRouters:[]}},created:function(){this.routes=this.menus;var t=u["constantRouterMap"].find((function(t){return"handlerFlowTask"===t.name}));this.detailRouters=null===t||void 0===t?void 0:t.children},components:{},computed:Object(o["a"])(Object(o["a"])({},Object(s["b"])(["menus"])),{},{scrollerHeight:function(){return window.innerHeight-91+"px"}}),mounted:function(){},methods:{query:function(){var t=this;c["Bb"](this.queryData).then((function(e){t.allData=e.data||{},t.tableData=[].concat(Object(i["a"])(t.tableData),Object(i["a"])(t.allData["list"]||[])),t.queryData.pageParam.pageNum=e.data.pageNum+1,t.queryData.pageParam.totalPage=e.data.total||1,t.queryData.pageParam.pageSize=e.data.pageSize||10,t.loading=!1,t.tableData.length>=e.data.total&&(t.finished=!0)}))},handleCurrentChange:function(t){this.queryData.pageParam.pageNum=t,this.query()},gotoHandle:function(t){var e=t["processDefinitionKey"],a=this.detailRouters.find((function(t){return-1!==t.code.indexOf(e)})),n=["sgdwhtrybs","jldwhtrybs","qzdwhtrybs","sgdwrybg","jldwrybg","qzdwrybg","sgdwryqj","jldwryqj","qzdwryqj"];a&&(Object(l["b"])("taskType",4),this.$router.push({path:a.path,query:{taskId:t.taskId,taskKey:t.taskKey,businessKey:t.businessKey,processDefinitionKey:t.processDefinitionKey,processInstanceId:t.processInstanceId,processDefinitionId:t.processDefinitionId,taskName:t.taskName,flowEntryName:t.processDefinitionName,processInstanceInitiator:t.processInstanceInitiator,isHiddenEdit:n.includes(e),flowKey:n.includes(e)?e:""}}))}}},f=d,b=(a("a3be"),a("2877")),p=Object(b["a"])(f,n,r,!1,null,"3f09711a",null);e["default"]=p.exports},"53ca":function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0");function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}},5530:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));a("b64b"),a("a4d3"),a("4de4"),a("d3b7"),a("e439"),a("14d9"),a("159b"),a("dbb4");var n=a("ade3");function r(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,n)}return a}function i(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?r(Object(a),!0).forEach((function(e){Object(n["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}},"5f87":function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return r}));a("e9c4");var n=function(t){return JSON.parse(localStorage.getItem(t))},r=function(t,e){localStorage.setItem(t,JSON.stringify(e))}},"6b75":function(t,e,a){"use strict";function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,n=new Array(e);a<e;a++)n[a]=t[a];return n}a.d(e,"a",(function(){return n}))},a38e:function(t,e,a){"use strict";a.d(e,"a",(function(){return i}));var n=a("53ca");a("8172"),a("efec"),a("a4d3"),a("e01a"),a("d3b7"),a("d9e2"),a("a9e3");function r(t,e){if("object"!==Object(n["a"])(t)||null===t)return t;var a=t[Symbol.toPrimitive];if(void 0!==a){var r=a.call(t,e||"default");if("object"!==Object(n["a"])(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function i(t){var e=r(t,"string");return"symbol"===Object(n["a"])(e)?e:String(e)}},a3be:function(t,e,a){"use strict";a("e658")},ade3:function(t,e,a){"use strict";a.d(e,"a",(function(){return r}));var n=a("a38e");function r(t,e,a){return e=Object(n["a"])(e),e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}},e658:function(t,e,a){}}]);