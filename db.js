// 配列データベース（ブラウザ内保存）。初期データ(arrays)は読み取り専用で、書き換えません。
(function(){
var VER='3.4',KEY='aikatsu_db_v1',CERT={confirmed:'確認済み',estimated:'推定',unknown:'不明'},MARK={confirmed:'確',estimated:'推',unknown:'－'};
var RAR=['','N','PR','ER','PAR'],SIDE={'':'未記録',left:'左シリンダー',right:'右シリンダー',unknown:'不明'},RN={N:'N（ノーマル）',PR:'PR（プレミアムレア）',ER:'ER（アンコールレア）',PAR:'PAR（パラレル）'};
var db=load(),ed='1',arr='1',$=function(i){return document.getElementById(i)};
function load(){try{var d=JSON.parse(localStorage.getItem(KEY));if(d&&d.slots){if(!d.seed1){Object.keys(d.slots).forEach(function(x){if(x.indexOf('1-')===0)delete d.slots[x]});d.seed1=true}if(d.editions&&d.editions['1'])d.editions['1'].locked=true;return d}}catch(e){}
 return{v:1,editions:{'1':{label:'第1弾',arrays:12,locked:true}},slots:{},lastBackup:null,seed1:true}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){alert('保存に失敗しました。バックアップを書き出してください。')}}
function k(e,a,s){return e+'-'+a+'-'+s}
function base(a,s){var b=(ed==='1'&&typeof arrays!=='undefined'&&arrays[a])?arrays[a][s-1]:null;return b}
function eff(a,s){var r=db.slots[k(ed,a,s)],b=base(a,s);
 if(r)return{name:r.name||'',rarity:r.rarity||(b?b.rarity:''),cert:r.cert,src:'user',rec:r};
 if(b)return{ids:b.options.map(function(o){return o.id}),name:b.options.length?b.options.map(function(o){return(o.star?'★':'')+o.id+':'+o.name}).join(' / '):'',rarity:b.rarity,cert:'confirmed',src:'base'};
 return{name:'',rarity:'',cert:'unknown',src:'none'}}
function esc(s){return String(s).replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]})}
var css=document.createElement('style');css.textContent=
'#dbView{padding:10px}.dbbar{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}.dbbar button,.dbbar select{flex:1;min-width:90px;font-size:16px;padding:12px 8px;border-radius:10px;border:1px solid var(--line);background:#fff}'+
'.dbgrid{display:grid;grid-template-columns:repeat(5,1fr);gap:5px}.dbc{border:1px solid var(--line);border-radius:8px;background:#fff;padding:6px 2px;text-align:center;min-height:62px;font-size:12px}'+
'.dbc b{display:block;font-size:15px}.dbc.r-PR{background:var(--pr)}.dbc.r-ER{background:var(--er)}.dbc.r-PAR{background:var(--par);border:2px solid var(--accent)}.dbc.c-unknown{opacity:.55}.dbc.c-estimated{border-style:dashed;border-color:#e08a00}'+
'.dbprog{background:#fff;border-radius:12px;padding:10px;margin:8px 0;font-size:14px;line-height:1.7}.dbsheet{position:fixed;left:0;right:0;bottom:0;background:#fff;z-index:200;padding:16px;border-radius:18px 18px 0 0;box-shadow:0 -8px 30px rgba(0,0,0,.2);max-height:85vh;overflow:auto}'+
'.dbsheet label{display:block;margin-top:8px;font-size:14px}.dbsheet input,.dbsheet select{width:100%;font-size:17px;padding:11px;border-radius:10px;border:1px solid var(--line)}.dbsheet .row{display:flex;gap:8px;margin-top:12px}.dbsheet .row button{flex:1;padding:14px;font-size:16px;border-radius:10px;border:0;background:var(--accent);color:#fff}.dbsheet .row .g{background:#e9ecf3;color:#333}.dbsheet .row .d{background:#d9534f}';
document.head.appendChild(css);
var v=document.createElement('section');v.id='dbView';v.className='view';
v.innerHTML='<div class="arrayhead"><button class="back" id="dbBack">← 戻る</button><h2>配列データベース <small style="color:#888;font-size:12px">v3.4</small></h2></div><div class="dbbar"><select id="dbEd"></select><select id="dbArr"></select></div><div id="dbProg" class="dbprog"></div><div id="dbGrid" class="dbgrid"></div><div id="dbObs"></div>'+
'<div class="dbbar" style="margin-top:14px"><button id="dbAddEd">＋新しい弾</button><button id="dbAddArr">＋新しい配列</button></div><div class="dbprog"><b>バックアップ</b><div id="dbBk"></div><div class="dbbar"><button id="dbExp"> 書き出し</button><button id="dbImp"> 復元（追加）</button></div><input type="file" id="dbFile" accept=".json,application/json" style="display:none"></div>';
document.querySelector('.view').parentNode.appendChild(v);
var dbY=0;function show(on){if(on)dbY=window.scrollY;document.querySelectorAll('.view').forEach(function(x){x.classList.remove('active')});(on?v:$('searchView')).classList.add('active');if(window.toggleFab)toggleFab(false);if(on)draw();window.scrollTo(0,on?0:dbY)}
var open=document.createElement('button');open.className='allbtn';open.textContent='データベース';open.style.cssText='width:100%;margin:8px 0;padding:14px;font-size:16px';open.onclick=function(){show(true)};
var sv=$('searchView');sv.insertBefore(open,sv.firstChild);$('dbBack').onclick=function(){show(false)};
function nArr(){return db.editions[ed].arrays}
function draw(){
 $('dbEd').innerHTML=Object.keys(db.editions).map(function(e){return'<option value="'+e+'"'+(e===ed?' selected':'')+'>'+esc(db.editions[e].label)+'</option>'}).join('');
 var o='';for(var a=1;a<=nArr();a++)o+='<option value="'+a+'"'+(String(a)===arr?' selected':'')+'>配列 No.'+a+'</option>';$('dbArr').innerHTML=o;
 var c={confirmed:0,estimated:0,rar:0,unknown:0},g='';
 for(var s=1;s<=100;s++){var e=eff(arr,s),lab=e.name||(e.rarity?'':'未確認');
  if(e.cert==='unknown'&&!e.name&&!e.rarity)c.unknown++;else if(e.cert==='estimated')c.estimated++;else if(e.cert==='confirmed'&&e.name)c.confirmed++;else c.rar++;
  g+='<button class="dbc r-'+e.rarity+' c-'+e.cert+'" data-s="'+s+'"><b>'+s+'</b>'+(e.rarity||'？')+' '+MARK[e.cert]+(e.ids&&e.ids.length?'<small style="display:block;color:#666">'+e.ids[0]+(e.ids.length>1?'+':'')+'</small>':'')+'</button>'}
 $('dbGrid').innerHTML=g;var p=0;
 $('dbProg').innerHTML='<b>配列 No.'+arr+'</b>　確認済み '+c.confirmed+'／推定 '+c.estimated+'／レアリティのみ '+c.rar+'／未判明 '+c.unknown+'<br><small>確＝確認済み　推＝推定　－＝不明　ピンク枠＝パラレル</small>';
 $('dbBk').textContent='[版 '+VER+'] '+(db.lastBackup?'最後の書き出し：'+db.lastBackup:'まだ書き出していません。こまめに書き出して保管してください。');drawObs()}
