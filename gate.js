(function(){
var C=window.SITE_CONFIG||{mode:"open"},K="aikatsu_access_v1";
var st=document.createElement("style");st.textContent="html.gp body{display:none}#gate{position:fixed;inset:0;z-index:99999;background:#f5f7fb;display:flex;align-items:center;justify-content:center;padding:20px;font-family:system-ui,sans-serif}#gate div{background:#fff;border-radius:18px;padding:24px;max-width:340px;width:100%;box-shadow:0 10px 30px rgba(0,0,0,.1);text-align:center}#gate input{width:100%;font-size:18px;padding:12px;border:1px solid #ccd;border-radius:10px;margin:12px 0}#gate button{width:100%;font-size:18px;padding:13px;border:0;border-radius:10px;background:#e85b91;color:#fff}#gate p{color:#c33;min-height:1.2em;margin:6px 0}";
document.head.appendChild(st);document.documentElement.classList.add("gp");
function allow(){document.documentElement.classList.remove("gp");var g=document.getElementById("gate");if(g)g.remove()}
function box(h){var g=document.createElement("div");g.id="gate";g.innerHTML="<div>"+h+"</div>";document.documentElement.appendChild(g)}
async function sha(t){var b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(C.salt+t));return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,"0")}).join("")}
async function init(){
 if(C.mode==="open"||!(window.crypto&&crypto.subtle))return allow();
 try{
  var m=location.hash.match(/owner=([^&]+)/);
  if(m&&await sha("owner:"+decodeURIComponent(m[1]))===C.ownerHash){localStorage.setItem(K+"_owner",C.ownerHash);history.replaceState(null,"",location.pathname+location.search)}
  if(localStorage.getItem(K+"_owner")===C.ownerHash)return allow();
  if(C.mode==="closed")return box("<h2>🔒</h2><p style='color:#333'>"+(C.closedMessage||"")+"</p>");
  if(localStorage.getItem(K)===C.codeHash)return allow();
 }catch(e){}
 box("<h2>アクセスコード</h2><input id='gc' type='password' autocomplete='off' placeholder='コードを入力'><p id='ge'></p><button id='gb'>開く</button>");
 var go=async function(){var v=document.getElementById("gc").value.trim();if(await sha(v)===C.codeHash){try{localStorage.setItem(K,C.codeHash)}catch(e){}allow()}else document.getElementById("ge").textContent="コードが違います"};
 document.getElementById("gb").onclick=go;document.getElementById("gc").onkeydown=function(e){if(e.key==="Enter")go()};
}
init();
})();
