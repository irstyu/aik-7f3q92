// 画面の追加動作(index.html で app.js と db.js のあとに読み込まれます)
(function(){
 // 配列を見ているとき、枠をタップするとそこが現在位置になる
 document.addEventListener('click',function(e){
  var s=e.target.closest&&e.target.closest('#arrayDetail .slot');if(!s)return;
  var idx=parseInt(String(s.id).replace('slot-',''),10);
  if(!isNaN(idx)&&window.markPos)window.markPos(idx);
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
})();
