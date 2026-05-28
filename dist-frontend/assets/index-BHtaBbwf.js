(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`.newTasksCardsContainer`),t=document.querySelector(`.doingTasksCardsContainer`),n=document.querySelector(`.doneTasksCardsContainer`),r=document.getElementById(`userFeedback`);function i(){e.innerHTML=``,t.innerHTML=``,n.innerHTML=``}function a(t){e.append(t)}function o(e){t.append(e)}function s(e){n.append(e)}function c(e){r.classList.replace(`hideFeedback`,`showFeedback`),r.innerText=e}function l(){r.classList.replace(`showFeedback`,`hideFeedback`),r.innerText=``}async function u(){let e=await fetch(`http://localhost:3000/api/tasks/`);if(e.ok)return(await e.json()).map(({id:e,title:t,description:n,category:r,status:i,person:a,timestamp:o})=>({id:e,title:t,description:n,category:r,status:i,person:a,timestamp:o}));throw e.status===404?Error(`Error: No tasks found`):Error(`Something went wrong when fetching tasks from the server, please try again later`)}async function d(e){let t=`http://localhost:3000/api/tasks/${e.id}`,n={};e.person?n={person:e.person}:e.status&&(n={status:e.status});let r={method:`PATCH`,headers:{accept:`application/json`,"Content-Type":`application/json`},body:JSON.stringify(n)},i=await fetch(t,r);if(i.ok){let e=await i.json();console.log(`data: `,e)}else if(i.status===404)throw Error(`Error: No tasks with that id found`);else throw Error(`Something went wrong when updating task, please try again later`)}function f(e){let t=document.createElement(`div`);t.classList.add(`card`),t.innerHTML=`
    <h3>${e.title}</h3>
    <p>${e.description}</p>
    <p>${e.category.toUpperCase()}</p>
    <p>Created at: ${e.timestamp}</p>
  `;let n=document.createElement(`form`);n.innerHTML=`
    <input name="person" type="text" required placeholder="Assign to..." />
    <button type="submit">Assign</button>
  `,n.addEventListener(`submit`,async t=>{t.preventDefault();let r=n.elements.namedItem(`person`).value;r&&r.trim()!==``?(d({id:e.id,person:r.trim()}),l(),g()):c(`Must provide a valid value when assigning a task to a person`)}),t.append(n),a(t)}function p(e){let t=document.createElement(`div`);t.classList.add(`card`),t.innerHTML=`
    <h3>${e.title}</h3>
    <p>${e.description}</p>
    <p>${e.category.toUpperCase()}</p>
    <p>Assigned to: ${e.person}</p>
    <p>Created at: ${e.timestamp}</p>
  `;let n=document.createElement(`button`);n.textContent=`Mark as done`,n.addEventListener(`click`,async t=>{t.preventDefault(),d({id:e.id,status:`done`})}),t.append(n),o(t)}function m(e){let t=document.createElement(`div`);t.classList.add(`card`),t.innerHTML=`
    <h3>${e.title}</h3>
    <p>${e.description}</p>
    <p>${e.category.toUpperCase()}</p>
    <p>Assigned to: ${e.person}</p>
    <p>Created at: ${e.timestamp}</p>
  `;let n=document.createElement(`button`);n.textContent=`Remove`,n.addEventListener(`click`,async e=>{e.preventDefault()}),t.append(n),s(t)}function h(e){i(),e.forEach(e=>{e.status===`new`?f(e):e.status===`doing`?p(e):m(e)})}async function g(){i();try{let e=await u();e.length>0&&h(e)}catch(e){c(`Something went wrong when fetching tasks from the server, please try again later`),console.error(e)}}g();