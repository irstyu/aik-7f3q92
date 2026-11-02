// 入力内容の自動保存、矢印移動後の現在地引き継ぎ（index.html の後に読み込まれます）
(function(){
var KEY='aikatsu_input_v1',adv={sig:'',map:{}};
function sig(){return['left','right'].map(function(s){return histories[s].map(function(c){return c.id+':'+c.name}).join(',')}).join('|')}
window.advOf=function(no){return(adv.sig===sig()&&adv.map[no]!==undefined)?adv.map[no]:null};
function persist(){try{localStorage.setItem(KEY,JSON.stringify({left:histories.left,right:histories.right,side:currentSide,adv:adv}))}catch(e){}}
// 復元
try{var s=JSON.parse(localStorage.getItem(KEY));if(s){
 histories.left.splice(0,histories.left.length,...(s.left||[]));histories.right.splice(0,histories.right.length,...(s.right||[]));
 if(s.adv&&s.adv.map)adv=s.adv;
 switchSide(s.side==='left'?'left':'right')}}catch(e){}
// 入力が変わるたびに保存
var r=window.render;window.render=function(){var v=r.apply(this,arguments);persist();return v};
// 矢印で動かした位置を記録
['goNextCard','goPrevCard'].forEach(function(n){var f=window[n];window[n]=function(){var v=f.apply(this,arguments);
 if(currentActiveArray){if(adv.sig!==sig()){adv={sig:sig(),map:{}}}adv.map[currentActiveArray]=currentActiveSlotIndex;persist()}return v}});
// 現在地ボタンで戻ったときも、矢印で動かした位置を現在地として扱う
window.addEventListener('pagehide',persist);

// ===== 収録カード一覧（新しいタブ） =====
function openCardList(){
 var rm={},seen={};
 Object.keys(arrays).forEach(function(n){arrays[n].forEach(function(sl){sl.options.forEach(function(o){var k=o.id+'|'+o.name+'|'+(o.star?1:0);if(!seen[k])seen[k]={id:o.id,name:o.name,star:!!o.star};(rm[k]=rm[k]||{})[sl.rarity]=1})})});
 var D=Object.keys(seen).map(function(k){var c=seen[k];c.r=c.star?['PAR']:Object.keys(rm[k]);c.img=getCardImagePath(c.id,c.star)||'';return c}).sort(function(a,b){return a.id-b.id||a.star-b.star});
 var json=JSON.stringify(D).replace(/</g,'\\u003c');
 var html='<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>収録カード一覧</title><style>'+
 'body{margin:0;background:#f5f7fb;color:#20243a;font-family:system-ui,-apple-system,"Noto Sans JP",sans-serif}header{position:sticky;top:0;background:#fff;padding:12px;border-bottom:1px solid #e6e9f1;z-index:5}h1{font-size:18px;margin:0 0 8px}'+
 '.row{display:flex;gap:6px}.row>*{flex:1;min-width:0;font-size:16px;padding:10px;border:1px solid #d9dde8;border-radius:10px;background:#fff}#cnt{padding:8px 12px;font-size:13px;color:#70778c}'+
 '#g{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;padding:0 12px 24px}.c{background:#fff;border-radius:12px;padding:8px;border:1px solid #e6e9f1}.c img{width:100%;border-radius:8px;display:block}.c b{font-size:15px}.c div{font-size:13px;margin-top:4px;line-height:1.4}'+
 '.t{display:inline-block;font-size:11px;padding:2px 7px;border-radius:99px;background:#eef0f6;margin-right:4px}.t.PR{background:#f8d86b}.t.ER{background:#a9e8f8}.t.PAR{background:#f5a9c5}@media(min-width:700px){#g{grid-template-columns:repeat(5,1fr)}}'+
 '</style></head><body><header><h1>収録カード一覧</h1><div class="row"><select id="ed"><option>第1弾</option></select><select id="rf"><option value="">すべてのレアリティ</option><option value="N">N（ノーマル）</option><option value="PR">PR（プレミアムレア）</option><option value="ER">ER（アンコールレア）</option><option value="PAR">PAR（パラレル）</option></select></div>'+
 '<div class="row" style="margin-top:6px"><input id="q" placeholder="番号またはカード名で絞り込み"></div></header><div id="cnt"></div><div id="g"></div>'+
 '<script>var D='+json+',RN={N:"N",PR:"PR",ER:"ER",PAR:"PAR"},FN={N:"ノーマル",PR:"プレミアムレア",ER:"アンコールレア",PAR:"パラレル"};'+
 'function esc(s){return String(s).replace(/[&<>"]/g,function(m){return{"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[m]})}'+
 'function draw(){var q=document.getElementById("q").value.trim().toLowerCase(),f=document.getElementById("rf").value;var L=D.filter(function(c){return(!f||c.r.indexOf(f)>=0)&&(!q||String(c.id)===q||c.name.toLowerCase().indexOf(q)>=0)});'+
 'document.getElementById("cnt").textContent=L.length+"種類";document.getElementById("g").innerHTML=L.map(function(c){return"<div class=c>"+(c.img?"<img loading=lazy src=\\""+c.img+"\\">":"")+"<div><b>No."+c.id+"</b> "+c.r.map(function(r){return"<span class=\\"t "+r+"\\">"+FN[r]+"</span>"}).join("")+"<br>"+esc(c.name)+"</div></div>"}).join("")}'+
 '["q","rf"].forEach(function(i){document.getElementById(i).oninput=draw});draw();<\/script></body></html>';
 var w=window.open(URL.createObjectURL(new Blob([html],{type:'text/html'})),'_blank');if(!w)alert('新しいタブを開けませんでした。ポップアップを許可してください。');
}
(function(){var lb=document.getElementById('showImageToggle'),host=lb&&(lb.closest('label')||lb.parentNode);if(!host||!host.parentNode)return;
 var b=document.createElement('button');b.type='button';b.textContent='収録カード一覧';b.onclick=openCardList;
 b.style.cssText='margin:8px 0 0 10px;padding:8px 12px;font-size:13px;border-radius:10px;border:1px solid #d9dde8;background:#fff;color:#20243a';host.parentNode.insertBefore(b,host.nextSibling)})();
})();
