(()=>{"use strict";var e={280:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0});var o={server:{port:null!==(r=process.env.PORT)&&void 0!==r?r:3001,cors:{origin:"http://localhost:3000"}}};t.default=o},39:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=r(55),s=o(r(280)).default.server.port;u.listen(s,(function(){console.log("Server listening on port ".concat(s))}))},635:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=o(r(527));t.default=function(e){e.use((function(e,t,r,o){var s=e.status||500,n=new u.default;r.status(s).send(n.error(e))}))}},55:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=o(r(582)),s=o(r(685)),n=o(r(860)),a=o(r(280)),i=o(r(635)),l=(0,n.default)(),f=s.default.createServer(l);l.use(n.default.json()),l.use(n.default.urlencoded({extended:!1}));var d={origin:a.default.server.cors.origin,optionsSuccessStatus:200};l.use((0,u.default)(d)),(0,i.default)(l),e.exports=f},527:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){}return e.prototype.error=function(e){return{message:e.message}},e}();t.default=r},582:e=>{e.exports=require("cors")},860:e=>{e.exports=require("express")},685:e=>{e.exports=require("http")}},t={};!function r(o){var u=t[o];if(void 0!==u)return u.exports;var s=t[o]={exports:{}};return e[o].call(s.exports,s,s.exports,r),s.exports}(39)})();