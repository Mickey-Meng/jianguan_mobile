(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-12c4ff62"],{"06c5":function(t,e,a){"use strict";a.d(e,"a",(function(){return n}));a("fb6a"),a("d3b7"),a("b0c0"),a("a630"),a("3ca3"),a("ac1f"),a("00b4");var i=a("6b75");function n(t,e){if(t){if("string"===typeof t)return Object(i["a"])(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?Object(i["a"])(t,e):void 0}}},2909:function(t,e,a){"use strict";a.d(e,"a",(function(){return s}));var i=a("6b75");function n(t){if(Array.isArray(t))return Object(i["a"])(t)}a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("a630");function l(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}var r=a("06c5");a("d9e2");function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function s(t){return n(t)||l(t)||Object(r["a"])(t)||o()}},"505b":function(t,e,a){},5530:function(t,e,a){"use strict";a.d(e,"a",(function(){return l}));a("b64b"),a("a4d3"),a("4de4"),a("d3b7"),a("e439"),a("14d9"),a("159b"),a("dbb4");var i=a("ade3");function n(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?n(Object(a),!0).forEach((function(e){Object(i["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}},"5ac8":function(t,e,a){"use strict";a("a200")},"6a4e":function(t,e,a){"use strict";a("505b")},"6b75":function(t,e,a){"use strict";function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,i=new Array(e);a<e;a++)i[a]=t[a];return i}a.d(e,"a",(function(){return i}))},"6be8":function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"e",(function(){return l})),a.d(e,"d",(function(){return r})),a.d(e,"f",(function(){return o})),a.d(e,"j",(function(){return s})),a.d(e,"b",(function(){return c})),a.d(e,"c",(function(){return d})),a.d(e,"h",(function(){return u})),a.d(e,"i",(function(){return b})),a.d(e,"g",(function(){return f}));var i=a("2909"),n=(a("d3b7"),a("159b"),a("14d9"),a("b0c0"),a("e9c4"),function(t,e,a){var i=[];return e=e||"desc",a=a||"code",t.forEach((function(t){i.push({label:t[e],value:t[a]})})),i}),l=function(t){var e=t?new Date(t):new Date,a=e.getFullYear(),i=e.getMonth()+1;i=i<10?"0"+i:i;var n=e.getDate();n=n<10?"0"+n:n;var l=e.getHours();l=l<10?"0"+l:l;var r=e.getMinutes(),o=e.getSeconds();return r=r<10?"0"+r:r,o=o<10?"0"+o:o,a+"-"+i+"-"+n+"  "+l+":"+r+":"+o},r=function(t,e){e=e||0;var a=t?new Date(t):new Date;a=new Date(a.setDate(a.getDate()+e));var i=a.getFullYear(),n=a.getMonth()+1;n=n<10?"0"+n:n;var l=a.getDate();l=l<10?"0"+l:l;var r=a.getHours();r=r<10?"0"+r:r;var o=a.getMinutes(),s=a.getSeconds();return o=o<10?"0"+o:o,s=s<10?"0"+s:s,i+"-"+n+"-"+l},o=function(t){var e=t?new Date(t):new Date,a=e.getFullYear(),i=e.getMonth()+1;i=i<10?"0"+i:i;var n=e.getDate();n=n<10?"0"+n:n;var l=e.getHours();l=l<10?"0"+l:l;var r=e.getMinutes(),o=e.getSeconds();return r=r<10?"0"+r:r,o=o<10?"0"+o:o,a+"-"+i},s=function(){var t=window.location.hash.split("?")[1],e={};if(t)for(var a=t.split("&"),i=0;i<a.length;i++){var n=a[i].split("=");e[n[0]]=decodeURIComponent(n[1])}return e},c=function(t){var e="",a="";return t.forEach((function(t){"sgdw"==t["typecode"]&&(e+=t["name"]+"、"),"jldw"==t["typecode"]&&(a+=t["name"]+"、")})),{buildCompany:e,supervisionUnit:a}},d=function(t,e,a){var i=JSON.parse(JSON.stringify(t)),n=JSON.parse(JSON.stringify(e));a=a||[],i[0]&&a.forEach((function(t){delete i[0][t]})),n[0]&&a.forEach((function(t){delete n[0][t]}));var l=JSON.stringify(i)===JSON.stringify(n);return l},u=function(t,e){if(!t||!e)return"";var a=Date.parse(t),i=Date.parse(e);return a>i?0:a===i?1:parseInt((i-a)/864e5)},b=function(t,e){t=t||[];var a="";return t.forEach((function(t){t["value"]==e&&(a=t["label"])})),a},f=function t(e,a,n){n||(n=[]);for(var l=0;l<e.length;l++){var r=Object(i["a"])(n);if(r.push(e[l].name),e[l].id===a)return r;if(e[l].child){var o=t(e[l].child,a,r);if(o)return o}}}},7038:function(t,e,a){"use strict";var i=function(){var t=this,e=t._self._c;return e("div",[t.editAble?e("div",{staticClass:"block-line"},[e("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{action:"",limit:1,"show-file-list":!1,accept:t.accept,"http-request":t.importFile}},[e("el-button",{attrs:{size:"small",type:"primary"}},[t._v("点击上传")])],1)],1):t._e(),e("div",{staticClass:"block-table",staticStyle:{background:"rgba(0,0,0,0)"}},[e("el-table",{staticClass:"have_scrolling",staticStyle:{width:"100%"},attrs:{data:t.attachTable,border:""}},[e("el-table-column",{attrs:{type:"index",width:"50",align:"center",label:"序号"}}),e("el-table-column",{attrs:{prop:"fileName",align:"center",label:"附件","show-overflow-tooltip":""}}),e("el-table-column",{attrs:{prop:"uploadTime",width:"160px",align:"center",label:"上传日期"}}),e("el-table-column",{attrs:{prop:"creatorName",width:"120px",align:"center",label:"上传人"}}),e("el-table-column",{attrs:{width:"120",align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(a){var i=a.row,n=a.$index;return[e("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){return t.reviewAttach(i,n)}}},[t._v("预览")]),t.editAble?e("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(e){return t.deleteAttach(i,n)}}},[t._v("删除")]):t._e()]}}])})],1)],1),e("PdfPreview",{directives:[{name:"show",rawName:"v-show",value:"pdf"==t.viewFileType,expression:"viewFileType=='pdf'"}],ref:"pdfPreview"}),e("el-dialog",{attrs:{title:"预览",visible:t.viewFileVisible,fullscreen:!0,width:"100%",height:"100%",modal:!1},on:{"update:visible":function(e){t.viewFileVisible=e}}},[e("img",{directives:[{name:"show",rawName:"v-show",value:"img"==t.viewFileType,expression:"viewFileType=='img'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl}}),e("video",{directives:[{name:"show",rawName:"v-show",value:"mp4"==t.viewFileType,expression:"viewFileType=='mp4'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl,controls:""}}),e("video",{directives:[{name:"show",rawName:"v-show",value:"mov"==t.viewFileType,expression:"viewFileType=='mov'"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:t.viewFileUrl,controls:""}})])],1)},n=[],l=a("5530"),r=(a("a434"),a("14d9"),a("b0c0"),a("2f62")),o=a("015e"),s=a("24d2"),c=a("ed08"),d=a("6be8"),u=a("5c96"),b=a("a79c"),f={props:["attachTable","editAble","acceptList"],components:{PdfPreview:b["a"]},data:function(){return{viewFileType:"",viewFileUrl:"",viewFileVisible:!1,accept:this.acceptList||"image/*|video/*"}},computed:Object(l["a"])({},Object(r["b"])(["userInfo","name","project","roleId","getUrl"])),methods:{downloadAttach:function(t,e){o["downloadFile"]({fileid:t["fileId"]})},reviewAttach:function(t,e){var a=this,i="";(t.fileName.indexOf(".png")>-1||t.fileName.indexOf(".jpg")>-1)&&(i="img"),t.fileName.indexOf(".mp4")>-1&&(i="mp4"),(t.fileName.indexOf(".mov")>-1||t.fileName.indexOf(".MOV")>-1)&&(i="mov"),t.fileName.indexOf(".pdf")>-1&&(i="pdf"),this.viewFileType=i,this.viewFileUrl=Object(c["g"])(t.fileId),"pdf"==i?setTimeout((function(){a.$refs["pdfPreview"].show_otherPDF(t.fileId)}),300):this.viewFileVisible=!0},deleteAttach:function(t,e){var a=this;u["MessageBox"].confirm("确认是否删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){a.attachTable.splice(e,1)}))},afterUp:function(t){this.attachTable.push({uploadTime:Object(d["e"])(t["uploadTime"]),fileName:t["fileName"],fileId:t["fileId"],creatorName:this.$store.state.userinfo.name})},importFile:function(t){var e=this,a=new FileReader;a.readAsDataURL(t.file),a.onload=function(a){var i=a.target["result"].split("base64,")[1];Object(s["tb"])({name:t.file.name,base64:i}).then((function(a){e.$refs.upload.clearFiles();var i=Object(d["e"])(new Date),n=t.file.name,l=a;e.afterUp({uploadTime:i,fileName:n,fileId:l})}))}}}},v=f,p=(a("5ac8"),a("2877")),m=Object(p["a"])(v,i,n,!1,null,null,null);e["a"]=m.exports},9603:function(t,e,a){},a200:function(t,e,a){},aba5:function(t,e,a){"use strict";var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"form-block"},[e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("项目名称")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.projectName)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("合同号")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.contractCode)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("施工单位")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.buildCompany)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("监理单位")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.supervisionUnit)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("标段")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.baseInfo.buildSectionName)+" ")])])])])},n=[],l=a("5530"),r=(a("b0c0"),a("2f62")),o=a("24d2"),s=a("6be8"),c={props:["hasSection"],data:function(){return{baseInfo:{projectName:"",buildSectionName:"",contractCode:"",buildCompany:"",supervisionUnit:""},hasBuildSection:void 0!=this.hasSection&&this.hasSection}},computed:Object(l["a"])({},Object(r["b"])(["userInfo","name","project","roleId","getUrl","currentBiaoDuan","curProject"])),mounted:function(){this.getProjectInfoById()},methods:{getProjectInfoById:function(){var t=this;this.baseInfo.buildSectionName=this.currentBiaoDuan.name,this.baseInfo.contractCode=this.currentBiaoDuan.contractnum,o["S"]({projectid:this.curProject.id||2}).then((function(e){var a=e||{};t.baseInfo["projectName"]=a["project"]?a["project"]["name"]:"";var i=a["companys"]||[],n=Object(s["b"])(i);t.baseInfo["buildCompany"]=n["buildCompany"],t.baseInfo["supervisionUnit"]=n["supervisionUnit"]}))}}},d=c,u=(a("6a4e"),a("2877")),b=Object(u["a"])(d,i,n,!1,null,"077e8938",null);e["a"]=b.exports},cae4:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t._self._c;return e("div",{staticClass:"form-content"},[e("el-form",{ref:"form",attrs:{"label-width":"80px"}},[e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("基本信息")])]),e("projectinfo"),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("报验单号")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.inspectionCode)+" ")])])]),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("填报日期")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.fillDate)+" ")])])])],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("检测信息")])]),e("div",{staticClass:"block-table"},[e("el-table",{staticClass:"have_scrolling",staticStyle:{width:"100%"},attrs:{data:t.examineTable,border:""}},[e("el-table-column",{attrs:{type:"index",width:"50",align:"center",label:"序号"}}),e("el-table-column",{attrs:{prop:"name",align:"center",label:"材料名称","show-overflow-tooltip":""}}),e("el-table-column",{attrs:{prop:"addressStr",width:"160px",align:"center",label:"材料来源"}}),e("el-table-column",{attrs:{prop:"specification",width:"120px",align:"center",label:"材料规格"}}),e("el-table-column",{attrs:{prop:"projectPart",width:"120px",align:"center",label:"工程部位"}}),e("el-table-column",{attrs:{prop:"num",width:"120px",align:"center",label:"材料数量(吨)"}}),e("el-table-column",{attrs:{prop:"takeAddress",width:"120px",align:"center",label:"取样地点"}}),e("el-table-column",{attrs:{prop:"testDate",width:"120px",align:"center",label:"试验日期"}}),e("el-table-column",{attrs:{prop:"testNum",width:"120px",align:"center",label:"实验数量"}}),e("el-table-column",{attrs:{prop:"qualifiedNum",width:"120px",align:"center",label:"合格数量"}}),e("el-table-column",{attrs:{prop:"qualifiedRate",width:"120px",align:"center",label:"总合格率(%)"}}),e("el-table-column",{attrs:{prop:"detectionResult",width:"120px",align:"center",label:"检测结果"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.detectionResult?[t._v("合格")]:1==e.row.detectionResult?[t._v("不合格")]:t._e()]}}])}),e("el-table-column",{attrs:{prop:"reportCode",width:"120px",align:"center",label:"报告编号"}})],1)],1)]),e("div",{staticClass:"form-title"},[e("div",{staticClass:"title-big-bar"}),e("strong",[t._v("附件上传")])]),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("试验检测报告")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.reportTable}})],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("出厂信息")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.factoryTable}})],1),e("div",{staticClass:"form-block"},[e("div",{staticClass:"form-block-title"},[e("div",{staticClass:"title-bar"}),e("strong",[t._v("其他附件")])]),e("attachlist",{ref:"attachlist",attrs:{editAble:!1,attachTable:t.attachTable}}),e("div",{staticClass:"block-line"},[e("div",{staticClass:"block-item"},[e("div",{staticClass:"block-item-label"},[t._v("备注")]),e("div",{staticClass:"block-item-value"},[t._v(" "+t._s(t.formData.remark)+" ")])])])],1)])],1)},n=[],l=a("015e"),r=a("6be8"),o=a("7038"),s=a("aba5"),c={data:function(){return{baseInfo:{buildSection:1,buildSectionName:"235国道杭州至诸暨公路萧山河上至诸暨安华段改建工程",contractCode:"235SJSG01",buildCompany:"中交上海航道局有限公司、中国交通建设股份有限公司、浙江诸安建设集团有限公司、浙江省交通规划设计研究院有限公司",supervisionUnit:"浙江交科公路水运工程监理有限公司",supervisionSection:"监理办"},formData:{deletedFlag:1,detectionInfo:[],detectionReport:[],factoryInfo:[],otherAttachment:[],draftFlag:1,fillDate:Object(r["d"])(new Date),inspectionCode:"",buildSection:this.$store.getters.currentBiaoDuan.id||3,projectId:this.$store.getters.curProject.id||2,remark:""},examineTable:[],reportTable:[],factoryTable:[],attachTable:[]}},created:function(){},components:{attachlist:o["a"],projectinfo:s["a"]},computed:{},watch:{},mounted:function(){},methods:{getDetail:function(t){var e=this;l["lb"]({id:t}).then((function(t){var a=t["data"]||{};e.formData=a,a.detectionInfo=a.detectionInfo||[];for(var i=0;i<a.detectionInfo.length;i++){var n=a.detectionInfo[i];n.addressStr=n.address.provice+n.address.city}e.examineTable=a.detectionInfo||[],e.reportTable=a.detectionReport||[],e.factoryTable=a.factoryInfo||[],e.attachTable=a.otherAttachment||[]}))}}},d=c,u=(a("f3d4"),a("2877")),b=Object(u["a"])(d,i,n,!1,null,"12beec66",null);e["default"]=b.exports},f3d4:function(t,e,a){"use strict";a("9603")}}]);