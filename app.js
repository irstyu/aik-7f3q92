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
'#backFloat{position:fixed;left:14px;bottom:calc(16px + env(safe-area-inset-bottom));width:70px;height:70px;border-radius:50%;background:#e85b91;color:#fff;border:0;box-shadow:0 6px 16px rgba(232,91,145,.45);z-index:150;display:none;align-items:center;justify-content:center;gap:2px;font-weight:800;font-size:12px;letter-spacing:.03em;padding:0}#backFloat .chev{width:9px;height:9px;margin-left:4px}'+
'.mini{padding:6px 12px;font-size:13px;border:1px solid #d9dde8;background:#fff;border-radius:12px;color:#20243a;font-weight:700}.mini.on{background:#e85b91;border-color:#e85b91;color:#fff}'+
'body.hide-sug-img .sugimg{display:none}.sugimg{width:34px;height:auto;border-radius:5px;margin-right:8px;vertical-align:middle}'+
'#entryBox .cs{display:block;width:100%}#manualBox{background:#fff;border:1px solid #e6e9f1;border-radius:14px;padding:10px;margin-bottom:10px}#manualBox .mrow{display:flex;gap:8px;margin-top:8px}#manualBox .mrow:first-child{margin-top:0}#manualBox input,#manualBox select{flex:1;min-width:0;font-size:16px;padding:11px;border:1px solid #d9dde8;border-radius:10px;background:#fff}#manualBox input.n3{flex:none;width:76px}#manualBox .cs{flex:1;min-width:0}#manualBox .addbtn{flex:none;padding:0 18px}'+
'#pageTitle{display:block;width:max-content;max-width:88%;margin:20px auto 8px;padding:10px 28px;border:3px solid #ee3f8e;border-radius:18px;background:#fff;box-shadow:0 0 0 3px #fff,0 0 0 5px #f8a5c9;font-family:"Mochiy Pop One","Zen Maru Gothic",sans-serif;font-size:1.2rem;color:#20243a;letter-spacing:.12em;text-align:center}'+
'#menuBtn{position:absolute;right:14px;top:50%;transform:translateY(-50%);width:56px;height:56px;border-radius:50%;border:3px solid #fff;background:#ec3f8c;color:#fff;box-shadow:0 0 0 3px #f06aa4,0 6px 14px rgba(232,63,140,.35);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;font-size:9.5px;font-weight:800;letter-spacing:.05em;gap:3px}#menuBtn .bars{display:block;width:20px;height:3px;border-radius:2px;background:#fff;box-shadow:0 -6px 0 #fff,0 6px 0 #fff;margin:5px 0 3px}'+
'#menuOv{position:fixed;inset:0;z-index:600;background:#fff;display:none;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:20px;background-image:radial-gradient(circle at 20% 15%,#ffe0ee 0,transparent 40%),radial-gradient(circle at 85% 85%,#e9dcff 0,transparent 40%)}#menuOv.show{display:flex;animation:fadeIn .25s ease}#menuOv nav{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%}'+
'#menuOv nav button{background:transparent;border:0;font-family:"Mochiy Pop One","Zen Maru Gothic",sans-serif;font-size:1.5rem;color:#ee3f8e;padding:14px 20px;letter-spacing:.08em}#menuOv nav button:active{background:#fff0f6;border-radius:14px}'+
'#menuClose{position:absolute;top:16px;right:16px;width:56px;height:56px;border-radius:50%;border:3px solid #fff;background:#ec3f8c;color:#fff;font-size:30px;line-height:1;box-shadow:0 0 0 3px #f06aa4;padding:0}.menuset{margin-top:26px;text-align:center;font-size:13px;color:#70778c}.menuset .mini{margin-left:8px}'+
'#contWrap{position:fixed;right:14px;bottom:calc(18px + env(safe-area-inset-bottom));z-index:140;display:none;align-items:center;gap:6px;animation:fadeUp .25s ease}#contGo{background:#e85b91;color:#fff;border:0;border-radius:99px;padding:14px 18px;font-weight:800;font-size:14px;box-shadow:0 6px 16px rgba(232,91,145,.4);display:flex;align-items:center;gap:6px}#contX{width:30px;height:30px;border-radius:50%;border:0;background:#fff;color:#8a90a3;box-shadow:0 2px 8px rgba(0,0,0,.18);padding:0;font-size:16px;line-height:1}'+
'.dbsheet{animation:fadeUp .25s ease}.cs-list{animation:fadeIn .18s ease}';
document.head.appendChild(st);

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
 br.style.cursor='pointer';br.title='タップで最新版に更新';
 br.onclick=function(){if(!confirm('最新版に更新しますか?(入力中の内容やデータベースは消えません)'))return;
  (async function(){try{var rs=await navigator.serviceWorker.getRegistrations();for(var i=0;i<rs.length;i++)await rs[i].unregister();var ks=await caches.keys();for(var j=0;j<ks.length;j++)await caches.delete(ks[j])}catch(e){}location.reload()})()}})();

