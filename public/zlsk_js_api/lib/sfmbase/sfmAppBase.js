!function(e,n){if("undefined"!=typeof module&&module.exports){var t=require("jquery"),u=require("underscore"),r=require("SfmModuleBase");module.exports=e(t,u,r)}else"function"==typeof define&&define.amd?define(["jquery","underscore","sfmModuleBase"],e):(null==n.SFM&&(n.SFM={}),n.SFM.SfmAppBase=e(n.$,n._,n.SFM.SfmModuleBase))}(function(e,u,n){var i=function(e,n){if(!e)return null;for(var t=[],u=0;u<e.length;u++){var r=e[u];r.children?(r.children=i(r.children,n),r.children&&0<r.children.length&&t.push(r)):n(r)&&t.push(r)}return t};return n.extend({constructor:function(e){this.el=e.el,this.base(e)},destroy:function(){this.getSfmModuleMgr().destroy(),this.getSfmDataMgr().destroy(),this.base()},render:function(){var e=this;return e.getSfmUtil().getMainWin().document.title=e.config.docTitle,-1==e.config.sfmLogin.mode?(e._setMenuItems(),u.each(e.config.menu,function(e){e.fun2=e.fun}),e._loadMain()):e._loadLogin(),e},resize:function(){return this.getSfmModuleMgr().resize(),this},start:function(){},__init__:function(e){var n=this,t=n.config=n.getSfmUtil().valueOrDefault(e,"config",null);return n.getSfmDataMgr().setData({sysConfig:t}),n.getSfmModuleMgr().loadConfig(t).setMainContainer(n.el),n},__setMenuItems__:function(e,n){if(e&&n&&0<n.length)for(var t=0;t<e.length;t++){var u=e[t];if(!u.mk||!u.fun){this.__setMenuFun__(n[0].mk,e);break}this.__setMenuFun__(u.mk,u.fun)}},__setMenuFun__:function(e,n){var t=this.config.menu;if(t&&0<t.length)for(var u=0;u<t.length;u++){var r=t[u];r.mk==e&&(r.fun=n)}return this},_setMenuItems:function(){var e=this,n=e.getSfmDataMgr().getData("data.globalData.userMenuInfo");return e.__setMenuItems__(n,e.config.menu),e},_checkAuth:function(){var e=this;if(e._setMenuItems(),2==(2&e.getSfmUtil().valueOrDefault(e.config,"auth.mode",2))){var t=e.getSfmDataMgr().getData("data.globalData.userMenu");u.each(e.config.menu,function(e){e.fun2=i(e.fun,function(n){return u.some(t,function(e){return e.url==n.url})})}),e._loadMain()}else u.each(e.config.menu,function(e){e.fun2=e.fun}),e._loadMain();return e},_loadLogin:function(){var n=this;return n.getSfmModuleMgr().loadLogin(function(e){n._checkAuth()}),n},_loadMain:function(){var n=this,t=n.getSfmModuleMgr();return t.loadContainer(null,function(e){t.loadMenu(function(){t.loadToolbar(function(){t.loadPre(function(){n.start()})})})}),n},_getUserMenu:function(){var e=this,n=e.dataMgr.getData("data.globalData.userInfo"),t=n&&n.User&&n.User.ID,u=e.moduleMgr.getServiceUrl("userAuth");return u+="getUserMenu/"+t||0,e.ajax({type:"GET",dataType:"json",url:u,async:!0,cache:!1})},__className__:"SfmAppBase"})},window);