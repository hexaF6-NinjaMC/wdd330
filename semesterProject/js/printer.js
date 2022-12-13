const hiddenElements = [];
const printComments = [];

// Below is everything that WILL be on the page.
const header = document.querySelector('header');
const portalLink = document.querySelector('#portalLink');
const printBtn = document.querySelector('#printer');
const plannerForm = document.querySelector('#planner');
const footer = document.querySelector('footer');
hiddenElements.push(header, portalLink, printBtn, plannerForm, footer);

function printFunc() {
    if (window.print) {
        // Below is everything that MAY NOT be on the page...

        // Hide things to be hidden!
        const showCommentBtns = document.querySelectorAll('.showCommentBtn');
        showCommentBtns.forEach((showBtn) => {hiddenElements.push(showBtn)});

        const hideCommentBtns = document.querySelectorAll('.hideCommentBtn');
        hideCommentBtns.forEach((hideBtn) => {hiddenElements.push(hideBtn)});

        hiddenElements.forEach((element) => {element.style.display = "none"});

        // Show things that are hidden!
        const comments = document.querySelectorAll('.comment');
        comments.forEach((comment) => {printComments.push(comment)});

        printComments.forEach((printThisComment) => {printThisComment.style.display = "block"});
        
        // Print the document!
        window.print();

        // Now reset the webpage!
        hiddenElements.forEach((element) => {element.style.display = ""});

        
        printComments.forEach((printThisComment) => {printThisComment.style.display = ""});
    } else {
        let main = document.querySelector('main')
        let pElem = document.createElement('p');
        pElem.textContent = 'Your browser does not support the Window.print() function!';
        main.appendChild(pElem);
        printBtn.removeEventListener('click', printFunc);
    }
}

printBtn.addEventListener('click', printFunc);