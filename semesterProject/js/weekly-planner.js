const plannerForm = document.querySelector("#planner");
// console.log(plannerForm);

document.querySelector('#createEventBtn').addEventListener('click', (e) => {
    e.preventDefault();
    postDataLS();
});

let data = [];
const ls = window.localStorage;
data = getDataLS();
const ul = document.createElement('ul');
postToHTML();

function setDataLS() {
    const form = document.forms.eventCreator;

    if (form.eTitle.validity.valid && form.startTime.validity.valid && form.endTime.validity.valid) {
        const dataObj = {
            eventTitle: form.eTitle.value,
            priorityCheck: form.priorityCheckBox.checked,
            date: form.date.value,
            start: form.startTime.value,
            end: form.endTime.value,
            comments: form.comments.value
        };
        console.log(dataObj);

        return dataObj;
    }
}

function getDataLS() {
    let dataSerialized = ls.getItem('data');
    if (dataSerialized == null) {
        return [];
    } else {
        let dataParsed = JSON.parse(dataSerialized);
        return dataParsed;
    }
}

function postDataLS() {
    let entry = setDataLS();
    data.push(entry);
    let dataSerialized = JSON.stringify(data);
    ls.setItem('data', dataSerialized);
    postToHTML()
}

function postToHTML() {
    const main = document.querySelector('main');
    if (!document.getElementById('posts')) {
        let div = document.createElement('div');
        div.setAttribute('id', 'posts');
        main.appendChild(div);
    }

    const lsData = getDataLS();

    ul.innerHTML = "";
    let i = 0;

    lsData.forEach((e) => {
        const li = document.createElement('li');

        i++;

        // create the representation within each item
        let title = e.eventTitle;
        let priorityBool = e.priorityCheck;
        let priorityText = "";
        if (priorityBool === true) {
            priorityText = " - Priority"
        }
        let date = new Date(e.date);
        let dateString = date.toDateString();
        let start = e.start;
        let end = e.end;
        let comments = e.comments;

        let text = `
        <h3>${title}${priorityText}</h3>
        <div id="duration">
            <p id="date">${dateString}</p>
            <p id="start">${start}</p>
            <p id="end">${end}</p>
        </div>
        <button type="button" id="comments${i}" class="showCommentBtn">Show Comments</button>
        <button type="button" class="hideCommentBtn hidden" id="hide-comments${i}">Hide Comments</button>
        <div class="comments${i} hide-comments${i} hidden">
            <p>${comments}</p>
        </div>
        `;

        li.innerHTML = text;
        ul.appendChild(li);
    });

    main.appendChild(ul);

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

    function showComment(btn, btnid) {
        const hiddenComment = document.querySelector(`.${btnid}`);
        hiddenComment.classList.remove('hidden');
        document.querySelector(`button#hide-${btnid}`).classList.remove('hidden');
        btn.classList.add('hidden');
    }

    function hideComment(btn, btnid) {
        const shownComment = document.querySelector(`.${btnid}`);
        const shownCommentClassName = shownComment.classList[0];
        shownComment.classList.add('hidden');
        btn.classList.add('hidden');
        document.querySelector(`button#${shownCommentClassName}`).classList.remove('hidden');
    }
}