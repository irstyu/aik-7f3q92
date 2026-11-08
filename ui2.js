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
 // 配列データベースのポップアップ: 下からスライドで出て、外をタップまたは閉じるで下に引っ込む
 var rm=Element.prototype.remove;
 Element.prototype.remove=function(){
  if(this.classList&&this.classList.contains('dbsheet')&&!this._closing){
   var el=this;el._closing=true;el.id='';[].forEach.call(el.querySelectorAll('[id]'),function(n){n.removeAttribute('id')});
   el.style.animation='sheetDown .28s ease forwards';
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

 // ヘルプ「?」: 中見出しの横に丸い?を付け、タップで説明。ほかの場所をタップ/タブ切替で消える
 var HELP={'入力データを保存':'いま入力しているカードの並びを、保存データやデータベースに保存します。保存先は下の欄で選べます。','保存データ':'保存した並びの一覧です。「読込」で入力欄に戻し、「追加」でデータベースに送れます。','配列候補':'入力した並びに合う配列と、この先の高レア枠を表示します。タップすると、その配列の全カードを見られます。'};
 var curQ=null,helpPop=null;
 function closeHelp(){if(helpPop){helpPop.parentNode&&helpPop.parentNode.removeChild(helpPop);helpPop=null;curQ=null}}
 function openHelp(q){var w=q.parentNode,d=document.createElement('div');d.className='helppop';d.textContent=HELP[q.dataset.t]||'';d.style.setProperty('--ax',(q.offsetLeft+7)+'px');w.appendChild(d);helpPop=d;curQ=q}
 [].forEach.call(document.querySelectorAll('.resulttitle h2'),function(h){var t=h.textContent.trim();if(!HELP[t]||h.dataset.q)return;h.dataset.q='1';
  var w=document.createElement('span');w.className='hwrap';h.parentNode.insertBefore(w,h);w.appendChild(h);
  var b=document.createElement('button');b.type='button';b.className='helpq';b.textContent='?';b.dataset.t=t;b.setAttribute('aria-label',t+'の説明');w.appendChild(b)});
 document.addEventListener('click',function(e){var t=e.target;if(t.closest&&t.closest('.helppop'))return;var q=t.closest&&t.closest('.helpq'),same=q&&q===curQ;closeHelp();if(q&&!same)openHelp(q)});
 document.addEventListener('visibilitychange',closeHelp);window.addEventListener('hashchange',closeHelp);
 if(window.MutationObserver)[].forEach.call(document.querySelectorAll('.view'),function(v){new MutationObserver(closeHelp).observe(v,{attributes:true,attributeFilter:['class']})});
})();
