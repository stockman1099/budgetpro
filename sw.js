<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0,viewport-fit=cover"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
  <meta name="apple-mobile-web-app-title" content="BudgetPro"/>
  <meta name="theme-color" content="#0F0F0F"/>
  <link rel="manifest" href="manifest.json"/>
  <link rel="apple-touch-icon" href="icons/icon-192.png"/>
  <title>BudgetPro</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Bebas+Neue&display=swap" rel="stylesheet"/>
  <script>
    var FIREBASE_CONFIG = {
      apiKey:            "REPLACE_apiKey",
      authDomain:        "REPLACE_authDomain",
      databaseURL:       "REPLACE_databaseURL",
      projectId:         "REPLACE_projectId",
      storageBucket:     "REPLACE_storageBucket",
      messagingSenderId: "REPLACE_messagingSenderId",
      appId:             "REPLACE_appId"
    };
    var APP_PIN = "0916";
  </script>
  <style>
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
html,body{height:100%;background:#0F0F0F;color:#F0ECE6;font-family:'Outfit',sans-serif}
body{padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}
input,button,select{font-family:'Outfit',sans-serif}
input:focus,button:focus,select:focus{outline:none}
::-webkit-scrollbar{height:3px;width:3px}
::-webkit-scrollbar-track{background:#1a1a1a}
::-webkit-scrollbar-thumb{background:#333;border-radius:2px}
/* PIN */
#pin-screen{position:fixed;inset:0;background:#0F0F0F;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;z-index:200}
#pin-screen.hidden{display:none}
.pin-logo{width:64px;height:64px;background:#E76F51;border-radius:18px;display:flex;align-items:center;justify-content:center;margin-bottom:20px;box-shadow:0 8px 24px rgba(231,111,81,.4)}
.pin-title{font-family:'Bebas Neue',sans-serif;font-size:36px;letter-spacing:.04em;margin-bottom:4px}
.pin-title span{color:#E76F51}
.pin-sub{font-size:12px;color:#555;margin-bottom:36px}
.pin-dots{display:flex;gap:14px;margin-bottom:32px}
.pin-dot{width:14px;height:14px;border-radius:50%;background:#222;border:2px solid #333;transition:all .15s}
.pin-dot.filled{background:#E76F51;border-color:#E76F51}
.pin-dot.error{background:#E63946;border-color:#E63946}
.pin-keypad{display:grid;grid-template-columns:repeat(3,72px);gap:12px}
.pin-key{width:72px;height:72px;background:#161616;border:1.5px solid #222;border-radius:16px;font-size:22px;font-weight:600;color:#F0ECE6;cursor:pointer;transition:all .12s;display:flex;align-items:center;justify-content:center}
.pin-key:active{background:#E76F51;border-color:#E76F51;transform:scale(.94)}
.pin-key.del{font-size:18px;color:#555}
.pin-key.empty{background:none;border:none;cursor:default}
.pin-error{font-size:12px;color:#E63946;margin-top:16px;min-height:18px}
/* App */
#app{max-width:480px;margin:0 auto;padding:24px 16px 120px}
.lbl{font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#555;margin-bottom:5px}
.card{background:#161616;border:1px solid #222;border-radius:14px;padding:16px;margin-bottom:12px}
.income-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:8px}
.big-input{background:none;border:none;border-bottom:2px solid #2a2a2a;color:#F0ECE6;font-size:24px;font-weight:700;width:100%;padding:4px 0;transition:border-color .15s}
.big-input:focus{border-bottom-color:#E76F51}
.week-scroll{display:flex;gap:8px;overflow-x:auto;padding-bottom:10px;margin-bottom:16px;-webkit-overflow-scrolling:touch}
.week-chip{flex-shrink:0;cursor:pointer;border-radius:10px;padding:10px 14px;border:1.5px solid #222;background:none;color:#F0ECE6;text-align:left;transition:all .15s}
.week-chip.active{border-color:#E76F51;background:#1a0f0c}
.week-chip.current{border-color:#444}
.chip-label{font-size:10px;color:#555;letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px}
.chip-dates{font-size:13px;font-weight:600;white-space:nowrap}
.chip-pay{font-size:11px;color:#E76F51;font-weight:600;margin-top:2px}
.chip-spent{font-size:10px;margin-top:1px}
.pay-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
.pay-box{background:#0F0F0F;border-radius:10px;padding:12px;border:1.5px solid #1a1a1a}
.pay-box.mine{border-color:#1d3a4a}
.pay-box.wife{border-color:#4a1d1a}
.pay-amt-input{background:none;border:none;font-size:20px;font-weight:700;width:100%;padding:2px 0}
.pay-amt-input.mine{color:#457B9D}
.pay-amt-input.wife{color:#E76F51}
/* Buckets */
.bucket-card{background:#161616;border:1px solid #222;border-radius:14px;margin-bottom:10px;overflow:hidden}
.bucket-header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;cursor:pointer;user-select:none;gap:8px}
.bucket-name-txt{font-size:15px;font-weight:600}
.bucket-meta{font-size:11px;color:#555;margin-top:2px}
.bucket-right{display:flex;align-items:center;gap:8px;flex-shrink:0}
.chevron{font-size:12px;color:#444;transition:transform .2s;display:inline-block;flex-shrink:0}
.chevron.open{transform:rotate(180deg)}
.bucket-body{padding:12px 16px 14px;border-top:1px solid #1e1e1e}
.bar-track{height:5px;background:#222;border-radius:3px;overflow:hidden}
.bar-fill{height:100%;border-radius:3px;transition:width .4s ease;background:#2EC4B6}
.bar-fill.warn{background:#FFB703}
.bar-fill.over{background:#E63946}
/* Biweekly cycle badge */
.cycle-badge{display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:700;letter-spacing:.05em}
.cycle-badge.w1{background:#1a2a3a;color:#457B9D;border:1px solid #1d3a4a}
.cycle-badge.w2{background:#1a3a2a;color:#2EC4B6;border:1px solid #1a4a30}
.cycle-badge.off{background:#222;color:#444;border:1px solid #2a2a2a}
/* Rollover strip */
.rollover-strip{display:flex;align-items:center;justify-content:space-between;background:#0d1f1c;border:1px solid #1a3a35;border-radius:8px;padding:8px 12px;margin-bottom:10px}
.rollover-val{background:none;border:none;border-bottom:1.5px solid #2EC4B6;color:#2EC4B6;font-size:14px;font-weight:700;width:80px;text-align:right;padding:1px 2px}
/* End-of-cycle savings panel */
.savings-panel{background:#161616;border:1.5px solid #8338EC;border-radius:12px;padding:14px;margin-top:10px}
.savings-panel-title{font-size:13px;font-weight:700;color:#8338EC;margin-bottom:10px}
.savings-goal-row{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.savings-goal-row:last-child{margin-bottom:0}
.savings-goal-name{flex:1;font-size:12px;color:#aaa}
.savings-goal-input{background:#1a1a1a;border:1.5px solid #2a2a2a;border-radius:6px;color:#F0ECE6;padding:6px 8px;font-size:13px;font-weight:600;width:90px;text-align:right}
.savings-goal-input:focus{border-color:#8338EC;outline:none}
.savings-commit-btn{background:#8338EC;color:white;border:none;border-radius:8px;padding:9px;font-size:12px;font-weight:700;cursor:pointer;width:100%;margin-top:10px}
/* Budget input */
.budget-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:8px}
.budget-inp{background:#1a1a1a;border:1.5px solid #2a2a2a;border-radius:8px;color:#F0ECE6;padding:7px 10px;font-size:16px;font-weight:700;width:120px;text-align:right;transition:border-color .15s}
.budget-inp:focus{border-color:#E76F51}
/* Purchases */
.purchase-item{display:flex;align-items:flex-start;gap:10px;padding:9px 0;border-bottom:1px solid #1e1e1e}
.purchase-item:last-child{border-bottom:none}
.purchase-info{flex:1;min-width:0}
.purchase-name{font-size:13px;font-weight:600}
.purchase-sub{font-size:11px;color:#555;margin-top:1px}
.purchase-amt{font-size:14px;font-weight:700;color:#E76F51;white-space:nowrap}
.del-x{background:none;border:none;color:#2a2a2a;cursor:pointer;font-size:18px;padding:0;line-height:1;flex-shrink:0}
.del-x:active{color:#E76F51}
.add-purchase-btn{background:#1e1e1e;color:#E76F51;border:1.5px solid #2a2a2a;border-radius:8px;padding:9px 14px;font-size:12px;font-weight:600;cursor:pointer;width:100%;margin-top:10px}
.add-purchase-btn:active{background:#E76F51;color:white}
/* Forms */
.field{background:#1a1a1a;border:1.5px solid #2a2a2a;border-radius:8px;color:#F0ECE6;padding:9px 12px;font-size:13px;width:100%;transition:border-color .15s;margin-bottom:8px}
.field:focus{border-color:#E76F51}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.save-btn{background:#E76F51;color:white;border:none;border-radius:8px;padding:11px;font-size:14px;font-weight:700;cursor:pointer;width:100%;margin-top:8px}
.cancel-btn{background:none;border:1.5px solid #2a2a2a;color:#666;border-radius:8px;padding:10px;font-size:13px;font-weight:600;cursor:pointer;width:100%;margin-top:6px}
.add-row{display:flex;gap:8px;margin-bottom:12px}
.text-input{background:#1a1a1a;border:1.5px solid #2a2a2a;border-radius:8px;color:#F0ECE6;padding:9px 12px;font-size:13px;flex:1}
.text-input:focus{border-color:#E76F51}
.add-btn{background:#E76F51;color:white;border:none;border-radius:8px;padding:9px 16px;font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap}
/* Excess */
.excess-card{border-radius:14px;padding:16px;margin-bottom:12px;border:1px solid #1a3a35;background:#0d1f1c}
.excess-card.over{border-color:#3a1a1a;background:#1f0d0d}
.excess-big{font-family:'Bebas Neue',sans-serif;font-size:42px;letter-spacing:.04em;color:#2EC4B6}
.excess-big.over{color:#E63946}
.run-row{display:flex;justify-content:space-between;align-items:center;padding:8px 6px;border-bottom:1px solid #1a1a1a;cursor:pointer;border-radius:6px;transition:background .1s}
.run-row:last-child{border-bottom:none}
.run-row.sel{background:#1a0f0c}
/* Modal */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:100;display:flex;align-items:flex-end;justify-content:center}
.modal-overlay.hidden{display:none}
.modal-sheet{background:#161616;border-radius:20px 20px 0 0;padding:20px 20px calc(24px + env(safe-area-inset-bottom));width:100%;max-width:480px;border-top:1px solid #2a2a2a;max-height:92vh;overflow-y:auto}
.modal-title{font-size:16px;font-weight:700;margin-bottom:14px}
.week-select{background:#1a1a1a;border:1.5px solid #2a2a2a;border-radius:8px;color:#F0ECE6;padding:9px 12px;font-size:13px;width:100%;margin-bottom:8px}
/* Sync */
.sync-bar{position:fixed;top:0;left:0;right:0;padding:6px 16px;padding-top:calc(6px + env(safe-area-inset-top));font-size:11px;font-weight:600;text-align:center;z-index:80;transition:all .3s;transform:translateY(-100%)}
.sync-bar.show{transform:translateY(0)}
.sync-bar.saving{background:#1a2a3a;color:#457B9D}
.sync-bar.saved{background:#1a3a35;color:#2EC4B6}
.sync-bar.error{background:#3a1a1a;color:#E63946}
.hint-bar{position:fixed;bottom:0;left:0;right:0;background:#161616;border-top:1px solid #222;padding:12px 16px;padding-bottom:calc(12px + env(safe-area-inset-bottom));display:flex;align-items:center;justify-content:space-between;gap:12px;z-index:50}
.hint-bar.hidden{display:none}
.hint-bar p{font-size:11px;color:#666;line-height:1.4}
.hint-bar button{background:#E76F51;color:white;border:none;border-radius:8px;padding:8px 12px;font-size:11px;font-weight:600;cursor:pointer}
  </style>
</head>
<body>

<div id="pin-screen">
  <div class="pin-logo"><span style="font-family:'Bebas Neue',sans-serif;font-size:38px;color:white;line-height:1">$</span></div>
  <div class="pin-title">BUDGET<span>PRO</span></div>
  <div class="pin-sub">Enter your PIN</div>
  <div class="pin-dots" id="pin-dots"></div>
  <div class="pin-keypad">
    <button class="pin-key" data-k="1">1</button><button class="pin-key" data-k="2">2</button><button class="pin-key" data-k="3">3</button>
    <button class="pin-key" data-k="4">4</button><button class="pin-key" data-k="5">5</button><button class="pin-key" data-k="6">6</button>
    <button class="pin-key" data-k="7">7</button><button class="pin-key" data-k="8">8</button><button class="pin-key" data-k="9">9</button>
    <button class="pin-key empty"></button><button class="pin-key" data-k="0">0</button><button class="pin-key del" data-k="del">&#9003;</button>
  </div>
  <div class="pin-error" id="pin-error"></div>
</div>

<div class="sync-bar" id="sync-bar"><span id="sync-msg"></span></div>
<div id="app" style="display:none"></div>

<div class="modal-overlay hidden" id="modal">
  <div class="modal-sheet">
    <div class="modal-title" id="modal-title">Log Purchase</div>
    <input type="text" class="field" id="p-name" placeholder="What did you buy?"/>
    <div class="field-row">
      <div><div class="lbl">Amount</div><div style="display:flex;align-items:center;gap:4px"><span style="color:#555">$</span><input type="number" inputmode="decimal" class="field" id="p-amt" placeholder="0.00" style="margin-bottom:0"/></div></div>
      <div><div class="lbl">Date</div><input type="date" class="field" id="p-date" style="margin-bottom:0;color-scheme:dark"/></div>
    </div>
    <div style="margin-top:10px"><div class="lbl">Assign to Week</div><select class="week-select" id="p-week"></select></div>
    <div style="margin-top:4px"><div class="lbl">Note (optional)</div><input type="text" class="field" id="p-note" placeholder="e.g. Walmart, Kroger..." style="margin-bottom:0"/></div>
    <button class="save-btn" id="modal-save">Save Purchase</button>
    <button class="cancel-btn" id="modal-cancel">Cancel</button>
  </div>
</div>

<div class="hint-bar" id="hint-bar">
  <p>&#128242; Safari &rarr; Share &rarr; <strong>Add to Home Screen</strong></p>
  <button onclick="document.getElementById('hint-bar').classList.add('hidden');localStorage.setItem('hint','1')">Got it</button>
</div>

<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>
<script>
(function(){
'use strict';

// ── PIN ───────────────────────────────────────────────────────────────────────
var PIN=String(APP_PIN||'0916');
var pinEntry='';
var dotsEl=document.getElementById('pin-dots');
for(var i=0;i<PIN.length;i++){var dot=document.createElement('div');dot.className='pin-dot';dot.id='d'+i;dotsEl.appendChild(dot);}

function updateDots(){for(var i=0;i<PIN.length;i++){var d=document.getElementById('d'+i);if(d)d.className='pin-dot'+(i<pinEntry.length?' filled':'');}}
function shakeError(){
  document.querySelectorAll('.pin-dot').forEach(function(d){d.className='pin-dot error'});
  document.getElementById('pin-error').textContent='Incorrect PIN';
  setTimeout(function(){pinEntry='';updateDots();document.getElementById('pin-error').textContent='';},900);
}
if(sessionStorage.getItem('bp_ok')==='1'){unlockApp();}
document.querySelectorAll('.pin-key').forEach(function(btn){
  btn.addEventListener('click',function(){
    var k=btn.dataset.k;if(!k)return;
    if(k==='del'){pinEntry=pinEntry.slice(0,-1);updateDots();return;}
    if(pinEntry.length>=PIN.length)return;
    pinEntry+=k;updateDots();
    if(pinEntry.length===PIN.length){
      if(pinEntry===PIN){sessionStorage.setItem('bp_ok','1');setTimeout(unlockApp,150);}
      else setTimeout(shakeError,100);
    }
  });
});
function unlockApp(){document.getElementById('pin-screen').classList.add('hidden');document.getElementById('app').style.display='block';initApp();}

// ── App ───────────────────────────────────────────────────────────────────────
function initApp(){
  var cfg=FIREBASE_CONFIG;
  if(!cfg.apiKey||cfg.apiKey==='REPLACE_apiKey'){
    document.getElementById('app').innerHTML='<div style="padding:40px 24px;text-align:center"><div style="font-family:\'Bebas Neue\',sans-serif;font-size:28px;color:#E76F51;margin-bottom:12px">Firebase Not Configured</div><p style="font-size:13px;color:#666;line-height:1.7">Open index.html and replace the REPLACE_* values with your Firebase config. See SETUP-GUIDE.txt.</p></div>';
    return;
  }

  firebase.initializeApp(cfg);
  var db=firebase.database();
  var ROOT=db.ref('budgetpro');

  var syncT=null;
  function showSync(type,msg){
    var bar=document.getElementById('sync-bar'),txt=document.getElementById('sync-msg');
    if(!bar||!txt)return;
    txt.textContent=msg;bar.className='sync-bar show '+type;
    clearTimeout(syncT);
    if(type==='saved')syncT=setTimeout(function(){bar.className='sync-bar'},2500);
  }
  function fbSet(path,val){showSync('saving','Saving...');ROOT.child(path).set(val,function(e){if(e)showSync('error','\u26a0 Failed');else showSync('saved','\u25cf Saved')});}
  function fbRemove(path){ROOT.child(path).remove();showSync('saved','\u25cf Saved');}

  // ── Helpers ──────────────────────────────────────────────────────────────────
  var MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function fmtD(d){return MO[d.getMonth()]+' '+d.getDate()}
  function fmt$(n){return '$'+Math.abs(Math.round(n||0)).toLocaleString()}
  function fmtDec(n){return '$'+Math.abs(parseFloat(n)||0).toFixed(2)}
  function addDays(d,n){var r=new Date(d);r.setDate(r.getDate()+n);return r}
  function dk(d){return d.toISOString().slice(0,10)}
  function esc(s){return(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')}
  var TODAY=new Date();TODAY.setHours(0,0,0,0);
  var todayStr=dk(TODAY);
  function nextWed(f){var d=new Date(f);d.setHours(0,0,0,0);while(d.getDay()!==3)d.setDate(d.getDate()+1);return d}
  function wifePaysMonth(y,m){return[7,21].map(function(day){var d=new Date(y,m,day);if(d.getDay()===6)d.setDate(d.getDate()-1);if(d.getDay()===0)d.setDate(d.getDate()-2);return d})}
  function buildWeeks(){
    var ye=new Date(TODAY.getFullYear(),11,31);var s=new Date(TODAY);var dow=s.getDay();
    s.setDate(s.getDate()-(dow===0?6:dow-1));
    var wks=[];var c=new Date(s);
    while(c<=ye){wks.push({weekStart:new Date(c),weekEnd:addDays(c,6),id:dk(c)});c=addDays(c,7)}
    return wks;
  }
  function buildPayDates(yr){
    var md=[],wd=[],ys=new Date(yr,0,1),ye=new Date(yr,11,31);
    var w=nextWed(ys);while(w<=ye){md.push(new Date(w));w=addDays(w,7)}
    for(var m=0;m<=11;m++)wifePaysMonth(yr,m).forEach(function(d){if(d>=ys&&d<=ye)wd.push(d)});
    return{myDates:md,wifeDates:wd};
  }
  function paysInRange(dates,s,e){return dates.filter(function(d){return d>=s&&d<=e})}
  function getWeekIncome(wk){
    var ov=S.payOverrides[wk.id]||{};
    var mp=paysInRange(PAY.myDates,wk.weekStart,wk.weekEnd);
    var wp=paysInRange(PAY.wifeDates,wk.weekStart,wk.weekEnd);
    var mt=mp.length?(ov.me!==undefined?ov.me:S.myPay)*mp.length:0;
    var wt=wp.length?(ov.wife!==undefined?ov.wife:S.wifePay)*wp.length:0;
    return{myTotal:mt,wifeTotal:wt,total:mt+wt,myPays:mp,wifePays:wp};
  }

  // ── Biweekly cycle logic ──────────────────────────────────────────────────────
  // S.bwCycles[bucket] = { anchorWeekId, budgetAmt, rolloverOverrides:{weekId:amt}, savedAmounts:{weekId:{goalId:amt}} }
  // A cycle is 2 weeks starting from anchor, then next anchor = anchor+2 weeks, etc.
  // cyclePos(bucket, weekId) returns {cycle:0-based, pos:1 or 2, cycleStartId, cycleEndId} or null

  function getCycleInfo(bucket,weekId){
    var cyc=S.bwCycles&&S.bwCycles[bucket];
    if(!cyc||!cyc.anchorWeekId)return null;
    var wi=WEEKS.findIndex(function(w){return w.id===weekId});
    var ai=WEEKS.findIndex(function(w){return w.id===cyc.anchorWeekId});
    if(wi<0||ai<0||wi<ai)return null;
    var diff=wi-ai;
    var cycleNum=Math.floor(diff/2);
    var pos=(diff%2)+1; // 1 or 2
    var startIdx=ai+cycleNum*2;
    var endIdx=startIdx+1;
    if(startIdx>=WEEKS.length)return null;
    return{pos:pos,cycleNum:cycleNum,startId:WEEKS[startIdx].id,endId:endIdx<WEEKS.length?WEEKS[endIdx].id:null};
  }

  // Budget available for a biweekly bucket in a given week
  // Week 1: full budget amount (this is what hits income)
  // Week 2: rollover from week 1 (does NOT hit income again)
  function getBWBucketState(bucket,weekId){
    var cyc=S.bwCycles&&S.bwCycles[bucket];
    if(!cyc||!cyc.anchorWeekId)return null;
    var info=getCycleInfo(bucket,weekId);
    if(!info)return{active:false};
    var budgetAmt=parseFloat(cyc.budgetAmt)||0;
    var purchases=getPurchasesFor(weekId,bucket);
    var spent=purchases.reduce(function(s,p){return s+(parseFloat(p.amt)||0)},0);

    if(info.pos===1){
      // Week 1: full budget, counts against income
      return{active:true,pos:1,budgetAmt:budgetAmt,available:budgetAmt,spent:spent,remaining:budgetAmt-spent,countsAgainstIncome:true,info:info};
    } else {
      // Week 2: rollover from week 1, does NOT count against income
      var w1spent=getPurchasesFor(info.startId,bucket).reduce(function(s,p){return s+(parseFloat(p.amt)||0)},0);
      var autoRollover=budgetAmt-w1spent;
      // Manual override?
      var overrides=cyc.rolloverOverrides||{};
      var rollover=overrides[weekId]!==undefined?parseFloat(overrides[weekId]):autoRollover;
      if(rollover<0)rollover=0;
      return{active:true,pos:2,budgetAmt:budgetAmt,available:rollover,spent:spent,remaining:rollover-spent,countsAgainstIncome:false,autoRollover:autoRollover,rollover:rollover,info:info};
    }
  }

  function getPurchasesFor(weekId,bucket){
    var list=S.purchases?Object.values(S.purchases):[];
    return list.filter(function(p){return p.weekId===weekId&&p.bucket===bucket}).sort(function(a,b){return a.date>b.date?1:-1});
  }

  function getWB(weekId,bucket){
    var key=encodeURIComponent(bucket).replace(/%/g,'_');
    return parseFloat((S.weekBudgets[weekId]||{})[key])||0;
  }

  // Income-adjusted spend for a week:
  // For biweekly buckets in week 1: count full budgetAmt against income (not just what was spent)
  // For biweekly buckets in week 2: count 0 against income
  // For weekly buckets: count actual spend
  function getWeekIncomeDeductions(weekId){
    var total=0;
    S.buckets.forEach(function(bucket){
      if(isBiweekly(bucket)){
        var bws=getBWBucketState(bucket,weekId);
        if(bws&&bws.active){
          if(bws.pos===1) total+=bws.budgetAmt; // full amount hits week 1 income
          // week 2: 0 — already paid for
        }
      } else {
        // weekly bucket: actual spend counts against income
        var sp=getPurchasesFor(weekId,bucket).reduce(function(s,p){return s+(parseFloat(p.amt)||0)},0);
        total+=sp;
      }
    });
    return total;
  }

  function isBiweekly(bucket){
    return S.bwCycles&&S.bwCycles[bucket]&&S.bwCycles[bucket].anchorWeekId;
  }

  // ── State ─────────────────────────────────────────────────────────────────────
  var S={
    myPay:1346,wifePay:850,
    buckets:['Bills','Groceries','Gas','Personal'],
    weekBudgets:{},purchases:{},payOverrides:{},
    bwCycles:{
      Groceries:{anchorWeekId:null,budgetAmt:1000,rolloverOverrides:{},savedAmounts:{}}
    },
    savingsGoals:[]
  };
  var openBuckets={};
  var activeWeek=null;
  var WEEKS=buildWeeks();
  var PAY=buildPayDates(TODAY.getFullYear());
  var CUR_WK=(WEEKS.find(function(w){return TODAY>=w.weekStart&&TODAY<=w.weekEnd})||WEEKS[0]).id;
  var appReady=false;

  ROOT.on('value',function(snap){
    var data=snap.val();
    if(data){
      if(typeof data.myPay==='number')S.myPay=data.myPay;
      if(typeof data.wifePay==='number')S.wifePay=data.wifePay;
      if(Array.isArray(data.buckets)&&data.buckets.length)S.buckets=data.buckets;
      if(data.weekBudgets&&typeof data.weekBudgets==='object')S.weekBudgets=data.weekBudgets;
      if(data.purchases&&typeof data.purchases==='object')S.purchases=data.purchases;
      if(data.payOverrides&&typeof data.payOverrides==='object')S.payOverrides=data.payOverrides;
      if(data.bwCycles&&typeof data.bwCycles==='object')S.bwCycles=data.bwCycles;
      if(Array.isArray(data.savingsGoals))S.savingsGoals=data.savingsGoals;
    }
    if(!appReady){appReady=true;activeWeek=CUR_WK;buildShell();}
    renderAll();showSync('saved','\u25cf Synced');
  },function(){showSync('error','\u26a0 Sync error')});

  // ── Shell ─────────────────────────────────────────────────────────────────────
  function buildShell(){
    document.getElementById('app').innerHTML=
      '<div style="display:flex;align-items:center;gap:12px;margin-bottom:20px">'
      +'<div style="width:46px;height:46px;background:#E76F51;border-radius:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 4px 16px rgba(231,111,81,.35)">'
      +'<span style="font-family:\'Bebas Neue\',sans-serif;font-size:30px;color:white;line-height:1;margin-top:2px">$</span></div><div>'
      +'<div style="font-size:10px;letter-spacing:.14em;color:#444;text-transform:uppercase">Paycheck Planner \u00b7 '+TODAY.getFullYear()+'</div>'
      +'<div style="font-family:\'Bebas Neue\',sans-serif;font-size:38px;letter-spacing:.04em;line-height:1">BUDGET<span style="color:#E76F51">PRO</span></div>'
      +'</div></div>'
      +'<div class="income-grid">'
      +'<div class="card" style="margin-bottom:0"><div class="lbl">Your Check (Wed)</div>'
      +'<div style="display:flex;align-items:baseline;gap:4px"><span style="color:#555;font-size:14px">$</span>'
      +'<input type="number" inputmode="decimal" class="big-input" id="my-pay" value="'+S.myPay+'"/></div></div>'
      +'<div class="card" style="margin-bottom:0"><div class="lbl">Wife\'s Check &#10084;&#65039;</div>'
      +'<div style="display:flex;align-items:baseline;gap:4px"><span style="color:#555;font-size:14px">$</span>'
      +'<input type="number" inputmode="decimal" class="big-input" id="wife-pay" value="'+S.wifePay+'"/></div></div>'
      +'</div>'
      +'<p style="font-size:10px;color:#333;text-align:center;margin:8px 0 18px">\u25cf Live sync \u2014 changes show on both phones instantly</p>'
      +'<div class="lbl">Select a Week</div>'
      +'<div class="week-scroll" id="week-scroll"></div>'
      +'<div id="week-detail"></div>';

    if(localStorage.getItem('hint'))document.getElementById('hint-bar').classList.add('hidden');
    var t1,t2;
    document.getElementById('my-pay').addEventListener('input',function(e){S.myPay=parseFloat(e.target.value)||0;clearTimeout(t1);t1=setTimeout(function(){fbSet('myPay',S.myPay)},700);renderScroller();});
    document.getElementById('wife-pay').addEventListener('input',function(e){S.wifePay=parseFloat(e.target.value)||0;clearTimeout(t2);t2=setTimeout(function(){fbSet('wifePay',S.wifePay)},700);renderScroller();});
  }

  // ── Modal ─────────────────────────────────────────────────────────────────────
  var modalBucket=null;
  function openModal(bucket,weekId){
    modalBucket=bucket;
    document.getElementById('modal-title').textContent='Log Purchase \u2014 '+bucket;
    document.getElementById('p-name').value='';document.getElementById('p-amt').value='';
    document.getElementById('p-date').value=todayStr;document.getElementById('p-note').value='';
    var sel=document.getElementById('p-week');sel.innerHTML='';
    WEEKS.forEach(function(w){
      var o=document.createElement('option');o.value=w.id;
      var inc=getWeekIncome(w);
      o.textContent=fmtD(w.weekStart)+'\u2013'+fmtD(w.weekEnd)+(w.id===CUR_WK?' (this week)':'')+(inc.total>0?' \u00b7 '+fmt$(inc.total)+' in':'');
      if(w.id===weekId)o.selected=true;sel.appendChild(o);
    });
    document.getElementById('modal').classList.remove('hidden');
    setTimeout(function(){document.getElementById('p-name').focus()},150);
  }
  function closeModal(){document.getElementById('modal').classList.add('hidden')}
  document.getElementById('modal-cancel').addEventListener('click',closeModal);
  document.getElementById('modal').addEventListener('click',function(e){if(e.target===document.getElementById('modal'))closeModal()});
  document.getElementById('modal-save').addEventListener('click',function(){
    var name=document.getElementById('p-name').value.trim();
    var amt=parseFloat(document.getElementById('p-amt').value);
    var date=document.getElementById('p-date').value;
    var note=document.getElementById('p-note').value.trim();
    var weekId=document.getElementById('p-week').value;
    if(!name||!amt)return;
    var id='p'+Date.now()+''+Math.floor(Math.random()*9999);
    fbSet('purchases/'+id,{id:id,name:name,amt:amt,date:date,note:note,weekId:weekId,bucket:modalBucket});
    closeModal();
  });

  // ── Render ────────────────────────────────────────────────────────────────────
  function renderAll(){renderScroller();renderDetail()}

  function renderScroller(){
    var el=document.getElementById('week-scroll');if(!el)return;el.innerHTML='';
    WEEKS.forEach(function(w){
      var inc=getWeekIncome(w);
      var deductions=getWeekIncomeDeductions(w.id);
      var ex=inc.total-deductions;
      var isCur=w.id===CUR_WK,isAct=w.id===activeWeek,isPast=w.weekEnd<TODAY;
      var chip=document.createElement('button');
      chip.className='week-chip'+(isAct?' active':'')+(isCur?' current':'');
      chip.style.opacity=isPast?'0.4':'1';
      var h='<div class="chip-label">'+(isCur?'This week':MO[w.weekStart.getMonth()])+'</div>';
      h+='<div class="chip-dates">'+fmtD(w.weekStart)+'\u2013'+fmtD(w.weekEnd)+'</div>';
      if(inc.total>0)h+='<div class="chip-pay">'+fmt$(inc.total)+' in</div>';
      if(deductions>0){var c=ex>=0?'#2EC4B6':'#E63946';h+='<div class="chip-spent" style="color:'+c+'">'+fmt$(ex)+' left</div>';}
      chip.innerHTML=h;
      chip.addEventListener('click',function(){activeWeek=w.id;renderAll()});
      el.appendChild(chip);
      if(isAct)setTimeout(function(){chip.scrollIntoView({behavior:'smooth',inline:'center',block:'nearest'})},50);
    });
  }

  function renderDetail(){
    var det=document.getElementById('week-detail');if(!det)return;
    var week=WEEKS.find(function(w){return w.id===activeWeek});if(!week){det.innerHTML='';return}
    var inc=getWeekIncome(week);var ov=S.payOverrides[week.id]||{};
    var isCur=week.id===CUR_WK;
    var deductions=getWeekIncomeDeductions(week.id);
    var ex=inc.total-deductions;var isOver=ex<0;
    var pct=inc.total>0?Math.min(100,(deductions/inc.total)*100):0;
    var h='';

    // Week header
    h+='<div class="card"><div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px">'
      +'<div><div class="lbl">Week of</div>'
      +'<div style="font-family:\'Bebas Neue\',sans-serif;font-size:28px;letter-spacing:.04em">'+fmtD(week.weekStart)+' \u2013 '+fmtD(week.weekEnd)+'</div>'
      +(isCur?'<div style="font-size:11px;color:#E76F51;font-weight:600;margin-top:2px">\u25cf CURRENT WEEK</div>':'')
      +'</div><div style="text-align:right"><div class="lbl">Coming In</div>'
      +'<div style="font-family:\'Bebas Neue\',sans-serif;font-size:30px;letter-spacing:.04em;color:'+(inc.total>0?'#2EC4B6':'#444')+'">'+(inc.total>0?fmt$(inc.total):'No Checks')+'</div>'
      +'</div></div>'
      +'<div class="pay-grid">'
      +'<div class="pay-box '+(inc.myPays.length?'mine':'')+'">'
      +'<div class="lbl" style="color:'+(inc.myPays.length?'#457B9D':'#333')+'">Your Check'+(inc.myPays.length?' \u2014 '+fmtD(inc.myPays[0]):'')+'</div>'
      +(inc.myPays.length?'<div style="display:flex;align-items:center;gap:4px"><span style="color:#444;font-size:13px">$</span><input type="number" inputmode="decimal" class="pay-amt-input mine" data-who="me" value="'+(ov.me!==undefined?ov.me:S.myPay)+'"/></div><div style="font-size:10px;color:#333;margin-top:2px">Edit if different</div>':'<div style="font-size:13px;color:#333;margin-top:6px">Not this week</div>')
      +'</div><div class="pay-box '+(inc.wifePays.length?'wife':'')+'">'
      +'<div class="lbl" style="color:'+(inc.wifePays.length?'#E76F51':'#333')+'">Wife &#10084;&#65039;'+(inc.wifePays.length?' \u2014 '+fmtD(inc.wifePays[0]):'')+'</div>'
      +(inc.wifePays.length?'<div style="display:flex;align-items:center;gap:4px"><span style="color:#444;font-size:13px">$</span><input type="number" inputmode="decimal" class="pay-amt-input wife" data-who="wife" value="'+(ov.wife!==undefined?ov.wife:S.wifePay)+'"/></div><div style="font-size:10px;color:#333;margin-top:2px">Edit if different</div>':'<div style="font-size:13px;color:#333;margin-top:6px">Not this week</div>')
      +'</div></div></div>';

    // Add bucket row
    h+='<div class="add-row"><input type="text" class="text-input" id="nbi" placeholder="New bucket name..."/><button class="add-btn" id="abb">+ Bucket</button></div>';

    // Buckets
    S.buckets.forEach(function(bucket,bIdx){
      var ok=week.id+'__'+bucket;var isOpen=!!openBuckets[ok];
      var bwState=isBiweekly(bucket)?getBWBucketState(bucket,week.id):null;
      var isBW=bwState&&bwState.active!==false;
      var purchases=getPurchasesFor(week.id,bucket);

      // For display
      var available=0,spent=0,remaining=0,pctB=0,bcolor='#2EC4B6',bpctCls='';
      var remLabel='',cycleLabel='';

      if(bwState&&bwState.active){
        available=bwState.available;
        spent=bwState.spent;
        remaining=bwState.remaining;
        pctB=available>0?Math.min(100,(spent/available)*100):0;
        bcolor=pctB>=100?'#E63946':pctB>=80?'#FFB703':'#2EC4B6';
        bpctCls=pctB>=100?'over':pctB>=80?'warn':'';
        remLabel=remaining>=0?fmt$(remaining)+' left':fmt$(Math.abs(remaining))+' over';
        cycleLabel=bwState.pos===1?'WEEK 1 OF 2':'WEEK 2 OF 2';
      } else if(bwState&&!bwState.active&&isBiweekly(bucket)){
        cycleLabel='SET CYCLE START';
        remLabel='';
      } else {
        // Weekly bucket
        var bud=getWB(week.id,bucket);
        spent=purchases.reduce(function(s,p){return s+(parseFloat(p.amt)||0)},0);
        remaining=bud-spent;
        pctB=bud>0?Math.min(100,(spent/bud)*100):0;
        bcolor=pctB>=100?'#E63946':pctB>=80?'#FFB703':'#2EC4B6';
        bpctCls=pctB>=100?'over':pctB>=80?'warn':'';
        remLabel=bud>0?(remaining>=0?fmt$(remaining)+' left':fmt$(Math.abs(remaining))+' over'):spent>0?fmt$(spent)+' spent':'';
      }

      h+='<div class="bucket-card"><div class="bucket-header" data-ok="'+ok+'">'
        +'<div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'
        +'<span class="bucket-name-txt">'+esc(bucket)+'</span>';

      if(cycleLabel){
        var badgeCls=bwState&&bwState.pos===1?'w1':bwState&&bwState.pos===2?'w2':'off';
        h+='<span class="cycle-badge '+badgeCls+'">'+cycleLabel+'</span>';
      }

      h+='</div><div class="bucket-meta">'+purchases.length+' item'+(purchases.length!==1?'s':'');
      if(bwState&&bwState.active){
        h+=' \u00b7 '+fmt$(spent)+' of '+fmt$(available);
      } else if(!isBiweekly(bucket)){
        var bud2=getWB(week.id,bucket);
        if(bud2>0)h+=' \u00b7 '+fmt$(spent)+' of '+fmt$(bud2);
        else if(spent>0)h+=' \u00b7 '+fmt$(spent)+' spent';
      }
      h+='</div></div>'
        +'<div class="bucket-right">'
        +(remLabel?'<span style="font-size:13px;font-weight:700;color:'+(remaining<0&&available>0?'#E63946':available>0?bcolor:'#888')+'">'+remLabel+'</span>':'')
        +'<button class="del-x" data-db="'+bIdx+'">&#215;</button>'
        +'<span class="chevron'+(isOpen?' open':'')+'">&#9662;</span>'
        +'</div></div>';

      // Progress bar
      if(available>0){
        h+='<div style="padding:0 16px 8px"><div class="bar-track"><div class="bar-fill '+bpctCls+'" style="width:'+pctB+'%"></div></div></div>';
      }

      if(isOpen){
        h+='<div class="bucket-body">';

        if(isBiweekly(bucket)){
          // Biweekly settings
          var cyc=S.bwCycles[bucket]||{};
          h+='<div class="budget-row"><span style="font-size:12px;color:#888">Biweekly budget</span>'
            +'<div style="display:flex;align-items:center;gap:4px"><span style="color:#555;font-size:14px">$</span>'
            +'<input type="number" inputmode="decimal" class="budget-inp bw-budget" data-bucket="'+encodeURIComponent(bucket)+'" value="'+(parseFloat(cyc.budgetAmt)||'')+'" placeholder="1000"/>'
            +'</div></div>';

          // Cycle start button
          var anchorWk=cyc.anchorWeekId?WEEKS.find(function(w){return w.id===cyc.anchorWeekId}):null;
          h+='<button style="background:#1a1a3a;border:1.5px solid #2a2a4a;border-radius:8px;color:#457B9D;padding:8px 12px;font-size:12px;font-weight:600;cursor:pointer;width:100%;margin-bottom:10px;text-align:left" data-setanchor="'+encodeURIComponent(bucket)+'">'
            +'&#128197; Cycle starts: '+(anchorWk?fmtD(anchorWk.weekStart)+' (tap to move to current week)':'Tap to start cycle on this week')
            +'</button>';

          // Week 2 rollover override
          if(bwState&&bwState.active&&bwState.pos===2){
            h+='<div class="rollover-strip"><span style="font-size:12px;color:#2EC4B6">Rollover from Week 1</span>'
              +'<div style="display:flex;align-items:center;gap:6px">'
              +'<span style="font-size:11px;color:#2a2a2a">auto: '+fmt$(bwState.autoRollover)+'</span>'
              +'<span style="color:#555;font-size:13px">$</span>'
              +'<input type="number" inputmode="decimal" class="rollover-val" data-rov="'+encodeURIComponent(bucket)+'" data-wid="'+week.id+'" value="'+Math.round(bwState.rollover)+'"/>'
              +'</div></div>';
          }

          // End-of-cycle savings panel (show at end of week 2 if there's leftover)
          if(bwState&&bwState.active&&bwState.pos===2&&bwState.remaining>0){
            h+='<div class="savings-panel">'
              +'<div class="savings-panel-title">&#10024; '+fmt$(bwState.remaining)+' left at end of cycle — move to savings?</div>';
            if(S.savingsGoals&&S.savingsGoals.length){
              S.savingsGoals.forEach(function(g,gi){
                var saved=(cyc.savedAmounts&&cyc.savedAmounts[week.id]&&cyc.savedAmounts[week.id][gi])||0;
                h+='<div class="savings-goal-row"><span class="savings-goal-name">'+esc(g.name)+'</span>'
                  +'<div style="display:flex;align-items:center;gap:4px"><span style="color:#555;font-size:13px">$</span>'
                  +'<input type="number" inputmode="decimal" class="savings-goal-input" data-bucket="'+encodeURIComponent(bucket)+'" data-goalidx="'+gi+'" data-wid="'+week.id+'" value="'+(saved||'')+'" placeholder="0"/>'
                  +'</div></div>';
              });
            } else {
              h+='<div style="font-size:12px;color:#555;margin-bottom:8px">No savings goals yet — add one below</div>';
            }
            h+='<div style="margin-top:8px"><input type="text" class="field" id="new-goal-inp" placeholder="New savings goal name..." style="margin-bottom:6px"/>'
              +'<button class="savings-commit-btn" id="add-goal-btn">+ Add Goal</button></div></div>';
          }
        } else {
          // Weekly bucket budget
          var bud3=getWB(week.id,bucket);
          h+='<div class="budget-row"><span style="font-size:12px;color:#888">Budget this week</span>'
            +'<div style="display:flex;align-items:center;gap:4px"><span style="color:#555;font-size:14px">$</span>'
            +'<input type="number" inputmode="decimal" class="budget-inp weekly-budget" data-bkt="'+encodeURIComponent(bucket)+'" data-wid="'+week.id+'" value="'+(bud3||'')+'" placeholder="0"/>'
            +'</div></div>';
        }

        // Purchases
        if(purchases.length){
          h+='<div style="border-top:1px solid #1e1e1e">';
          purchases.forEach(function(p){
            h+='<div class="purchase-item"><div class="purchase-info"><div class="purchase-name">'+esc(p.name)+'</div>'
              +'<div class="purchase-sub">'+p.date+(p.note?' \u00b7 '+esc(p.note):'')+'</div></div>'
              +'<div style="display:flex;align-items:center;gap:8px"><div class="purchase-amt">\u2013'+fmtDec(p.amt)+'</div>'
              +'<button class="del-x" data-dp="'+p.id+'">&#215;</button></div></div>';
          });
          h+='</div>';
        } else {
          h+='<div style="font-size:12px;color:#2a2a2a;padding:6px 0 4px">No purchases yet</div>';
        }
        h+='<button class="add-purchase-btn" data-ab="'+bIdx+'">+ Log Purchase</button></div>';
      }
      h+='</div>';
    });

    // Money left card
    // Note: for biweekly week 2, income is NOT reduced — rollover is invisible to income math
    h+='<div class="excess-card'+(isOver?' over':'')+'">'
      +'<div style="display:flex;justify-content:space-between;align-items:flex-start">'
      +'<div><div class="lbl">'+(isOver?'Over Income':'Money Left')+'</div>'
      +'<div class="excess-big'+(isOver?' over':'')+'">'+(ex>=0?'+':'\u2013')+fmt$(ex)+'</div>'
      +'<div style="font-size:12px;color:#555;margin-top:2px">'+fmt$(inc.total)+' in \u2014 '+fmt$(deductions)+' allocated</div>'
      +'</div>'
      +(inc.total>0?'<div style="text-align:right"><div class="lbl">Allocated</div><div style="font-size:28px;font-weight:700">'+Math.round(pct)+'%</div><div class="bar-track" style="width:72px;margin-top:6px"><div class="bar-fill'+(isOver?' over':'')+'" style="width:'+pct+'%"></div></div></div>':'')
      +'</div></div>';

    // Savings goals summary
    if(S.savingsGoals&&S.savingsGoals.length){
      h+='<div class="card"><div class="lbl">Savings Goals</div>';
      S.savingsGoals.forEach(function(g,gi){
        var pctG=g.target>0?Math.min(100,(g.saved/g.target)*100):0;
        h+='<div style="padding:8px 0;border-bottom:1px solid #1e1e1e"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px">'
          +'<span style="font-size:13px;font-weight:600">'+esc(g.name)+'</span>'
          +'<span style="font-size:12px;color:#888">'+fmt$(g.saved)+(g.target>0?' / '+fmt$(g.target):'')+'</span>'
          +'</div><div class="bar-track"><div class="bar-fill" style="width:'+pctG+'%;background:#8338EC"></div></div></div>';
      });
      h+='</div>';
    }

    // All weeks summary
    var rows=WEEKS.filter(function(w){var i=getWeekIncome(w);return i.total>0||getWeekIncomeDeductions(w.id)>0});
    if(rows.length){
      h+='<div class="card"><div class="lbl">All Weeks</div>';
      rows.forEach(function(w){
        var i=getWeekIncome(w);var d2=getWeekIncomeDeductions(w.id);var e2=i.total-d2;
        h+='<div class="run-row'+(w.id===activeWeek?' sel':'')+'" data-wid="'+w.id+'">'
          +'<div style="font-size:12px">'+fmtD(w.weekStart)+'</div>'
          +'<div style="display:flex;gap:14px;font-size:12px">'
          +(i.total>0?'<span style="color:#2EC4B6">+'+fmt$(i.total)+'</span>':'')
          +(d2>0?'<span style="color:#555">\u2013'+fmt$(d2)+'</span>':'')
          +'<span style="font-weight:600;color:'+(e2>=0?'#2EC4B6':'#E63946')+';min-width:60px;text-align:right">'+(e2>=0?'+':'\u2013')+fmt$(e2)+'</span>'
          +'</div></div>';
      });
      h+='</div>';
    }

    det.innerHTML=h;

    // ── Wire events ───────────────────────────────────────────────────────────
    var bTimers={};

    det.querySelectorAll('.pay-amt-input').forEach(function(inp){
      inp.addEventListener('input',function(e){fbSet('payOverrides/'+week.id+'/'+e.target.dataset.who,parseFloat(e.target.value)||0);});
    });

    det.querySelectorAll('.bucket-header').forEach(function(hdr){
      hdr.addEventListener('click',function(e){
        if(e.target.closest('[data-db],[data-setanchor],.budget-inp,.rollover-val,.savings-goal-input'))return;
        var k=hdr.dataset.ok;openBuckets[k]=!openBuckets[k];renderDetail();
      });
    });

    det.querySelectorAll('[data-db]').forEach(function(btn){
      btn.addEventListener('click',function(e){
        e.stopPropagation();
        var name=S.buckets[parseInt(btn.dataset.db)];
        if(!name||!confirm('Remove "'+name+'"?'))return;
        var list=S.purchases?Object.values(S.purchases):[];
        list.filter(function(p){return p.bucket===name}).forEach(function(p){fbRemove('purchases/'+p.id)});
        fbSet('buckets',S.buckets.filter(function(b){return b!==name}));
      });
    });

    // Biweekly budget amount
    det.querySelectorAll('.bw-budget').forEach(function(inp){
      inp.addEventListener('click',function(e){e.stopPropagation()});
      inp.addEventListener('input',function(e){
        var b=decodeURIComponent(e.target.dataset.bucket);
        var val=parseFloat(e.target.value)||0;
        clearTimeout(bTimers['bw_'+b]);
        bTimers['bw_'+b]=setTimeout(function(){fbSet('bwCycles/'+b+'/budgetAmt',val)},600);
      });
    });

    // Set cycle anchor
    det.querySelectorAll('[data-setanchor]').forEach(function(btn){
      btn.addEventListener('click',function(e){
        e.stopPropagation();
        var b=decodeURIComponent(btn.dataset.setanchor);
        fbSet('bwCycles/'+b+'/anchorWeekId',activeWeek);
      });
    });

    // Rollover override
    det.querySelectorAll('.rollover-val').forEach(function(inp){
      inp.addEventListener('click',function(e){e.stopPropagation()});
      inp.addEventListener('input',function(e){
        var b=decodeURIComponent(e.target.dataset.rov);
        var wid=e.target.dataset.wid;
        var val=parseFloat(e.target.value)||0;
        clearTimeout(bTimers['rov_'+b]);
        bTimers['rov_'+b]=setTimeout(function(){fbSet('bwCycles/'+b+'/rolloverOverrides/'+wid,val)},600);
      });
    });

    // Weekly budget
    det.querySelectorAll('.weekly-budget').forEach(function(inp){
      inp.addEventListener('click',function(e){e.stopPropagation()});
      inp.addEventListener('input',function(e){
        var bkt=decodeURIComponent(e.target.dataset.bkt);
        var wid=e.target.dataset.wid;
        var key=encodeURIComponent(bkt).replace(/%/g,'_');
        var val=parseFloat(e.target.value)||0;
        clearTimeout(bTimers[key]);
        bTimers[key]=setTimeout(function(){fbSet('weekBudgets/'+wid+'/'+key,val)},600);
      });
    });

    // Savings goal amount inputs
    det.querySelectorAll('.savings-goal-input').forEach(function(inp){
      inp.addEventListener('input',function(e){
        var b=decodeURIComponent(e.target.dataset.bucket);
        var gi=e.target.dataset.goalidx;
        var wid=e.target.dataset.wid;
        var val=parseFloat(e.target.value)||0;
        clearTimeout(bTimers['sg_'+gi]);
        bTimers['sg_'+gi]=setTimeout(function(){
          fbSet('bwCycles/'+b+'/savedAmounts/'+wid+'/'+gi,val);
          // Also add to goal's saved total
          var goal=S.savingsGoals[parseInt(gi)];
          if(goal){fbSet('savingsGoals/'+gi+'/saved',(parseFloat(goal.saved)||0)+val);}
        },600);
      });
    });

    // Add savings goal
    var ngi=det.querySelector('#new-goal-inp'),agb=det.querySelector('#add-goal-btn');
    if(agb)agb.addEventListener('click',function(){
      var n=(ngi&&ngi.value||'').trim();if(!n)return;
      var goals=(S.savingsGoals||[]).concat([{name:n,saved:0,target:0}]);
      if(ngi)ngi.value='';
      fbSet('savingsGoals',goals);
    });

    // Add purchase
    det.querySelectorAll('[data-ab]').forEach(function(btn){
      btn.addEventListener('click',function(e){e.stopPropagation();var b=S.buckets[parseInt(btn.dataset.ab)];if(b)openModal(b,activeWeek);});
    });

    // Delete purchase
    det.querySelectorAll('[data-dp]').forEach(function(btn){
      btn.addEventListener('click',function(e){e.stopPropagation();if(!confirm('Delete this purchase?'))return;fbRemove('purchases/'+btn.dataset.dp);});
    });

    // Add bucket
    var nbi=det.querySelector('#nbi'),abb=det.querySelector('#abb');
    if(abb)abb.addEventListener('click',function(){
      var n=(nbi&&nbi.value||'').trim();if(!n||S.buckets.indexOf(n)>=0)return;
      openBuckets[week.id+'__'+n]=true;if(nbi)nbi.value='';
      fbSet('buckets',S.buckets.concat([n]));
    });
    if(nbi)nbi.addEventListener('keydown',function(e){if(e.key==='Enter'&&abb)abb.click()});

    det.querySelectorAll('.run-row').forEach(function(r){
      r.addEventListener('click',function(){activeWeek=r.dataset.wid;renderAll()});
    });
  }

  if('serviceWorker'in navigator)window.addEventListener('load',function(){navigator.serviceWorker.register('sw.js').catch(function(){})});

} // end initApp
})();
</script>
</body>
</html>
