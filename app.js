// アプリ補助機能(index.html の後に読み込まれます)
(function(){
var $=function(i){return document.getElementById(i)};
function get(k){try{return localStorage.getItem(k)}catch(e){return null}}function set(k,v){try{localStorage.setItem(k,v)}catch(e){}}
var KEY='aikatsu_input_v1',adv={sig:'',map:{}};
function sig(){return['left','right'].map(function(s){return histories[s].map(function(c){return c.id+':'+c.name}).join(',')}).join('|')}
window.advOf=function(no){return(adv.sig===sig()&&adv.map[no]!==undefined)?adv.map[no]:null};
function persist(){try{localStorage.setItem(KEY,JSON.stringify({left:histories.left,right:histories.right,side:currentSide,adv:adv}))}catch(e){}}
try{var s0=JSON.parse(localStorage.getItem(KEY));if(s0){
 histories.left.splice(0,histories.left.length,...(s0.left||[]));histories.right.splice(0,histories.right.length,...(s0.right||[]));
 if(s0.adv&&s0.adv.map)adv=s0.adv;switchSide(s0.side==='left'?'left':'right')}}catch(e){}
var r0=window.render;window.render=function(){var v=r0.apply(this,arguments);persist();return v};
['goNextCard','goPrevCard'].forEach(function(n){var f=window[n];window[n]=function(){var v=f.apply(this,arguments);
 if(currentActiveArray){if(adv.sig!==sig()){adv={sig:sig(),map:{}}}adv.map[currentActiveArray]=currentActiveSlotIndex;persist()}return v}});

// ===== 見た目の追加設定 =====
var st=document.createElement('style');st.textContent=
'@keyframes fadeUp{from{opacity:0;transform:translateY(14px) scale(.97)}to{opacity:1;transform:none}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}'+
'.chev{display:inline-block;width:8px;height:8px;border-top:2px solid currentColor;border-right:2px solid currentColor}.chev.l{transform:rotate(-135deg);margin-left:3px}.chev.r{transform:rotate(45deg);margin-right:3px}.chev.u{transform:rotate(-45deg);margin-top:4px}.chev.d{transform:rotate(135deg);margin-bottom:4px}'+
'#backFloat{position:fixed;left:14px;bottom:calc(16px + env(safe-area-inset-bottom));width:56px;height:56px;border-radius:50%;background:#e85b91;color:#fff;border:0;box-shadow:0 6px 16px rgba(232,91,145,.45);z-index:150;display:none;align-items:center;justify-content:center;gap:2px;font-weight:800;font-size:12px;letter-spacing:.03em;padding:0}#backFloat .chev{width:9px;height:9px;margin-left:4px}'+
'.mini{padding:6px 12px;font-size:13px;border:1px solid #d9dde8;background:#fff;border-radius:12px;color:#573647;font-weight:700}.mini.on{background:#e85b91;border-color:#e85b91;color:#fff}'+
'body.hide-sug-img .sugimg{display:none}.sugimg{width:34px;height:auto;border-radius:5px;margin-right:8px;vertical-align:middle}'+
'#entryBox .cs{display:block;width:100%}#manualBox{background:#fff;border:1px solid #e6e9f1;border-radius:14px;padding:10px;margin-bottom:10px}#manualBox .mrow{display:flex;gap:8px;margin-top:8px}#manualBox .mrow:first-child{margin-top:0}#manualBox input,#manualBox select{flex:1;min-width:0;font-size:16px;padding:11px;border:1px solid #d9dde8;border-radius:10px;background:#fff}#manualBox input.n3{flex:none;width:76px}#manualBox .cs{flex:1;min-width:0}#manualBox .addbtn{flex:none;padding:0 18px}'+
'#pageTitle{display:block;width:max-content;max-width:88%;margin:20px auto 8px;padding:10px 28px;border:3px solid #ee3f8e;border-radius:18px;background:#fff;box-shadow:0 0 0 3px #fff,0 0 0 5px #f8a5c9;font-family:"Mochiy Pop One","Zen Maru Gothic",sans-serif;font-size:1.2rem;color:#573647;letter-spacing:.12em;text-align:center}'+
'#menuBtn{position:absolute;right:14px;top:50%;transform:translateY(-50%);width:56px;height:56px;border-radius:50%;border:3px solid #fff;background:#ec3f8c;color:#fff;box-shadow:0 0 0 3px #f06aa4,0 6px 14px rgba(232,63,140,.35);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;font-size:9.5px;font-weight:800;letter-spacing:.05em;gap:3px}#menuBtn .bars{display:block;width:20px;height:3px;border-radius:2px;background:#fff;box-shadow:0 -6px 0 #fff,0 6px 0 #fff;margin:5px 0 3px}'+
'#menuOv{position:fixed;inset:0;z-index:600;background:#fff;display:none;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:20px;background-image:radial-gradient(circle at 20% 15%,#ffe0ee 0,transparent 40%),radial-gradient(circle at 85% 85%,#e9dcff 0,transparent 40%)}#menuOv.show{display:flex;animation:fadeIn .25s ease}#menuOv nav{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%}'+
'#menuOv nav button{background:transparent;border:0;font-family:"Mochiy Pop One","Zen Maru Gothic",sans-serif;font-size:1.5rem;color:#ee3f8e;padding:14px 20px;letter-spacing:.08em}#menuOv nav button:active{background:#fff0f6;border-radius:14px}'+
'#menuClose{position:absolute;top:16px;right:16px;width:56px;height:56px;border-radius:50%;border:3px solid #fff;background:#ec3f8c;color:#fff;font-size:30px;line-height:1;box-shadow:0 0 0 3px #f06aa4;padding:0}.menuset{margin-top:26px;text-align:center;font-size:13px;color:#573647}.menuset .mini{margin-left:8px}'+
'#contWrap{position:fixed;right:14px;bottom:calc(18px + env(safe-area-inset-bottom));z-index:140;display:none;align-items:center;gap:6px;animation:fadeUp .25s ease}#contGo{background:#e85b91;color:#fff;border:0;border-radius:99px;padding:14px 18px;font-weight:800;font-size:14px;box-shadow:0 6px 16px rgba(232,91,145,.4);display:flex;align-items:center;gap:6px}#contX{width:30px;height:30px;border-radius:50%;border:0;background:#fff;color:#8a90a3;box-shadow:0 2px 8px rgba(0,0,0,.18);padding:0;font-size:16px;line-height:1}'+
'.dbsheet{animation:fadeUp .25s ease}.cs-list{animation:fadeIn .18s ease}';
document.head.appendChild(st);

var UI_BASE=':root{--hfont:"LINE Seed JP","Zen Maru Gothic",sans-serif}'+
'body{background-color:#fff6fa!important;background-image:url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'104\' viewBox=\'0 0 60 104\'%3E%3Crect width=\'60\' height=\'104\' fill=\'%23fff6fa\'/%3E%3Cpath d=\'M30 0L60 52L30 104L0 52Z\' fill=\'%23ffeaf3\'/%3E%3C/svg%3E")!important;background-size:24px 41.6px!important;background-attachment:fixed!important}'+
'.chev{display:inline-block;width:8px;height:8px;border-top:2px solid currentColor;border-right:2px solid currentColor}.chev.l{transform:rotate(-135deg);margin-left:3px}'+
'#menuBtn{position:fixed!important;top:12px!important;right:12px!important;transform:none!important;z-index:950!important;width:56px;height:56px;border-radius:50%;border:3px solid #fff;background:#ec3f8c;color:#fff;box-shadow:0 0 0 3px #f06aa4,0 6px 14px rgba(232,63,140,.35);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;font-size:9.5px;font-weight:800;letter-spacing:.05em;gap:3px;font-family:inherit}#menuBtn .bars{display:block;width:20px;height:3px;border-radius:2px;background:#fff;box-shadow:0 -6px 0 #fff,0 6px 0 #fff;margin:5px 0 3px}#menuBtn .x{font-size:34px;line-height:1;font-weight:400;margin-top:-3px}'+
'#menuOv{position:fixed;inset:0;z-index:900;background:#fff;display:none;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:20px;background-image:radial-gradient(circle at 20% 15%,#ffe0ee 0,transparent 40%),radial-gradient(circle at 85% 85%,#e9dcff 0,transparent 40%)}#menuOv.show{display:flex;animation:fadeIn .25s ease}#menuOv nav{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%}#menuOv nav button,#menuOv nav a{background:transparent;border:0;font-family:var(--hfont);font-size:1.5rem;color:#ee3f8e;padding:14px 20px;letter-spacing:.08em;text-decoration:none}#menuClose{display:none!important}'+
'#homeFloat{position:fixed;top:12px;left:12px;z-index:880;width:54px;height:54px;border-radius:50%;background:#fff;border:3px solid #ee3f8e;box-shadow:0 0 0 3px #fff,0 0 0 5px #f8a5c9,0 6px 14px rgba(232,63,140,.3);display:flex;opacity:0;pointer-events:none;transform:translateY(-10px);transition:opacity .35s ease,transform .35s ease;align-items:center;justify-content:center;padding:0}'+
'#backFloat{position:fixed;left:14px;bottom:calc(16px + env(safe-area-inset-bottom));width:56px;height:56px;border-radius:50%;background:#e85b91;color:#fff;border:0;box-shadow:0 6px 16px rgba(232,91,145,.45);z-index:850;display:none;align-items:center;justify-content:center;gap:2px;font-weight:800;font-size:12px;letter-spacing:.03em;padding:0;font-family:inherit}#backFloat .chev{width:9px;height:9px;margin-left:4px}'+
'@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes sheetUp{from{transform:translateY(100%)}to{transform:none}}';
var UI_MAIN='#pageTitle:empty{display:none}#pageTitle{font-family:var(--hfont)!important}'+
'#contWrap{right:0!important;padding-right:10px;transition:transform .32s ease}#contWrap.tuck{transform:translateX(calc(100% - 46px))}'+
'.dbsheet{animation:sheetUp .3s ease!important;font-family:"Zen Maru Gothic",system-ui,sans-serif}.dbsheet input,.dbsheet select,.dbsheet button,.dbsheet label{font-family:inherit}'+
'.gridframe{background:#fff;border-radius:18px;padding:10px;margin:10px 0;box-shadow:0 4px 14px rgba(32,36,58,.06)}'+
'.gridin{border:2px solid #e85b91;border-radius:14px;padding:10px;background-color:#fff;background-image:linear-gradient(rgba(232,91,145,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(232,91,145,.13) 1px,transparent 1px);background-size:16px 16px}';
var st9=document.createElement('style');st9.textContent=UI_BASE+UI_MAIN;document.head.appendChild(st9);

// ===== 検索: ひらがな対応、番号は頭の数字で絞り込み、未確定の弾は番号のみ =====
function norm(s){return String(s).toLowerCase().replace(/[\u30a1-\u30f6]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-0x60)}).replace(/\s+/g,'')}
window.searchCards=function(q){var s=String(q).trim(),se=$('editionSelect'),e=se?se.value:'1',open=window.dbIsLocked?!dbIsLocked(e):false;
 if(open){return(s&&/^\d+$/.test(s))?[{id:parseInt(s,10),name:'',rarity:'',star:false}]:[]}
 if(!s)return[];
 if(/^\d+$/.test(s))return cards.filter(function(c){return String(c.id).indexOf(s)===0}).slice(0,40);
 var n=norm(s);return cards.filter(function(c){return norm(c.name).indexOf(n)>=0}).slice(0,20)};
