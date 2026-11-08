'use strict';
/** EDIT THESE SAMPLE PRICES BEFORE LAUNCH. Prices are demonstration values, not actual business offers. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.SiistiPricing=api;})(typeof window!=='undefined'?window:null,function(){
 const DEMO_RATES=Object.freeze({hourly:{rate:43,minHours:2},fixed:{base:149,includedHours:3,extraRate:39},monthly:{base:189,includedHours:4,extraRate:39},contract:{base:549,includedHours:12,extraRate:35},oneTime:{base:179,includedHours:3,extraRate:49}});
 const extras=Object.freeze({windows:29,oven:24,fridge:19,sofa:39});
 const serviceMultipliers={standard:1,deep:1.55,move:1.45,office:1.12,carpet:1.25,sofa:1.22};
 function money(n){return Math.round(n*100)/100}
 function calculate(x={}){
  const model=Object.hasOwn(DEMO_RATES,x.model)?x.model:'hourly';
  const area=Number(x.area);
  if(!Number.isFinite(area)||area<10||area>1000)throw Error('Area must be between 10 and 1000 square metres');
  const service=Object.hasOwn(serviceMultipliers,x.service)?x.service:'standard';
  const extraIds=Array.isArray(x.extras)?[...new Set(x.extras.filter(k=>Object.hasOwn(extras,k)))]:[];
  const hours=Math.ceil(Math.max(2,(.65+area/35)*serviceMultipliers[service])*2)/2;
  const p=DEMO_RATES[model];let base=0,unit='visit',visits=1;
  if(model==='hourly')base=Math.max(hours,p.minHours)*p.rate;
  else if(model==='fixed'||model==='oneTime')base=p.base+Math.max(0,hours-p.includedHours)*p.extraRate;
  else if(model==='monthly'){unit='month';base=p.base+Math.max(0,hours-p.includedHours)*p.extraRate;}
  else if(model==='contract'){unit='month';visits=4;base=p.base+Math.max(0,hours*4-p.includedHours)*p.extraRate;}
  const extraTotal=extraIds.reduce((sum,k)=>sum+extras[k],0)*(model==='contract'?visits:1);
  const subtotal=money(base+extraTotal);
  return {model,service,area,hours,visits,unit,extras:extraIds,base:money(base),extrasTotal:money(extraTotal),total:subtotal,currency:'EUR',demo:true};
 }
 return {DEMO_RATES,extras,serviceMultipliers,calculate,money};
});
