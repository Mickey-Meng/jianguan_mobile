(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e4bbac4"],{"06c5":function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));i("fb6a"),i("d3b7"),i("b0c0"),i("a630"),i("3ca3"),i("ac1f"),i("00b4");var a=i("6b75");function n(t,e){if(t){if("string"===typeof t)return Object(a["a"])(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?Object(a["a"])(t,e):void 0}}},2909:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));var a=i("6b75");function n(t){if(Array.isArray(t))return Object(a["a"])(t)}i("a4d3"),i("e01a"),i("d3b7"),i("d28b"),i("3ca3"),i("ddb0"),i("a630");function r(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var o=i("06c5");i("d9e2");function l(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return n(t)||r(t)||Object(o["a"])(t)||l()}},"505b":function(t,e,i){},5530:function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));i("b64b"),i("a4d3"),i("4de4"),i("d3b7"),i("e439"),i("14d9"),i("159b"),i("dbb4");var a=i("ade3");function n(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function r(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?n(Object(i),!0).forEach((function(e){Object(a["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}},"5ac8":function(t,e,i){"use strict";i("a200")},"6a4e":function(t,e,i){"use strict";i("505b")},"6b75":function(t,e,i){"use strict";function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}i.d(e,"a",(function(){return a}))},"6be8":function(t,e,i){"use strict";i.d(e,"a",(function(){return n})),i.d(e,"e",(function(){return r})),i.d(e,"d",(function(){return o})),i.d(e,"f",(function(){return l})),i.d(e,"j",(function(){return s})),i.d(e,"b",(function(){return c})),i.d(e,"c",(function(){return u})),i.d(e,"h",(function(){return d})),i.d(e,"i",(function(){return b})),i.d(e,"g",(function(){return f}));var a=i("2909"),n=(i("d3b7"),i("159b"),i("14d9"),i("b0c0"),i("e9c4"),function(t,e,i){var a=[];return e=e||"desc",i=i||"code",t.forEach((function(t){a.push({label:t[e],value:t[i]})})),a}),r=function(t){var e=t?new Date(t):new Date,i=e.getFullYear(),a=e.getMonth()+1;a=a<10?"0"+a:a;var n=e.getDate();n=n<10?"0"+n:n;var r=e.getHours();r=r<10?"0"+r:r;var o=e.getMinutes(),l=e.getSeconds();return o=o<10?"0"+o:o,l=l<10?"0"+l:l,i+"-"+a+"-"+n+"  "+r+":"+o+":"+l},o=function(t,e){e=e||0;var i=t?new Date(t):new Date;i=new Date(i.setDate(i.getDate()+e));var a=i.getFullYear(),n=i.getMonth()+1;n=n<10?"0"+n:n;var r=i.getDate();r=r<10?"0"+r:r;var o=i.getHours();o=o<10?"0"+o:o;var l=i.getMinutes(),s=i.getSeconds();return l=l<10?"0"+l:l,s=s<10?"0"+s:s,a+"-"+n+"-"+r},l=function(t){var e=t?new Date(t):new Date,i=e.getFullYear(),a=e.getMonth()+1;a=a<10?"0"+a:a;var n=e.getDate();n=n<10?"0"+n:n;var r=e.getHours();r=r<10?"0"+r:r;var o=e.getMinutes(),l=e.getSeconds();return o=o<10?"0"+o:o,l=l<10?"0"+l:l,i+"-"+a},s=function(){var t=window.location.hash.split("?")[1],e={};if(t)for(var i=t.split("&"),a=0;a<i.length;a++){var n=i[a].split("=");e[n[0]]=decodeURIComponent(n[1])}return e},c=function(t){var e="",i="";return t.forEach((function(t){"sgdw"==t["typecode"]&&(e+=t["name"]+"、"),"jldw"==t["typecode"]&&(i+=t["name"]+"、")})),{buildCompany:e,supervisionUnit:i}},u=function(t,e,i){var a=JSON.parse(JSON.stringify(t)),n=JSON.parse(JSON.stringify(e));i=i||[],a[0]&&i.forEach((function(t){delete a[0][t]})),n[0]&&i.forEach((function(t){delete n[0][t]}));var r=JSON.stringify(a)===JSON.stringify(n);return r},d=function(t,e){if(!t||!e)return"";var i=Date.parse(t),a=Date.parse(e);return i>a?0:i===a?1:parseInt((a-i)/864e5)},b=function(t,e){t=t||[];var i="";return t.forEach((function(t){t["value"]==e&&(i=t["label"])})),i},f=function t(e,i,n){n||(n=[]);for(var r=0;r<e.length;r++){var o=Object(a["a"])(n);if(o.push(e[r].name),e[r].id===i)return o;if(e[r].child){var l=t(e[r].child,i,o);if(l)return l}}}},"6e48":function(t,e,i){},7038:function(t,e,i){"use strict";var a=function(){var t=this,e=t._self._c;return e("div",[t.editAble?e("div",{staticClass:"block-line"},[e("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"",limit:1,"show-file-list":!1,accept:t.accept,"http-request":t.importFile}},[e("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1):t._e(),e("div",{staticClass:"block-table",staticStyle:{background:"rgba(0,0,0,0)"}},[e("el-table",{staticClass:"have_scrolling",staticStyle:{width:"100%"},attrs:{data:t.attachTable,border:""}},[e("el-table-column",{attrs:{type:"index",width:"50",align:"center",label:"序号"}}),e("el-table-column",{attrs:{prop:"fileName",align:"center",label:"附件","show-overflow-tooltip":""}}),e("el-table-column",{attrs:{prop:"uploadTime",width:"160px",align:"center",label:"上传日期"}}),e("el-table-column",{attrs:{prop:"creatorName",width:"120px",align:"center",label:"上传人"}}),e("el-table-column",{attrs:{width:"120",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(i){var a=i.row,n=i.$index;return[e("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){return t.reviewAttach(a,n)}}},[t._v("预览")]),t.editAble?e("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){return t.deleteAttach(a,n)}}},[t._v("删除")]):t._e()]}}])})],1)],1),e("PdfPreview",{directives:[{name:"show",rawName:"v-show",value:"pdf"==t.viewFileType,expression:"viewFileType=='pdf'"}],ref:"pdfPreview"}),e("el-dialog",{attrs:{title:"预览",visible:t.viewFileVisible,fullscreen:!0,width:"100%",height:"100%",modal:!1},on:{"update:visible":function(e){t.viewFileVisible=e}}},[e("img",{directives:[{name:"show",rawName:"v-show",value:"img"==t.viewFileType,expression:"viewFileType=='img'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl}}),e("video",{directives:[{name:"show",rawName:"v-show",value:"mp4"==t.viewFileType,expression:"viewFileType=='mp4'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl,controls:""}}),e("video",{directives:[{name:"show",rawName:"v-show",value:"mov"==t.viewFileType,expression:"viewFileType=='mov'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl,controls:""}})])],1)},n=[],r=i("5530"),o=(i("a434"),i("14d9"),i("b0c0"),i("2f62")),l=i("015e"),s=i("24d2"),c=i("ed08"),u=i("6be8"),d=i("5c96"),b=i("a79c"),f={props:["attachTable","editAble","acceptList"],components:{PdfPreview:b["a"]},data:function(){return{viewFileType:"",viewFileUrl:"",viewFileVisible:!1,accept:this.acceptList||"image/*|video/*"}},computed:Object(r["a"])({},Object(o["b"])(["userInfo","name","project","roleId","getUrl"])),methods:{downloadAttach:function(t,e){l["downloadFile"]({fileid:t["fileId"]})},reviewAttach:function(t,e){var i=this,a="";(t.fileName.indexOf(".png")>-1||t.fileName.indexOf(".jpg")>-1)&&(a="img"),t.fileName.indexOf(".mp4")>-1&&(a="mp4"),(t.fileName.indexOf(".mov")>-1||t.fileName.indexOf(".MOV")>-1)&&(a="mov"),t.fileName.indexOf(".pdf")>-1&&(a="pdf"),this.viewFileType=a,this.viewFileUrl=Object(c["g"])(t.fileId),"pdf"==a?setTimeout((function(){i.$refs["pdfPreview"].show_otherPDF(t.fileId)}),300):this.viewFileVisible=!0},deleteAttach:function(t,e){var i=this;d["MessageBox"].confirm("确认是否删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){i.attachTable.splice(e,1)}))},afterUp:function(t){this.attachTable.push({uploadTime:Object(u["e"])(t["uploadTime"]),fileName:t["fileName"],fileId:t["fileId"],creatorName:this.$store.state.userinfo.name})},importFile:function(t){var e=this,i=new FileReader;i.readAsDataURL(t.file),i.onload=function(i){var a=i.target["result"].split("base64,")[1];Object(s["tb"])({name:t.file.name,base64:a}).then((function(i){e.$refs.upload.clearFiles();var a=Object(u["e"])(new Date),n=t.file.name,r=i;e.afterUp({uploadTime:a,fileName:n,fileId:r})}))}}}},p=f,v=(i("5ac8"),i("2877")),m=Object(v["a"])(p,a,n,!1,null,null,null);e["a"]=m.exports},"8f64":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"form-content"},[e("div",{staticClass:"form-content"},[e("el-form",{ref:"form",attrs:{"label-width":"80px"}},[e("div",{staticClass:"form-title"},[e("div",{staticClass:"title-big-bar"}),e("strong",[t._v("到场设备报验单")])]),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("基本信息")])]),e("projectinfo"),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("工程编号")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.projectCode)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("进场设备信息")])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("监理办"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.supervisionBan)+" ")])])]),e("div",{staticClass:"block-table"},[e("el-table",{staticClass:"have_scrolling",staticStyle:{width:"100%"},attrs:{data:t.equipmentTable,border:""}},[e("el-table-column",{attrs:{type:"index",width:"50",align:"center",label:"序号"}}),e("el-table-column",{attrs:{prop:"equipmentTypeStr",align:"center",label:"设备类型","show-overflow-tooltip":""}}),e("el-table-column",{attrs:{prop:"equipmentName",width:"180px",align:"center",label:"设备名称"}}),e("el-table-column",{attrs:{prop:"specification",width:"120px",align:"center",label:"规格型号"}}),e("el-table-column",{attrs:{prop:"num",width:"120px",align:"center",label:"数量"}}),e("el-table-column",{attrs:{prop:"enterDate",width:"120px",align:"center",label:"进场日期"}}),e("el-table-column",{attrs:{prop:"techCondition",width:"120px",align:"center",label:"技术状况"}}),e("el-table-column",{attrs:{prop:"useWhere",width:"120px",align:"center",label:"拟用何处"}}),e("el-table-column",{attrs:{prop:"remark",width:"120px",align:"center",label:"备注"}})],1)],1)]),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("附件清单")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.attachTable}})],1)])],1)])},n=[],r=(i("b0c0"),i("d3b7"),i("159b"),i("25f0"),i("015e")),o=i("24d2"),l=i("6be8"),s=i("7038"),c=i("aba5"),u={props:["detailRow"],data:function(){return{baseInfo:{buildSection:1,buildSectionName:"235国道杭州至诸暨公路萧山河上至诸暨安华段改建工程",contractCode:"235SJSG01",buildCompany:"中交上海航道局有限公司、中国交通建设股份有限公司、浙江诸安建设集团有限公司、浙江省交通规划设计研究院有限公司",supervisionUnit:"浙江交科公路水运工程监理有限公司"},formData:{attachment:[],equipmentInfo:[],deletedFlag:1,draftFlag:1,projectCode:"",buildSection:this.$store.getters.currentBiaoDuan.id||3,projectId:this.$store.getters.curProject.id||2,supervisionBan:""},attachTable:[],equipmentTable:[]}},created:function(){},components:{attachlist:s["a"],projectinfo:c["a"]},computed:{},mounted:function(){var t=this;this.getEquipmentEnterEnums(),this.getProjectInfoById(),setTimeout((function(){var e=Object(l["j"])();e["processDefinitionId"]&&(t.dialogFormVisible=!0,e["id"]=e["businessKey"],t.taskInfo=e,t.getDetail(e["businessKey"]))}),500)},watch:{detailRow:function(t){t["id"]&&this.getDetail(t["id"])}},methods:{getDetail:function(t){var e=this;r["R"](t).then((function(t){var i=t["data"]||{};e.formData=i,e.attachTable=i.attachment||[],e.equipmentTable=e.formatEquType(i.equipmentInfo||[])}))},getProjectInfoById:function(){var t=this;o["S"]({projectid:this.$store.getters.curProject.id||2}).then((function(e){var i=e["data"]||{};t.baseInfo["buildSectionName"]=i["project"]?i["project"]["name"]:"";var a=i["companys"]||[],n=Object(l["b"])(a);t.baseInfo["buildCompany"]=n["buildCompany"],t.baseInfo["supervisionUnit"]=n["supervisionUnit"]}))},formatEquType:function(t){var e=this;return t=t||[],t.forEach((function(t){e.equipmentOptions.forEach((function(e){t["equipmentType"].toString()==e["value"].toString()&&(t["equipmentTypeStr"]=e["label"])}))})),t},getEquipmentEnterEnums:function(){var t=this;r["S"]().then((function(e){var i=e.data||[];t.equipmentOptions=Object(l["a"])(i,"desc","code")}))}}},d=u,b=(i("e1e9"),i("2877")),f=Object(b["a"])(d,a,n,!1,null,"a373141c",null);e["default"]=f.exports},a200:function(t,e,i){},aba5:function(t,e,i){"use strict";var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"form-block"},[e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("项目名称")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.projectName)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("合同号")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.contractCode)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("施工单位")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.buildCompany)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("监理单位")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.supervisionUnit)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("标段")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.buildSectionName)+" ")])])])])},n=[],r=i("5530"),o=(i("b0c0"),i("2f62")),l=i("24d2"),s=i("6be8"),c={props:["hasSection"],data:function(){return{baseInfo:{projectName:"",buildSectionName:"",contractCode:"",buildCompany:"",supervisionUnit:""},hasBuildSection:void 0!=this.hasSection&&this.hasSection}},computed:Object(r["a"])({},Object(o["b"])(["userInfo","name","project","roleId","getUrl","currentBiaoDuan","curProject"])),mounted:function(){this.getProjectInfoById()},methods:{getProjectInfoById:function(){var t=this;this.baseInfo.buildSectionName=this.currentBiaoDuan.name,this.baseInfo.contractCode=this.currentBiaoDuan.contractnum,l["S"]({projectid:this.curProject.id||2}).then((function(e){var i=e||{};t.baseInfo["projectName"]=i["project"]?i["project"]["name"]:"";var a=i["companys"]||[],n=Object(s["b"])(a);t.baseInfo["buildCompany"]=n["buildCompany"],t.baseInfo["supervisionUnit"]=n["supervisionUnit"]}))}}},u=c,d=(i("6a4e"),i("2877")),b=Object(d["a"])(u,a,n,!1,null,"077e8938",null);e["a"]=b.exports},e1e9:function(t,e,i){"use strict";i("6e48")}}]);