var as0=window.addSelected;window.addSelected=function(){var q=$('cardSearch').value.trim();
 if(q&&!selected){var open=window.dbIsLocked?!dbIsLocked(($('editionSelect')||{}).value||'1'):false;
  if(!open){if(/^\d+$/.test(q)){var ex=cards.filter(function(c){return String(c.id)===q});if(ex.length)selected=ex.filter(function(c){return!c.star})[0]||ex[0]}
   else{var nm=window.searchCards(q).filter(function(c){return norm(c.name)===norm(q)});if(nm.length)selected=nm.filter(function(c){return!c.star})[0]||nm[0]}}}
 return as0.apply(this,arguments)};
['deleteHistory','deleteAllHistories','renameHistory'].forEach(function(n){var f=window[n];if(!f)return;window[n]=function(){var y=window.scrollY,v=f.apply(this,arguments);window.scrollTo(0,y);requestAnimationFrame(function(){window.scrollTo(0,y)});return v}});

// ===== タイトル: タップで最新版に更新 =====
(function(){var sm=document.querySelector('header .mark'),br=sm&&sm.parentNode;if(!br)return;
 var sml=br.querySelector('small');if(sml)sml.textContent='配列サーチ・カード配列データ収集';
 br.style.cursor='pointer';br.title='配列サーチへ';
 br.onclick=function(){var dv=document.getElementById('dbView'),av=document.getElementById('arraysView');
  if(dv&&dv.classList.contains('active')&&window.dbShow){dbShow(false);window.scrollTo(0,0)}
  else if(av&&av.classList.contains('active')){backToSearch();window.scrollTo(0,0)}
  else location.reload()}})();

