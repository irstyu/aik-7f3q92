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
 'function rng(a){a=a.filter(function(x,i,s){return s.indexOf(x)===i}).sort(function(p,q){return p-q});var o=[],i=0;while(i<a.length){var j=i;while(j+1<a.length&&a[j+1]===a[j]+1)j++;o.push(j-i>=2?a[i]+"-"+a[j]:(j>i?a[i]+", "+a[j]:""+a[i]));i=j+1}return o.join(", ")}'+
 'function esc(s){return String(s).replace(/[&<>"]/g,function(m){return{"&":"&amp;","<":"&lt;",">":"&gt;","\\"":"&quot;"}[m]})}'+
 'function draw(){var q=document.getElementById("q").value.trim().toLowerCase(),f=document.getElementById("rf").value;var L=D.filter(function(c){return(!f||c.r.indexOf(f)>=0)&&(!q||(!isNaN(q)?String(c.id).indexOf(q)===0:c.name.toLowerCase().indexOf(q)>=0))});'+
 'document.getElementById("cnt").textContent=L.length+"種類"+(q&&!isNaN(q)?"　該当番号："+rng(L.map(function(c){return c.id})):"");document.getElementById("g").innerHTML=L.map(function(c){return"<div class=c>"+(c.img?"<img loading=lazy src=\\""+c.img+"\\">":"")+"<div><b>No."+c.id+"</b> "+c.r.map(function(r){return"<span class=\\"t "+r+"\\">"+FN[r]+"</span>"}).join("")+"<br>"+esc(c.name)+"</div></div>"}).join("")}'+
 '["q","rf"].forEach(function(i){document.getElementById(i).oninput=draw});draw();<\/script></body></html>';
 var w=window.open(URL.createObjectURL(new Blob([html],{type:'text/html'})),'_blank');if(!w)alert('新しいタブを開けませんでした。ポップアップを許可してください。');
}
(function(){
 var bs=document.querySelectorAll('.view-options .badge'),bd=null;for(var i=0;i<bs.length;i++)if(bs[i].textContent.indexOf('100枠固定')>=0)bd=bs[i];
 var b=document.createElement('button');b.type='button';b.textContent='収録カード一覧';b.onclick=openCardList;
 b.style.cssText='padding:6px 12px;font-size:13px;border-radius:99px;border:1px solid #d9dde8;background:#fff;color:#20243a';
 if(bd)bd.parentNode.replaceChild(b,bd);else{var vo=document.querySelector('.view-options');if(vo)vo.appendChild(b)}
 // タイトルと、タップで最新版に更新
 document.title='アイカツ！アンコール 配列サーチ・データ収集';
 var br=document.querySelector('.brand');if(br){var sm=br.querySelector('small');if(sm)sm.textContent='配列サーチ・カード配列データ収集';br.style.cursor='pointer';
  br.onclick=function(){if(!confirm('最新版に更新しますか？（入力中の内容は残ります）'))return;
   var fs=['index.html','db.js','app.js','gate.js','config.js','sw.js'].map(function(f){return fetch(f,{cache:'reload'}).catch(function(){})}),p=[];
   Promise.all(fs).then(function(){if(window.caches)p.push(caches.keys().then(function(k){return Promise.all(k.map(function(x){return caches.delete(x)}))}));
    if(navigator.serviceWorker)p.push(navigator.serviceWorker.getRegistrations().then(function(r){return Promise.all(r.map(function(x){return x.unregister()}))}));
    return Promise.all(p)}).catch(function(){}).then(function(){location.reload()})}}
 // 番号は頭の数字が当てはまるものを表示
 var sc=window.searchCards;if(sc)window.searchCards=function(q){var s=String(q).trim();if(s&&!isNaN(s)){return cards.filter(function(c){return String(c.id).indexOf(s)===0}).slice(0,40)}return sc.apply(this,arguments)};
})();

// ===== 弾の選択（第2弾も選べる）／保存先の選択とデータ収集への送信 =====
(function(){var sel=document.getElementById('editionSelect');
 if(sel&&sel.options[1]){sel.options[1].disabled=false;sel.options[1].textContent='第2弾'}
 var act=document.querySelector('.view-header-actions');if(!act||!window.saveCurrentHistory)return;
 var box=document.createElement('div');box.style.cssText='margin-top:14px;padding:12px;border:1px solid #e6e9f1;border-radius:12px;background:#fff';
 box.innerHTML='<div style="font-size:13px;color:#70778c;margin-bottom:6px">保存先</div><select id="saveDest" style="width:100%;font-size:16px;padding:11px;border-radius:10px;border:1px solid #d9dde8"><option value="saved">保存済みデータのみ（あとで呼び出す）</option><option value="db">データ収集のみ（データベースへ送信）</option><option value="both">両方に登録</option></select><div id="stockInfo" style="font-size:13px;color:#70778c;margin-top:8px"></div><div id="edNote" style="font-size:13px;color:#c0392b;margin-top:6px"></div>';
 act.parentNode.insertBefore(box,act);
 var btn=act.querySelector('button');if(btn)btn.textContent='保存・送信する';
 function info(){var e=sel?sel.value:'1',t=document.getElementById('stockInfo');
  if(window.dbIsLocked&&dbIsLocked(e)){t.textContent='第1弾は確定済みのため、データ収集には送信されません。';return}
  var n=window.dbStockCount?dbStockCount(e):null;t.textContent=n?'データ収集ストック：右 '+n.right+'件／左 '+n.left+'件（推定として内部に保存）':''}
 function edChange(){var e=sel?sel.value:'1';document.getElementById('saveDest').value=e==='1'?'saved':'db';
  document.getElementById('edNote').textContent=e==='1'?'':'第'+e+'弾のカードデータはまだ登録されていません。入力できるカードは現在、第1弾のものです。';info()}
 if(sel)sel.addEventListener('change',edChange);edChange();
 var orig=window.saveCurrentHistory;
 window.saveCurrentHistory=function(){var e=sel?sel.value:'1',dest=document.getElementById('saveDest').value,hs=histories[currentSide];
  if(!hs.length){alert('保存するカードが入力されていません。');return}
  if(dest!=='saved'){
   if(window.dbIsLocked&&dbIsLocked(e)){alert('第1弾は確定済みのため、データ収集には送信しません。「保存済みデータのみ」を選んでください。');return}
   var r=window.sendToDbStock?sendToDbStock(currentSide,hs,e):'';
   alert(r==='dup'?'同じ内容がすでにデータ収集に送信されています。':'データ収集に送信しました（推定として保存）。');info()}
  if(dest!=='db')orig.apply(this,arguments)};
})();
})();
