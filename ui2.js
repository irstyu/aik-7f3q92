// 画面の追加動作(index.html で app.js と db.js のあとに読み込まれます)
(function(){
 // 配列を見ているとき、枠をタップするとそこが現在位置になる
 document.addEventListener('click',function(e){
  var s=e.target.closest&&e.target.closest('#arrayDetail .slot');if(!s)return;
  var idx=parseInt(String(s.id).replace('slot-',''),10);
  if(!isNaN(idx)&&window.markPos)window.markPos(idx);
  try{s.scrollIntoView({behavior:'smooth',block:'center'})}catch(_){}
 });
 // 画像をタップすると拡大(ふわっと表示)
 function lightbox(src){var o=document.createElement('div');o.id='lbx';o.innerHTML='<img src="'+src+'">';o.onclick=function(){o.style.transition='opacity .22s';o.style.opacity='0';setTimeout(function(){o.remove()},220)};document.body.appendChild(o)}
 document.addEventListener('click',function(e){var im=e.target;if(im&&im.tagName==='IMG'&&im.closest&&im.closest('.dbsheet')){e.stopPropagation();lightbox(im.src)}});
 // 配列データのポップアップ: 下からスライドで出て、外をタップまたは閉じるで下に引っ込む
 var rm=Element.prototype.remove;
 Element.prototype.remove=function(){
  if(this.classList&&this.classList.contains('dbsheet')&&!this._closing){
   var el=this;el._closing=true;el.id='';[].forEach.call(el.querySelectorAll('[id]'),function(n){n.removeAttribute('id')});
   el.style.setProperty('animation','sheetDown .28s ease forwards','important');
   var bd=document.getElementById('sheetBack');if(bd)bd.classList.remove('show');
   setTimeout(function(){rm.call(el);var b2=document.getElementById('sheetBack');if(b2&&!document.querySelector('.dbsheet:not([data-x])'))b2.remove()},290);
   return;
  }
  rm.call(this);
 };
 if(window.MutationObserver)new MutationObserver(function(ms){
  ms.forEach(function(m){[].forEach.call(m.addedNodes,function(n){
   if(n.nodeType===1&&n.classList&&n.classList.contains('dbsheet')){
    if(window.enhanceSelects)window.enhanceSelects();
    var bd=document.getElementById('sheetBack');
    if(!bd){bd=document.createElement('div');bd.id='sheetBack';document.body.insertBefore(bd,n);requestAnimationFrame(function(){bd.classList.add('show')})}
    else bd.classList.add('show');
    bd.onclick=function(){[].forEach.call(document.querySelectorAll('.dbsheet'),function(s){s.remove()})};
   }
  })})
 }).observe(document.body,{childList:true});

 // ヘルプ「?」: 丸い?をタップで説明。ほかの場所をタップ/タブ切替で、ふわっと消える
 var HELP={'入力したカード':'・入力したカードが、出た順に並びます\n・右側の表示で、入力中のシリンダー(左／右)が分かります\n・PR★・PR・ER・R・Nのマークは、カードのレアリティです\n・入力したカードの枚数は、マークの下に「○枚入力済み」と表示されます','入力データを保存':'いま入力しているカードの並びを、保存データや配列データに保存します。保存先は下の欄で選べます。','保存データ':'保存した並びの一覧です。「読込」で入力欄に戻し、「追加」で配列データに送れます。','配列候補':'入力した並びに合う配列と、この先の高レア枠を表示します。\n・タップすると、その配列の全カードを見られます。\n・連続一致を最優先で表示します。\n・間に未入力カードがある場合も、順番が合えば候補に残します。\n・複数のカード名がある枠は、1枠のランダム候補として判定します。','マス目の見かた':'1〜100の各マスは、色でその枠の情報の確かさを表します。緑=確定(実際に確かめた)、黄=推定(並びから推測した)、青=不明(登録はしたが確かでない)、白の点線=未登録(まだ何も入れていない)。マスの上のPR・ER・PR★はレアリティです。','入力欄':'カードの取り出し口の左側から出たカードは「左シリンダー」、右側から出たカードは「右シリンダー」のタブで、出た順に1枚ずつ入力します。'};
 var ARR_HELP='No.1〜12はそれぞれ独立した100枠の配列です。枠内に複数の名前がある場合は、その中からランダムに1枚排出されます。';
 function helpText(t){return HELP[t]||(/^第\d+弾$/.test(t)?ARR_HELP:'')}
 var curQ=null,helpPop=null;
 function closeHelp(){var p=helpPop;if(!p)return;helpPop=null;curQ=null;p.classList.add('out');setTimeout(function(){if(p.parentNode)p.parentNode.removeChild(p)},190)}
 function openHelp(q){var w=q.parentNode,d=document.createElement('div');d.className='helppop';d.textContent=helpText(q.dataset.t);d.style.setProperty('--ax',(q.offsetLeft+7)+'px');w.appendChild(d);helpPop=d;curQ=q}
 function addHelps(){[].forEach.call(document.querySelectorAll('.resulttitle h2,#arrayGrid .arrayhead h2'),function(h){var t=h.textContent.trim();if(!helpText(t)||h.dataset.q)return;h.dataset.q='1';
  var w=document.createElement('span');w.className='hwrap';h.parentNode.insertBefore(w,h);w.appendChild(h);
  var b=document.createElement('button');b.type='button';b.className='helpq';b.textContent='?';b.dataset.t=t;b.setAttribute('aria-label',t+'の説明');w.appendChild(b)})}
 addHelps();
 var sbx=document.querySelector('.searchbox'),ab=sbx&&sbx.querySelector('.addbtn');
 if(sbx&&ab){var qb=document.createElement('button');qb.type='button';qb.className='helpq';qb.textContent='?';qb.dataset.t='入力欄';qb.setAttribute('aria-label','入力のしかた');var ht=document.querySelector('.hint');if(ht&&ht.parentNode){var row=document.createElement('div');row.className='hwrap hintrow';ht.parentNode.insertBefore(row,ht);row.appendChild(qb);row.appendChild(ht)}else sbx.insertBefore(qb,ab)}
 var ag=document.getElementById('arrayGrid');if(ag&&window.MutationObserver)new MutationObserver(addHelps).observe(ag,{childList:true});
 document.addEventListener('click',function(e){var t=e.target;if(t.closest&&t.closest('.helppop'))return;var q=t.closest&&t.closest('.helpq'),same=q&&q===curQ;closeHelp();if(q&&!same)openHelp(q)});
 document.addEventListener('visibilitychange',closeHelp);window.addEventListener('hashchange',closeHelp);
 if(window.MutationObserver)[].forEach.call(document.querySelectorAll('.view'),function(v){new MutationObserver(closeHelp).observe(v,{attributes:true,attributeFilter:['class']})});

 // 全体ルール: 要素が唐突に出る・消えるのを防ぐ。出るときは ふわっと、消えるときは同じ動きで ふわっと戻る(表示/非表示を style.display で切り替えている要素が対象)
 function smooth(el){
  if(!el||el._sm)return;el._sm=1;
  var cd=getComputedStyle(el).display;if(cd==='none')cd=null;
  el._lastOut=0;
  if(el.id==='contWrap')new MutationObserver(function(){if(el.classList.contains('out'))el._lastOut=Date.now()}).observe(el,{attributes:true,attributeFilter:['class']});
  new MutationObserver(function(){
   if(el._busy)return;
   var now=el.style.display;
   if(now==='none'){
    if(!cd||Date.now()-el._lastOut<700){return}
    el._busy=true;el.style.display=cd;el.classList.add('fx-out');
    setTimeout(function(){el.classList.remove('fx-out');el.style.display='none';cd=null;el._busy=false},230);
   }else{var c=getComputedStyle(el).display;if(c!=='none')cd=c}
  }).observe(el,{attributes:true,attributeFilter:['style']});
 }
 ['topFloat','backFloat','arrayFabContainer','contTab','contWrap','entryBox','manualBox'].forEach(function(id){smooth(document.getElementById(id))});
 smooth(document.querySelector('.searchbox'));
 // 候補のサジェスト一覧: 消えるときも内容を残したまま ふわっと消す
 var sg=document.getElementById('suggestions');
 if(sg&&window.MutationObserver){var last='';
  new MutationObserver(function(){
   if(sg._ghost){if(sg.classList.contains('show')){sg._ghost=false;sg.classList.remove('ghost')}return}
   if(sg.innerHTML.trim()){last=sg.innerHTML;return}
   if(last){sg._ghost=true;sg.innerHTML=last;sg.classList.add('ghost');
    setTimeout(function(){if(sg._ghost&&!sg.classList.contains('show')){sg.innerHTML='';sg.classList.remove('ghost');sg._ghost=false;last=''}},230)}
  }).observe(sg,{childList:true,attributes:true,attributeFilter:['class']});
 }
})();
