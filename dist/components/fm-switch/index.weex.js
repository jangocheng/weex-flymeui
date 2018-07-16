// { "framework": "Vue" }

!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["npm/weex-flymeui/components/fm-switch/index"]=t():e["npm/weex-flymeui/components/fm-switch/index"]=t()}("undefined"!=typeof self?self:this,function(){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/",o(o.s=189)}({189:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(190);Object.defineProperty(t,"default",{enumerable:!0,get:function(){return function(e){return e&&e.__esModule?e:{default:e}}(r).default}})},190:function(e,t,o){var r,n,i=[];i.push(o(191)),r=o(192);var s=o(193);n=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(Object.keys(r).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),n=r=r.default),"function"==typeof n&&(n=n.options),n.__file="/Users/suen/Documents/develop/project/weex-flymeui/packages/fm-switch/index.vue",n.render=s.render,n.staticRenderFns=s.staticRenderFns,n._scopeId="data-v-3f89f72e",n.style=n.style||{},i.forEach(function(e){for(var t in e)n.style[t]=e[t]}),"function"==typeof __register_static_styles__&&__register_static_styles__(n._scopeId,i),e.exports=r},191:function(e,t){e.exports={"fm-switch":{flexDirection:"row",alignItems:"center",width:"144",height:"72",borderRadius:"72",borderWidth:"5"},"ctr-ball":{width:"42",height:"42",borderRadius:"21",marginLeft:"10"}}},192:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(o(9));var n=weex.requireModule("animation");t.default={name:"FmSwitch",props:{checked:{type:Boolean,default:!1},solid:Boolean,disabled:{type:Boolean,default:!1},blurColor:String,focusColor:String,borderColor:{type:String,default:"#D9D9D9"},backgroundColor:{type:String,default:r.default.primaryColor}},data:function(){return{isAnimate:!1,_checked:!1,ballStyle:{}}},computed:{getBgStyle:function(){var e=this.solid,t=this.borderColor,o=this.backgroundColor,r=this.disabled,n=e?{borderWidth:"5px",borderColor:o,backgroundColor:o}:{borderWidth:"5px",borderColor:t,backgroundColor:"transparent"};return n.opacity=r?.3:1,n}},watch:{checked:function(e){this._checked=e,this.toggleState(e)}},methods:{changeState:function(e){this.disabled||(this._checked=!this._checked,this.toggleState(this._checked),this.$emit("fmSwitchStateChange",this._checked))},toggleState:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],o=e?{backgroundColor:this.focusColor||(this.solid?"#FFFFFF":this.backgroundColor),transform:"scale(1) translate(72px, 0)",transformOrigin:"center center"}:{backgroundColor:this.blurColor||(this.solid?"#FFFFFF":this.borderColor),transform:"scale(0.429)",transformOrigin:"center center"},r=this.$refs.ctrBall;r&&n.transition(r,{styles:o,timingFunction:"ease",duration:t?260:1e-5})}},created:function(){this.checked?this.ballStyle={backgroundColor:this.focusColor||(this.solid?"#FFFFFF":this.backgroundColor),transform:"scale(1.0) translate(72px, 0)"}:this.ballStyle={backgroundColor:this.blurColor||(this.solid?"#FFFFFF":this.borderColor),transform:"scale(0.429)"},this._checked=this.checked,this.toggleState(this._checked,!1)}}},193:function(e,t){e.exports={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:["fm-switch"],style:this.getBgStyle,on:{click:this.changeState}},[t("div",{ref:"ctrBall",staticClass:["ctr-ball"],style:this.ballStyle})])},staticRenderFns:[]},e.exports.render._withStripped=!0},9:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={primaryColor:"#198DED",disabledColor:"#BDE2FB",highlightColor:"#156DC9",lightColor:"#42A2F1",weakColor:"#E6F8FF",grayColor:"#F2F3F4",fontColorLight:"#FFFFFF",fontColorDark:"#3D3D3D",fontColorGray:"#F2F3F4"}}})});