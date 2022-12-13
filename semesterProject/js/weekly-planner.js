import { getDataLS, postDataLS } from './lsHelpers.js';
import { postToHTML, showComment, hideComment } from './changeHTML.js';

const plannerForm = document.querySelector("#planner");

// Start with a blank Data array for LocalStorage
let data = [];
data = getDataLS(); // Get Data and append, if any.
postToHTML(); // Build with the Data

document.querySelector('#createEventBtn').addEventListener('click', (e) => {
    e.preventDefault(); // We don't want to submit the form: we have no server!
    postDataLS(data); // Append form Data to LocalStorage
    postToHTML(); // Build with the form Data
});