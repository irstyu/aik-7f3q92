// 入力セッション(店名+号機ごとに入力を分ける) / パラレル早見の初期表示
// 一覧は端末(localStorage)に保存。今のタブがどのセッションかは、タブごと(sessionStorage)に持つ。
(function(){
 var SK='aikatsu_sessions_v1',TK='aikatsu_tab_sid',OLD='aikatsu_input_v1';
 var $=function(i){return document.getElementById(i)};
 function esc(s){return String(s).replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]})}
 function clone(x){return JSON.parse(JSON.stringify(x||[]))}
 function loadS(){try{var d=JSON.parse(localStorage.getItem(SK));if(d&&d.list)return d}catch(e){}return{list:[],shops:[]}}
 var S=loadS(),cur=null;
 function saveS(){try{localStorage.setItem(SK,JSON.stringify(S))}catch(e){}}
 function mk(shop,unit){return{id:'s'+Date.now().toString(36)+Math.random().toString(36).slice(2,6),shop:shop||'',unit:unit||'',left:[],right:[],side:'right',created:Date.now(),updated:Date.now()}}
 function unitLabel(u){u=String(u||'').trim();return /^\d+$/.test(u)?u+'号機':u}
 function label(s){return(s.shop||'名前なし')+(s.unit?' '+unitLabel(s.unit):'')}
 function hue(t){var h=0;for(var i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))%360;return h}
 function color(s){return'hsl('+hue((s.shop||'')+'|'+(s.unit||''))+',68%,56%)'}
 function find(id){for(var i=0;i<S.list.length;i++)if(S.list[i].id===id)return S.list[i];return null}
 window.curSessLabel=function(){return cur?label(cur):''};
 // 以前の入力途中(端末共通の保存)は、初回だけ「名前なし」のセッションに引き継ぐ
 (function(){if(S.list.length)return;try{var o=JSON.parse(localStorage.getItem(OLD));if(o&&((o.left&&o.left.length)||(o.right&&o.right.length))){var s=mk('','');s.left=o.left||[];s.right=o.right||[];s.side=o.side==='left'?'left':'right';S.list.push(s);saveS()}}catch(e){}})();
 function when(t){var d=new Date(t),z=function(n){return n<10?'0'+n:n};return(d.getMonth()+1)+'/'+d.getDate()+' '+z(d.getHours())+':'+z(d.getMinutes())}
 function counts(s){return'左'+(s.left||[]).length+'枚・右'+(s.right||[]).length+'枚'}
 // ---- 上部のラベル ----
 function updateBar(){var b=$('sessBar');if(!b)return;
  if(!cur){b.innerHTML='';return}
  b.innerHTML='<span class="schip" style="background:'+color(cur)+'"></span><div class="stext"><b>'+esc(label(cur))+'</b><small>'+counts({left:histories.left,right:histories.right})+'</small></div><button type="button" class="ghost" id="sessSwitch">切り替え</button>';
  $('sessSwitch').onclick=function(){openChooser()}}
 function sync(){if(!cur)return;cur.left=clone(histories.left);cur.right=clone(histories.right);cur.side=currentSide;cur.updated=Date.now();saveS();updateBar()}
 function enter(s){cur=s;try{sessionStorage.setItem(TK,s.id)}catch(e){}
  histories.left.splice.apply(histories.left,[0,histories.left.length].concat(clone(s.left)));
  histories.right.splice.apply(histories.right,[0,histories.right.length].concat(clone(s.right)));
  switchSide(s.side==='left'?'left':'right');updateBar()}
 // ---- 選択画面 ----
 var ov=null;
 function closeChooser(){if(!ov)return;var o=ov;ov=null;o.classList.add('out');setTimeout(function(){o.remove()},220)}
 function openChooser(){
  if(ov)return;
  var list=S.list.slice().sort(function(a,b){return b.updated-a.updated});
  ov=document.createElement('div');ov.id='sessOv';
  var items=list.map(function(s){return'<div class="sitem'+(cur&&cur.id===s.id?' on':'')+'" data-id="'+s.id+'"><span class="schip" style="background:'+color(s)+'"></span><div class="stext"><b>'+esc(label(s))+'</b><small>'+counts(s)+' / '+when(s.updated)+'</small></div><button type="button" class="sdel" data-del="'+s.id+'" title="削除">×</button></div>'}).join('');
  ov.innerHTML='<div class="spanel"><h3>どの筐体を入力しますか?</h3>'+(items?'<div class="slist">'+items+'</div>':'<p class="snote">まだ入力の記録がありません。下の欄から新しく始めてください。</p>')+
   '<div class="snew"><b>新しく始める</b><label>店名</label><input id="sessShop" list="sessShops" placeholder="例: 下田モーリー" autocomplete="off"><datalist id="sessShops">'+(S.shops||[]).map(function(n){return'<option value="'+esc(n)+'">'}).join('')+'</datalist><label>号機</label><input id="sessUnit" placeholder="例: 2" autocomplete="off"><div class="srow"><button type="button" class="addbtn" id="sessMake">この筐体で始める</button></div></div>'+
   (cur?'<div class="srow"><button type="button" class="ghost" id="sessClose">閉じる</button></div>':'')+'</div>';
  document.body.appendChild(ov);
  ov.onclick=function(e){var d=e.target.closest('[data-del]');
   if(d){e.stopPropagation();var id=d.dataset.del,s=find(id);if(!s||!confirm('「'+label(s)+'」の入力記録を削除しますか?(元に戻せません)'))return;
    S.list=S.list.filter(function(x){return x.id!==id});saveS();if(cur&&cur.id===id){cur=null;try{sessionStorage.removeItem(TK)}catch(_){}histories.left.length=0;histories.right.length=0;render();updateBar()}
    var o=ov;ov=null;o.remove();openChooser();return}
   var it=e.target.closest('.sitem');if(it){var s2=find(it.dataset.id);if(s2){if(cur)sync();enter(s2);closeChooser()}}};
  $('sessMake').onclick=function(){var shop=$('sessShop').value.trim(),unit=$('sessUnit').value.trim();
   var s=mk(shop,unit);if(shop){S.shops=[shop].concat((S.shops||[]).filter(function(n){return n!==shop})).slice(0,15)}
   if(cur)sync();S.list.push(s);saveS();enter(s);closeChooser()};
  if($('sessClose'))$('sessClose').onclick=closeChooser}
 // ---- 初期化 ----
 var r0=window.render;window.render=function(){var v=r0.apply(this,arguments);try{sync()}catch(e){}return v};
 var sid=null;try{sid=sessionStorage.getItem(TK)}catch(e){}
 var s0=sid?find(sid):null;
 if(s0){cur=s0;updateBar()}else{openChooser()}
 try{if(window.parQuick)parQuick()}catch(e){}
})();
