// 配列データベース（ブラウザ内保存）。初期データ(arrays)は読み取り専用で、書き換えません。
(function(){
var KEY='aikatsu_db_v1',CERT={confirmed:'確認済み',estimated:'推定',unknown:'不明'},MARK={confirmed:'✔',estimated:'？',unknown:'・'};
var RAR=['','N','PR','ER','PAR'],SIDE={'':'未記録',left:'左',right:'右',unknown:'不明'};
var db=load(),ed='1',arr='1',$=function(i){return document.getElementById(i)};
function load(){try{var d=JSON.parse(localStorage.getItem(KEY));if(d&&d.slots)return d}catch(e){}
 return{v:1,editions:{'1':{label:'第1弾',arrays:12}},slots:{},lastBackup:null}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(db))}catch(e){alert('保存に失敗しました。バックアップを書き出してください。')}}
function k(e,a,s){return e+'-'+a+'-'+s}
function base(a,s){var b=(ed==='1'&&window.arrays&&arrays[a])?arrays[a][s-1]:null;return b}
function eff(a,s){var r=db.slots[k(ed,a,s)],b=base(a,s);
 if(r)return{name:r.name||'',rarity:r.rarity||(b?b.rarity:''),cert:r.cert,src:'user',rec:r};
 if(b)return{name:b.options.length?b.options.map(function(o){return(o.star?'★':'')+o.id+':'+o.name}).join(' / '):'',rarity:b.rarity,cert:'confirmed',src:'base'};
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
v.innerHTML='<div class="arrayhead"><button class="back" id="dbBack">← 戻る</button><h2>配列データベース</h2></div><div class="dbbar"><select id="dbEd"></select><select id="dbArr"></select></div><div id="dbProg" class="dbprog"></div><div id="dbGrid" class="dbgrid"></div>'+
'<div class="dbbar" style="margin-top:14px"><button id="dbAddEd">＋新しい弾</button><button id="dbAddArr">＋新しい配列</button></div><div class="dbprog"><b>バックアップ</b><div id="dbBk"></div><div class="dbbar"><button id="dbExp">📤 書き出し</button><button id="dbImp">📥 復元（追加）</button></div><input type="file" id="dbFile" accept=".json,application/json" style="display:none"></div>';
document.querySelector('.view').parentNode.appendChild(v);
function show(on){document.querySelectorAll('.view').forEach(function(x){x.classList.remove('active')});(on?v:$('searchView')).classList.add('active');if(window.toggleFab)toggleFab(false);if(on)draw();window.scrollTo(0,0)}
var open=document.createElement('button');open.className='allbtn';open.textContent='📚 データベース';open.style.cssText='width:100%;margin:8px 0;padding:14px;font-size:16px';open.onclick=function(){show(true)};
var sv=$('searchView');sv.insertBefore(open,sv.firstChild);$('dbBack').onclick=function(){show(false)};
function nArr(){return db.editions[ed].arrays}
function draw(){
 $('dbEd').innerHTML=Object.keys(db.editions).map(function(e){return'<option value="'+e+'"'+(e===ed?' selected':'')+'>'+esc(db.editions[e].label)+'</option>'}).join('');
 var o='';for(var a=1;a<=nArr();a++)o+='<option value="'+a+'"'+(String(a)===arr?' selected':'')+'>配列 No.'+a+'</option>';$('dbArr').innerHTML=o;
 var c={confirmed:0,estimated:0,rar:0,unknown:0},g='';
 for(var s=1;s<=100;s++){var e=eff(arr,s),lab=e.name||(e.rarity?'':'未確認');
  if(e.cert==='unknown'&&!e.name&&!e.rarity)c.unknown++;else if(e.cert==='estimated')c.estimated++;else if(e.cert==='confirmed'&&e.name)c.confirmed++;else c.rar++;
  g+='<button class="dbc r-'+e.rarity+' c-'+e.cert+'" data-s="'+s+'"><b>'+s+'</b>'+(e.rarity||'？')+' '+MARK[e.cert]+'</button>'}
 $('dbGrid').innerHTML=g;var p=0;
 $('dbProg').innerHTML='<b>配列 No.'+arr+'</b>　確認済み '+c.confirmed+'／推定 '+c.estimated+'／レアリティのみ '+c.rar+'／未判明 '+c.unknown+'<br><small>✔確認済み ？推定 ・不明　ピンク枠＝パラレル　点線＝推定</small>';
 $('dbBk').textContent=db.lastBackup?'最後の書き出し：'+db.lastBackup:'まだ書き出していません。こまめに書き出して保管してください。'}
$('dbEd').onchange=function(){ed=this.value;arr='1';draw()};$('dbArr').onchange=function(){arr=this.value;draw()};
$('dbGrid').onclick=function(ev){var b=ev.target.closest('.dbc');if(b)sheet(+b.dataset.s)};
function sheet(s){var e=eff(arr,s),r=e.rec||{},old=$('dbSheet');if(old)old.remove();
 var d=document.createElement('div');d.id='dbSheet';d.className='dbsheet';
 d.innerHTML='<b>配列 No.'+arr+'　'+s+'枠目</b>'+(e.src==='base'?'<br><small>初期資料：'+esc(e.name||'カード名未記載')+'（'+e.rarity+'）。保存すると自分の記録として別に残り、初期資料は変わりません。</small>':'')+
 '<label>カード名（不明なら空欄）</label><input id="f1" value="'+esc(r.name||'')+'"><label>レアリティ</label><select id="f2">'+RAR.map(function(x){return'<option value="'+x+'"'+(x===(r.rarity||(e.src==='base'?e.rarity:''))?' selected':'')+'>'+(x||'不明')+'</option>'}).join('')+'</select>'+
 '<label>情報の確実性</label><select id="f3">'+Object.keys(CERT).map(function(x){return'<option value="'+x+'"'+(x===(r.cert||(e.src==='base'?'confirmed':'unknown'))?' selected':'')+'>'+CERT[x]+'</option>'}).join('')+'</select>'+
 '<label>観測した側</label><select id="f4">'+Object.keys(SIDE).map(function(x){return'<option value="'+x+'">'+SIDE[x]+'</option>'}).join('')+'</select>'+
 '<div class="row"><button class="g" id="x0">閉じる</button>'+(e.rec?'<button class="d" id="x2">削除</button>':'')+'<button id="x1">保存</button></div>';
 document.body.appendChild(d);$('x0').onclick=function(){d.remove()};
 if($('x2'))$('x2').onclick=function(){if(confirm('この枠の自分の記録を削除しますか？（初期資料は消えません）')){delete db.slots[k(ed,arr,s)];save();d.remove();draw()}};
 $('x1').onclick=function(){var n={name:$('f1').value.trim(),rarity:$('f2').value,cert:$('f3').value},key=k(ed,arr,s),ex=db.slots[key],cur=eff(arr,s);
  if(ex&&ex.cert==='confirmed'&&((n.name&&ex.name&&n.name!==ex.name)||(n.rarity&&ex.rarity&&n.rarity!==ex.rarity))&&!confirm('確認済みの情報と違います。変更しますか？'))return;
  if(!ex&&cur.src==='base'&&((n.name&&cur.name&&n.name!==cur.name)||(n.rarity&&cur.rarity&&n.rarity!==cur.rarity))&&!confirm('初期資料と違います。自分の記録として別に保存しますか？'))return;
  var obs=(ex&&ex.obs)||[];obs.push({side:$('f4').value,at:new Date().toISOString().slice(0,10)});
  db.slots[key]={ed:ed,arr:+arr,slot:s,name:n.name,rarity:n.rarity,cert:n.cert,obs:obs};save();d.remove();draw()}}
$('dbAddEd').onclick=function(){var l=prompt('新しい弾の名前（例：第2弾）');if(!l)return;var id=String(Math.max.apply(null,Object.keys(db.editions).map(Number))+1);db.editions[id]={label:l,arrays:12};ed=id;arr='1';save();draw()};
$('dbAddArr').onclick=function(){if(confirm('この弾に配列を1つ追加しますか？')){db.editions[ed].arrays++;save();draw()}};
$('dbExp').onclick=function(){db.lastBackup=new Date().toLocaleString('ja-JP');save();var b=new Blob([JSON.stringify({format:'aikatsu-user-db',v:1,data:db},null,1)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='aikatsu_db_'+new Date().toISOString().slice(0,10)+'.json';document.body.appendChild(a);a.click();a.remove();draw()};
$('dbImp').onclick=function(){$('dbFile').click()};
$('dbFile').onchange=function(){var f=this.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){try{var j=JSON.parse(rd.result);if(j.format!=='aikatsu-user-db')throw 0;var d=j.data,add=0,same=0,diff=[];
 Object.keys(d.editions).forEach(function(e){if(!db.editions[e])db.editions[e]=d.editions[e];else if(d.editions[e].arrays>db.editions[e].arrays)db.editions[e].arrays=d.editions[e].arrays});
 Object.keys(d.slots).forEach(function(key){var n=d.slots[key],o=db.slots[key];if(!o){db.slots[key]=n;add++}else if(o.name===n.name&&o.rarity===n.rarity&&o.cert===n.cert)same++;else diff.push(key)});
 var up=0;if(diff.length&&confirm('食い違う枠が'+diff.length+'件あります。ファイルの内容で上書きしますか？\n（キャンセル＝今のデータを残す）')){diff.forEach(function(key){db.slots[key]=d.slots[key];up++})}
 save();draw();alert('追加 '+add+'件／同じ '+same+'件／上書き '+up+'件／残した '+(diff.length-up)+'件')}catch(e){alert('このファイルは読み込めませんでした。')}};rd.readAsText(f);this.value=''};
})();
