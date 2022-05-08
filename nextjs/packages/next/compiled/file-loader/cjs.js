module.exports=(()=>{"use strict";var e={191:(e,t,i)=>{const r=i(151);e.exports=r.default;e.exports.raw=r.raw},151:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:true});t.default=loader;t.raw=void 0;var r=_interopRequireDefault(i(622));var o=_interopRequireDefault(i(443));var a=_interopRequireDefault(i(225));var n=_interopRequireDefault(i(859));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function loader(e){const t=o.default.getOptions(this);(0,a.default)(n.default,t,{name:"File Loader",baseDataPath:"options"});const i=t.context||this.rootContext;const s=o.default.interpolateName(this,t.name||"[contenthash].[ext]",{context:i,content:e,regExp:t.regExp});let p=s;if(t.outputPath){if(typeof t.outputPath==="function"){p=t.outputPath(s,this.resourcePath,i)}else{p=r.default.posix.join(t.outputPath,s)}}let u=`__webpack_public_path__ + ${JSON.stringify(p)}`;if(t.publicPath){if(typeof t.publicPath==="function"){u=t.publicPath(s,this.resourcePath,i)}else{u=`${t.publicPath.endsWith("/")?t.publicPath:`${t.publicPath}/`}${s}`}u=JSON.stringify(u)}if(t.postTransformPublicPath){u=t.postTransformPublicPath(u)}if(typeof t.emitFile==="undefined"||t.emitFile){this.emitFile(p,e)}const l=typeof t.esModule!=="undefined"?t.esModule:true;return`${l?"export default":"module.exports ="} ${u};`}const s=true;t.raw=s},859:e=>{e.exports=JSON.parse('{"additionalProperties":true,"properties":{"name":{"description":"The filename template for the target file(s) (https://github.com/webpack-contrib/file-loader#name).","anyOf":[{"type":"string"},{"instanceof":"Function"}]},"outputPath":{"description":"A filesystem path where the target file(s) will be placed (https://github.com/webpack-contrib/file-loader#outputpath).","anyOf":[{"type":"string"},{"instanceof":"Function"}]},"publicPath":{"description":"A custom public path for the target file(s) (https://github.com/webpack-contrib/file-loader#publicpath).","anyOf":[{"type":"string"},{"instanceof":"Function"}]},"postTransformPublicPath":{"description":"A custom transformation function for post-processing the publicPath (https://github.com/webpack-contrib/file-loader#posttransformpublicpath).","instanceof":"Function"},"context":{"description":"A custom file context (https://github.com/webpack-contrib/file-loader#context).","type":"string"},"emitFile":{"description":"Enables/Disables emit files (https://github.com/webpack-contrib/file-loader#emitfile).","type":"boolean"},"regExp":{"description":"A Regular Expression to one or many parts of the target file path. The capture groups can be reused in the name property using [N] placeholder (https://github.com/webpack-contrib/file-loader#regexp).","anyOf":[{"type":"string"},{"instanceof":"RegExp"}]},"esModule":{"description":"By default, file-loader generates JS modules that use the ES modules syntax.","type":"boolean"}},"type":"object"}')},443:e=>{e.exports=require("next/dist/compiled/loader-utils")},225:e=>{e.exports=require("next/dist/compiled/schema-utils")},622:e=>{e.exports=require("path")}};var t={};function __nccwpck_require__(i){if(t[i]){return t[i].exports}var r=t[i]={exports:{}};var o=true;try{e[i](r,r.exports,__nccwpck_require__);o=false}finally{if(o)delete t[i]}return r.exports}__nccwpck_require__.ab=__dirname+"/";return __nccwpck_require__(191)})();