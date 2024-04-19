(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=t(n);fetch(n.href,s)}})();async function a(e,o,t=75){if(!e)return null;e.textContent="";for(const i of o)await new Promise((n,s)=>{setTimeout(()=>{e.textContent+=i,n()},t)});return{done:!0}}function d(e,o){const t=document.createElement("div");t.classList.add("prompt-item"),t.onclick=()=>o(e.id),t.innerHTML='<i class="fa-solid fa-circle-plus fa-xl"></i>';const i=document.createElement("div");return i.textContent=e.question,t.appendChild(i),t}function l(e){const o=document.getElementById("chat"),t=document.createElement("div");t.classList.add("post-container"),t.innerHTML=`<img class='profile-icon' src='./profile-icon.jpg'></div><div class='message-container'><div class='profile-name'>You</div><div class='message'>${e}</div></div > `,o.append(t)}async function m(e){const o=document.getElementById("chat"),t=document.createElement("div");t.classList.add("post-container");const i=Math.floor(Math.random()*1e6);t.innerHTML=`<img class='profile-icon' src='./gpt.jpg'></div><div class='message-container'><div class='profile-name'>GPT</div><div class='message' id=${i}></div></div>`,o.append(t);const n=document.getElementById(i),s=t.childNodes[0];s.classList.add("gpt-loading"),await a(n,e,30),s.classList.remove("gpt-loading")}const u="Hi! This is my portfolio. Please use prompts to know more about me.",c=[{id:"1",question:"What's the total years of experience do you have in this industry? ",answers:["I have total 5+ years of experience, with expertise in Frontend and have worked for 4 years as a Full stack developer."]},{id:"2",question:"Can you introduce yourself?",answers:["Yeah! My name is Hiren. Keep prompting to reveal more."]},{id:"3",question:"What all domain have you worked in the past?",answers:["I have worked in Financial domain in my early years of the career and Telecom domain for couple of years and right now I work in Automobile market."]},{id:"4",question:"What are your hobbies?",answers:["Hmmm Let me think, I like traveling, trekking, biking, cooking, binging."]},{id:"5",question:"What's tech stack you have expertise in?",answers:["I have majorly worked on React/Next, redux, scss as a Frontend developer while having some experience in Java, Spring boot, server-less as well."]},{id:"6",question:"How do I contact you?",answers:[`You may either reach me on LinkedIn at 
 • https://www.linkedin.com/in/hiren-savalia-26791870/ or 
 • email me at hiren.savalias@gmail.com`]},{id:"7",question:"Could you share your resume?",answers:["You can download my resume from here, https://drive.google.com/file/d/123AbMV2aQBZyK2Oa2_yhUnD2dEgLNLY7/view?usp=drive_link"]}];async function p(e=1e3){return await new Promise(o=>{setTimeout(()=>o(),e)})}function f(){document.getElementsByClassName("prompts")[0].classList.toggle("prompts-expanded")}function h(){const e=document.getElementById("intro");a(e,u)}function y(){const e=document.getElementById("intro");e&&e.remove()}async function g(e){y();const o=c.find(t=>e===t.id);l(o.question),await p(500),m(o.answers[0])}function v(){const e=document.getElementsByClassName("prompts")[0];c.sort(()=>Math.random()*2-1).map(t=>d(t,g)).map(t=>e.append(t))}h();v();(function(){document.getElementsByClassName("expand-button")[0].addEventListener("click",f)})();
