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
window.addEventListener('pagehide',persist);

// ===== 見た目の追加設定 =====
var st=document.createElement('style');st.textContent=
'.chev{display:inline-block;width:8px;height:8px;border-top:2px solid currentColor;border-right:2px solid currentColor}.chev.l{transform:rotate(-135deg);margin-left:3px}.chev.r{transform:rotate(45deg);margin-right:3px}.chev.u{transform:rotate(-45deg);margin-top:4px}'+
'#backFloat{position:fixed;left:14px;bottom:calc(16px + env(safe-area-inset-bottom));width:70px;height:70px;border-radius:50%;background:#e85b91;color:#fff;border:0;box-shadow:0 6px 16px rgba(232,91,145,.45);z-index:150;display:none;align-items:center;justify-content:center;gap:2px;font-weight:800;font-size:12px;letter-spacing:.03em;padding:0}#backFloat .chev{width:9px;height:9px;margin-left:4px}'+
'.mini{padding:6px 12px;font-size:13px;border:1px solid #d9dde8;background:#fff;border-radius:12px;color:#20243a;font-weight:700}.mini.on{background:#e85b91;border-color:#e85b91;color:#fff}'+
'body.hide-sug-img .sugimg{display:none}.sugimg{width:34px;height:auto;border-radius:5px;margin-right:8px;vertical-align:middle}'+
'#manualBox{background:#fff;border:1px solid #e6e9f1;border-radius:14px;padding:10px;margin-bottom:10px}#manualBox .mrow{display:flex;gap:8px;margin-top:8px}#manualBox input,#manualBox select{flex:1;min-width:0;font-size:16px;padding:11px;border:1px solid #d9dde8;border-radius:10px;background:#fff}';
document.head.appendChild(st);

// ===== 検索: 番号は頭の数字で絞り込み、未確定の弾は番号のみ =====
var sc=window.searchCards;if(sc)window.searchCards=function(q){var s=String(q).trim(),se=$('editionSelect'),e=se?se.value:'1',open=window.dbIsLocked?!dbIsLocked(e):false;
 if(open){return(s&&/^\d+$/.test(s))?[{id:parseInt(s,10),name:'',rarity:'',star:false}]:[]}
 if(s&&!isNaN(s)){return cards.filter(function(c){return String(c.id).indexOf(s)===0}).slice(0,40)}return sc.apply(this,arguments)};

// ===== タイトル: タップで最新版に更新 =====
(function(){var sm=document.querySelector('header .mark'),br=sm&&sm.parentNode;if(!br)return;
 var sml=br.querySelector('small');if(sml)sml.textContent='配列サーチ・カード配列データ収集';
 br.style.cursor='pointer';br.title='タップで最新版に更新';
 br.onclick=function(){if(!confirm('最新版に更新しますか?(入力中の内容やデータベースは消えません)'))return;
  (async function(){try{var rs=await navigator.serviceWorker.getRegistrations();for(var i=0;i<rs.length;i++)await rs[i].unregister();var ks=await caches.keys();for(var j=0;j<ks.length;j++)await caches.delete(ks[j])}catch(e){}location.reload()})()}})();