// ===== カードリスト(新しいタブ) =====
var CSCSS='.cs{position:relative;display:block;width:100%;min-width:0}.cs-btn{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;min-height:46px;padding:10px 14px;border:1px solid #d9dde8;background:#fff;border-radius:12px;font-size:15px;font-weight:600;color:#573647;text-align:left;font-family:inherit}.cs-btn span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.caret{flex:none;width:8px;height:8px;border-right:2px solid #8a90a3;border-bottom:2px solid #8a90a3;transform:rotate(45deg);margin-top:-4px}.cs.open .caret{transform:rotate(-135deg);margin-top:3px}.cs.open .cs-btn,.cs-btn:active{border-color:#e85b91;box-shadow:0 0 0 2px rgba(232,91,145,.18)}.cs-list{display:none;position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:400;background:#fff;border:1px solid #e85b91;border-radius:12px;box-shadow:0 10px 26px rgba(32,36,58,.18);max-height:52vh;overflow:auto;padding:4px;animation:fadeIn .18s ease}.cs.open .cs-list{display:block}.cs-item{display:block;width:100%;text-align:left;border:0;background:transparent;padding:12px;border-radius:9px;font-size:15px;color:#573647;font-family:inherit}.cs-item.on{background:#fff0f6;font-weight:800}@keyframes fadeIn{from{opacity:0}to{opacity:1}}';
function openCardList(){
 var rm={},seen={};
 Object.keys(arrays).forEach(function(n){arrays[n].forEach(function(sl){sl.options.forEach(function(o){var k=o.id+'|'+o.name+'|'+(o.star?1:0);if(!seen[k])seen[k]={id:o.id,name:o.name,star:!!o.star};(rm[k]=rm[k]||{})[sl.rarity]=1})})});
 var CI=typeof CARD_INFO!=='undefined'?CARD_INFO:{type:{}};
 function typeOf(id){for(var k in CI.type)if(CI.type[k].indexOf(id)>=0)return k;return''}
 var CIm=typeof cardImages!=='undefined'?cardImages:{};
 function imgOf(ed,id,star){var m=CIm[ed],p=m?(m[star?'parallel':'normal']||{})[id]:'';return p?new URL(p,location.href).href:''}
 var D=Object.keys(seen).map(function(k){var c=seen[k];c.ed='1';c.r=c.star?['PAR']:Object.keys(rm[k]);c.t=typeOf(c.id);c.img=imgOf('1',c.id,c.star);c.land=!!(CI.landscape&&(CI.landscape[c.star?'parallel':'normal']||[]).indexOf(c.id)>=0);return c}).sort(function(a,b){return a.id-b.id||a.star-b.star});
 var json=JSON.stringify(D).replace(/</g,'\\u003c');
 var base=location.href.replace(/[^\/]*$/,'').replace(/#.*$/,'');
 var ICON='<svg viewBox="0 0 32 32" width="28" height="28"><rect x="5" y="3" width="14" height="19" rx="2.5" fill="#ffd3e5" stroke="#ee3f8e" stroke-width="2"/><circle cx="19" cy="19" r="6" fill="#fff" stroke="#ee3f8e" stroke-width="2.4"/><path d="M23.5 23.5L28 28" stroke="#ee3f8e" stroke-width="3" stroke-linecap="round"/></svg>';
 var page=`<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>カードリスト</title><link rel="icon" href="${base}favicon.png"><link rel="apple-touch-icon" href="${base}apple-touch-icon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=LINE+Seed+JP:wght@800&display=swap" rel="stylesheet"><link rel="stylesheet" href="ui2.css"><link href="https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&family=Mochiy+Pop+One&family=Zen+Maru+Gothic:wght@500;700;900&display=swap" rel="stylesheet"><style>${CSCSS}
${UI_BASE}
body{margin:0;color:#ee3f8e;font-family:"Zen Maru Gothic",system-ui,-apple-system,"Noto Sans JP",sans-serif}
h1{display:block;width:max-content;max-width:78%;margin:24px auto 20px;padding:10px 28px;border:3px solid #ee3f8e;border-radius:18px;background:#fff;box-shadow:0 0 0 3px #fff,0 0 0 5px #f8a5c9;font-family:var(--hfont);font-size:1.25rem;color:#ee3f8e;letter-spacing:.12em;text-align:center}
.panel{margin:0 14px;padding:14px;background:#fff;border:2px solid #ee3f8e;border-radius:20px}
.fld{margin-top:12px}.fld:first-child{margin-top:0}.fld label{display:block;font-size:13px;font-weight:800;margin-bottom:5px;color:#ee3f8e}
.fld input{width:100%;box-sizing:border-box;font-size:16px;padding:12px 14px;border:1.5px solid #ee3f8e;border-radius:99px;background:#fff;color:#573647;font-family:inherit}.fld input:focus{outline:0;border-color:#e85b91;box-shadow:0 0 0 2px rgba(232,91,145,.18)}
.more{margin-top:14px;background:#ffe3ef;border-radius:16px;padding:12px}
#moreBtn{display:flex;align-items:center;justify-content:space-between;width:100%;padding:12px 18px;background:#fff;border:2px solid #ee3f8e;border-radius:99px;font-family:inherit;font-weight:800;font-size:15px;color:#ee3f8e}#moreBtn b{font-size:22px;line-height:1}
#moreBody{display:grid;grid-template-rows:0fr;transition:grid-template-rows .38s cubic-bezier(.4,0,.2,1)}#moreBody.open{grid-template-rows:1fr}.mbi{overflow:hidden;min-height:0;padding-top:6px}.pm{position:relative;width:18px;height:18px;display:inline-block}.pm i{position:absolute;left:0;top:8px;width:18px;height:2.5px;border-radius:2px;background:#ee3f8e;transition:transform .35s ease}.pm i:nth-child(2){transform:rotate(90deg)}#moreBtn.open .pm i:nth-child(2){transform:rotate(0)}
.seg{display:flex;gap:6px}.seg button{flex:1;padding:12px 4px;border:1.5px solid #ee3f8e;background:#fff;color:#ee3f8e;border-radius:99px;font-family:inherit;font-weight:800;font-size:13px}.seg button.on{background:#ee3f8e;color:#fff}
.found{margin:18px 14px 10px;background:#fff;border-radius:16px;padding:14px;text-align:center}#cnt{font-weight:800;font-size:15px;color:#ee3f8e}#cnt b{font-size:24px}
.sortrow{display:flex;align-items:center;gap:10px;margin-top:10px;background:#ffeef6;border-radius:14px;padding:10px 12px}.sortrow>span{font-weight:800;font-size:13px;color:#ee3f8e;white-space:nowrap}
#g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0 10px 24px}
.c{background:#fff;border-radius:12px;padding:6px;border:2px solid var(--tc,#f0d3e0)}.c.ty-cute{--tc:#ff9ccb}.c.ty-cool{--tc:#79cdee}.c.ty-sexy{--tc:#b794dd}.c.ty-pop{--tc:#ffb25a}
.c img{width:100%;border-radius:8px;display:block;cursor:zoom-in}.im.land{position:relative;aspect-ratio:460/670;overflow:hidden;border-radius:8px}.im.land img{position:absolute;top:50%;left:50%;width:145.6%;max-width:none;height:auto;transform:translate(-50%,-50%) rotate(90deg)}.c div{font-size:11.5px;margin-top:5px;line-height:1.45;word-break:break-all}.c b{font-size:13px}
.t{display:inline-block;font-size:10px;padding:1px 6px;border-radius:99px;background:#eef0f6;margin-left:3px;font-weight:700}.t.PR{background:#f8d86b}.t.ER{background:#a9e8f8}.t.R{background:#e9f1fb;color:#5b7894}.t.PAR{background:#f5a9c5}.t{color:#573647}.ty{background:#fff;border:1px solid currentColor}.ty.cute{color:#f0509b}.ty.cool{color:#2fa7d6}.ty.sexy{color:#8e5fc0}.ty.pop{color:#f08a1c}
#ov{position:fixed;inset:0;background:rgba(20,22,40,.82);display:flex;align-items:center;justify-content:center;z-index:960;padding:16px 74px;opacity:0;pointer-events:none;transition:opacity .28s ease}#ov.show{opacity:1;pointer-events:auto}#ov img{max-width:100%;max-height:100%;border-radius:12px;transform:scale(.92);transition:transform .28s ease}#ov.show img{transform:scale(1)}
.lbn{position:absolute;top:50%;transform:translateY(-50%);width:52px;height:52px;border-radius:50%;border:3px solid #fff;background:#ee3f8e;color:#fff;display:flex;align-items:center;justify-content:center;padding:0;box-shadow:0 0 0 3px #f06aa4}.lbn.l{left:10px}.lbn.r{right:10px}.lbn .chev{margin:0 0 0 0}
.sortrow .cs{width:64%;margin-left:auto;transform:scale(.9);transform-origin:right center}.sortrow .cs-btn{min-height:40px;border-radius:99px}
.cs-btn{border:1.5px solid #ee3f8e;border-radius:99px;color:#ee3f8e}.caret{border-color:#ee3f8e}.cs-item{color:#ee3f8e}
footer{padding:14px;font-size:10.5px;color:#8a90a3;text-align:center;line-height:1.7}
@media(min-width:700px){#g{grid-template-columns:repeat(6,1fr)}}
</style></head><body>
<button id="homeFloat" type="button" title="配列サーチへ" onclick="location.href=BASE">${ICON}</button>
<button id="backFloat" type="button" style="display:flex" onclick="goBack()"><i class="chev l"></i><span>BACK</span></button>
<button id="menuBtn" type="button"><span class="bars"></span><span>MENU</span></button>
<div id="menuOv"><nav><a href="${base}">配列サーチ</a><a href="${base}#db">配列データベース</a><a href="${base}cards.html" id="menuHere">カードリスト</a></nav></div>
<h1>カードリスト</h1>
<div class="panel"><div class="fld"><label>フリーワード</label><input id="q" placeholder="カード番号・カード名を入力"></div>
<div class="fld"><label>弾数</label><select id="ed"><option value="">すべて</option><option value="1">第1弾</option></select></div>
<div class="more"><button id="moreBtn" type="button"><span>くわしくさがす</span><b id="moreMark" class="pm"><i></i><i></i></b></button>
<div id="moreBody"><div class="mbi"><div class="fld"><label>タイプ</label><select id="tf"><option value="">すべて</option><option value="cute">キュート</option><option value="cool">クール</option><option value="sexy">セクシー</option><option value="pop">ポップ</option></select></div>
<div class="fld"><label>レアリティ</label><select id="rf"><option value="">すべて</option><option value="PR">PR(プレミアムレア)</option><option value="R">R(レア)</option><option value="N">N(ノーマル)</option><option value="ER">ER(アンコールレア)</option></select></div>
<div class="fld"><label>表示カード</label><div class="seg" id="vf"><button type="button" data-v="n" class="on">通常カード</button><button type="button" data-v="p">パラレルカード</button><button type="button" data-v="a">すべて表示</button></div></div></div></div></div></div>
<div class="found"><div id="cnt"></div><div class="sortrow"><span>ならびかえ</span><select id="sf"><option value="no_a">カード番号昇順</option><option value="no_d">カード番号降順</option><option value="ra_a">レアリティ昇順</option><option value="ra_d">レアリティ降順</option></select></div></div>
<div id="g"></div><div id="ov"></div>
<footer>非公式ファンサイト / 画像等の権利は各権利者に帰属します</footer>
<script>var BASE='${base}',D=__DATA__,SN={N:'N',R:'R',PR:'PR',ER:'ER',PAR:'PR★'},TN={cute:'キュート',cool:'クール',sexy:'セクシー',pop:'ポップ'},RA={N:0,R:1,ER:2,PR:3,PAR:4},RD={PR:0,ER:1,R:2,N:3,PAR:4},VIEW='n';
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
var Q=document.getElementById('q'),RF=document.getElementById('rf'),TF=document.getElementById('tf'),ED=document.getElementById('ed'),SF=document.getElementById('sf'),G=document.getElementById('g'),CNT=document.getElementById('cnt'),OV=document.getElementById('ov'),MB=document.getElementById('menuBtn'),MO=document.getElementById('menuOv');
function norm(s){return String(s).toLowerCase().replace(/[ァ-ヶ]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-96)}).replace(/ /g,'').replace(/　/g,'')}
function draw(){var q=norm(Q.value),f=RF.value,t=TF.value,e=ED.value,s=SF.value;
 var L=D.filter(function(c){return(!e||c.ed===e)&&(!f||c.r.indexOf(f)>=0)&&(!t||c.t===t)&&(VIEW==='a'||(VIEW==='p'?c.star:!c.star))&&(!q||(!isNaN(q)?String(c.id).indexOf(q)===0:norm(c.name).indexOf(q)>=0))});
 L.sort(function(a,b){if(s==='no_d')return b.id-a.id||b.star-a.star;if(s==='ra_a')return RA[a.r[0]]-RA[b.r[0]]||a.id-b.id;if(s==='ra_d')return RD[a.r[0]]-RD[b.r[0]]||a.id-b.id;return a.id-b.id||a.star-b.star});
 CNT.innerHTML='見つかったカード <b>'+L.length+'</b> 枚';
 LB=L;G.innerHTML=L.map(function(c,i){return '<div class="c'+(c.t?' ty-'+c.t:'')+'" data-i="'+i+'">'+(c.img?'<div class="im'+(c.land?' land':'')+'"><img loading="lazy" src="'+c.img+'"></div>':'')+'<div><b>'+c.id+'</b>'+c.r.map(function(r){return '<span class="t '+r+'">'+SN[r]+'</span>'}).join('')+(c.t?'<span class="t ty '+c.t+'">'+TN[c.t]+'</span>':'')+'<br>'+esc(c.name)+'</div></div>'}).join('')}
Q.oninput=draw;[RF,TF,ED,SF].forEach(function(x){x.onchange=draw});
[].forEach.call(document.querySelectorAll('#vf button'),function(b){b.onclick=function(){VIEW=b.dataset.v;[].forEach.call(document.querySelectorAll('#vf button'),function(x){x.classList.toggle('on',x===b)});draw()}});
document.getElementById('moreBtn').onclick=function(){var o=document.getElementById('moreBody').classList.toggle('open');this.classList.toggle('open',o)};
var LB=[],LI=0;
function showLB(i){if(!LB.length)return;LI=(i+LB.length)%LB.length;var c=LB[LI];OV.innerHTML='<button class="lbn l" data-d="-1" type="button"><i class="chev l"></i></button><img src="'+c.img+'"><button class="lbn r" data-d="1" type="button"><i class="chev r"></i></button>';requestAnimationFrame(function(){OV.classList.add('show')})}
G.onclick=function(e){var el=e.target.closest('.c');if(el&&e.target.tagName==='IMG')showLB(+el.dataset.i)};
OV.onclick=function(e){var b=e.target.closest('.lbn');if(b){e.stopPropagation();showLB(LI+(+b.dataset.d));return}OV.classList.remove('show')};
function setMenu(on){MO.classList.toggle('show',on);MB.classList.toggle('open',on);MB.innerHTML=on?'<span class="x">×</span>':'<span class="bars"></span><span>MENU</span>'}
MB.onclick=function(){setMenu(!MO.classList.contains('show'))};document.getElementById('menuHere').onclick=function(e){e.preventDefault();setMenu(false)};
function goBack(){if(history.length>1)history.back();else location.href=BASE}
window.addEventListener('scroll',function(){document.getElementById('homeFloat').classList.toggle('show',window.scrollY>140)});
draw();<\/script><script>${'('+csInstall.toString()+')()'}<\/script></body></html>`.replace('__DATA__',json);
 var w=window.open(URL.createObjectURL(new Blob([page],{type:'text/html'})),'_blank');if(!w)alert('新しいタブを開けませんでした。ポップアップを許可してください。');
}
window.openCardList=function(){location.href='cards.html'};

// ===== 画像表示の切り替え =====
var ti=window.toggleImages;window.toggleImages=function(){
 var els=document.querySelectorAll('#arrayDetail .slot'),best=null,bd=1e9,mid=window.innerHeight/2;
 [].forEach.call(els,function(el){var r=el.getBoundingClientRect(),d=Math.abs((r.top+r.bottom)/2-mid);if(d<bd){bd=d;best=el}});
 var before=best?best.getBoundingClientRect().top:0;ti.apply(this,arguments);
 if(best){var after=best.getBoundingClientRect().top;if(after!==before)window.scrollBy({top:after-before,behavior:'instant'})}};
(function(){
 var cb=$('showImageToggle'),lab=cb&&cb.closest('label'),KA='aikatsu_img_arr',KS='aikatsu_img_sug';
 if(lab)lab.style.display='none';
 if(cb&&get(KA)!==null){cb.checked=get(KA)==='1';ti.call(window)}
 var fab=$('arrayFabContainer'),fb=null;
 if(fab&&cb){fb=document.createElement('button');fb.id='fabImg';fb.className='fab-btn';fb.type='button';fab.appendChild(fb)}
 var rb=$('resImgBtn'),sb=$('sugImgBtn');
 function lbl(){var on=!cb||cb.checked;if(fb){fb.textContent='画像 '+(on?'ON':'OFF');fb.classList.toggle('on',on)}if(rb){rb.textContent='画像 '+(on?'ON':'OFF');rb.classList.toggle('on',on)}}
 function flip(){cb.checked=!cb.checked;window.toggleImages();set(KA,cb.checked?'1':'0');lbl()}
 if(fb)fb.onclick=flip;if(rb)rb.onclick=flip;lbl();
 document.body.classList.toggle('hide-sug-img',get(KS)==='0');
 function sl(){if(sb){var on=!document.body.classList.contains('hide-sug-img');sb.textContent='候補画像 '+(on?'ON':'OFF');sb.classList.toggle('on',on)}}
 if(sb){sb.onclick=function(){var h=document.body.classList.toggle('hide-sug-img');set(KS,h?'0':'1');sl()};sl()}
 var box=$('suggestions');
 if(box&&window.MutationObserver){new MutationObserver(function(){var items=box.querySelectorAll('.suggestion'),m=window.currentMatches||[];
  [].forEach.call(items,function(el,i){if(el.dataset.img)return;el.dataset.img='1';var c=m[i];if(!c)return;var first=el.querySelector('span');if(!first)return;
   if(c.name===''){first.innerHTML='<b>'+c.id+'</b>'}
   else{var p=window.getCardImagePath?getCardImagePath(c.id,c.star):'';if(p){var im=document.createElement('img');im.className='sugimg';im.src=p;im.loading='lazy';first.insertBefore(im,first.firstChild)}}})
 }).observe(box,{childList:true})}
})();

// ===== MENU・ページ見出し・BACK・配列の続き =====
(function(){
 var hd=document.querySelector('header.top'),ti2=hd&&hd.querySelector('.topin');
 var pt=document.createElement('div');pt.id='pageTitle';if(hd)hd.parentNode.insertBefore(pt,hd.nextSibling);
 var mb=document.createElement('button');mb.id='menuBtn';mb.type='button';mb.innerHTML='<span class="bars"></span><span>MENU</span>';document.body.appendChild(mb);
 var mo=document.createElement('div');mo.id='menuOv';
 mo.innerHTML='<button id="menuBack" type="button" title="配列サーチに戻る"><svg viewBox="0 0 32 32" width="28" height="28"><rect x="5" y="3" width="14" height="19" rx="2.5" fill="#ffd3e5" stroke="#ee3f8e" stroke-width="2"/><circle cx="19" cy="19" r="6" fill="#fff" stroke="#ee3f8e" stroke-width="2.4"/><path d="M23.5 23.5L28 28" stroke="#ee3f8e" stroke-width="3" stroke-linecap="round"/></svg></button><button id="menuClose" type="button">×</button><div class="menupanel"><nav><a href="./" data-go="search">配列サーチ</a><a href="./#db" data-go="db">配列データベース</a><a href="cards.html" data-go="cards">カードリスト</a><a href="updates.html" data-go="page">更新履歴</a><a href="collect.html" data-go="page">データ収集状況</a></nav><div class="menuset"><button id="menuUpd" type="button" class="mini">最新版に更新</button></div></div>';
 document.body.appendChild(mo);
 function contOn(){return true}
 function setMenu(on){mo.classList.toggle('show',on);mb.classList.toggle('open',on);mb.innerHTML=on?'<span class="x">×</span>':'<span class="bars"></span><span>MENU</span>'}
 mb.onclick=function(){setMenu(!mo.classList.contains('show'))};
 [].forEach.call(mo.querySelectorAll('nav a'),function(l){l.onclick=function(e){var g=l.dataset.go,dv=$('dbView');if(g==='cards'||g==='page')return;e.preventDefault();setMenu(false);
  if(g==='db'){if(window.dbShow)dbShow(true)}
  else{if(dv&&dv.classList.contains('active')&&window.dbShow)dbShow(false);else backToSearch()}}});
 $('menuUpd').onclick=function(){if(!confirm('最新版に更新しますか?(入力中の内容やデータベースは消えません)'))return;(async function(){try{var rs=await navigator.serviceWorker.getRegistrations();for(var i=0;i<rs.length;i++)await rs[i].unregister();var ks=await caches.keys();for(var j=0;j<ks.length;j++)await caches.delete(ks[j])}catch(e){}location.reload()})()};
 var bk=document.createElement('button');bk.id='backFloat';bk.type='button';bk.innerHTML='<i class="chev l"></i><span>BACK</span>';document.body.appendChild(bk);
 bk.onclick=function(){var d=$('dbView');if(d&&d.classList.contains('active')&&window.dbShow)window.dbShow(false);else backToSearch()};
 var hf=document.createElement('button');hf.id='homeFloat';hf.type='button';hf.title='配列サーチへ';
 hf.innerHTML='<svg viewBox="0 0 32 32" width="28" height="28"><rect x="5" y="3" width="14" height="19" rx="2.5" fill="#ffd3e5" stroke="#ee3f8e" stroke-width="2"/><circle cx="19" cy="19" r="6" fill="#fff" stroke="#ee3f8e" stroke-width="2.4"/><path d="M23.5 23.5L28 28" stroke="#ee3f8e" stroke-width="3" stroke-linecap="round"/></svg>';document.body.appendChild(hf);
 hf.onclick=function(){setMenu(false);var d=$('dbView');if(d&&d.classList.contains('active')&&window.dbShow)window.dbShow(false);else backToSearch()};
 $('menuBack').onclick=hf.onclick;
 var tp=document.createElement('button');tp.id='topFloat';tp.className='topfloat';tp.type='button';tp.innerHTML='<i class="chev u"></i>TOP';tp.onclick=function(){window.scrollTo({top:0,behavior:'smooth'})};document.body.appendChild(tp);
 var cw=document.createElement('div');cw.id='contWrap';cw.innerHTML='<button id="contGo" type="button">配列の続きを見る<i class="chev r"></i></button><button id="contX" type="button" title="しまう">×</button>';document.body.appendChild(cw);
 var ctab=document.createElement('button');ctab.id='contTab';ctab.type='button';ctab.title='配列の続きを表示';ctab.innerHTML='<i class="chev l"></i>';document.body.appendChild(ctab);
 var tuck=false;
 $('contGo').onclick=function(){viewArrayDetail(String(currentActiveArray),currentActiveSlotIndex)};
 $('contX').onclick=function(){tuck=true;vis()};ctab.onclick=function(){tuck=false;vis()};
 window.markPos=function(idx){if(!currentActiveArray)return;currentActiveSlotIndex=idx;if(adv.sig!==sig())adv={sig:sig(),map:{}};adv.map[currentActiveArray]=idx;persist();
  [].forEach.call(document.querySelectorAll('#arrayDetail .slot'),function(el,i){var cur=i===idx;el.classList.toggle('current-pos',cur);var b=el.querySelector('.current-pos-badge');if(cur&&!b){var d=document.createElement('div');d.className='current-pos-badge';d.textContent='★ 現在位置('+(i+1)+'枠目)';el.insertBefore(d,el.firstChild)}else if(!cur&&b)b.remove()});
  var hb=document.querySelector('#arrayDetail .arrayhead .badge');if(hb)hb.textContent='現在位置:'+(idx+1)+'枠目'};
 var bv=true;if(window.IntersectionObserver&&hd){new IntersectionObserver(function(es){bv=es[0].isIntersecting;vis()},{threshold:0.05}).observe(hd)}
 function curView(){var d=$('dbView'),a=$('arraysView');return d&&d.classList.contains('active')?'db':(a&&a.classList.contains('active')?'arrays':'search')}
 function vis(){var v=curView();tp.style.display=v==='db'?'flex':'none';bk.style.display=v==='search'?'none':'flex';hf.classList.toggle('show',v!=='search'&&!bv);
  pt.textContent=v==='db'?'配列データベース':(v==='arrays'?'配列詳細':'');
  var cok=(v==='search'&&contOn()&&currentActiveArray);cw.style.display=(cok&&!tuck)?'flex':'none';ctab.style.display=(cok&&tuck)?'flex':'none'}
 if(window.MutationObserver)new MutationObserver(vis).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});vis();setInterval(vis,700);
 // 更新しても今のページを保つ
 var VK='aikatsu_view_v1';
 function saveView(){try{set(VK,JSON.stringify({v:curView(),no:currentActiveArray||null,idx:currentActiveSlotIndex,y:window.scrollY}))}catch(e){}}
 window.addEventListener('pagehide',function(){persist();saveView()});document.addEventListener('visibilitychange',saveView);setInterval(saveView,2000);
 setTimeout(function(){if(location.hash==='#db'&&window.dbShow){dbShow(true);try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}return}var s=null;try{s=JSON.parse(get(VK)||'null')}catch(e){}if(!s)return;
  if(s.v==='db'&&window.dbShow)dbShow(true);else if(s.v==='arrays'&&s.no)viewArrayDetail(String(s.no),s.idx);
  setTimeout(function(){window.scrollTo(0,s.y||0)},150)},150);
})();

