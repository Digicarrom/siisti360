'use strict';
(()=>{
 const $=id=>document.getElementById(id);
 const I=window.SITE_I18N||{};
 const shade=$('mobileShade'),sidebar=$('sidebar'),menu=$('menuToggle');
 const closeNav=()=>{sidebar?.classList.remove('open');shade?.classList.remove('show');menu?.setAttribute('aria-expanded','false');document.body.style.overflow=''};
 menu?.addEventListener('click',()=>{const open=!sidebar.classList.contains('open');sidebar.classList.toggle('open',open);shade?.classList.toggle('show',open);menu.setAttribute('aria-expanded',String(open));document.body.style.overflow=open?'hidden':'';if(open)sidebar.querySelector('a')?.focus()});
 shade?.addEventListener('click',closeNav);
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav()});
 sidebar?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
 $('localeSwitcher')?.addEventListener('change',e=>{window.location.assign(e.target.value)});
 // Service listing: instant search + category filters without a page reload.
 const search=$('serviceSearch'),filters=$('serviceFilters'),cards=[...document.querySelectorAll('#filterResults .service-card')],empty=$('noServiceResults');let filter='all';
 function filterServices(){let shown=0;const q=(search?.value||'').trim().toLocaleLowerCase();for(const card of cards){const ok=(filter==='all'||card.dataset.category===filter)&&(!q||(card.dataset.search||'').toLocaleLowerCase().includes(q));card.hidden=!ok;if(ok)shown++;}if(empty)empty.hidden=shown!==0;}
 search?.addEventListener('input',filterServices);
 filters?.addEventListener('click',e=>{const btn=e.target.closest('[data-filter]');if(!btn)return;filter=btn.dataset.filter;filters.querySelectorAll('.chip').forEach(c=>c.classList.toggle('active',c===btn));filterServices()});
 // Informational labor-time estimator. It intentionally does not make price claims.
 function estimate(){const area=Number($('calcArea')?.value),type=$('calcService')?.value,out=$('calcNumber');if(!out)return;if(!Number.isFinite(area)||area<10||area>1000){out.textContent='—';return};let base=.55+area/36;const multiplier={standard:1,deep:1.75,move:1.55,office:.9}[type]||1;const low=Math.max(1,Math.round(base*multiplier*2)/2),high=Math.ceil(low*1.45*2)/2;out.textContent=`${String(low).replace('.',',')}–${String(high).replace('.',',')}`;}
 $('calcArea')?.addEventListener('input',estimate);$('calcService')?.addEventListener('change',estimate);estimate();
 // Leads are sent only by the visitor's explicit form submit.
 const form=$('leadForm');if(form){const typeField=$('customerType'),companyField=$('companyField'),companyInput=$('companyName');const updateCompany=()=>{const biz=typeField.value==='business';companyField.hidden=!biz;companyInput.required=biz;if(!biz)companyInput.value=''};typeField.addEventListener('change',updateCompany);updateCompany();const query=new URLSearchParams(location.search);for(const field of ['service','city']){const value=query.get(field),el=$(field);if(value&&el&&[...el.options].some(x=>x.value===value))el.value=value;}
 const date=$('preferredDate');if(date){const today=new Date();const y=today.getFullYear(),m=String(today.getMonth()+1).padStart(2,'0'),d=String(today.getDate()).padStart(2,'0');date.min=`${y}-${m}-${d}`;}
 form.addEventListener('submit',async e=>{e.preventDefault();const status=$('formStatus'),button=$('submitLead'),f=new FormData(form);status.hidden=true;status.classList.remove('error');const email=String(f.get('email')||'').trim(),phone=String(f.get('phone')||'').trim();
 if(!form.checkValidity()){form.reportValidity();return;}if(!email&&!phone){status.textContent=window.SITE_LANG==='sv'?'Ange telefonnummer eller e-post.':window.SITE_LANG==='en'?'Enter a phone number or email.':'Anna puhelinnumero tai sähköposti.';status.classList.add('error');status.hidden=false;return;}
 if((f.get('contactPreference')==='email'&&!email)||(f.get('contactPreference')==='phone'&&!phone)){status.textContent=window.SITE_LANG==='sv'?'Ange kontaktuppgiften för valt kontaktsätt.':window.SITE_LANG==='en'?'Enter the contact details for your selected contact method.':'Anna valitsemasi yhteydenottotavan yhteystieto.';status.classList.add('error');status.hidden=false;return;}
 const payload=Object.fromEntries(f.entries());payload.lang=window.SITE_LANG||'fi';payload.privacyConsent=f.get('privacyConsent')==='true';payload.marketingConsent=f.get('marketingConsent')==='true';
 // File-based preview has no server/API. Never claim an inquiry was delivered.
 if(window.SITE_STATIC_MODE){
   const messages={fi:'Tämä on verkkosivun esikatselu. Tietoja ei lähetetty eikä tallennettu. Käynnistä palvelin komennolla npm start vastaanottaaksesi oikeita tarjouspyyntöjä.',sv:'Detta är en förhandsvisning av webbplatsen. Inga uppgifter skickades eller sparades. Starta servern med npm start för att ta emot riktiga offertförfrågningar.',en:'This is a website preview. No information was sent or saved. Run npm start to receive real customer inquiries.'};
   status.textContent=messages[window.SITE_LANG]||messages.fi;status.hidden=false;status.scrollIntoView({behavior:'smooth',block:'center'});return;
 }
 button.disabled=true;button.textContent=I.sending||'Sending…';
 try{const res=await fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const result=await res.json();if(!res.ok||!result.ok)throw Error(result.error||'Failed');status.textContent=I.success||'Request received';status.hidden=false;form.reset();status.scrollIntoView({behavior:'smooth',block:'center'});}
 catch(err){status.textContent=I.error||'Could not send request';status.classList.add('error');status.hidden=false;}
 finally{button.disabled=false;button.textContent=I.send||'Send quote request'}
 });}
})();