// ===== 収録カード一覧(新しいタブ) =====
function openCardList(){
 var rm={},seen={};
 Object.keys(arrays).forEach(function(n){arrays[n].forEach(function(sl){sl.options.forEach(function(o){var k=o.id+'|'+o.name+'|'+(o.star?1:0);if(!seen[k])seen[k]={id:o.id,name:o.name,star:!!o.star};(rm[k]=rm[k]||{})[sl.rarity]=1})})});
 var D=Object.keys(seen).map(function(k){var c=seen[k];c.r=c.star?['PAR']:Object.keys(rm[k]);var ip=getCardImagePath(c.id,c.star);c.img=ip?new URL(ip,location.href).href:'';return c}).sort(function(a,b){return a.id-b.id||a.star-b.star});
 var json=JSON.stringify(D).replace(/</g,'\\u003c');
 var page=`<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>収録カード一覧</title><style>
body{margin:0;background:#f5f7fb;color:#20243a;font-family:system-ui,-apple-system,"Noto Sans JP",sans-serif}
header{position:sticky;top:0;background:#fff;padding:12px;border-bottom:1px solid #e6e9f1;z-index:5}
h1{font-size:19px;margin:0 0 10px;color:#e85b91;letter-spacing:.03em}
.row{display:flex;gap:6px}.row>*{flex:1;min-width:0;font-size:16px;padding:10px;border:1px solid #d9dde8;border-radius:12px;background:#fff;color:#20243a}.row>*:focus{outline:0;border-color:#e85b91}
#cnt{padding:10px 14px;font-size:14px;font-weight:700;color:#e85b91}
#g{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;padding:0 10px 24px}
.c{background:#fff;border-radius:12px;padding:6px;border:1px solid #e6e9f1}.c img{width:100%;border-radius:8px;display:block;cursor:zoom-in}
.c div{font-size:11.5px;margin-top:5px;line-height:1.4;word-break:break-all}.c b{font-size:13px;color:#e85b91}
.t{display:inline-block;font-size:10px;padding:1px 6px;border-radius:99px;background:#eef0f6;margin-left:3px;font-weight:700}.t.PR{background:#f8d86b}.t.ER{background:#a9e8f8}.t.PAR{background:#f5a9c5}
#ov{position:fixed;inset:0;background:rgba(20,22,40,.82);display:none;align-items:center;justify-content:center;z-index:50;padding:16px}#ov img{max-width:100%;max-height:100%;border-radius:12px}
footer{padding:14px;font-size:10.5px;color:#8a90a3;text-align:center;line-height:1.7}
@media(min-width:700px){#g{grid-template-columns:repeat(6,1fr)}}
</style></head><body><header><h1>収録カード一覧</h1><div class="row"><select id="ed"><option>第1弾</option></select><select id="rf"><option value="">すべてのレアリティ</option><option value="N">N(ノーマル)</option><option value="PR">PR(プレミアムレア)</option><option value="ER">ER(アンコールレア)</option><option value="PAR">PR★(パラレル)</option></select></div>
<div class="row" style="margin-top:6px"><input id="q" placeholder="番号・カード名で絞り込み"></div></header><div id="cnt"></div><div id="g"></div><div id="ov"></div>
<footer>非公式ファンサイト / 画像等の権利は各権利者に帰属します</footer>
<script>var D=__DATA__,SN={N:'N',PR:'PR',ER:'ER',PAR:'PR★'};
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
var Q=document.getElementById('q'),RF=document.getElementById('rf'),G=document.getElementById('g'),CNT=document.getElementById('cnt'),OV=document.getElementById('ov');
function draw(){var q=Q.value.trim().toLowerCase(),f=RF.value,L=D.filter(function(c){return(!f||c.r.indexOf(f)>=0)&&(!q||(!isNaN(q)?String(c.id).indexOf(q)===0:c.name.toLowerCase().indexOf(q)>=0))});
 CNT.textContent=L.length+'種類';
 G.innerHTML=L.map(function(c){return '<div class="c">'+(c.img?'<img loading="lazy" src="'+c.img+'">':'')+'<div><b>'+c.id+'</b>'+c.r.map(function(r){return '<span class="t '+r+'">'+SN[r]+'</span>'}).join('')+'<br>'+esc(c.name)+'</div></div>'}).join('')}
Q.oninput=draw;RF.onchange=draw;
G.onclick=function(e){var i=e.target;if(i.tagName==='IMG'){OV.innerHTML='<img src="'+i.src+'">';OV.style.display='flex'}};
OV.onclick=function(){OV.style.display='none'};draw();<\/script></body></html>`.replace('__DATA__',json);
 var w=window.open(URL.createObjectURL(new Blob([page],{type:'text/html'})),'_blank');if(!w)alert('新しいタブを開けませんでした。ポップアップを許可してください。');
}
(function(){var cb=$('showImageToggle'),host=cb&&(cb.closest('label')||cb.parentNode);if(!host||!host.parentNode)return;
 var b=document.createElement('button');b.type='button';b.className='mini';b.textContent='収録カード一覧';b.onclick=openCardList;
 var bd=host.parentNode.querySelector('.badge');if(bd)bd.parentNode.replaceChild(b,bd);else host.parentNode.appendChild(b)})();

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