// ===== 確定していない弾の入力方式 =====
(function(){var sx=document.querySelector('.searchbox'),sg=$('suggestions');if(!sx||!sx.parentNode)return;
 var hint=document.createElement('div');hint.className='hint';
 var ex=(typeof cards!=='undefined'?cards.filter(function(c){return c.id===24})[0]:null);hint.textContent='例: 24  '+(ex?ex.name:'');
 sx.parentNode.insertBefore(hint,sx.nextSibling);
 var box=document.createElement('div');box.id='entryBox';box.style.display='none';
 box.innerHTML='<label class="fl">入力方式を選択 ※カードリストがない場合のみ</label><select id="entryMode"><option value="num">カード番号を入力</option><option value="manual">カード番号・カード名・レアリティを入力</option></select>'+
 '<div id="manualBox" style="display:none"><div class="mrow"><input id="ma1" class="n3" inputmode="numeric" maxlength="3" placeholder="番号"><input id="ma2" placeholder="カード名(不明なら空欄)"></div><div class="mrow"><select id="ma3"><option value="PR">PR(プレミアムレア)</option><option value="ER">ER(アンコールレア)</option><option value="R">R(レア)</option><option value="N">N(ノーマル)</option><option value="PAR">PR★(パラレル)</option></select><select id="ma4"><option value="">タイプ(任意)</option><option value="cute">キュート</option><option value="cool">クール</option><option value="sexy">セクシー</option><option value="pop">ポップ</option></select><button type="button" id="maAdd" class="addbtn">追加</button></div></div>';
 sx.parentNode.insertBefore(box,sx);
 function sync(){var se=$('editionSelect'),e=se?se.value:'1',open=window.dbIsLocked?!dbIsLocked(e):false,man=open&&$('entryMode').value==='manual';
  box.style.display=open?'block':'none';$('manualBox').style.display=man?'block':'none';sx.style.display=man?'none':'';hint.style.display=open?'none':'';if(man&&sg)sg.classList.remove('show')}
 $('entryMode').addEventListener('change',sync);
 $('maAdd').onclick=function(){var n=parseInt($('ma1').value,10);if(!(n>0)){alert('カード番号を入力してください。');return}
  histories[currentSide].push({id:n,name:$('ma2').value.trim(),rarity:$('ma3').value,type:$('ma4').value});$('ma1').value='';$('ma2').value='';render()};
 var se=$('editionSelect');if(se)se.addEventListener('change',sync);setTimeout(sync,0)})();