$('dbEd').onchange=function(){ed=this.value;arr='1';draw()};$('dbArr').onchange=function(){arr=this.value;draw()};
$('dbGrid').onclick=function(ev){var b=ev.target.closest('.dbc');if(b)sheet(+b.dataset.s)};
function sheet(s){var e=eff(arr,s),r=e.rec||{},old=$('dbSheet');if(old)old.remove();
 if(db.editions[ed].locked){var ops=(base(arr,s)||{options:[]}).options,h=ops.map(function(o){var im=window.getCardImagePath?getCardImagePath(o.id,o.star):'';return'<div style="display:flex;gap:12px;margin:10px 0;align-items:center">'+(im?'<img src="'+im+'" style="width:92px;border-radius:8px">':'')+'<div><b>No.'+o.id+'</b>'+(o.star?'　パラレル':'')+'<br>'+esc(o.name)+'</div></div>'}).join('')||'カード名未記載';var q=document.createElement('div');q.id='dbSheet';q.className='dbsheet';q.innerHTML='<b>配列 No.'+arr+'　'+s+'枠目</b><br>'+h+'<br>レアリティ：'+(RN[e.rarity]||'不明')+'<br><small>第1弾はPDF資料で確定済みのため、編集できません。</small><div class="row"><button class="g" id="x9">閉じる</button></div>';document.body.appendChild(q);$('x9').onclick=function(){q.remove()};return}
 var d=document.createElement('div');d.id='dbSheet';d.className='dbsheet';
 d.innerHTML='<b>配列 No.'+arr+'　'+s+'枠目</b>'+(e.src==='base'?'<br><small>初期資料：'+esc(e.name||'カード名未記載')+'（'+e.rarity+'）。保存すると自分の記録として別に残り、初期資料は変わりません。</small>':'')+
 '<label>カード番号（入力すると候補が出ます）</label><input id="f0" inputmode="numeric" placeholder="例：24"><div id="f0r"></div><label>カード名（不明なら空欄）</label><input id="f1" value="'+esc(r.name||'')+'"><label>レアリティ</label><select id="f2">'+RAR.map(function(x){return'<option value="'+x+'"'+(x===(r.rarity||(e.src==='base'?e.rarity:''))?' selected':'')+'>'+(RN[x]||'不明')+'</option>'}).join('')+'</select>'+
 '<label>情報の確実性</label><select id="f3">'+Object.keys(CERT).map(function(x){return'<option value="'+x+'"'+(x===(r.cert||(e.src==='base'?'confirmed':'unknown'))?' selected':'')+'>'+CERT[x]+'</option>'}).join('')+'</select>'+
 '<label>観測したシリンダー</label><select id="f4">'+Object.keys(SIDE).map(function(x){return'<option value="'+x+'">'+SIDE[x]+'</option>'}).join('')+'</select>'+
 '<div class="row"><button class="g" id="x0">閉じる</button>'+(e.rec?'<button class="d" id="x2">削除</button>':'')+'<button id="x1">保存</button></div>';
 document.body.appendChild(d);$('x0').onclick=function(){d.remove()};
 $('f0').oninput=function(){var v=this.value.trim(),box=$('f0r');box.innerHTML='';if(!v||typeof cards==='undefined')return;
  var m=cards.filter(function(c){return String(c.id)===v}).slice(0,6);if(!m.length){box.innerHTML='<small>該当するカードがありません</small>';return}
  m.forEach(function(c){var im=window.getCardImagePath?getCardImagePath(c.id,c.star):'',b=document.createElement('button');b.type='button';
   b.style.cssText='display:flex;gap:10px;align-items:center;width:100%;text-align:left;margin-top:6px;padding:8px;border:1px solid var(--line);border-radius:10px;background:#fff;font-size:15px';
   b.innerHTML=(im?'<img src="'+im+'" style="width:56px;border-radius:6px">':'')+'<span>No.'+c.id+(c.star?'　パラレル':'')+'<br>'+esc(c.name)+'</span>';
   b.onclick=function(){$('f1').value=c.name;var r=cardRar(c);if(r)$('f2').value=r;box.innerHTML='<small>選択：'+esc(c.name)+'</small>'};box.appendChild(b)})};
 if($('x2'))$('x2').onclick=function(){if(confirm('この枠の自分の記録を削除しますか？（初期資料は消えません）')){delete db.slots[k(ed,arr,s)];save();d.remove();draw()}};
 $('x1').onclick=function(){var n={name:$('f1').value.trim(),rarity:$('f2').value,cert:$('f3').value},key=k(ed,arr,s),ex=db.slots[key],cur=eff(arr,s);
  if(ex&&ex.cert==='confirmed'&&((n.name&&ex.name&&n.name!==ex.name)||(n.rarity&&ex.rarity&&n.rarity!==ex.rarity))&&!confirm('確認済みの情報と違います。変更しますか？'))return;
  if(!ex&&cur.src==='base'&&((n.name&&cur.name&&n.name!==cur.name)||(n.rarity&&cur.rarity&&n.rarity!==cur.rarity))&&!confirm('初期資料と違います。自分の記録として別に保存しますか？'))return;
  var obs=(ex&&ex.obs)||[];obs.push({side:$('f4').value,at:new Date().toISOString().slice(0,10)});
  db.slots[key]={ed:ed,arr:+arr,slot:s,name:n.name,rarity:n.rarity,cert:n.cert,obs:obs};save();d.remove();draw()}}
