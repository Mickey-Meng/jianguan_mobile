(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ef0fa6a"],{2560:function(t,e,i){"use strict";i.r(e);i("b0c0");var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"con",style:{height:t.scrollerHeight}},[e("div",{staticClass:"over-view item"},[e("p",[t._v("多项目总览")]),e("div",{staticClass:"btn",on:{click:t.overView}},[t._v(" 点击进入 ")])]),e("div",t._l(t.projectList,(function(i,n){return e("div",{key:n,staticClass:"item"},[e("p",[t._v(t._s(i.name))]),e("div",{staticClass:"btn",on:{click:function(e){return t.toHome(i)}}},[t._v(" 点击进入 ")])])})),0)])},o=[],c=(i("d3b7"),i("159b"),i("14d9"),i("e9c4"),i("24d2")),s={computed:{scrollerHeight:function(){return window.innerHeight+"px"}},data:function(){return{projectList:[]}},mounted:function(){this.getProject()},methods:{getProject:function(){var t=this;this.projectList=[],Object(c["T"])().then((function(e){e&&e.length>0&&(e.forEach((function(e){e.child.length>0&&t.projectList.push.apply(t.projectList,e.child)})),t.$store.state.projectList=t.projectList)}))},overView:function(){this.$router.push({path:"/overViewMap"})},toHome:function(t){this.$store.state.loginCount++,this.$router.push({path:"/",query:{project:JSON.stringify(t)}})}}},r=s,u=(i("4a5f"),i("2877")),a=Object(u["a"])(r,n,o,!1,null,"580c88fa",null);e["default"]=a.exports},3484:function(t,e,i){},"4a5f":function(t,e,i){"use strict";i("3484")}}]);