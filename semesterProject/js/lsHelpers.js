import { postToHTML } from './changeHTML.js';

const ls = window.localStorage;

export function getDataLS() {
    let dataSerialized = ls.getItem('data');
    if (dataSerialized == null) {
        return [];
    } else {
        let dataParsed = JSON.parse(dataSerialized);
        return dataParsed;
    }
}

export function postDataLS(data) {
    let entry = setDataLS();
    data.push(entry);
    let dataSerialized = JSON.stringify(data);
    ls.setItem('data', dataSerialized);
    postToHTML()
}

export function setDataLS() {
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