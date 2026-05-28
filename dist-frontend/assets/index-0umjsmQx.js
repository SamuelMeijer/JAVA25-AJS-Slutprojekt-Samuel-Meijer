(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();async function e(){let e=await fetch(`http://localhost:3000/api/tasks/`);if(e.ok)return(await e.json()).map(({id:e,title:t,description:n,category:r,status:i,person:a,timestamp:o})=>({id:e,title:t,description:n,category:r,status:i,person:a,timestamp:o}));throw e.status===404?Error(`Error: No tasks found`):Error(`Something went wrong when fetching tasks from the server, please try again later`)}async function t(e){let t=`http://localhost:3000/api/tasks/${e.id}`,n={};e.person?n={person:e.person}:e.status&&(n={status:e.status});let r={method:`PATCH`,headers:{accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify(n)},i=await fetch(t,r);if(console.log(`resp: `,i),i.ok){let e=await i.json();console.log(`data: `,e)}console.log(t),console.log(e)}var n=document.querySelector(`.newTasksCardsContainer`),r=document.querySelector(`.doingTasksCardsContainer`),i=document.querySelector(`.doneTasksCardsContainer`),a=document.getElementById(`userFeedback`);function o(){n.innerHTML=``,r.innerHTML=``,i.innerHTML=``}function s(e){n.append(e)}function c(e){r.append(e)}function l(e){i.append(e)}function u(e){a.classList.replace(`hideFeedback`,`showFeedback`),a.innerText=e}function d(){a.classList.replace(`showFeedback`,`hideFeedback`),a.innerText=``}function f(e){o(),e.forEach(e=>{e.status===`new`?p(e):e.status===`doing`?m(e):h(e)})}function p(e){let n=document.createElement(`div`);n.classList.add(`card`),n.innerHTML=`
    <h3>${e.title}</h3>
    <p>${e.description}</p>
    <p>${e.category.toUpperCase()}</p>
    <p>Created at: ${e.timestamp}</p>
  `;let r=document.createElement(`form`);r.innerHTML=`
    <input name="person" type="text" required placeholder="Assign to..." />
    <button type="submit">Assign</button>
  `,r.addEventListener(`submit`,async n=>{n.preventDefault();let i=r.elements.namedItem(`person`).value;i&&i.trim()!==``?(t({id:e.id,person:i.trim()}),d()):u(`Must provide a valid value when assigning a task to a person`)}),n.append(r),s(n)}function m(e){let n=document.createElement(`div`);n.classList.add(`card`),n.innerHTML=`
    <h3>${e.title}</h3>
    <p>${e.description}</p>
    <p>${e.category.toUpperCase()}</p>
    <p>Assigned to: ${e.person}</p>
    <p>Created at: ${e.timestamp}</p>
  `;let r=document.createElement(`button`);r.textContent=`Mark as done`,r.addEventListener(`click`,async n=>{n.preventDefault(),t({id:e.id,status:`done`})}),n.append(r),c(n)}function h(e){let t=document.createElement(`div`);t.classList.add(`card`),t.innerHTML=`
    <h3>${e.title}</h3>
    <p>${e.description}</p>
    <p>${e.category.toUpperCase()}</p>
    <p>Assigned to: ${e.person}</p>
    <p>Created at: ${e.timestamp}</p>
  `;let n=document.createElement(`button`);n.textContent=`Remove`,n.addEventListener(`click`,async e=>{e.preventDefault()}),t.append(n),l(t)}var g=[];async function _(){try{g=await e(),g.length>0&&f(g)}catch(e){console.error(e)}}_();