// ===== カードリスト(新しいタブ) =====
var CSCSS='.cs{position:relative;display:block;width:100%;min-width:0}.cs-btn{display:flex;align-items:center;justify-content:space-between;gap:10px;width:100%;min-height:46px;padding:10px 14px;border:1px solid #d9dde8;background:#fff;border-radius:12px;font-size:15px;font-weight:600;color:#20243a;text-align:left;font-family:inherit}.cs-btn span{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.caret{flex:none;width:8px;height:8px;border-right:2px solid #8a90a3;border-bottom:2px solid #8a90a3;transform:rotate(45deg);margin-top:-4px}.cs.open .caret{transform:rotate(-135deg);margin-top:3px}.cs.open .cs-btn,.cs-btn:active{border-color:#e85b91;box-shadow:0 0 0 2px rgba(232,91,145,.18)}.cs-list{display:none;position:absolute;left:0;right:0;top:calc(100% + 6px);z-index:400;background:#fff;border:1px solid #e85b91;border-radius:12px;box-shadow:0 10px 26px rgba(32,36,58,.18);max-height:52vh;overflow:auto;padding:4px;animation:fadeIn .18s ease}.cs.open .cs-list{display:block}.cs-item{display:block;width:100%;text-align:left;border:0;background:transparent;padding:12px;border-radius:9px;font-size:15px;color:#20243a;font-family:inherit}.cs-item.on{background:#fff0f6;font-weight:800}@keyframes fadeIn{from{opacity:0}to{opacity:1}}';
function openCardList(){
 var rm={},seen={};
 Object.keys(arrays).forEach(function(n){arrays[n].forEach(function(sl){sl.options.forEach(function(o){var k=o.id+'|'+o.name+'|'+(o.star?1:0);if(!seen[k])seen[k]={id:o.id,name:o.name,star:!!o.star};(rm[k]=rm[k]||{})[sl.rarity]=1})})});
 var CI=typeof CARD_INFO!=='undefined'?CARD_INFO:{type:{}};
 function typeOf(id){for(var k in CI.type)if(CI.type[k].indexOf(id)>=0)return k;return''}
 var D=Object.keys(seen).map(function(k){var c=seen[k];c.r=c.star?['PAR']:Object.keys(rm[k]);c.t=typeOf(c.id);var ip=getCardImagePath(c.id,c.star);c.img=ip?new URL(ip,location.href).href:'';return c}).sort(function(a,b){return a.id-b.id||a.star-b.star});
 var json=JSON.stringify(D).replace(/</g,'\\u003c');
 var base=location.href.replace(/[^\/]*$/,'').replace(/#.*$/,'');
 var page=`<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>カードリスト</title><link rel="icon" href="${base}favicon.png"><link rel="apple-touch-icon" href="${base}apple-touch-icon.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=Zen+Maru+Gothic:wght@500;700;900&display=swap" rel="stylesheet"><style>${CSCSS}
body{margin:0;color:#20243a;font-family:"Zen Maru Gothic",system-ui,-apple-system,"Noto Sans JP",sans-serif;background-color:#fff0f6;background-image:linear-gradient(135deg,rgba(255,255,255,.6) 25%,transparent 25%),linear-gradient(225deg,rgba(255,255,255,.6) 25%,transparent 25%),linear-gradient(315deg,rgba(255,255,255,.6) 25%,transparent 25%),linear-gradient(45deg,rgba(255,255,255,.6) 25%,transparent 25%);background-size:56px 56px;background-attachment:fixed}
h1{display:block;width:max-content;max-width:88%;margin:26px auto 16px;padding:10px 30px;border:3px solid #ee3f8e;border-radius:18px;background:#fff;box-shadow:0 0 0 3px #fff,0 0 0 5px #f8a5c9;font-family:"Mochiy Pop One","Zen Maru Gothic",sans-serif;font-size:1.25rem;color:#20243a;letter-spacing:.12em;text-align:center}
.panel{margin:0 14px;padding:14px;background:#fff;border:2px solid #f3a6c6;border-radius:18px}
.fld{margin-top:12px}.fld:first-child{margin-top:0}.fld label{display:block;font-size:13px;font-weight:800;margin-bottom:5px}
.fld input{width:100%;box-sizing:border-box;font-size:16px;padding:12px;border:1px solid #d9dde8;border-radius:12px;background:#fff;color:#20243a;font-family:inherit}.fld input:focus{outline:0;border-color:#e85b91;box-shadow:0 0 0 2px rgba(232,91,145,.18)}
#cnt{margin:18px 14px 10px;text-align:center;font-weight:800;font-size:15px}#cnt b{font-size:22px}
#g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0 10px 24px}
.c{background:#fff;border-radius:12px;padding:6px;border:1px solid #f0d3e0}.c img{width:100%;border-radius:8px;display:block;cursor:zoom-in}
.c div{font-size:11.5px;margin-top:5px;line-height:1.45;word-break:break-all}.c b{font-size:13px}
.t{display:inline-block;font-size:10px;padding:1px 6px;border-radius:99px;background:#eef0f6;margin-left:3px;font-weight:700}.t.PR{background:#f8d86b}.t.ER{background:#a9e8f8}.t.R{background:#e9f1fb;color:#5b7894}.t.PAR{background:#f5a9c5}
.ty{background:#fff;border:1px solid #d9dde8}
#ov{position:fixed;inset:0;background:rgba(20,22,40,.82);display:flex;align-items:center;justify-content:center;z-index:900;padding:16px;opacity:0;pointer-events:none;transition:opacity .28s ease}#ov.show{opacity:1;pointer-events:auto}#ov img{max-width:100%;max-height:100%;border-radius:12px;transform:scale(.92);transition:transform .28s ease}#ov.show img{transform:scale(1)}
footer{padding:14px;font-size:10.5px;color:#8a90a3;text-align:center;line-height:1.7}
@media(min-width:700px){#g{grid-template-columns:repeat(6,1fr)}}
</style></head><body><h1>カードリスト</h1>
<div class="panel"><div class="fld"><label>フリーワード</label><input id="q" placeholder="カード番号・カード名を入力"></div>
<div class="fld"><label>弾数</label><select id="ed"><option value="">すべて</option><option value="1">第1弾</option></select></div>
<div class="fld"><label>レアリティ</label><select id="rf"><option value="">すべて</option><option value="PR">PR(プレミアムレア)</option><option value="ER">ER(アンコールレア)</option><option value="R">R(レア)</option><option value="N">N(ノーマル)</option><option value="PAR">PR★(パラレル)</option></select></div>
<div class="fld"><label>タイプ</label><select id="tf"><option value="">すべて</option><option value="cute">キュート</option><option value="cool">クール</option><option value="sexy">セクシー</option><option value="pop">ポップ</option></select></div></div>
<div id="cnt"></div><div id="g"></div><div id="ov"></div>
<footer>非公式ファンサイト / 画像等の権利は各権利者に帰属します</footer>
<script>var D=__DATA__,SN={N:'N',R:'R',PR:'PR',ER:'ER',PAR:'PR★'},TN={cute:'キュート',cool:'クール',sexy:'セクシー',pop:'ポップ'};
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
var Q=document.getElementById('q'),RF=document.getElementById('rf'),TF=document.getElementById('tf'),ED=document.getElementById('ed'),G=document.getElementById('g'),CNT=document.getElementById('cnt'),OV=document.getElementById('ov');
function norm(s){return String(s).toLowerCase().replace(/[\\u30a1-\\u30f6]/g,function(c){return String.fromCharCode(c.charCodeAt(0)-0x60)}).replace(/\\s+/g,'')}
function draw(){var q=norm(Q.value),f=RF.value,t=TF.value,L=D.filter(function(c){return(!f||c.r.indexOf(f)>=0)&&(!t||c.t===t)&&(!q||(!isNaN(q)?String(c.id).indexOf(q)===0:norm(c.name).indexOf(q)>=0))});
 CNT.innerHTML='見つかったカード <b>'+L.length+'</b> 枚';
 G.innerHTML=L.map(function(c){return '<div class="c">'+(c.img?'<img loading="lazy" src="'+c.img+'">':'')+'<div><b>'+c.id+'</b>'+c.r.map(function(r){return '<span class="t '+r+'">'+SN[r]+'</span>'}).join('')+(c.t?'<span class="t ty">'+TN[c.t]+'</span>':'')+'<br>'+esc(c.name)+'</div></div>'}).join('')}
Q.oninput=draw;RF.onchange=draw;TF.onchange=draw;ED.onchange=draw;
G.onclick=function(e){var i=e.target;if(i.tagName==='IMG'){OV.innerHTML='<img src="'+i.src+'">';requestAnimationFrame(function(){OV.classList.add('show')})}};
OV.onclick=function(){OV.classList.remove('show')};draw();<\/script><script>${'('+csInstall.toString()+')()'}<\/script></body></html>`.replace('__DATA__',json);
 var w=window.open(URL.createObjectURL(new Blob([page],{type:'text/html'})),'_blank');if(!w)alert('新しいタブを開けませんでした。ポップアップを許可してください。');
}
window.openCardList=openCardList;

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
 var mb=document.createElement('button');mb.id='menuBtn';mb.type='button';mb.innerHTML='<span class="bars"></span><span>MENU</span>';(ti2||document.body).appendChild(mb);
 var mo=document.createElement('div');mo.id='menuOv';
 mo.innerHTML='<button id="menuClose" type="button">×</button><nav><button type="button" data-go="search">配列サーチ</button><button type="button" data-go="db">配列データベース</button><button type="button" data-go="cards">カードリスト</button></nav><div class="menuset">配列の続きボタン<button id="contToggle" type="button" class="mini"></button></div>';
 document.body.appendChild(mo);
 var KC='aikatsu_cont';function contOn(){return get(KC)!=='0'}
 function ct(){var b=$('contToggle');b.textContent=contOn()?'ON':'OFF';b.classList.toggle('on',contOn())}ct();
 $('contToggle').onclick=function(){set(KC,contOn()?'0':'1');ct();vis()};
 mb.onclick=function(){mo.classList.add('show')};$('menuClose').onclick=function(){mo.classList.remove('show')};
 [].forEach.call(mo.querySelectorAll('nav button'),function(b){b.onclick=function(){mo.classList.remove('show');var g=b.dataset.go,dv=$('dbView');
  if(g==='cards')openCardList();
  else if(g==='db'){if(window.dbShow)dbShow(true)}
  else{if(dv&&dv.classList.contains('active')&&window.dbShow)dbShow(false);else backToSearch()}}});
 var bk=document.createElement('button');bk.id='backFloat';bk.type='button';bk.innerHTML='<i class="chev l"></i><span>BACK</span>';document.body.appendChild(bk);
 bk.onclick=function(){var d=$('dbView');if(d&&d.classList.contains('active')&&window.dbShow)window.dbShow(false);else backToSearch()};
 var cw=document.createElement('div');cw.id='contWrap';cw.innerHTML='<button id="contGo" type="button">配列の続きを見る<i class="chev r"></i></button><button id="contX" type="button" title="閉じる">×</button>';document.body.appendChild(cw);
 var dismissed=null;
 $('contGo').onclick=function(){viewArrayDetail(String(currentActiveArray),currentActiveSlotIndex)};
 $('contX').onclick=function(){dismissed=currentActiveArray;vis()};
 function curView(){var d=$('dbView'),a=$('arraysView');return d&&d.classList.contains('active')?'db':(a&&a.classList.contains('active')?'arrays':'search')}
 function vis(){var v=curView();bk.style.display=v==='search'?'none':'flex';
  pt.textContent=v==='db'?'配列データベース':(v==='arrays'?'配列詳細':'配列サーチ');
  cw.style.display=(v==='search'&&contOn()&&currentActiveArray&&dismissed!==currentActiveArray)?'flex':'none'}
 if(window.MutationObserver)new MutationObserver(vis).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});vis();setInterval(vis,700);
 // 更新しても今のページを保つ
 var VK='aikatsu_view_v1';
 function saveView(){try{set(VK,JSON.stringify({v:curView(),no:currentActiveArray||null,idx:currentActiveSlotIndex,y:window.scrollY}))}catch(e){}}
 window.addEventListener('pagehide',function(){persist();saveView()});document.addEventListener('visibilitychange',saveView);setInterval(saveView,2000);
 setTimeout(function(){var s=null;try{s=JSON.parse(get(VK)||'null')}catch(e){}if(!s)return;
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
   if(!was){build();wrap.classList.add('open');requestAnimationFrame(function(){var r=list.getBoundingClientRect(),over=r.bottom-(window.innerHeight-12);if(over>0)window.scrollBy({top:over,behavior:'smooth'})})}};
  sel._cs=label;label()}
 window.enhanceSelects=function(){[].forEach.call(document.querySelectorAll('select'),function(s){if(!s.dataset.cs)enhance(s);else if(s._cs)s._cs()})};
 enhanceSelects();setInterval(enhanceSelects,400);
}
csInstall();

// ===== 更新の確認 =====
(function(){var lg=document.querySelector('.legal');
 if(lg){var p=document.createElement('p');p.textContent='v5.0';lg.appendChild(p)}
 if(!lg||!document.getElementById('resImgBtn')){var b=document.createElement('div');b.style.cssText='background:#c0392b;color:#fff;padding:10px 14px;font-size:13px;text-align:center';b.textContent='index.html が最新ではありません。GitHubで index.html をアップロードし直してください。';document.body.insertBefore(b,document.body.firstChild)}})();
})();