// ===== BACK ボタン(最初の画面以外で表示) =====
(function(){var bk=document.createElement('button');bk.id='backFloat';bk.type='button';bk.innerHTML='<i class="chev l"></i><span>BACK</span>';document.body.appendChild(bk);
 function vis(){var d=$('dbView'),a=$('arraysView'),on=(d&&d.classList.contains('active'))||(a&&a.classList.contains('active'));bk.style.display=on?'flex':'none'}
 if(window.MutationObserver)new MutationObserver(vis).observe(document.body,{subtree:true,attributes:true,attributeFilter:['class']});vis();
 bk.onclick=function(){var d=$('dbView');if(d&&d.classList.contains('active')&&window.dbShow)window.dbShow(false);else backToSearch()}})();

// ===== 確定していない弾の入力方法 =====
(function(){var sx=document.querySelector('.searchbox'),sg=$('suggestions');if(!sx||!sx.parentNode)return;
 var hint=document.createElement('div');hint.className='hint';
 var ex=(typeof cards!=='undefined'?cards.filter(function(c){return c.id===24})[0]:null);hint.textContent='例: 24  '+(ex?ex.name:'');
 sx.parentNode.insertBefore(hint,sx.nextSibling);
 var box=document.createElement('div');box.id='entryBox';box.style.display='none';
 box.innerHTML='<label class="fl">入力方法を選択</label><select id="entryMode"><option value="num">カード番号のみ(カード名・レアリティはカードデータ追加後参照)</option><option value="manual">カード番号・カード名・レアリティを手入力</option></select>'+
 '<div id="manualBox" style="display:none"><div class="mrow"><input id="ma1" inputmode="numeric" placeholder="カード番号"><input id="ma2" placeholder="カード名(不明なら空欄)"></div><div class="mrow"><select id="ma3"><option value="N">N(ノーマル)</option><option value="PR">PR(プレミアムレア)</option><option value="ER">ER(アンコールレア)</option><option value="PAR">PR★(パラレル)</option></select><button type="button" id="maAdd" class="addbtn">追加</button></div></div>';
 sx.parentNode.insertBefore(box,sx);
 function sync(){var se=$('editionSelect'),e=se?se.value:'1',open=window.dbIsLocked?!dbIsLocked(e):false,man=open&&$('entryMode').value==='manual';
  box.style.display=open?'block':'none';$('manualBox').style.display=man?'block':'none';sx.style.display=man?'none':'';hint.style.display=open?'none':'';if(man&&sg)sg.classList.remove('show')}
 $('entryMode').addEventListener('change',sync);
 $('maAdd').onclick=function(){var n=parseInt($('ma1').value,10);if(!(n>0)){alert('カード番号を入力してください。');return}
  histories[currentSide].push({id:n,name:$('ma2').value.trim(),rarity:$('ma3').value});$('ma1').value='';$('ma2').value='';render()};
 var se=$('editionSelect');if(se)se.addEventListener('change',sync);setTimeout(sync,0)})();

// ===== すべての選択欄を「下に一覧が開く」方式に統一 =====
(function(){
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
  btn.onclick=function(e){e.stopPropagation();var was=wrap.classList.contains('open');closeAll();if(!was){build();wrap.classList.add('open')}};
  sel._cs=label;label()}
 window.enhanceSelects=function(){[].forEach.call(document.querySelectorAll('select'),function(s){if(!s.dataset.cs)enhance(s);else if(s._cs)s._cs()})};
 enhanceSelects();setInterval(enhanceSelects,400);
})();

// ===== 更新の確認 =====
(function(){var lg=document.querySelector('.legal');
 if(lg){var p=document.createElement('p');p.textContent='v4.1';lg.appendChild(p)}
 if(!lg||!document.getElementById('resImgBtn')){var b=document.createElement('div');b.style.cssText='background:#c0392b;color:#fff;padding:10px 14px;font-size:13px;text-align:center';b.textContent='index.html が最新ではありません。GitHubで index.html をアップロードし直してください。';document.body.insertBefore(b,document.body.firstChild)}})();
})();
