// ✏️ UBAH DI SINI SAJA: semua tampilan umur & nama otomatis ikut berubah
const BIRTHDAY_CONFIG={name:"Sayang",age:20,nickname:"My Favorite Girl",birthdayMessage:"Another beautiful chapter begins."};
const A=BIRTHDAY_CONFIG.age,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],rnd=a=>a[Math.random()*a.length|0],vib=n=>navigator.vibrate&&navigator.vibrate(n);
$$('[data-age]').forEach(e=>e.textContent=A);$$('[data-name]').forEach(e=>e.textContent=BIRTHDAY_CONFIG.name);$$('[data-nick]').forEach(e=>e.textContent=BIRTHDAY_CONFIG.nickname);
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(t.h);t.h=setTimeout(()=>t.classList.remove('show'),3000)}
// confetti
const cv=$('#cf'),x=cv.getContext('2d');let Q=[],run=0;const rs=()=>{cv.width=innerWidth;cv.height=innerHeight};rs();addEventListener('resize',rs);
function burst(px,py,n=80){const cols=['#8b1d2c','#d9a7ab','#f2e8d3','#d4af6a','#fff'];for(let i=0;i<n;i++)Q.push({x:px,y:py,vx:(Math.random()-.5)*14,vy:-Math.random()*12-3,r:Math.random()*6+4,c:cols[i%5],a:1,t:Math.random()*6,vt:(Math.random()-.5)*.3,h:Math.random()<.35});if(!run){run=1;loop()}}
function loop(){x.clearRect(0,0,cv.width,cv.height);Q=Q.filter(p=>p.a>.02);Q.forEach(p=>{p.vy+=.28;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.t+=p.vt;p.a-=.007;x.save();x.globalAlpha=Math.max(p.a,0);x.translate(p.x,p.y);x.rotate(p.t);x.fillStyle=p.c;if(p.h){x.font=p.r*3+'px serif';x.fillText('♥',0,0)}else x.fillRect(-p.r/2,-p.r/2,p.r,p.r*.6);x.restore()});Q.length?requestAnimationFrame(loop):run=0}
const mid=()=>burst(innerWidth/2,innerHeight/2,120);
setInterval(()=>{if(document.hidden)return;const h=document.createElement('span');h.className='fh';h.textContent=rnd(['♥','♡','✦']);const d=7+Math.random()*6;h.style.cssText=`left:${Math.random()*100}%;font-size:${12+Math.random()*16}px;animation-duration:${d}s;--dx:${(Math.random()-.5)*120}px`;$('#fx').appendChild(h);setTimeout(()=>h.remove(),d*1000)},900);
function pop(px,py,t){const e=document.createElement('span');e.className='pp';e.textContent=t||rnd(['♥','✨','🎀','🌹','💖']);e.style.left=px+'px';e.style.top=py+'px';document.body.appendChild(e);setTimeout(()=>e.remove(),1000)}
addEventListener('pointerdown',e=>{if(!e.target.closest('.dg,#ui'))pop(e.clientX,e.clientY)});
// slides
const S=$$('.slide');let c=0;const dots=$('#dots');S.forEach((_,i)=>{const b=document.createElement('b');b.onclick=()=>go(i);dots.appendChild(b)});
function go(n){if(n<0||n>=S.length)return;c=n;S.forEach((s,i)=>{s.classList.toggle('active',i==n);s.classList.toggle('before',i<n);s.classList.toggle('after',i>n)});[...dots.children].forEach((b,i)=>b.classList.toggle('on',i==n));$('#prev').disabled=n==0;$('#next').disabled=n==S.length-1;if(n==0)countUp();vib(10)}
$('#prev').onclick=()=>go(c-1);$('#next').onclick=()=>go(c+1);$('#rp').onclick=()=>go(0);
addEventListener('keydown',e=>{if(e.key=='ArrowRight')go(c+1);if(e.key=='ArrowLeft')go(c-1)});
let tx=0;addEventListener('touchstart',e=>tx=e.target.closest('.dg,#lm')?null:e.touches[0].clientX,{passive:true});addEventListener('touchend',e=>{if(tx==null)return;const d=e.changedTouches[0].clientX-tx;if(Math.abs(d)>70)go(c+(d<0?1:-1))});
// slide 1
function countUp(){const nv=$('#nv'),t0=performance.now();(function f(t){const p=Math.min((t-t0)/1500,1);nv.textContent=Math.round(A*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}
$('#num').onclick=e=>{const n=$('#num');n.classList.remove('bn');void n.offsetWidth;n.classList.add('bn');burst(e.clientX,e.clientY,50);vib(20);if(e.target.closest('#cut'))toast(BIRTHDAY_CONFIG.birthdayMessage+' ✨')};
// slide 2 calendar
const now=new Date(),dm=new Date(now.getFullYear(),now.getMonth()+1,0).getDate(),fd=new Date(now.getFullYear(),now.getMonth(),1).getDay();
$('#mo').textContent=now.toLocaleDateString('id-ID',{month:'long',year:'numeric'});
const MS=['Hari ini kamu cukup. Titik. 💗','Ada seseorang yang diam-diam bersyukur kamu ada.','Kamu lebih kuat dari hari kemarin.','Istirahat itu bukan menyerah.','Semesta sedang menyiapkan sesuatu yang manis untukmu.','Senyummu mengubah suasana ruangan.','Tidak apa-apa kalau hari ini pelan-pelan.','Kamu dicintai, bahkan di hari-hari biasa.'];
let g='';['M','S','S','R','K','J','S'].forEach(d=>g+=`<span class="w">${d}</span>`);for(let i=0;i<fd;i++)g+='<span class="w"></span>';for(let d=1;d<=dm;d++)g+=`<span ${d==now.getDate()?'class="td" data-td':''}>${d}</span>`;$('#gr').innerHTML=g;
$$('#gr span:not(.w)').forEach(s=>s.onclick=e=>{if(s.hasAttribute('data-td')){mid();toast('💌 Hari ini adalah harimu. Dunia sedang berpesta diam-diam untukmu.')}else{toast(rnd(MS));pop(e.clientX,e.clientY,'♥')}});
$('#hb').onclick=()=>{toast('The sweetest soul, versi ke-'+A+' 🌹');burst(innerWidth/2,innerHeight/2,40)};
// slide 3 wish
const cake=$('#cake');let lit=0;
$('#mw').onclick=e=>{if(lit)return;lit=1;cake.classList.add('lit');$('#bl').classList.add('show');burst(e.clientX,e.clientY,40);toast('Lilinnya menyala. Pejamkan mata, buat satu permintaan 🕯️')};
cake.onclick=()=>{if(!lit)$('#mw').click()};
function blow(){if(!lit||cake.classList.contains('out'))return;cake.classList.add('out');$('#bl').classList.remove('show');setTimeout(()=>{mid();$('#wm').classList.add('show')},500)}
$('#bl').onclick=blow;
$('#mic').onclick=async()=>{if(!lit)$('#mw').click();try{const st=await navigator.mediaDevices.getUserMedia({audio:true}),ac=new AudioContext(),an=ac.createAnalyser(),d=new Uint8Array(an.fftSize);ac.createMediaStreamSource(st).connect(an);toast('Tiup pelan ke mic 🌬️');(function t(){an.getByteTimeDomainData(d);let m=0;d.forEach(v=>m=Math.max(m,Math.abs(v-128)));if(m>70){blow();st.getTracks().forEach(k=>k.stop());return}if(!cake.classList.contains('out'))requestAnimationFrame(t)})()}catch(e){toast('Mic tidak tersedia, pakai tombol saja ♡')}};
$$('[data-t]').forEach(e=>e.addEventListener('click',ev=>{toast(e.dataset.t);pop(ev.clientX,ev.clientY,'✨')}));
// slide 4 heart film
$('#hw').onclick=e=>{$('.hp').classList.toggle('col');burst(e.clientX,e.clientY,40);toast($('.hp').classList.contains('col')?'Film selesai dicuci: warna aslimu muncul 🎞️':'Kembali ke hitam putih klasik 🎞️')};
$('#hs').onclick=e=>{burst(e.clientX,e.clientY,70);toast('Forever young, selamanya muda di hatiku ♡')};
// slide 5 envelope
const LETTER=`Untuk ${BIRTHDAY_CONFIG.name}, kesayanganku.\n\nKalau kamu membaca ini, berarti satu tahun lagi sudah berhasil kamu lewati. Aku ingin kamu tahu bahwa aku bangga sekali padamu: pada caramu bertahan di hari-hari yang berat, pada caramu tetap baik walau dunia tidak selalu baik, dan pada caramu mencintai dengan tulus.\n\nTerima kasih sudah ada. Semoga di usia ${A} ini kamu lebih sayang pada dirimu sendiri, lebih banyak tertawa, dan lebih sering dipeluk oleh hal-hal baik. Apa pun yang terjadi, aku di sini.\n\nSelamat ulang tahun, ${BIRTHDAY_CONFIG.nickname}. ♡`;
$('#lb').innerHTML=LETTER.split('\n\n').map(p=>`<p style="margin-bottom:10px">${p}</p>`).join('');
$('#seal').onclick=e=>{e.stopPropagation();$('#env').classList.add('open');burst(e.clientX,e.clientY,40);$('#et').textContent='ketuk suratnya untuk membaca 📖'};
$('#lt').onclick=e=>{if($('#env').classList.contains('open')){e.stopPropagation();$('#lm').classList.add('on');mid()}};
$('#lx').onclick=()=>$('#lm').classList.remove('on');$('#lm').onclick=e=>{if(e.target.id=='lm')$('#lm').classList.remove('on')};
// slide 6 reasons
const RS=['kebaikanmu','hatimu yang indah','selera humormu','perhatianmu','kegigihanmu','senyummu','kesabaranmu','kecerdasanmu','ketangguhanmu','kejujuranmu','kreativitasmu','kepedulianmu yang tulus','kekuatanmu di hari-hari sulit','kemauanmu untuk terus belajar','keunikan kecilmu','kehadiranmu yang menenangkan','ketulusanmu','mimpi dan ambisimu','caramu membuat orang merasa disayang','tawamu yang menular','caramu peduli diam-diam','keberanianmu mencoba lagi','kelembutanmu','semangatmu','rasa ingin tahumu','caramu mencintai','caramu bertahan','kesederhanaanmu','kerja kerasmu','cahayamu'];
const rl=$('#rs');rl.style.setProperty('--n',A);let rd=0;
for(let i=0;i<A;i++){const li=document.createElement('li'),last=i==A-1;li.innerHTML=`<b>${String(i+1).padStart(2,'0')}.</b>${last?'cukup dengan menjadi dirimu ♡':RS[i%RS.length]}`;li.onclick=e=>{if(li.classList.contains('on'))return;li.classList.add('on');rd++;$('#rc').textContent=`(${rd}/${A})`;pop(e.clientX,e.clientY,'♥');vib(10);if(rd==A){mid();toast(`Semua ${A} alasan sudah kamu rasakan. Dan masih banyak lagi 💗`)}};rl.appendChild(li)}
// slide 7 things
const TH=[['images/child.jpg','Senyum kecil di bawah topi jerami itu masih sama.'],['images/now.jpg','Tatapan tenang yang bikin dunia ikut diam.'],['images/portrait.jpg','Cahaya merah hangat ini, hangat dan berani seperti kamu.'],['🧸','Hal-hal lucu yang selalu membuatmu bahagia.'],['🌹','Warna merah, warna edisi ini. Warna kamu.'],['🎶','Lagu-lagu yang diam-diam kamu nyanyikan sendiri.']];
$('#pg').innerHTML=TH.map((t,i)=>`<div class="pf" data-k="${i}">${t[0].length>3?`<img src="${t[0]}" alt="">`:t[0]}</div>`).join('');
$$('.pf').forEach(f=>f.onclick=e=>{toast(TH[f.dataset.k][1]);burst(e.clientX,e.clientY,30);vib(15)});
// slide 8 wishes
const WS=['orang-orang yang tulus','kesempatan baru','tidur yang nyenyak','keberhasilan dalam semua yang kamu perjuangkan','kekuatan melewati apa pun','cinta yang tenang','kebaikan di setiap langkah','ketenangan hati','hari-hari yang baik','kejutan-kejutan indah','kenangan yang berharga','berkah tak terhitung','kedamaian','tawa tanpa alasan'];
$('#wds').innerHTML=WS.map(w=>`<span style="--r:${(Math.random()*6-3).toFixed(1)}deg">${w}</span>`).join('');let wd=0;
$$('#wds span').forEach(s=>s.onclick=e=>{if(s.classList.contains('on'))return;s.classList.add('on');wd++;toast('Semoga hidup memberimu '+s.textContent+' ♡');pop(e.clientX,e.clientY,'✨');if(wd==WS.length){mid()}});
$$('.gs svg').forEach((g,i)=>g.onclick=e=>{g.classList.remove('shk');void g.offsetWidth;g.classList.add('shk');burst(e.clientX,e.clientY,40);toast(['Hadiah pertama: pelukan dariku 🤗','Hadiah kedua: waktu yang tenang untukmu 🌙','Hadiah ketiga: seribu alasan untuk tersenyum 🌷'][i])});
// slide 9 locket
$('#lk').onclick=e=>{const l=$('#lk');l.classList.toggle('open');if(l.classList.contains('open')){mid();$('#lp').textContent='dulu dan sekarang, kamu tetap luar biasa ✨';toast(`Selamat ulang tahun ke-${A}, ${BIRTHDAY_CONFIG.nickname} ♡`)}else $('#lp').textContent='ketuk liontinnya 🔓'};
$$('.cds i').forEach(i=>i.onclick=e=>{i.classList.toggle('off');if(i.classList.contains('off'))toast('Satu doa lagi terkirim 🕯️')});
// draggable stickers
$$('.dg').forEach(e=>{let sx,sy,ox,oy;e.onpointerdown=v=>{v.stopPropagation();e.setPointerCapture(v.pointerId);sx=v.clientX;sy=v.clientY;ox=e.offsetLeft;oy=e.offsetTop;e.style.right='auto';e.style.bottom='auto';e.style.left=ox+'px';e.style.top=oy+'px';e.classList.add('hold');e.onpointermove=m=>{e.style.left=ox+m.clientX-sx+'px';e.style.top=oy+m.clientY-sy+'px'};e.onpointerup=()=>{e.classList.remove('hold');e.onpointermove=null;burst(e.getBoundingClientRect().left+15,e.getBoundingClientRect().top+15,10)}}});
go(0);
