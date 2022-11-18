const printBtn = document.querySelector('.printBtn');

function printFunc() {
    if (window.print) {
        printBtn.style.display = "none";
        window.print();
        printBtn.style.display = "inline";
    } else {
        let main = document.querySelector('main')
        let pElem = document.createElement('p');
        pElem.textContent = 'Your browser does not support the Window.print() function!';
        main.appendChild(pElem);
        printBtn.removeEventListener('click', printFunc);
    }
}

printBtn.addEventListener('click', printFunc);