(function(){
var K="kb_install_hide",ua=navigator.userAgent||"";
function standalone(){try{return matchMedia("(display-mode: standalone)").matches||navigator.standalone===true}catch(e){return false}}
if(standalone()) return;
var ios=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1);
var isAnd=/Android/.test(ua);
var inapp=/FBAN|FBAV|Instagram|WhatsApp|Line\/|TikTok|; wv\)/.test(ua);
function hidden(){
  try{
    var v=localStorage.getItem(K);
    if(!v) return false;
    if(v==="forever") return true;
    return Date.now()-(+v) < 2*864e5;
  }catch(e){return false}
}
function hide(v){try{localStorage.setItem(K,v)}catch(e){}}
if(hidden()) return;
var deferred=null,box=null,shown=false;
var P='<rect x="10" y="4" width="100" height="142" rx="14" fill="#F1EFE8" stroke="#888780" stroke-width="1"/>';
var ST='fill="#FAEEDA" stroke="#854F0B" stroke-width="1.2"';
function svg(b){return '<svg viewBox="0 0 120 150" width="100%" role="img" aria-hidden="true">'+P+b+'</svg>'}
function bar(x,w){return '<rect x="'+x+'" y="16" width="'+w+'" height="16" rx="8" '+ST+'/><text x="'+(x+w/2)+'" y="27" text-anchor="middle" font-size="8" fill="#633806" font-family="sans-serif">kneelbooks</text>'}
var kneel='<g transform="translate(60 72)"><ellipse cx="0" cy="-18" rx="9" ry="11" fill="#2C2C2A"/><path d="M-12 -2 C-18 8 -10 22 4 28 C12 32 18 30 20 22 C16 18 8 12 4 0 Z" fill="#2C2C2A"/><path d="M4 28 C10 34 18 38 24 34 C20 28 10 24 4 22 Z" fill="#2C2C2A"/><ellipse cx="0" cy="46" rx="32" ry="3" fill="none" stroke="#2C2C2A" stroke-width="0.8"/></g>';
var dots='<circle cx="94" cy="24" r="10" '+ST+'/><circle cx="94" cy="19" r="1.6" fill="#854F0B"/><circle cx="94" cy="24" r="1.6" fill="#854F0B"/><circle cx="94" cy="29" r="1.6" fill="#854F0B"/>';
var anSteps=[
 ["1. Open in Chrome","in this browser",svg(bar(20,80)+kneel)],
 ["2. Tap the menu","three dots top right",svg('<rect x="20" y="16" width="62" height="16" rx="8" fill="#F1EFE8" stroke="#B4B2A9"/>'+dots+kneel)],
 ["3. Install app","Tap Install",svg('<rect x="18" y="14" width="84" height="116" rx="8" fill="#fff" stroke="#B4B2A9"/><text x="60" y="32" text-anchor="middle" font-size="8" fill="#5F5E5A">History</text><rect x="22" y="58" width="76" height="22" rx="6" '+ST+'/><text x="60" y="72" text-anchor="middle" font-size="9" font-weight="bold" fill="#633806">Install app</text><text x="60" y="98" text-anchor="middle" font-size="8" fill="#5F5E5A">Add to Home screen</text>')],
 ["4. Open from home","tap the icon",svg('<g opacity="0.5"><rect x="22" y="18" width="20" height="20" rx="6" fill="#D3D1C7"/><rect x="50" y="18" width="20" height="20" rx="6" fill="#D3D1C7"/><rect x="78" y="18" width="20" height="20" rx="6" fill="#D3D1C7"/><rect x="22" y="48" width="20" height="20" rx="6" fill="#D3D1C7"/><rect x="50" y="48" width="20" height="20" rx="6" fill="#D3D1C7"/><rect x="78" y="48" width="20" height="20" rx="6" fill="#D3D1C7"/></g><rect x="45" y="84" width="30" height="30" rx="9" fill="#0b0b0b"/><g transform="translate(60 99) scale(0.6)"><path d="M-6 -10 C-8 -4 -4 4 2 7 C6 9 9 8 10 5 C8 3 4 0 2 -4 Z" fill="white"/><circle cx="0" cy="-10" r="4" fill="white"/></g><text x="60" y="128" text-anchor="middle" font-size="7" font-weight="bold" fill="#1a1a1a">Kneelbooks</text>')]
];
var share='<g><rect x="53" y="122" width="14" height="12" rx="2" fill="none" stroke="#854F0B" stroke-width="1.6"/><path d="M60 126V111M55 115l5-5 5 5" fill="none" stroke="#854F0B" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></g>';
var iosSteps=[
 ["1. Open in Safari","tap to paste link",svg(bar(20,80)+kneel)],
 ["2. Tap Share","square with arrow",svg(kneel+'<rect x="10" y="115" width="100" height="26" rx="0" fill="#fff" opacity=".9"/><circle cx="60" cy="125" r="11" '+ST+'/>'+'<g transform="translate(0 -3)">'+share+'</g>')],
 ["3. Add to Home","then tap Add",svg('<rect x="18" y="14" width="84" height="116" rx="8" fill="#fff" stroke="#B4B2A9"/><text x="60" y="32" text-anchor="middle" font-size="7" fill="#5F5E5A">Add Bookmark</text><rect x="22" y="52" width="76" height="26" rx="7" '+ST+'/><text x="60" y="62" text-anchor="middle" font-size="7" font-weight="bold" fill="#633806">Add to Home</text><text x="60" y="71" text-anchor="middle" font-size="7" font-weight="bold" fill="#633806">Screen</text><text x="60" y="100" text-anchor="middle" font-size="7" fill="#5F5E5A">Find on Page</text>')]
];
var WIN='<rect x="6" y="22" width="108" height="104" rx="8" fill="#F1EFE8" stroke="#888780"/><circle cx="16" cy="30" r="2" fill="#B4B2A9"/><circle cx="23" cy="30" r="2" fill="#B4B2A9"/><circle cx="30" cy="30" r="2" fill="#B4B2A9"/>';
function svgW(b){return '<svg viewBox="0 0 120 150" width="100%" role="img" aria-hidden="true">'+WIN+b+'</svg>'}
var URL='<rect x="12" y="38" width="96" height="14" rx="7" fill="#fff" stroke="#B4B2A9"/>';
var dkSteps=[
 ["1. Find the icon","right end of address bar",svgW(URL+'<circle cx="98" cy="45" r="9" '+ST+'/><path d="M98 40v8m-3-3l3 3 3-3" fill="none" stroke="#854F0B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>'+'<rect x="16" y="64" width="88" height="10" rx="5" fill="#D3D1C7"/><rect x="16" y="80" width="64" height="10" rx="5" fill="#D3D1C7"/>')],
 ["2. Click Install","in the small box",svgW(URL+'<rect x="40" y="56" width="66" height="52" rx="8" fill="#fff" stroke="#B4B2A9"/><text x="73" y="70" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#1a1a1a">Install app?</text><rect x="48" y="84" width="50" height="16" rx="8" '+ST+'/><text x="73" y="94" text-anchor="middle" font-size="7.5" font-weight="bold" fill="#633806">Install</text>')],
 ["3. Open the app","from desktop or Start",svgW('<rect x="16" y="40" width="20" height="20" rx="6" fill="#D3D1C7"/><rect x="46" y="40" width="20" height="20" rx="6" fill="#D3D1C7"/><rect x="76" y="40" width="20" height="20" rx="6" fill="#D3D1C7"/><rect x="40" y="72" width="30" height="30" rx="9" fill="#0b0b0b"/><g transform="translate(55 87) scale(0.6)"><path d="M-6 -10 C-8 -4 -4 4 2 7 C6 9 9 8 10 5 C8 3 4 0 2 -4 Z" fill="white"/><circle cx="0" cy="-10" r="4" fill="white"/></g>')]
];
function cards(a){return a.map(function(c){return '<div style="background:#faf9f5;border:1px solid rgba(0,0,0,.07);border-radius:16px;padding:8px 8px 10px;text-align:center"><div style="max-width:110px;margin:0 auto">'+c[2]+'</div><div style="font-size:12.5px;font-weight:600;color:#1a1a1a;margin-top:4px">'+c[0]+'</div><div style="font-size:11.5px;color:rgba(0,0,0,.55);margin-top:1px">'+c[1]+'</div></div>'}).join("")}
function close(v){if(v)hide(v);if(box){box.remove();box=null}}
function show(){
 if(shown||box) return;
 shown=true;
 try{window.KBT&&window.KBT("install/popup-shown-"+(ios?"ios":isAnd?"android":"desktop"))}catch(e){}
 var dsk=!ios&&!isAnd;
 var steps=ios?iosSteps:(dsk?dkSteps:anSteps);
 var cols=(ios||dsk)?3:2;
 var browserName=ios?"Safari":isAnd?"Chrome":"Chrome";
 box=document.createElement("div");
 box.setAttribute("role","dialog");
 box.setAttribute("aria-label","Install Kneelbooks");
 box.style.cssText="position:fixed;inset:0;z-index:2147483000;background:rgba(15,20,30,.45);display:flex;align-items:flex-end;justify-content:center;padding:12px;font-family:Inter,system-ui,sans-serif;animation:kbFade .22s ease";
 var note=inapp?'<div style="margin-top:12px;padding:10px 12px;border-radius:12px;background:#FAEEDA;color:#633806;font-size:12.5px;line-height:1.45">You are in an in-app browser. Tap the menu and choose <b>Open in '+browserName+'</b> first, then follow the steps below.</div>':"";
 var chromeNote=!ios&&!inapp?'<div style="margin-top:10px;font-size:11.5px;color:rgba(0,0,0,.5);text-align:center">Works on Chrome, Edge, and Safari. No App Store needed.</div>':"";
 box.innerHTML='<div style="width:100%;max-width:440px;max-height:92vh;overflow:auto;background:rgba(255,255,255,.84);backdrop-filter:blur(30px) saturate(180%);-webkit-backdrop-filter:blur(30px) saturate(180%);border:1px solid rgba(255,255,255,.8);border-radius:24px;padding:18px;box-shadow:0 24px 80px rgba(0,0,0,.25)">'
 +'<div style="display:flex;align-items:center;gap:12px"><img src="icon-192.png" alt="" width="44" height="44" style="border-radius:12px;flex:none;background:#0b0b0b"><div style="flex:1;min-width:0"><div style="font-size:16px;font-weight:600;color:#1a1a1a">Install Kneelbooks</div><div style="font-size:12.5px;color:rgba(0,0,0,.55);line-height:1.4">Add it to your home screen. Opens full screen, no browser bar.</div></div><button id="kbx" aria-label="Close" style="flex:none;width:30px;height:30px;border-radius:50%;border:none;background:rgba(0,0,0,.06);font-size:18px;line-height:1;cursor:pointer;color:#1a1a1a">×</button></div>'
 +'<div style="display:grid;grid-template-columns:repeat('+cols+',1fr);gap:8px;margin-top:14px">'+cards(steps)+'</div>'+note+chromeNote
 +'<button id="kbi" style="display:none;width:100%;margin-top:14px;height:44px;border:none;border-radius:999px;background:#0b0b0b;color:#fff;font-size:14px;font-weight:600;cursor:pointer">Install now</button>'
 +'<div style="display:flex;justify-content:space-between;margin-top:12px"><button id="kbn" style="border:none;background:none;color:rgba(0,0,0,.6);font-size:13px;cursor:pointer;padding:6px 2px">Not now</button><button id="kbf" style="border:none;background:none;color:rgba(0,0,0,.45);font-size:12px;text-decoration:underline;cursor:pointer;padding:6px 2px">Don\u2019t show again</button></div></div>';
 document.body.appendChild(box);
 box.addEventListener("click",function(e){if(e.target===box)close(String(Date.now()))});
 box.querySelector("#kbx").onclick=box.querySelector("#kbn").onclick=function(){close(String(Date.now()))};
 box.querySelector("#kbf").onclick=function(){close("forever")};
 refresh();
}
function refresh(){
 if(!box) return;
 var b=box.querySelector("#kbi");
 if(!b) return;
 if(deferred){
   b.style.display="block";
   b.onclick=function(){
     try{window.KBT&&window.KBT("install/install-now-tap")}catch(e){}
     deferred.prompt();
     deferred.userChoice.then(function(choice){
       deferred=null;
       if(choice.outcome==="accepted"){close("forever"); try{window.KBT&&window.KBT("install/accepted")}catch(e){}}
       else{close(String(Date.now()))}
     }).catch(function(){deferred=null;close(String(Date.now()))});
   };
 }
}
addEventListener("beforeinstallprompt",function(e){
 e.preventDefault();
 deferred=e;
 if(box) refresh();
 else if(!ios) tryShow();
});
addEventListener("appinstalled",function(){
 try{window.KBT&&window.KBT("install/installed")}catch(e){}
 close("forever");
});
function tryShow(){
 if(document.getElementById("kbw")||document.getElementById("kbl")){setTimeout(tryShow,800);return}
 show();
}
setTimeout(tryShow, 1200);
window.KBInstall={show:function(){ show(); }, close:close};
})();