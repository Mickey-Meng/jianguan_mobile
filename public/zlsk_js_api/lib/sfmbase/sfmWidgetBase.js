!function(e,n){if("undefined"!=typeof module&&module.exports){var o=require("jquery"),i=require("underscore"),s=require("sfmModuleBase");module.exports=e(o,i,s)}else"function"==typeof define&&define.amd?define(["jquery","underscore","sfmModuleBase"],e):(null==n.SFM&&(n.SFM={}),n.SFM.SfmWidgetBase=e(n.$,n._,n.SFM.SfmModuleBase))}(function(e,n,o){return o.extend({constructor:function(e){this.base(e)},destroy:function(){this.base()},showMsg:function(e,n){var o=this;return o.doAction("widget_showMsg",null,o._el,e,n),o},showLoading:function(e,n){var o=this;return n=n||o.config.msg,o.doAction("widget_showLoading",null,o._el,e,n),o},__className__:"SfmWidgetBase"})},window);