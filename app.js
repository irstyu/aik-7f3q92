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
})();