$('dbAddEd').onclick=function(){var l=prompt('新しい弾の名前（例：第2弾）');if(!l)return;var id=String(Math.max.apply(null,Object.keys(db.editions).map(Number))+1);db.editions[id]={label:l,arrays:12};ed=id;arr='1';save();draw()};
$('dbAddArr').onclick=function(){if(db.editions[ed].locked){alert('第1弾は確定済みのため、配列は追加できません。');return}if(confirm('この弾に配列を1つ追加しますか？')){db.editions[ed].arrays++;save();draw()}};
$('dbExp').onclick=function(){db.lastBackup=new Date().toLocaleString('ja-JP');save();var b=new Blob([JSON.stringify({format:'aikatsu-user-db',v:1,data:db},null,1)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='aikatsu_db_'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();draw()};
$('dbImp').onclick=function(){$('dbFile').click()};
$('dbFile').onchange=function(){var f=this.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){try{var j=JSON.parse(rd.result);if(j.format!=='aikatsu-user-db')throw 0;var d=j.data,add=0,same=0,diff=[];
 Object.keys(d.editions).forEach(function(e){if(!db.editions[e])db.editions[e]=d.editions[e];else if(d.editions[e].arrays>db.editions[e].arrays)db.editions[e].arrays=d.editions[e].arrays});
 Object.keys(d.slots).forEach(function(key){var n=d.slots[key],o=db.slots[key];if(!o){db.slots[key]=n;add++}else if(o.name===n.name&&o.rarity===n.rarity&&o.cert===n.cert)same++;else diff.push(key)});
 (d.obsSeq||[]).forEach(function(x){db.obsSeq=db.obsSeq||[];if(!db.obsSeq.some(function(y){return okey(y)===okey(x)}))db.obsSeq.push(x)});var up=0;if(diff.length&&confirm('食い違う枠が'+diff.length+'件あります。ファイルの内容で上書きしますか？\n（キャンセル＝今のデータを残す）')){diff.forEach(function(key){db.slots[key]=d.slots[key];up++})}
 save();draw();alert('追加 '+add+'件／同じ '+same+'件／上書き '+up+'件／残した '+(diff.length-up)+'件')}catch(e){alert('このファイルは読み込めませんでした。')}};rd.readAsText(f);this.value=''};
function cardRar(c){if(c.star)return'PAR';if(typeof arrays==='undefined')return'';var s={};Object.keys(arrays).forEach(function(a){arrays[a].forEach(function(sl){sl.options.forEach(function(o){if(o.id===c.id&&o.name===c.name&&!o.star)s[sl.rarity]=1})})});var q=Object.keys(s);return q.length===1?q[0]:''}
function okey(x){return x.ed+'|'+x.side+'|'+x.at+'|'+x.cards.map(function(c){return c.id+':'+c.name}).join(',')}
function chains(list){var c=list.map(function(x){return x.cards.slice()}),M=3,go=true;
 while(go){go=false;
  outer:for(var i=0;i<c.length;i++)for(var j=0;j<c.length;j++){if(i===j)continue;var a=c[i],b=c[j];
   for(var n=Math.min(a.length,b.length);n>=M;n--){var ok=true;for(var t=0;t<n;t++){if(a[a.length-n+t].id!==b[t].id||a[a.length-n+t].name!==b[t].name){ok=false;break}}
    if(ok){c[i]=a.concat(b.slice(n));c.splice(j,1);go=true;break outer}}}}
 return c.sort(function(x,y){return y.length-x.length})}
function drawObs(){var o=$('dbObs');if(!o)return;if(db.editions[ed].locked){o.innerHTML='';return}
 db.obsSeq=db.obsSeq||[];var L=db.obsSeq.filter(function(x){return x.ed===ed}),h='<div class="dbprog"><b>観測した並び</b>（'+L.length+'件）<div class="dbbar"><button id="ob1">入力中の左シリンダーを保存</button><button id="ob2">入力中の右シリンダーを保存</button></div><div class="dbbar"><button id="ob4">この配列の推定を確認済みにする</button></div>';
 if(L.length){h+='<b>並び順の推定</b><br><small>3枚以上重なる観測どうしを連結します。推定のため、確認済みにはなりません。</small>'+chains(L).map(function(c,i){return'<div style="margin:8px 0">連なり'+(i+1)+'：'+c.length+'枚　<small>推定</small><br><small>'+c.map(function(x){return esc(x.id+':'+x.name)+(x.rarity&&x.rarity!=='N'?'['+x.rarity+']':'')}).join(' → ')+'</small><br><button class="ob-as" data-ci="'+i+'" style="margin-top:6px;padding:10px 14px;border-radius:10px;border:1px solid var(--line);background:#fff;font-size:15px">配列に当てはめる</button></div>'}).join('')+'<div class="dbbar"><button id="ob3">この弾の観測を全削除</button></div>'}
 o.innerHTML=h+'</div>';o.querySelectorAll('.ob-as').forEach(function(b){b.onclick=function(){assign(chains(L)[+b.dataset.ci])}});
 [['ob1','left'],['ob2','right']].forEach(function(p){$(p[0]).onclick=function(){var hs=(typeof histories!=='undefined'?histories:{})[p[1]]||[];if(!hs.length){alert('検索画面に入力中のカードがありません。');return}
  var x={ed:ed,side:p[1],at:new Date().toISOString().slice(0,10),cards:hs.map(function(c){return{id:c.id,name:c.name,rarity:c.rarity}})};
  if(db.obsSeq.some(function(y){return okey(y)===okey(x)})){alert('同じ観測がすでに保存されています。');return}db.obsSeq.push(x);save();draw()}});
 $('ob4').onclick=function(){var n=0;for(var s=1;s<=100;s++){var r=db.slots[k(ed,arr,s)];if(r&&r.cert==='estimated')n++}
  if(!n){alert('この配列に推定の記録はありません。');return}
  if(!confirm('配列 No.'+arr+' の推定 '+n+'枠を、確認済みにします。よろしいですか？'))return;
  for(var s2=1;s2<=100;s2++){var r2=db.slots[k(ed,arr,s2)];if(r2&&r2.cert==='estimated')r2.cert='confirmed'}save();draw()};
 if($('ob3'))$('ob3').onclick=function(){if(confirm('この弾の観測列をすべて削除しますか？')){db.obsSeq=db.obsSeq.filter(function(x){return x.ed!==ed});save();draw()}}}

function assign(c){if(!c)return;var a=parseInt(prompt('この連なり（'+c.length+'枚）を当てはめる配列No.を入力（1〜'+nArr()+'）'),10);if(!(a>=1&&a<=nArr())){alert('配列No.が正しくありません。');return}
 var st=parseInt(prompt('先頭のカードが入る枠番号（1〜100）'),10);if(!(st>=1&&st<=100)){alert('枠番号が正しくありません。');return}
 if(st+c.length-1>100&&!confirm('100枠を超える分は反映されません。続けますか？'))return;
 var add=0,skip=0;c.forEach(function(x,i){var s=st+i;if(s>100)return;var key=k(ed,a,s),ex=db.slots[key];
  if(ex&&(ex.cert==='confirmed'||(ex.name&&ex.name!==x.name))){skip++;return}
  db.slots[key]={ed:ed,arr:a,slot:s,name:x.name,rarity:x.rarity||'',cert:'estimated',obs:(ex&&ex.obs)||[]};add++});
 save();arr=String(a);draw();alert('推定として'+add+'枠を記録しました。既存の記録があるため保存しなかった枠：'+skip+'枠')}
function find(c,hs){for(var i=0;i+hs.length<=c.length;i++){var ok=true;for(var t=0;t<hs.length;t++){if(c[i+t].id!==hs[t].id||c[i+t].name!==hs[t].name){ok=false;break}}if(ok)return i}return-1}
function drawMatch(){var p=$('dbMatch');if(!p)return;p.innerHTML='';var H=typeof histories!=='undefined'?histories:null,sd=typeof currentSide!=='undefined'?currentSide:'right';if(!H)return;var hs=H[sd]||[];
 if(hs.length<3)return;db.obsSeq=db.obsSeq||[];var out=[];
 Object.keys(db.editions).forEach(function(e){if(db.editions[e].locked)return;var L=db.obsSeq.filter(function(x){return x.ed===e});if(!L.length)return;
  chains(L).forEach(function(c,ci){var at=find(c,hs);if(at>=0)out.push({e:e,ci:ci,at:at,nx:c.slice(at+hs.length,at+hs.length+5)})})});
 if(!out.length)return;
 p.innerHTML='<div class="dbprog"><b>保存済みの観測と一致</b>　<small>推定</small>'+out.map(function(o){return'<div style="margin-top:8px">'+esc(db.editions[o.e].label)+'　連なり'+(o.ci+1)+'の'+(o.at+1)+'枚目から一致<br><small>この先：'+(o.nx.length?o.nx.map(function(x){return esc(x.id+':'+x.name)+(x.rarity&&x.rarity!=='N'?'['+x.rarity+']':'')}).join(' → '):'まだ記録がありません')+'</small></div>'}).join('')+'</div>'}
var mp=document.createElement('div');mp.id='dbMatch';var rt=document.querySelector('.resulttitle');if(rt&&rt.parentNode)rt.parentNode.insertBefore(mp,rt);
var r0=window.render;if(r0)window.render=function(){var v=r0.apply(this,arguments);try{drawMatch()}catch(e){}return v};
try{drawMatch()}catch(e){}
})();
