import { getDataLS } from './lsHelpers.js';

const main = document.querySelector('main');
let ul = document.createElement('ul');

export function postToHTML() {
    if (!document.getElementById('posts')) {
        ul.setAttribute('id', 'posts');
        main.appendChild(ul);
    }
    
    const lsData = getDataLS();

    ul.innerHTML = "";
    let i = 0;

    lsData.forEach((e) => {
        if (e != null) {
            // event entry is not going to produce some crazy error and halt our code, in case user pressed button without proper data structures.
            const li = document.createElement('li');

            i++;

            // create the representation within each item
            let title = e.eventTitle;
            let priorityBool = e.priorityCheck;
            let priorityText = "";
            if (priorityBool === true) {
                priorityText = " - Priority"
            }
            let dateString = e.date;
            let start = e.start;
            let end = e.end;
            let comments = e.comments;

            // It gets really wacky in here!
            let text = `
            <h3>${title}${priorityText}</h3>
            <div id="duration">
                <p id="date">${dateString}</p>
                <p id="start">${start}</p>
                <p id="end">${end}</p>
            </div>
            <button type="button" id="comments${i}" class="showCommentBtn">Show Comments</button>
            <button type="button" class="hideCommentBtn hidden" id="hide-comments${i}">Hide Comments</button>
            <div class="comments${i} hide-comments${i} comment hidden">
                <p>${comments}</p>
            </div>
            `;

            li.innerHTML = text;
            ul.appendChild(li);

            let showCommentBtns = document.querySelectorAll('.showCommentBtn');
            let hideCommentBtns = document.querySelectorAll('.hideCommentBtn');

            showCommentBtns.forEach((btn) => {
                const btnID = btn.getAttribute('id');
                btn.addEventListener('click', () => {
                    showComment(btn, btnID);
                });
            });

            hideCommentBtns.forEach((btn) => {
                const btnID = btn.getAttribute('id');
                btn.addEventListener('click', () => {
                    hideComment(btn, btnID);
                });
            });
        }
        
        else {
            // console.log(e);
            delete lsData[i-1];
        }
    });
}

/*
The next two functions use the class and ID names of the buttons and comment sections, one using one combination order, and the other using them reversed, as they are defined above in the template literal string as such.
*/

export function showComment(btn, btnid) {
    const hiddenComment = document.querySelector(`.${btnid}`);
    hiddenComment.classList.remove('hidden');
    document.querySelector(`button#hide-${btnid}`).classList.remove('hidden');
    btn.classList.add('hidden');
}

export function hideComment(btn, btnid) {
    const shownComment = document.querySelector(`.${btnid}`);
    const shownCommentClassName = shownComment.classList[0];
    shownComment.classList.add('hidden');
    btn.classList.add('hidden');
    document.querySelector(`button#${shownCommentClassName}`).classList.remove('hidden');
}