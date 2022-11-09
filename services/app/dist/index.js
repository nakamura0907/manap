(()=>{"use strict";var e={280:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0});var n={server:{port:null!==(r=process.env.PORT)&&void 0!==r?r:3001,cors:{origin:"http://localhost:3000"}}};t.default=n},536:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(r(807)),u=r(818);t.default=function(){return{login:function(e,t){if(!e.user)throw new o.default("認証に失敗しました",401);var r=(0,u.signToken)(e.user);t.status(200).send({id:e.user.id,token:r})}}}},533:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t,r){this._id=e,this._identifier=t,this._credential=r}return Object.defineProperty(e.prototype,"id",{get:function(){if(!this._id.isGenerated)throw new Error("IDが生成されていません");return this._id},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"credential",{get:function(){return this._credential},enumerable:!1,configurable:!0}),e.prototype.setId=function(t){return new e(t,this._identifier,this._credential)},e}();t.default=r},402:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,u){function i(e){try{s(n.next(e))}catch(e){u(e)}}function a(e){try{s(n.throw(e))}catch(e){u(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}s((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,u,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function a(u){return function(a){return function(u){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&u[0]?n.return:u[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,u[1])).done)return o;switch(n=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return i.label++,{value:u[1],done:!1};case 5:i.label++,n=u[1],u=[0];continue;case 7:u=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==u[0]&&2!==u[0])){i=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){i.label=u[1];break}if(6===u[0]&&i.label<o[1]){i.label=o[1],o=u;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(u);break}o[2]&&i.ops.pop(),i.trys.pop();continue}u=t.call(e,i)}catch(e){u=[6,e],n=0}finally{r=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,a])}}},u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=u(r(511)),a=u(r(784)),s=u(r(807)),l=r(518),c=r(136),f=r(818),d=r(482);i.default.use(new l.Strategy({usernameField:"email",passwordField:"password",session:!1},(function(e,t,r){return n(void 0,void 0,void 0,(function(){var n,u;return o(this,(function(o){switch(o.label){case 0:return o.trys.push([0,2,,3]),[4,(new a.default).loginByEmail(e)];case 1:return(n=o.sent())&&(0,d.compareSync)(t,n.credential)?[2,r(null,{id:n.id.value})]:[2,r(new s.default("メールアドレスまたはパスワードが誤っています",401))];case 2:return u=o.sent(),[2,r(u)];case 3:return[2]}}))}))})));var p={jwtFromRequest:c.ExtractJwt.fromAuthHeaderAsBearerToken(),secretOrKey:f.JWT_SECRET_KEY};i.default.use(new c.Strategy(p,(function(e,t){t(null,e)}))),t.default=i.default},784:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,u){function i(e){try{s(n.next(e))}catch(e){u(e)}}function a(e){try{s(n.throw(e))}catch(e){u(e)}}function s(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}s((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,u,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return u={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(u[Symbol.iterator]=function(){return this}),u;function a(u){return function(a){return function(u){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&u[0]?n.return:u[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,u[1])).done)return o;switch(n=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return i.label++,{value:u[1],done:!1};case 5:i.label++,n=u[1],u=[0];continue;case 7:u=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==u[0]&&2!==u[0])){i=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){i.label=u[1];break}if(6===u[0]&&i.label<o[1]){i.label=o[1],o=u;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(u);break}o[2]&&i.ops.pop(),i.trys.pop();continue}u=t.call(e,i)}catch(e){u=[6,e],n=0}finally{r=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,a])}}},u=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=u(r(533)),a=r(701),s=r(203),l=function(){function e(){}return e.prototype.loginByEmail=function(e){return n(this,void 0,void 0,(function(){var t,r;return o(this,(function(n){switch(n.label){case 0:return[4,s.prisma.users_auths.findFirst({where:{identity_type:"email",identifier:e},include:{users:{select:{id:!0}}}})];case 1:return(t=n.sent())?(r=new a.GeneratedId(t.users.id),[2,new i.default(r,t.identifier,t.credential)]):[2,t]}}))}))},e}();t.default=l},701:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.NoneId=t.GeneratedId=void 0;var o=n(r(807)),u=function(){function e(e){this.isGenerated=!0,this._value=e,Object.freeze(this)}return e.validate=function(t){if(t<1||!Number.isInteger(t))throw new o.default("IDは1以上の整数で入力してください",400);return new e(t)},Object.defineProperty(e.prototype,"value",{get:function(){return this._value},enumerable:!1,configurable:!0}),e}();t.GeneratedId=u;var i=function(){function e(){this.isGenerated=!1}return Object.defineProperty(e.prototype,"value",{get:function(){throw new o.default("IDが生成されていません",400)},enumerable:!1,configurable:!0}),e.instance=new e,e}();t.NoneId=i},203:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.prisma=void 0;var n=r(524);t.prisma=new n.PrismaClient},39:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(55),u=n(r(280)).default.server.port;o.listen(u,(function(){console.log("Server listening on port ".concat(u))}))},635:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(r(527)),u=n(r(565));t.default=function(e){e.use((function(e,t,r,n){var i=e.status||500,a=new o.default;u.default.error(e.message),r.status(i).send(a.error(e))}))}},919:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.authRouter=void 0;var o=n(r(402)),u=n(r(536));t.authRouter=function(e){var t=e.Router(),r=(0,u.default)();return t.post("/auth/login",o.default.authenticate("local",{session:!1}),r.login),t}},736:function(e,t,r){var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r);var o=Object.getOwnPropertyDescriptor(t,r);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,o)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),o(r(919),t)},55:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=n(r(582)),u=n(r(685)),i=n(r(860)),a=n(r(280)),s=n(r(635)),l=n(r(402)),c=r(736),f=(0,i.default)(),d=u.default.createServer(f);f.use(i.default.json()),f.use(i.default.urlencoded({extended:!1}));var p={origin:a.default.server.cors.origin,optionsSuccessStatus:200};f.use((0,o.default)(p)),f.use(l.default.initialize()),f.use("/api/v1",(0,c.authRouter)(i.default)),(0,s.default)(f),e.exports=d},807:function(e,t){var r,n=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){function t(t,r){void 0===r&&(r=500);var n=e.call(this,t)||this;return n.message=t,n.status=r,n}return n(t,e),t}(Error);t.default=o},482:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.compareSync=t.hashSync=void 0;var o=n(r(96));t.hashSync=function(e){return o.default.hashSync(e,10)},t.compareSync=function(e,t){return o.default.compareSync(e,t)}},818:function(e,t,r){var n,o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.signToken=t.JWT_SECRET_KEY=void 0;var u=o(r(344));t.JWT_SECRET_KEY=null!==(n=process.env.JWT_SECRET_KEY)&&void 0!==n?n:"MY_SECRET_KEY",t.signToken=function(e,r){return u.default.sign(e,t.JWT_SECRET_KEY,r)}},565:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});var n=r(42);t.default=n.logger},42:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.logger=void 0;var o=n(r(773));t.logger=o.default.createLogger({level:"info",format:o.default.format.json(),defaultMeta:{service:"user-service"},transports:[new o.default.transports.File({filename:"logs/error.log",level:"error"}),new o.default.transports.File({filename:"logs/combined.log"})]})},527:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){}return e.prototype.error=function(e){return{message:e.message}},e}();t.default=r},524:e=>{e.exports=require("@prisma/client")},96:e=>{e.exports=require("bcrypt")},582:e=>{e.exports=require("cors")},860:e=>{e.exports=require("express")},344:e=>{e.exports=require("jsonwebtoken")},511:e=>{e.exports=require("passport")},136:e=>{e.exports=require("passport-jwt")},518:e=>{e.exports=require("passport-local")},773:e=>{e.exports=require("winston")},685:e=>{e.exports=require("http")}},t={};!function r(n){var o=t[n];if(void 0!==o)return o.exports;var u=t[n]={exports:{}};return e[n].call(u.exports,u,u.exports,r),u.exports}(39)})();