'use strict';
/** Zero-dependency, multilingual cleaning lead-gen website. Node.js >=20. */
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {config,services,cities,languages}=require('./content');
const {render,parseRoute,sitemap}=require('./render');
const Pricing=require('./assets/pricing-engine');
const PORT=Number(process.env.PORT)||3000;
const HOST=process.env.HOST||'127.0.0.1';
const DATA_FILE=path.resolve(process.env.LEADS_FILE||path.join(__dirname,'data','leads.jsonl'));
const REVIEWS_FILE=path.resolve(process.env.REVIEWS_FILE||path.join(__dirname,'data','reviews.json'));
const BOOKING_SLOTS=['09:00','11:00','13:00','15:00'];
const ASSET_DIR=path.join(__dirname,'public','assets');
const rateLimit=new Map();
const statusAllowed=new Set(['new','contacted','qualified','quoted','won','lost']);
const MAX_REQUEST=16000;
const MIME={'.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.ico':'image/x-icon','.png':'image/png'};
function send(res,status,type,body,headers={}){res.writeHead(status,{'Content-Type':type,'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','X-Frame-Options':'DENY','Permissions-Policy':'camera=(), microphone=(), geolocation=()','Cache-Control':'no-store',...headers});res.end(body)}
function json(res,status,body){send(res,status,'application/json; charset=utf-8',JSON.stringify(body))}
function readLeads(){try{return fs.readFileSync(DATA_FILE,'utf8').split('\n').filter(Boolean).map(line=>JSON.parse(line))}catch(e){if(e.code==='ENOENT')return [];throw e}}
function saveLead(lead){fs.mkdirSync(path.dirname(DATA_FILE),{recursive:true,mode:0o700});fs.appendFileSync(DATA_FILE,JSON.stringify(lead)+'\n',{encoding:'utf8',mode:0o600});}
function replaceLeads(leads){const temp=DATA_FILE+'.'+crypto.randomBytes(4).toString('hex')+'.tmp';fs.writeFileSync(temp,leads.map(l=>JSON.stringify(l)).join('\n')+'\n',{mode:0o600});fs.renameSync(temp,DATA_FILE)}
function auth(req){const token=process.env.ADMIN_TOKEN;if(!token||token.length<16)return false;const bearer=(req.headers.authorization||'').replace(/^Bearer\s+/i,'');const a=Buffer.from(bearer),b=Buffer.from(token);return a.length===b.length&&crypto.timingSafeEqual(a,b)}
function str(v,max=120){return typeof v==='string'?v.trim().slice(0,max):''}
function validEmail(s){return !s||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)}
function validPhone(s){return !s||/^[+()0-9 .-]{6,40}$/.test(s)}
function checkLead(x){if(!x||Array.isArray(x)||typeof x!=='object')return 'Invalid payload';if(str(x.website))return 'Spam blocked';if(x.privacyConsent!==true)return 'Privacy consent required';if(!languages.includes(x.lang))return 'Invalid language';if(!services.some(s=>s.id===x.service))return 'Invalid service';if(!cities.some(c=>c.id===x.city))return 'Invalid city';if(!['home','business'].includes(x.customerType))return 'Invalid customer type';if(x.customerType==='business'&&str(x.companyName,140).length<2)return 'Company name required';if(!['once','weekly','biweekly','monthly'].includes(x.frequency))return 'Invalid frequency';if(!['phone','email'].includes(x.contactPreference))return 'Invalid contact preference';if(str(x.name).length<2||str(x.name).length>100)return 'Name is required';const email=str(x.email,160),phone=str(x.phone,40);if(!email&&!phone)return 'Phone or email required';if(!validEmail(email)||!validPhone(phone))return 'Invalid contact details';if(x.contactPreference==='phone'&&!phone||x.contactPreference==='email'&&!email)return 'Preferred contact detail missing';if(x.postcode&& !/^\d{5}$/.test(str(x.postcode)))return 'Invalid postal code';if(x.size&&(!(Number(x.size)>=10&&Number(x.size)<=50000)||!Number.isFinite(Number(x.size))))return 'Invalid size';if(x.preferredDate&&!/^\d{4}-\d{2}-\d{2}$/.test(x.preferredDate))return 'Invalid date';return null}
function collect(req){return new Promise((resolve,reject)=>{let chunks=[],n=0;req.on('data',c=>{n+=c.length;if(n>MAX_REQUEST){reject(Object.assign(Error('Request too large'),{status:413}));req.destroy();return;}chunks.push(c)});req.on('end',()=>{try{resolve(JSON.parse(Buffer.concat(chunks).toString('utf8')))}catch{reject(Object.assign(Error('Invalid JSON'),{status:400}))}});req.on('error',reject)})}
function rateOK(req){const key=(req.socket.remoteAddress||'unknown');const now=Date.now();const prev=(rateLimit.get(key)||[]).filter(x=>now-x<3600000);if(prev.length>=15)return false;prev.push(now);rateLimit.set(key,prev);if(rateLimit.size>1500)rateLimit.clear();return true}
async function sendWebhook(lead){const url=process.env.LEAD_WEBHOOK_URL;if(!url)return;try{const parsed=new URL(url);if(parsed.protocol!=='https:')throw Error('Webhook URL must use HTTPS');const headers={'Content-Type':'application/json'};if(process.env.LEAD_WEBHOOK_SECRET)headers['X-Lead-Webhook-Secret']=process.env.LEAD_WEBHOOK_SECRET;const response=await fetch(url,{method:'POST',headers,body:JSON.stringify({event:'lead.created',lead}),signal:AbortSignal.timeout(5000)});if(!response.ok)console.error('Webhook non-2xx:',response.status)}catch(e){console.error('Optional webhook error; lead safely saved:',e.message)}}
function csvCell(v){let s=String(v??'').replace(/"/g,'""');if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s+'"'}
function csv(leads){const cols=['id','createdAt','status','source','lang','customerType','companyName','service','city','postcode','size','frequency','preferredDate','bookingTime','address','pricingModel','estimatedDemoEUR','extras','name','phone','email','contactPreference','message','marketingConsent'];return '\ufeff'+cols.join(',')+'\r\n'+leads.map(x=>cols.map(k=>csvCell(x[k])).join(',')).join('\r\n')}
function todayHelsinki(){const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Helsinki',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',hourCycle:'h23'}).formatToParts(new Date());return Object.fromEntries(parts.map(p=>[p.type,p.value]));}
function bookingSlots(date){if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return [];
 const d=new Date(date+'T12:00:00Z');if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==date||d.getUTCDay()===0)return [];
 const today=todayHelsinki(),day=`${today.year}-${today.month}-${today.day}`;
 const distance=(Date.parse(date+'T00:00:00Z')-Date.parse(day+'T00:00:00Z'))/86400000;
 if(distance<0||distance>120)return [];
 return distance===0?BOOKING_SLOTS.filter(t=>Number(t.slice(0,2))>Number(today.hour)+1):BOOKING_SLOTS;
}
function readReviews(){try{const data=JSON.parse(fs.readFileSync(REVIEWS_FILE,'utf8'));return Array.isArray(data)?data:[]}catch(e){if(e.code==='ENOENT')return [];throw e}}
function writeReviews(data){fs.mkdirSync(path.dirname(REVIEWS_FILE),{recursive:true,mode:0o700});const temp=REVIEWS_FILE+'.'+crypto.randomBytes(5).toString('hex')+'.tmp';fs.writeFileSync(temp,JSON.stringify(data,null,2),{mode:0o600});fs.renameSync(temp,REVIEWS_FILE)}
function adminHTML(){return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Siisti360 — Lead Management</title><link rel="stylesheet" href="/assets/app.css"><style>.admin-layout{max-width:1200px;margin:45px auto;padding:0 18px}.admin-layout h1{font-size:35px}.admin-signin{max-width:490px}.admin-signin label{display:block;margin-bottom:8px;font-size:13px;font-weight:750}.admin-signin input{width:100%;padding:13px;border:1px solid #ccd9e0;border-radius:10px;margin-bottom:13px}.admin-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:22px 0}.admin-stats .stat strong{font-size:28px}.admin-table{overflow-x:auto}.admin-table table{width:100%;border-collapse:collapse;min-width:850px}.admin-table th,.admin-table td{text-align:left;padding:12px;border-bottom:1px solid #e2e9ee;font-size:12px;vertical-align:top}.admin-table th{background:#f4f8fa;white-space:nowrap}.admin-table select{font-size:12px;padding:6px;border:1px solid #d6e3e9;border-radius:8px}.admin-table a{color:#087f72}.admin-head{display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px}.admin-head button{margin:4px}.admin-table td:last-child{max-width:220px;overflow-wrap:anywhere}.admin-error{color:#aa3e27;font-weight:700}@media(max-width:640px){.admin-stats{grid-template-columns:1fr}}</style></head><body><main class="admin-layout"><div class="brand"><a href="/fi/" style="color:#10263d;font-size:27px">✦ Siisti<span>360</span>.</a></div><h1>Lead management</h1><p>Protected dashboard. Tokens are held only in this browser tab, not local storage. Configure ADMIN_TOKEN on the server.</p><div class="panel form-panel admin-signin" id="signin"><label for="adminToken">Administrator token</label><input id="adminToken" type="password" autocomplete="off" placeholder="Enter ADMIN_TOKEN"><button class="btn btn-orange" id="login">Open leads dashboard</button><p class="admin-error" id="loginError" aria-live="polite"></p></div><div id="dashboard" hidden><div class="admin-head"><div><button class="btn btn-white" id="reload">Refresh</button><button class="btn btn-orange" id="export">Export CSV</button></div><button class="btn" id="logout">Sign out</button></div><div class="admin-stats" id="stats"></div><div class="panel form-panel admin-table" id="leads"></div><h2 style="margin-top:30px">Review moderation</h2><p>Approve genuine customer feedback only. Submitted testimonials never auto-publish.</p><div class="panel form-panel admin-table" id="reviewAdmin"></div></div></main><script src="/assets/admin.js" defer></script></body></html>`}
async function handler(req,res){const host=req.headers.host||'localhost',url=new URL(req.url,'http://'+host),pathname=url.pathname;
 try{
 if(req.method==='GET'&&pathname==='/api/health')return json(res,200,{ok:true,service:'siisti360',pages:require('./render').routes.length});
 if(pathname==='/api/booking-slots'&&req.method==='GET'){
  const date=str(url.searchParams.get('date'),10),city=str(url.searchParams.get('city'),30);
  if(!cities.some(c=>c.id===city))return json(res,400,{ok:false,error:'Invalid city'});
  return json(res,200,{ok:true,date,slots:bookingSlots(date),confirmedAvailability:false,notice:'Times are only potential request times, not live-confirmed availability'});
 }
 if(pathname==='/api/bookings'&&req.method==='POST'){
  if(!rateOK(req))return json(res,429,{ok:false,error:'Too many requests'});
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return json(res,415,{ok:false,error:'JSON required'});
  let d;try{d=await collect(req)}catch(e){return json(res,e.status||400,{ok:false,error:e.message})}
  if(!d||Array.isArray(d)||typeof d!=='object'||str(d.website)||d.privacyConsent!==true)return json(res,400,{ok:false,error:'Invalid request or missing privacy consent'});
  if(!languages.includes(d.lang)||!cities.some(c=>c.id===d.city)||!Object.hasOwn(Pricing.DEMO_RATES,d.model)||!Object.hasOwn(Pricing.serviceMultipliers,d.service))return json(res,400,{ok:false,error:'Invalid service / location / price model'});
  if(!Array.isArray(d.extras)||d.extras.length>4||d.extras.some(x=>!Object.hasOwn(Pricing.extras,x)))return json(res,400,{ok:false,error:'Invalid extras'});
  const date=str(d.date,10),time=str(d.time,5);
  if(!bookingSlots(date).includes(time))return json(res,400,{ok:false,error:'Invalid date or requested slot'});
  const name=str(d.name,100),email=str(d.email,160),phone=str(d.phone,40),postcode=str(d.postcode,5),address=str(d.address,220);
  if(name.length<2||!email||!validEmail(email)||!validPhone(phone)||!/^\d{5}$/.test(postcode)||address.length<5)return json(res,400,{ok:false,error:'Missing or invalid contact/address'});
  let estimated;try{estimated=Pricing.calculate({model:d.model,service:d.service,area:d.area,extras:d.extras})}catch(e){return json(res,400,{ok:false,error:e.message})}
  const chosenService={standard:'kotisiivous',deep:'suursiivous',move:'muuttosiivous',office:'toimistosiivous',carpet:'matonpesu',sofa:'sohvan-puhdistus'}[d.service];
  const source='booking-request';
  const lead={id:crypto.randomUUID(),createdAt:new Date().toISOString(),status:'new',source,lang:d.lang,customerType:d.service==='office'?'business':'home',companyName:str(d.companyName,140),service:chosenService,city:d.city,postcode,size:estimated.area,frequency:d.model==='contract'?'weekly':d.model==='monthly'?'monthly':'once',preferredDate:date,bookingTime:time,address,pricingModel:d.model,estimatedDemoEUR:estimated.total,extras:estimated.extras.join(' | '),name,phone,email,contactPreference:'email',message:str(d.notes,1000),privacyConsent:true,marketingConsent:false};
  saveLead(lead);void sendWebhook(lead);
  return json(res,201,{ok:true,reference:lead.id.slice(0,8).toUpperCase(),id:lead.id,confirmed:false,demoEstimate:estimated.total});
 }
 if(pathname==='/api/reviews'&&req.method==='GET'){
  return json(res,200,{ok:true,reviews:readReviews().filter(r=>r.status==='approved').slice(-30).reverse().map(({id,name,rating,text,createdAt})=>({id,name,rating,text,createdAt}))});
 }
 if(pathname==='/api/reviews'&&req.method==='POST'){
  if(!rateOK(req))return json(res,429,{ok:false,error:'Too many requests'});
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return json(res,415,{ok:false,error:'JSON required'});
  let d;try{d=await collect(req)}catch(e){return json(res,e.status||400,{ok:false,error:e.message})}
  if(!d||typeof d!=='object'||Array.isArray(d)||d.consent!==true||str(d.website)||str(d.name,80).length<2||str(d.text,650).length<20||!Number.isInteger(d.rating)||d.rating<1||d.rating>5)return json(res,400,{ok:false,error:'Invalid review or consent'});
  const reviews=readReviews(),review={id:crypto.randomUUID(),createdAt:new Date().toISOString(),name:str(d.name,80),text:str(d.text,650),rating:d.rating,status:'pending'};reviews.push(review);writeReviews(reviews);
  return json(res,201,{ok:true,status:'pending',message:'Review received for moderation'});
 }
 if(pathname==='/api/admin/reviews'&&req.method==='GET'||/^\/api\/admin\/reviews\/[0-9a-f-]{36}$/.test(pathname)&&req.method==='PATCH'){
  if(!auth(req))return json(res,401,{ok:false,error:'Unauthorized'});
  if(req.method==='GET')return json(res,200,{ok:true,reviews:readReviews().slice(-500).reverse()});
  const d=await collect(req);if(!['pending','approved','rejected'].includes(d.status))return json(res,400,{ok:false,error:'Invalid status'});
  const rows=readReviews(),r=rows.find(x=>x.id===pathname.split('/').pop());if(!r)return json(res,404,{ok:false,error:'Review not found'});
  r.status=d.status;r.moderatedAt=new Date().toISOString();writeReviews(rows);return json(res,200,{ok:true,review:r});
 }
 if(pathname==='/api/leads'&&req.method==='POST'){
  if(!rateOK(req))return json(res,429,{ok:false,error:'Rate limit reached'});
  if(!String(req.headers['content-type']||'').startsWith('application/json'))return json(res,415,{ok:false,error:'JSON required'});
  let data;try{data=await collect(req)}catch(e){return json(res,e.status||400,{ok:false,error:e.message})}
  const problem=checkLead(data);if(problem)return json(res,400,{ok:false,error:problem});
  const lead={id:crypto.randomUUID(),createdAt:new Date().toISOString(),status:'new',lang:data.lang,customerType:data.customerType,companyName:str(data.companyName,140),service:data.service,city:data.city,postcode:str(data.postcode,5),size:data.size?Number(data.size):null,frequency:data.frequency,preferredDate:str(data.preferredDate,10),name:str(data.name,100),phone:str(data.phone,40),email:str(data.email,160),contactPreference:data.contactPreference,message:str(data.message,2000),privacyConsent:true,marketingConsent:data.marketingConsent===true};
  saveLead(lead);void sendWebhook(lead);return json(res,201,{ok:true,id:lead.id});
 }
 if(pathname==='/api/admin/leads'&&req.method==='GET'||pathname==='/api/admin/leads.csv'&&req.method==='GET'||/^\/api\/admin\/leads\/[0-9a-f-]{36}$/.test(pathname)&&req.method==='PATCH'){
   if(!auth(req))return json(res,401,{ok:false,error:'Unauthorized'});
   if(pathname==='/api/admin/leads'&&req.method==='GET')return json(res,200,{ok:true,leads:readLeads().slice(-2000).reverse()});
   if(pathname==='/api/admin/leads.csv')return send(res,200,'text/csv; charset=utf-8',csv(readLeads()),{'Content-Disposition':'attachment; filename="siisti360-leads.csv"'});
   const update=await collect(req);if(!statusAllowed.has(update.status))return json(res,400,{ok:false,error:'Unknown status'});
   const leads=readLeads(),lead=leads.find(x=>x.id===pathname.split('/').pop());if(!lead)return json(res,404,{ok:false,error:'Lead not found'});lead.status=update.status;lead.updatedAt=new Date().toISOString();replaceLeads(leads);return json(res,200,{ok:true,lead});
 }
 if(req.method!=='GET'&&req.method!=='HEAD')return json(res,405,{ok:false,error:'Method not allowed'});
 if(pathname==='/'||pathname==='/fi'||pathname==='/sv'||pathname==='/en')return send(res,302,'text/plain','Redirecting',{Location:pathname==='/'?'/fi/':pathname+'/'});
 if(pathname==='/admin'||pathname==='/admin/')return send(res,200,'text/html; charset=utf-8',adminHTML());
 if(pathname==='/ALL_PAGES.html'||pathname==='/all-pages'){
  // In server mode the page inventory targets clean SEO URLs, not static index.html files.
  const directory=fs.readFileSync(path.join(__dirname,'ALL_PAGES.html'),'utf8')
    .replace(/href="((?:fi|sv|en)\/[^"]*?)index\.html"/g,(_,prefix)=>`href="/${prefix}"`)
    .replace('href="index.html"','href="/fi/"');
  return send(res,200,'text/html; charset=utf-8',directory);
 }

 if(pathname==='/robots.txt')return send(res,200,'text/plain; charset=utf-8',`User-agent: *\n${config.domain.includes('example.fi')?'Disallow: /':'Allow: /'}\nDisallow: /admin\nDisallow: /api\nSitemap: ${config.domain.replace(/\/+$/,'')}/sitemap.xml\n`);
 if(pathname==='/sitemap.xml')return send(res,200,'application/xml; charset=utf-8',sitemap());
 if(pathname.startsWith('/assets/')){const fileName=path.basename(pathname);if(fileName!==pathname.slice(8))return json(res,400,{ok:false,error:'Invalid asset'});const file=path.join(ASSET_DIR,fileName);if(!fs.existsSync(file))return json(res,404,{ok:false,error:'Not found'});return send(res,200,MIME[path.extname(file)]||'application/octet-stream',fs.readFileSync(file),{'Cache-Control':'public, max-age=86400'});}
 const route=parseRoute(pathname);if(route){if(pathname!==route.url)return send(res,301,'text/plain','Redirect',{Location:route.url});return send(res,200,'text/html; charset=utf-8',render(route));}
 return send(res,404,'text/html; charset=utf-8',`<!doctype html><html lang="fi"><head><meta charset="utf-8"><meta name="robots" content="noindex"><title>404</title><link rel="stylesheet" href="/assets/app.css"></head><body><main class="admin-layout" style="margin:12vh auto;max-width:560px;padding:30px"><h1>Sivua ei löytynyt / Page not found</h1><p>The requested page does not exist.</p><a href="/fi/" class="btn btn-orange">Etusivu / Home</a></main></body></html>`);
 }catch(err){console.error(err);return json(res,500,{ok:false,error:'Internal server error'})}
}
if(require.main===module)http.createServer(handler).listen(PORT,HOST,()=>console.log(`Siisti360 running on http://${HOST}:${PORT} | ${require('./render').routes.length} pages`));
module.exports={handler,checkLead};
