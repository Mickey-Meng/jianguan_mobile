(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f4e5fa84"],{"06c5":function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));i("fb6a"),i("d3b7"),i("b0c0"),i("a630"),i("3ca3"),i("ac1f"),i("00b4");var a=i("6b75");function s(t,e){if(t){if("string"===typeof t)return Object(a["a"])(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?Object(a["a"])(t,e):void 0}}},2909:function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var a=i("6b75");function s(t){if(Array.isArray(t))return Object(a["a"])(t)}i("a4d3"),i("e01a"),i("d3b7"),i("d28b"),i("3ca3"),i("ddb0"),i("a630");function l(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var c=i("06c5");i("d9e2");function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function r(t){return s(t)||l(t)||Object(c["a"])(t)||o()}},"505b":function(t,e,i){},5530:function(t,e,i){"use strict";i.d(e,"a",(function(){return l}));i("b64b"),i("a4d3"),i("4de4"),i("d3b7"),i("e439"),i("14d9"),i("159b"),i("dbb4");var a=i("ade3");function s(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function l(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?s(Object(i),!0).forEach((function(e){Object(a["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):s(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}},"5ac8":function(t,e,i){"use strict";i("a200")},"6a4e":function(t,e,i){"use strict";i("505b")},"6b75":function(t,e,i){"use strict";function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,a=new Array(e);i<e;i++)a[i]=t[i];return a}i.d(e,"a",(function(){return a}))},"6be8":function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"e",(function(){return l})),i.d(e,"d",(function(){return c})),i.d(e,"f",(function(){return o})),i.d(e,"j",(function(){return r})),i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return d})),i.d(e,"h",(function(){return b})),i.d(e,"i",(function(){return v})),i.d(e,"g",(function(){return u}));var a=i("2909"),s=(i("d3b7"),i("159b"),i("14d9"),i("b0c0"),i("e9c4"),function(t,e,i){var a=[];return e=e||"desc",i=i||"code",t.forEach((function(t){a.push({label:t[e],value:t[i]})})),a}),l=function(t){var e=t?new Date(t):new Date,i=e.getFullYear(),a=e.getMonth()+1;a=a<10?"0"+a:a;var s=e.getDate();s=s<10?"0"+s:s;var l=e.getHours();l=l<10?"0"+l:l;var c=e.getMinutes(),o=e.getSeconds();return c=c<10?"0"+c:c,o=o<10?"0"+o:o,i+"-"+a+"-"+s+"  "+l+":"+c+":"+o},c=function(t,e){e=e||0;var i=t?new Date(t):new Date;i=new Date(i.setDate(i.getDate()+e));var a=i.getFullYear(),s=i.getMonth()+1;s=s<10?"0"+s:s;var l=i.getDate();l=l<10?"0"+l:l;var c=i.getHours();c=c<10?"0"+c:c;var o=i.getMinutes(),r=i.getSeconds();return o=o<10?"0"+o:o,r=r<10?"0"+r:r,a+"-"+s+"-"+l},o=function(t){var e=t?new Date(t):new Date,i=e.getFullYear(),a=e.getMonth()+1;a=a<10?"0"+a:a;var s=e.getDate();s=s<10?"0"+s:s;var l=e.getHours();l=l<10?"0"+l:l;var c=e.getMinutes(),o=e.getSeconds();return c=c<10?"0"+c:c,o=o<10?"0"+o:o,i+"-"+a},r=function(){var t=window.location.hash.split("?")[1],e={};if(t)for(var i=t.split("&"),a=0;a<i.length;a++){var s=i[a].split("=");e[s[0]]=decodeURIComponent(s[1])}return e},n=function(t){var e="",i="";return t.forEach((function(t){"sgdw"==t["typecode"]&&(e+=t["name"]+"、"),"jldw"==t["typecode"]&&(i+=t["name"]+"、")})),{buildCompany:e,supervisionUnit:i}},d=function(t,e,i){var a=JSON.parse(JSON.stringify(t)),s=JSON.parse(JSON.stringify(e));i=i||[],a[0]&&i.forEach((function(t){delete a[0][t]})),s[0]&&i.forEach((function(t){delete s[0][t]}));var l=JSON.stringify(a)===JSON.stringify(s);return l},b=function(t,e){if(!t||!e)return"";var i=Date.parse(t),a=Date.parse(e);return i>a?0:i===a?1:parseInt((a-i)/864e5)},v=function(t,e){t=t||[];var i="";return t.forEach((function(t){t["value"]==e&&(i=t["label"])})),i},u=function t(e,i,s){s||(s=[]);for(var l=0;l<e.length;l++){var c=Object(a["a"])(s);if(c.push(e[l].name),e[l].id===i)return c;if(e[l].child){var o=t(e[l].child,i,c);if(o)return o}}}},7038:function(t,e,i){"use strict";var a=function(){var t=this,e=t._self._c;return e("div",[t.editAble?e("div",{staticClass:"block-line"},[e("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"",limit:1,"show-file-list":!1,accept:t.accept,"http-request":t.importFile}},[e("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1):t._e(),e("div",{staticClass:"block-table",staticStyle:{background:"rgba(0,0,0,0)"}},[e("el-table",{staticClass:"have_scrolling",staticStyle:{width:"100%"},attrs:{data:t.attachTable,border:""}},[e("el-table-column",{attrs:{type:"index",width:"50",align:"center",label:"序号"}}),e("el-table-column",{attrs:{prop:"fileName",align:"center",label:"附件","show-overflow-tooltip":""}}),e("el-table-column",{attrs:{prop:"uploadTime",width:"160px",align:"center",label:"上传日期"}}),e("el-table-column",{attrs:{prop:"creatorName",width:"120px",align:"center",label:"上传人"}}),e("el-table-column",{attrs:{width:"120",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(i){var a=i.row,s=i.$index;return[e("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){return t.reviewAttach(a,s)}}},[t._v("预览")]),t.editAble?e("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){return t.deleteAttach(a,s)}}},[t._v("删除")]):t._e()]}}])})],1)],1),e("PdfPreview",{directives:[{name:"show",rawName:"v-show",value:"pdf"==t.viewFileType,expression:"viewFileType=='pdf'"}],ref:"pdfPreview"}),e("el-dialog",{attrs:{title:"预览",visible:t.viewFileVisible,fullscreen:!0,width:"100%",height:"100%",modal:!1},on:{"update:visible":function(e){t.viewFileVisible=e}}},[e("img",{directives:[{name:"show",rawName:"v-show",value:"img"==t.viewFileType,expression:"viewFileType=='img'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl}}),e("video",{directives:[{name:"show",rawName:"v-show",value:"mp4"==t.viewFileType,expression:"viewFileType=='mp4'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl,controls:""}}),e("video",{directives:[{name:"show",rawName:"v-show",value:"mov"==t.viewFileType,expression:"viewFileType=='mov'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl,controls:""}})])],1)},s=[],l=i("5530"),c=(i("a434"),i("14d9"),i("b0c0"),i("2f62")),o=i("015e"),r=i("24d2"),n=i("ed08"),d=i("6be8"),b=i("5c96"),v=i("a79c"),u={props:["attachTable","editAble","acceptList"],components:{PdfPreview:v["a"]},data:function(){return{viewFileType:"",viewFileUrl:"",viewFileVisible:!1,accept:this.acceptList||"image/*|video/*"}},computed:Object(l["a"])({},Object(c["b"])(["userInfo","name","project","roleId","getUrl"])),methods:{downloadAttach:function(t,e){o["downloadFile"]({fileid:t["fileId"]})},reviewAttach:function(t,e){var i=this,a="";(t.fileName.indexOf(".png")>-1||t.fileName.indexOf(".jpg")>-1)&&(a="img"),t.fileName.indexOf(".mp4")>-1&&(a="mp4"),(t.fileName.indexOf(".mov")>-1||t.fileName.indexOf(".MOV")>-1)&&(a="mov"),t.fileName.indexOf(".pdf")>-1&&(a="pdf"),this.viewFileType=a,this.viewFileUrl=Object(n["g"])(t.fileId),"pdf"==a?setTimeout((function(){i.$refs["pdfPreview"].show_otherPDF(t.fileId)}),300):this.viewFileVisible=!0},deleteAttach:function(t,e){var i=this;b["MessageBox"].confirm("确认是否删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){i.attachTable.splice(e,1)}))},afterUp:function(t){this.attachTable.push({uploadTime:Object(d["e"])(t["uploadTime"]),fileName:t["fileName"],fileId:t["fileId"],creatorName:this.$store.state.userinfo.name})},importFile:function(t){var e=this,i=new FileReader;i.readAsDataURL(t.file),i.onload=function(i){var a=i.target["result"].split("base64,")[1];Object(r["tb"])({name:t.file.name,base64:a}).then((function(i){e.$refs.upload.clearFiles();var a=Object(d["e"])(new Date),s=t.file.name,l=i;e.afterUp({uploadTime:a,fileName:s,fileId:l})}))}}}},m=u,f=(i("5ac8"),i("2877")),p=Object(f["a"])(m,a,s,!1,null,null,null);e["a"]=p.exports},a200:function(t,e,i){},aba5:function(t,e,i){"use strict";var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"form-block"},[e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("项目名称")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.projectName)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("合同号")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.contractCode)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("施工单位")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.buildCompany)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("监理单位")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.supervisionUnit)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("标段")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.buildSectionName)+" ")])])])])},s=[],l=i("5530"),c=(i("b0c0"),i("2f62")),o=i("24d2"),r=i("6be8"),n={props:["hasSection"],data:function(){return{baseInfo:{projectName:"",buildSectionName:"",contractCode:"",buildCompany:"",supervisionUnit:""},hasBuildSection:void 0!=this.hasSection&&this.hasSection}},computed:Object(l["a"])({},Object(c["b"])(["userInfo","name","project","roleId","getUrl","currentBiaoDuan","curProject"])),mounted:function(){this.getProjectInfoById()},methods:{getProjectInfoById:function(){var t=this;this.baseInfo.buildSectionName=this.currentBiaoDuan.name,this.baseInfo.contractCode=this.currentBiaoDuan.contractnum,o["S"]({projectid:this.curProject.id||2}).then((function(e){var i=e||{};t.baseInfo["projectName"]=i["project"]?i["project"]["name"]:"";var a=i["companys"]||[],s=Object(r["b"])(a);t.baseInfo["buildCompany"]=s["buildCompany"],t.baseInfo["supervisionUnit"]=s["supervisionUnit"]}))}}},d=n,b=(i("6a4e"),i("2877")),v=Object(b["a"])(d,a,s,!1,null,"077e8938",null);e["a"]=v.exports},d5c9:function(t,e,i){},eb92:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"form-content"},[e("div",{staticClass:"form-content"},[e("el-form",{ref:"form",attrs:{"label-width":"80px"}},[e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("基本信息")])]),e("projectinfo"),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("工程编号")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.projectCode)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("分项开工申请报告信息")])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("建议开工日期"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.openDate)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("计划完工日期"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.endDate)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("地点或桩号"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.place)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("现场负责人"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.liveUserName)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("施工员"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.buildUserName)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("质检员"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.checkUserName)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("施工准备情况说明"),e("i",{staticClass:"require-icon"})]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.buildPrepareExplain)+" ")])])])]),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("标准试验审批表")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.experimentAttachment}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("说明")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.experimentExplain)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("专项施工方案审批表")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.buildAttachment}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("说明")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.buildExplain)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("工艺试验审批表")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.processAttachment}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("说明")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.processExplain)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("到场材料审批表")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.materialAttachment}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("说明")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.materialExplain)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("到场设备审批表（含特种设备检测报告）")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.equipmentAttachment}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("说明")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.equipmentExplain)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("到场技术、质量、安全、环保管理人员及主要操人员、特种作业人员情况及证件复印件")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.techAttachment}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("说明")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.techExplain)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("施工方案")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.buildPlanAttachment}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("说明")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.buildPlanExplain)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("安全技术措施")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.securityAttachment}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("说明")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.securityExplain)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("危险性较大项目安全专项施工方案审查记录")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.riskAttachment}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("说明")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.riskExplain)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("环境保护措施")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.environmentAttachment}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("说明")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.environmentExplain)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("环保、安全、质量、技术交底材料")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.formData.bottomAttachment}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("说明")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.bottomExplain)+" ")])])])],1)])],1)])},s=[],l=(i("d3b7"),i("159b"),i("14d9"),i("b0c0"),i("015e")),c=i("24d2"),o=i("6be8"),r=i("7038"),n=i("aba5"),d={data:function(){return{baseInfo:{buildSection:1,buildSectionName:"235国道杭州至诸暨公路萧山河上至诸暨安华段改建工程",contractCode:"235SJSG01",buildCompany:"中交上海航道局有限公司、中国交通建设股份有限公司、浙江诸安建设集团有限公司、浙江省交通规划设计研究院有限公司",supervisionUnit:"浙江交科公路水运工程监理有限公司",supervisionSection:"监理办"},buildUserOptions:[{label:"洪涛",value:"148"}],checkUserOptions:[{label:"洪涛",value:"148"}],liveUserOptions:[{label:"洪涛",value:"148"}],formData:{bottomAttachment:[],bottomExplain:"",buildAttachment:[],buildExplain:"",buildPlanAttachment:[],buildPlanExplain:"",buildPrepareExplain:"",buildUser:"",checkUser:"",endDate:Object(o["d"])(new Date),environmentAttachment:[],environmentExplain:"",equipmentAttachment:[],equipmentExplain:"",experimentAttachment:[],experimentExplain:"",liveUser:"",materialAttachment:[],materialExplain:"",openDate:Object(o["d"])(new Date),place:"",processAttachment:[],processExplain:"",projectCode:"",riskAttachment:[],riskExplain:"",securityAttachment:[],securityExplain:"",techAttachment:[],techExplain:"",deletedFlag:1,draftFlag:1,buildSection:this.$store.getters.currentBiaoDuan.id||3,projectId:this.$store.getters.curProject.id||2},examineTable:[],reportTable:[],factoryTable:[],attachTable:[]}},created:function(){},components:{attachlist:r["a"],projectinfo:n["a"]},computed:{},watch:{},mounted:function(){this.getProjectInfoById(),this.getUserOptions()},methods:{getUserOptions:function(){var t=this;this.buildUserOptions=[],this.checkUserOptions=[],this.liveUserOptions=[],c["db"]({projectId:this.$store.getters.currentBiaoDuan.id||3,roleid:70}).then((function(e){var i=e||[];i.forEach((function(e){t.buildUserOptions.push({label:e["name"],value:e["id"]})}))})),c["db"]({projectId:this.$store.getters.currentBiaoDuan.id||3,roleid:99}).then((function(e){var i=e||[];i.forEach((function(e){t.checkUserOptions.push({label:e["name"],value:e["id"]})}))})),c["db"]({projectId:this.$store.getters.currentBiaoDuan.id||3,roleid:70}).then((function(e){var i=e||[];i.forEach((function(e){t.liveUserOptions.push({label:e["name"],value:e["id"]})}))}))},getProjectInfoById:function(){var t=this;c["S"]({projectid:this.$store.getters.curProject.id||2}).then((function(e){var i=e["data"]||{};t.baseInfo["buildSectionName"]=i["project"]?i["project"]["name"]:"";var a=i["companys"]||[],s=Object(o["b"])(a);t.baseInfo["buildCompany"]=s["buildCompany"],t.baseInfo["supervisionUnit"]=s["supervisionUnit"]}))},getDetail:function(t){var e=this;l["qb"](t).then((function(t){var i=t["data"]||{};i.buildUserName=Object(o["i"])(e.buildUserOptions,i.buildUser),i.liveUserName=Object(o["i"])(e.liveUserOptions,i.liveUser),i.checkUserName=Object(o["i"])(e.checkUserOptions,i.checkUser),e.formData=i}))}}},b=d,v=(i("fe98"),i("2877")),u=Object(v["a"])(b,a,s,!1,null,"00469638",null);e["default"]=u.exports},fe98:function(t,e,i){"use strict";i("d5c9")}}]);