// ===== すべての選択欄を「下に一覧が開く」方式に統一 =====
function csInstall(){
 function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
 function closeAll(){[].forEach.call(document.querySelectorAll('.cs.open'),function(w){w.classList.remove('open')})}
 document.addEventListener('click',closeAll);
 function enhance(sel){
  if(sel.dataset.cs||!sel.parentNode)return;sel.dataset.cs='1';
  var wrap=document.createElement('div');wrap.className='cs';var btn=document.createElement('button');btn.type='button';btn.className='cs-btn';
  var list=document.createElement('div');list.className='cs-list';
  sel.parentNode.insertBefore(wrap,sel);wrap.appendChild(btn);wrap.appendChild(list);wrap.appendChild(sel);sel.style.display='none';
  function label(){var o=sel.options[sel.selectedIndex];btn.innerHTML='<span>'+esc(o?o.textContent:'')+'</span><i class="caret"></i>';btn.classList.toggle('pk',!!(o&&o.dataset&&o.dataset.pink))}
  function build(){list.innerHTML='';[].forEach.call(sel.options,function(o,i){var it=document.createElement('button');it.type='button';
   it.className='cs-item'+(i===sel.selectedIndex?' on':'')+(o.dataset&&o.dataset.pink?' pk':'')+(o.disabled?' dis':'');it.textContent=o.textContent;
   it.onclick=function(e){e.stopPropagation();if(o.disabled)return;sel.selectedIndex=i;wrap.classList.remove('open');label();sel.dispatchEvent(new Event('change',{bubbles:true}))};list.appendChild(it)})}
  btn.onclick=function(e){e.stopPropagation();var was=wrap.classList.contains('open');closeAll();
   if(!was){build();wrap.classList.add('open');requestAnimationFrame(function(){try{var sc=wrap.closest('.dbsheet'),r=list.getBoundingClientRect();if(sc){var cr=sc.getBoundingClientRect();if(r.bottom>cr.bottom-8)sc.scrollBy({top:r.bottom-cr.bottom+16,behavior:'smooth'})}else if(r.bottom>window.innerHeight-12)window.scrollBy({top:r.bottom-window.innerHeight+16,behavior:'smooth'})}catch(e){}})}};
  sel._cs=label;label()}
 window.enhanceSelects=function(){[].forEach.call(document.querySelectorAll('select'),function(s){if(!s.dataset.cs)enhance(s);else if(s._cs)s._cs()})};
 enhanceSelects();setInterval(enhanceSelects,400);
}
csInstall();

// ===== 更新の確認 =====
(function(){var lg=document.querySelector('.legal');
 if(lg){var p=document.createElement('p');p.textContent='v6.1';lg.appendChild(p)}
 if(!lg||!document.getElementById('resImgBtn')){var b=document.createElement('div');b.style.cssText='background:#c0392b;color:#fff;padding:10px 14px;font-size:13px;text-align:center';b.textContent='index.html が最新ではありません。GitHubで index.html をアップロードし直してください。';document.body.insertBefore(b,document.body.firstChild)}})();
})();
