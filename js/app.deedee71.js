(function(){"use strict";var t={8822:function(t,e,i){var s=i(6369),r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"home",class:{heat:t.isHeat,warm:t.isWarm,cold:t.isCold,night:t.isNight}},[e("div",{staticClass:"img_city"}),e("div",{staticClass:"cloud",class:{thunderclouds:t.isRain}}),e("div",{staticClass:"container"},[e("div",{staticClass:"header_wrp"},[e("div",{staticClass:"searchWrp"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.req,expression:"req"}],staticClass:"search_input",attrs:{type:"text",placeholder:"Введите название города"},domProps:{value:t.req},on:{change:function(e){return t.searchRegion(e.target.value)},input:function(e){e.target.composing||(t.req=e.target.value)}}}),t.list_cities?[e("div",{staticClass:"search_result"},[e("ul",{staticClass:"list_res"},t._l(t.list_cities,(function(i,s){return e("li",{key:s,staticClass:"list_item",on:{click:function(e){return t.choiceCity(i)}}},[e("p",{staticClass:"city"},[t._v(" "+t._s(i.name)+" ")]),e("p",{staticClass:"country"},[t._v(" "+t._s(i.country)+" ")])])})),0)])]:t._e()],2),e("div",{staticClass:"scale"},[e("p",[t._v("Шкала измерения:")]),e("select",{directives:[{name:"model",rawName:"v-model",value:t.scale,expression:"scale"}],on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){var e="_value"in t?t._value:t.value;return e}));t.scale=e.target.multiple?i:i[0]}}},[e("option",{attrs:{value:"f"}},[t._v("° F")]),e("option",{attrs:{value:"c"}},[t._v("° C")])])])]),t.weather?e("div",{staticClass:"region"},[e("div",{staticClass:"region_info"},[e("div",{staticClass:"location"},[e("div",{staticClass:"name"},[t._v(" "+t._s(t.weather.location.name)+" ")]),e("div",{staticClass:"country"},[t._v(" "+t._s(t.weather.location.country)+" ")])]),e("div",{staticClass:"last_update"},[t._v(" "+t._s(t.weather.current.last_updated)+" ")])]),e("div",{staticClass:"weatherInfo"},[e("div",{staticClass:"condition"},[e("img",{attrs:{src:t.weather.current.condition.icon,alt:"weather.current.condition.icon"}}),e("p",[t._v(t._s(t.weather.current.condition.text))])]),e("div",{staticClass:"temperature"},[e("div",{staticClass:"realTemp"},[e("p",[t._v(" Температура: "+t._s("c"==t.scale?t.weather.current.temp_c:t.weather.current.temp_f)+" ")])]),e("div",{staticClass:"feelsTemp"},[e("p",[t._v(" Ощущается как: "+t._s("c"==t.scale?t.weather.current.feelslike_c:t.weather.current.feelslike_f)+" ")])])]),e("div",{staticClass:"wind"},[e("p",[t._v(" Направление: "+t._s(t.weather.current.wind_dir)+" "),e("img",{staticClass:"wind_img",staticStyle:{color:"red"},style:{transform:`rotate(${t.weather.current.wind_degree}deg)`},attrs:{src:i(2611),alt:"./assets/pngwing.com.png"}})]),e("p",[t._v("Скорость: "+t._s(t.weather.current.wind_kph)+" км/час")]),e("p",[t._v("Порывы: "+t._s(t.weather.current.gust_kph)+" км/час")])]),e("div",{staticClass:"pressure"},[e("p",[t._v("Давление: "+t._s(t.weather.current.pressure_mb))])]),e("div",{staticClass:"uv"},[t._v("УФ-индекс: "+t._s(t.weather.current.uv))])])]):t._e()])])},a=[],n={name:"HomeView",data(){return{weather:null,list_cities:null,current_city:null,scale:"c",req:null,isCold:!1,isWarm:!1,isHeat:!1,isNight:!1,isRain:!1}},methods:{async searchRegion(t){try{const{data:e}=await this.axios.get(`https://api.weatherapi.com/v1/search.json?key=81200ab647f143a39fb154726231905&q=${t}&lang=ru`);this.list_cities=e}catch(e){console.log(e)}},async choiceCity(t){this.list_cities="",this.req=t.name,this.current_city=t,t.name.includes("-")&&(this.req=t.name.split("-")[0]);try{const{data:t}=await this.axios.get(`https://api.weatherapi.com/v1/current.json?key=81200ab647f143a39fb154726231905&q=${this.req}&lang=ru`);this.weather=t,this.weather.current.temp_c>28?this.isHeat=!0:this.weather.current.temp_c<12?this.isCold=!0:this.isWarm=!0,"1"==this.weather?.current?.is_day?this.isNight=!1:this.isNight=!0,this.weather.current.condition.text.includes("дожд")?this.isRain=!0:this.isRain=!1}catch(e){console.log(e)}}}},c=n,o=i(1001),l=(0,o.Z)(c,r,a,!1,null,"ae2102ae",null),u=l.exports,h=i(2631);s.ZP.use(h.ZP);const d=[],p=new h.ZP({mode:"history",base:"/W-F/",routes:d});var v=p,f=i(4161),_=i(6423);s.ZP.config.productionTip=!1,s.ZP.use(_.Z,f.Z),new s.ZP({router:v,render:t=>t(u)}).$mount("#app")},2611:function(t,e,i){t.exports=i.p+"img/pngwing.com.94ad0fee.png"}},e={};function i(s){var r=e[s];if(void 0!==r)return r.exports;var a=e[s]={id:s,loaded:!1,exports:{}};return t[s].call(a.exports,a,a.exports,i),a.loaded=!0,a.exports}i.m=t,function(){i.amdO={}}(),function(){var t=[];i.O=function(e,s,r,a){if(!s){var n=1/0;for(u=0;u<t.length;u++){s=t[u][0],r=t[u][1],a=t[u][2];for(var c=!0,o=0;o<s.length;o++)(!1&a||n>=a)&&Object.keys(i.O).every((function(t){return i.O[t](s[o])}))?s.splice(o--,1):(c=!1,a<n&&(n=a));if(c){t.splice(u--,1);var l=r();void 0!==l&&(e=l)}}return e}a=a||0;for(var u=t.length;u>0&&t[u-1][2]>a;u--)t[u]=t[u-1];t[u]=[s,r,a]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var s in e)i.o(e,s)&&!i.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.hmd=function(t){return t=Object.create(t),t.children||(t.children=[]),Object.defineProperty(t,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+t.id)}}),t}}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){i.p="/W-F/"}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,s){var r,a,n=s[0],c=s[1],o=s[2],l=0;if(n.some((function(e){return 0!==t[e]}))){for(r in c)i.o(c,r)&&(i.m[r]=c[r]);if(o)var u=o(i)}for(e&&e(s);l<n.length;l++)a=n[l],i.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return i.O(u)},s=self["webpackChunkweather"]=self["webpackChunkweather"]||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))}();var s=i.O(void 0,[998],(function(){return i(8822)}));s=i.O(s)})();
//# sourceMappingURL=app.deedee71.js.map