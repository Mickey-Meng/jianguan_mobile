(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60dea735"],{"06c5":function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));i("fb6a"),i("d3b7"),i("b0c0"),i("a630"),i("3ca3"),i("ac1f"),i("00b4");var a=i("6b75");function n(t,e){if(t){if("string"===typeof t)return Object(a["a"])(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?Object(a["a"])(t,e):void 0}}},"157e":function(t,e,i){"use strict";var a=function(){var t=this;t._self._c;return t._m(0)},n=[function(){var t=this,e=t._self._c;return e("div",[e("div",{staticStyle:{height:"100px",width:"100%"}},[t._v(" 这里是地图 ")])])}],o=(i("9491"),i("015e"),{props:[],data:function(){return{}},created:function(){},computed:{},mounted:function(){},methods:{}}),r=o,s=(i("8384"),i("2877")),l=Object(s["a"])(r,a,n,!1,null,"04218136",null);e["a"]=l.exports},"262e":function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));i("d9e2");var a=i("b380");function n(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&Object(a["a"])(t,e)}},2909:function(t,e,i){"use strict";i.d(e,"a",(function(){return l}));var a=i("6b75");function n(t){if(Array.isArray(t))return Object(a["a"])(t)}i("a4d3"),i("e01a"),i("d3b7"),i("d28b"),i("3ca3"),i("ddb0"),i("a630");function o(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var r=i("06c5");i("d9e2");function s(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(t){return n(t)||o(t)||Object(r["a"])(t)||s()}},"2a3e":function(t,e,i){},"2caf":function(t,e,i){"use strict";i.d(e,"a",(function(){return l}));i("4ae1"),i("d3b7"),i("f8c9");var a=i("7e84"),n=i("d967"),o=(i("d9e2"),i("53ca"));function r(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function s(t,e){if(e&&("object"===Object(o["a"])(e)||"function"===typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return r(t)}function l(t){var e=Object(n["a"])();return function(){var i,n=Object(a["a"])(t);if(e){var o=Object(a["a"])(this).constructor;i=Reflect.construct(n,arguments,o)}else i=n.apply(this,arguments);return s(this,i)}}},"505b":function(t,e,i){},5530:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));i("b64b"),i("a4d3"),i("4de4"),i("d3b7"),i("e439"),i("14d9"),i("159b"),i("dbb4");var a=i("ade3");function n(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function o(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?n(Object(i),!0).forEach((function(e){Object(a["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}},"5ac8":function(t,e,i){"use strict";i("a200")},"6a4e":function(t,e,i){"use strict";i("505b")},"6b75":function(t,e,i){"use strict";function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}i.d(e,"a",(function(){return a}))},"6be8":function(t,e,i){"use strict";i.d(e,"a",(function(){return n})),i.d(e,"e",(function(){return o})),i.d(e,"d",(function(){return r})),i.d(e,"f",(function(){return s})),i.d(e,"j",(function(){return l})),i.d(e,"b",(function(){return c})),i.d(e,"c",(function(){return u})),i.d(e,"h",(function(){return d})),i.d(e,"i",(function(){return b})),i.d(e,"g",(function(){return f}));var a=i("2909"),n=(i("d3b7"),i("159b"),i("14d9"),i("b0c0"),i("e9c4"),function(t,e,i){var a=[];return e=e||"desc",i=i||"code",t.forEach((function(t){a.push({label:t[e],value:t[i]})})),a}),o=function(t){var e=t?new Date(t):new Date,i=e.getFullYear(),a=e.getMonth()+1;a=a<10?"0"+a:a;var n=e.getDate();n=n<10?"0"+n:n;var o=e.getHours();o=o<10?"0"+o:o;var r=e.getMinutes(),s=e.getSeconds();return r=r<10?"0"+r:r,s=s<10?"0"+s:s,i+"-"+a+"-"+n+"  "+o+":"+r+":"+s},r=function(t,e){e=e||0;var i=t?new Date(t):new Date;i=new Date(i.setDate(i.getDate()+e));var a=i.getFullYear(),n=i.getMonth()+1;n=n<10?"0"+n:n;var o=i.getDate();o=o<10?"0"+o:o;var r=i.getHours();r=r<10?"0"+r:r;var s=i.getMinutes(),l=i.getSeconds();return s=s<10?"0"+s:s,l=l<10?"0"+l:l,a+"-"+n+"-"+o},s=function(t){var e=t?new Date(t):new Date,i=e.getFullYear(),a=e.getMonth()+1;a=a<10?"0"+a:a;var n=e.getDate();n=n<10?"0"+n:n;var o=e.getHours();o=o<10?"0"+o:o;var r=e.getMinutes(),s=e.getSeconds();return r=r<10?"0"+r:r,s=s<10?"0"+s:s,i+"-"+a},l=function(){var t=window.location.hash.split("?")[1],e={};if(t)for(var i=t.split("&"),a=0;a<i.length;a++){var n=i[a].split("=");e[n[0]]=decodeURIComponent(n[1])}return e},c=function(t){var e="",i="";return t.forEach((function(t){"sgdw"==t["typecode"]&&(e+=t["name"]+"、"),"jldw"==t["typecode"]&&(i+=t["name"]+"、")})),{buildCompany:e,supervisionUnit:i}},u=function(t,e,i){var a=JSON.parse(JSON.stringify(t)),n=JSON.parse(JSON.stringify(e));i=i||[],a[0]&&i.forEach((function(t){delete a[0][t]})),n[0]&&i.forEach((function(t){delete n[0][t]}));var o=JSON.stringify(a)===JSON.stringify(n);return o},d=function(t,e){if(!t||!e)return"";var i=Date.parse(t),a=Date.parse(e);return i>a?0:i===a?1:parseInt((a-i)/864e5)},b=function(t,e){t=t||[];var i="";return t.forEach((function(t){t["value"]==e&&(i=t["label"])})),i},f=function t(e,i,n){n||(n=[]);for(var o=0;o<e.length;o++){var r=Object(a["a"])(n);if(r.push(e[o].name),e[o].id===i)return r;if(e[o].child){var s=t(e[o].child,i,r);if(s)return s}}}},7038:function(t,e,i){"use strict";var a=function(){var t=this,e=t._self._c;return e("div",[t.editAble?e("div",{staticClass:"block-line"},[e("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"",limit:1,"show-file-list":!1,accept:t.accept,"http-request":t.importFile}},[e("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1):t._e(),e("div",{staticClass:"block-table",staticStyle:{background:"rgba(0,0,0,0)"}},[e("el-table",{staticClass:"have_scrolling",staticStyle:{width:"100%"},attrs:{data:t.attachTable,border:""}},[e("el-table-column",{attrs:{type:"index",width:"50",align:"center",label:"序号"}}),e("el-table-column",{attrs:{prop:"fileName",align:"center",label:"附件","show-overflow-tooltip":""}}),e("el-table-column",{attrs:{prop:"uploadTime",width:"160px",align:"center",label:"上传日期"}}),e("el-table-column",{attrs:{prop:"creatorName",width:"120px",align:"center",label:"上传人"}}),e("el-table-column",{attrs:{width:"120",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(i){var a=i.row,n=i.$index;return[e("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){return t.reviewAttach(a,n)}}},[t._v("预览")]),t.editAble?e("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){return t.deleteAttach(a,n)}}},[t._v("删除")]):t._e()]}}])})],1)],1),e("PdfPreview",{directives:[{name:"show",rawName:"v-show",value:"pdf"==t.viewFileType,expression:"viewFileType=='pdf'"}],ref:"pdfPreview"}),e("el-dialog",{attrs:{title:"预览",visible:t.viewFileVisible,fullscreen:!0,width:"100%",height:"100%",modal:!1},on:{"update:visible":function(e){t.viewFileVisible=e}}},[e("img",{directives:[{name:"show",rawName:"v-show",value:"img"==t.viewFileType,expression:"viewFileType=='img'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl}}),e("video",{directives:[{name:"show",rawName:"v-show",value:"mp4"==t.viewFileType,expression:"viewFileType=='mp4'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl,controls:""}}),e("video",{directives:[{name:"show",rawName:"v-show",value:"mov"==t.viewFileType,expression:"viewFileType=='mov'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl,controls:""}})])],1)},n=[],o=i("5530"),r=(i("a434"),i("14d9"),i("b0c0"),i("2f62")),s=i("015e"),l=i("24d2"),c=i("ed08"),u=i("6be8"),d=i("5c96"),b=i("a79c"),f={props:["attachTable","editAble","acceptList"],components:{PdfPreview:b["a"]},data:function(){return{viewFileType:"",viewFileUrl:"",viewFileVisible:!1,accept:this.acceptList||"image/*|video/*"}},computed:Object(o["a"])({},Object(r["b"])(["userInfo","name","project","roleId","getUrl"])),methods:{downloadAttach:function(t,e){s["downloadFile"]({fileid:t["fileId"]})},reviewAttach:function(t,e){var i=this,a="";(t.fileName.indexOf(".png")>-1||t.fileName.indexOf(".jpg")>-1)&&(a="img"),t.fileName.indexOf(".mp4")>-1&&(a="mp4"),(t.fileName.indexOf(".mov")>-1||t.fileName.indexOf(".MOV")>-1)&&(a="mov"),t.fileName.indexOf(".pdf")>-1&&(a="pdf"),this.viewFileType=a,this.viewFileUrl=Object(c["g"])(t.fileId),"pdf"==a?setTimeout((function(){i.$refs["pdfPreview"].show_otherPDF(t.fileId)}),300):this.viewFileVisible=!0},deleteAttach:function(t,e){var i=this;d["MessageBox"].confirm("确认是否删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){i.attachTable.splice(e,1)}))},afterUp:function(t){this.attachTable.push({uploadTime:Object(u["e"])(t["uploadTime"]),fileName:t["fileName"],fileId:t["fileId"],creatorName:this.$store.state.userinfo.name})},importFile:function(t){var e=this,i=new FileReader;i.readAsDataURL(t.file),i.onload=function(i){var a=i.target["result"].split("base64,")[1];Object(l["tb"])({name:t.file.name,base64:a}).then((function(i){e.$refs.upload.clearFiles();var a=Object(u["e"])(new Date),n=t.file.name,o=i;e.afterUp({uploadTime:a,fileName:n,fileId:o})}))}}}},m=f,v=(i("5ac8"),i("2877")),p=Object(v["a"])(m,a,n,!1,null,null,null);e["a"]=p.exports},"75cd":function(t,e,i){"use strict";i("2a3e")},"7e84":function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));i("131a"),i("3410"),i("1f68");function a(t){return a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},a(t)}},8384:function(t,e,i){"use strict";i("a024")},"8fd7":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"form-content"},[e("el-form",{ref:"form",attrs:{"label-width":"80px"}},[e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("发起位置")])]),e("locationmap"),e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("基本信息")])]),e("projectinfo"),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("发起时间")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.startDate)+" ")])])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("巡视信息")])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item-label"},[t._v("巡视地点"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.patrolPlace)+" ")])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item-label"},[t._v("主要施工情况"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.buildCondition)+" ")])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("质量、安全、环保情况"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.qualityCondition)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("发现的问题及处理意见"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.problemDealCondition)+" ")])])])]),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("巡视现场照片")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.patrolPhotoAttachment}})],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("视频")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.video}})],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("其他附件")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.otherAttachmentInfo)+" ")])])])])])],1)},n=[],o=i("015e"),r=i("6be8"),s=i("7038"),l=i("157e"),c=i("aba5"),u={data:function(){return{baseInfo:{buildSection:1,buildSectionName:"235国道杭州至诸暨公路萧山河上至诸暨安华段改建工程",contractCode:"235SJSG01",buildCompany:"中交上海航道局有限公司、中国交通建设股份有限公司、浙江诸安建设集团有限公司、浙江省交通规划设计研究院有限公司",supervisionUnit:"浙江交科公路水运工程监理有限公司",supervisionSection:"监理办"},formData:{address:{},auditUser:{},buildCondition:"",deletedFlag:1,draftFlag:1,otherAttachmentInfo:"",patrolPhotoAttachment:[],patrolPlace:"",problemDealCondition:"",buildSection:this.$store.getters.currentBiaoDuan.id||3,projectId:this.$store.getters.curProject.id||2,qualityCondition:"",startDate:Object(r["d"])(new Date),video:[]},taskInfo:{}}},created:function(){},components:{attachlist:s["a"],locationmap:l["a"],projectinfo:c["a"]},computed:{},watch:{},mounted:function(){},methods:{getDetail:function(t){var e=this;o["wb"](t).then((function(t){var i=t["data"]||{};e.formData=i}))}}},d=u,b=(i("75cd"),i("2877")),f=Object(b["a"])(d,a,n,!1,null,"7247d3e4",null);e["default"]=f.exports},9072:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));i("4ec9"),i("d3b7"),i("3ca3"),i("ddb0"),i("d9e2");var a=i("7e84"),n=i("b380");i("25f0");function o(t){return-1!==Function.toString.call(t).indexOf("[native code]")}var r=i("4478");function s(t){var e="function"===typeof Map?new Map:void 0;return s=function(t){if(null===t||!o(t))return t;if("function"!==typeof t)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof e){if(e.has(t))return e.get(t);e.set(t,i)}function i(){return Object(r["a"])(t,arguments,Object(a["a"])(this).constructor)}return i.prototype=Object.create(t.prototype,{constructor:{value:i,enumerable:!1,writable:!0,configurable:!0}}),Object(n["a"])(i,t)},s(t)}},9491:function(t,e,i){"use strict";var a=i("2b0e"),n=i("d4ec"),o=i("bee2"),r=i("262e"),s=i("2caf"),l=i("9072"),c=(i("d3b7"),i("159b"),i("14d9"),i("4ec9"),i("3ca3"),i("ddb0"),function(t){Object(r["a"])(i,t);var e=Object(s["a"])(i);function i(t,a){var o,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"id",s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"symbol";return Object(n["a"])(this,i),o=e.call(this),o.showName=t,o.setList(a,r,s),o}return Object(o["a"])(i,[{key:"setList",value:function(t){var e=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"id",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"symbol";this.clear(),Array.isArray(t)&&t.forEach((function(t){e.set(t[i],t),null!=t[a]&&Object.defineProperty(e,t[a],{get:function(){return t[i]}})}))}},{key:"getList",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"name",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"parentId",i=arguments.length>2?arguments[2]:void 0,a=[];return this.forEach((function(n,o){var r={id:o,name:"string"===typeof n?n:n[t],parentId:n[e]};("function"!==typeof i||i(r))&&a.push(r)})),a}},{key:"getValue",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"name";return"boolean"===typeof t&&(t=t?1:0),(this.get(t)||{})[e]}}]),i}(Object(l["a"])(Map))),u=new c("用户状态",[{id:0,name:"正常状态",symbol:"NORMAL"},{id:1,name:"锁定状态",symbol:"LOCKED"}]);a["default"].prototype.SysUserStatus=u;var d=new c("用户类型",[{id:0,name:"管理员",symbol:"ADMIN"},{id:1,name:"系统操作员",symbol:"SYSTEM"},{id:2,name:"普通操作员",symbol:"OPERATOR"}]);a["default"].prototype.SysUserType=d;var b=new c("权限分组类型",[{id:0,name:"分组模块",symbol:"GROUP"},{id:1,name:"接口模块",symbol:"CONTROLLER"}]);a["default"].prototype.SysPermModuleType=b;var f=new c("权限字类型",[{id:0,name:"表单",symbol:"FORM"},{id:1,name:"片段",symbol:"FRAGMENT"},{id:2,name:"操作",symbol:"OPERATION"}]);a["default"].prototype.SysPermCodeType=f;var m=new c("菜单类型",[{id:0,name:"目录",symbol:"DIRECTORY"},{id:1,name:"表单",symbol:"MENU"},{id:2,name:"片段",symbol:"FRAGMENT"},{id:3,name:"按钮",symbol:"BUTTON"}]);a["default"].prototype.SysMenuType=m;var v=new c("菜单绑定类型",[{id:0,name:"路由菜单",symbol:"ROUTER"},{id:1,name:"在线表单",symbol:"ONLINE_FORM"},{id:2,name:"工单列表",symbol:"WORK_ORDER"}]);a["default"].prototype.SysMenuBindType=v;var p=new c("数据权限类型",[{id:0,name:"查看全部",symbol:"ALL"},{id:1,name:"仅看自己",symbol:"ONLY_USER"},{id:2,name:"仅看所在部门",symbol:"ONLY_DEPT"},{id:3,name:"仅看所在部门及子部门",symbol:"ONLY_DEPT_AND_CHILD"},{id:4,name:"自选部门及子部门",symbol:"CUSTOM_DEPT_AND_CHILD"},{id:5,name:"仅自选部门",symbol:"CUSTOM_DEPT"}]);a["default"].prototype.SysDataPermType=p;var y=new c("流程绑定表单类型",[{id:0,name:"动态表单",symbol:"ONLINE_FORM"},{id:1,name:"路由表单",symbol:"ROUTER_FORM"}]);a["default"].prototype.SysFlowEntryBindFormType=y;var h=new c("流程设计发布状态",[{id:0,name:"未发布",symbol:"UNPUBLISHED"},{id:1,name:"已发布",symbol:"PUBLISHED"}]);a["default"].prototype.SysFlowEntryPublishedStatus=h;var w=new c("流程设计步骤",[{id:0,name:"编辑基础信息",symbol:"BASIC"},{id:1,name:"流程变量设置",symbol:"PROCESS_VARIABLE"},{id:2,name:"设计流程",symbol:"PROCESS_DESIGN"}]);a["default"].prototype.SysFlowEntryStep=w;var O=new c("任务操作类型",[{id:"agree",name:"同意",symbol:"AGREE"},{id:"refuse",name:"拒绝",symbol:"REFUSE"},{id:"reject",name:"驳回",symbol:"REJECT"},{id:"rejectToStart",name:"驳回到起点",symbol:"REJECT_TO_START"},{id:"revoke",name:"撤销",symbol:"REVOKE"},{id:"transfer",name:"转办",symbol:"TRANSFER"},{id:"multi_consign",name:"加签",symbol:"CO_SIGN"},{id:"save",name:"保存",symbol:"SAVE"},{id:"stop",name:"终止",symbol:"STOP"},{id:"multi_sign",name:"会签",symbol:"MULTI_SIGN"},{id:"multi_agree",name:"同意（会签）",symbol:"MULTI_AGREE"},{id:"multi_refuse",name:"拒绝（会签）",symbol:"MULTI_REFUSE"},{id:"multi_abstain",name:"弃权（会签）",symbol:"MULTI_ABSTAIN"},{id:"set_assignee",name:"指定审批人",symbol:"SET_ASSIGNEE"}]);a["default"].prototype.SysFlowTaskOperationType=O;var C=new c("工作流任务类型",[{id:0,name:"其他任务",symbol:"OTHER_TASK"},{id:1,name:"用户任务",symbol:"USER_TASK"}]);a["default"].prototype.SysFlowTaskType=C;var g=new c("工作流变量类型",[{id:0,name:"流程变量",symbol:"INSTANCE"},{id:1,name:"任务变量",symbol:"TASK"}]);a["default"].prototype.SysFlowVariableType=g;var _=new c("工单状态",[{id:0,name:"已提交",symbol:"SUBMITED"},{id:1,name:"审批中",symbol:"APPROVING"},{id:2,name:"已拒绝",symbol:"REFUSED"},{id:3,name:"已完成",symbol:"FINISHED"},{id:4,name:"终止",symbol:"STOPPED"},{id:5,name:"撤销",symbol:"CANCEL"}]);a["default"].prototype.SysFlowWorkOrderStatus=_;var S=new c("抄送类型",[{id:"user",name:"抄送人",symbol:"USER"},{id:"dept",name:"抄送部门",symbol:"DEPT"},{id:"role",name:"抄送角色",symbol:"ROLE"},{id:"deptPostLeader",name:"审批人部门领导",symbol:"SELF_DEPT_LEADER"},{id:"upDeptPostLeader",name:"审批人上级部门领导",symbol:"UP_DEPT_LEADER"},{id:"allDeptPost",name:"抄送岗位",symbol:"POST"},{id:"selfDeptPost",name:"审批人部门岗位",symbol:"SELF_DEPT_POST"},{id:"upDeptPost",name:"审批人上级部门岗位",symbol:"UP_DEPT_POST"},{id:"deptPost",name:"指定部门岗位",symbol:"DEPT_POST"}]);a["default"].prototype.SysFlowCopyForType=S},a024:function(t,e,i){},a200:function(t,e,i){},aba5:function(t,e,i){"use strict";var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"form-block"},[e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("项目名称")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.projectName)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("合同号")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.contractCode)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("施工单位")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.buildCompany)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("监理单位")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.supervisionUnit)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("标段")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.buildSectionName)+" ")])])])])},n=[],o=i("5530"),r=(i("b0c0"),i("2f62")),s=i("24d2"),l=i("6be8"),c={props:["hasSection"],data:function(){return{baseInfo:{projectName:"",buildSectionName:"",contractCode:"",buildCompany:"",supervisionUnit:""},hasBuildSection:void 0!=this.hasSection&&this.hasSection}},computed:Object(o["a"])({},Object(r["b"])(["userInfo","name","project","roleId","getUrl","currentBiaoDuan","curProject"])),mounted:function(){this.getProjectInfoById()},methods:{getProjectInfoById:function(){var t=this;this.baseInfo.buildSectionName=this.currentBiaoDuan.name,this.baseInfo.contractCode=this.currentBiaoDuan.contractnum,s["S"]({projectid:this.curProject.id||2}).then((function(e){var i=e||{};t.baseInfo["projectName"]=i["project"]?i["project"]["name"]:"";var a=i["companys"]||[],n=Object(l["b"])(a);t.baseInfo["buildCompany"]=n["buildCompany"],t.baseInfo["supervisionUnit"]=n["supervisionUnit"]}))}}},u=c,d=(i("6a4e"),i("2877")),b=Object(d["a"])(u,a,n,!1,null,"077e8938",null);e["a"]=b.exports},bee2:function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var a=i("a38e");function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,Object(a["a"])(n.key),n)}}function o(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),Object.defineProperty(t,"prototype",{writable:!1}),t}},d4ec:function(t,e,i){"use strict";i.d(e,"a",(function(){return a}));i("d9e2");function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}}}]);