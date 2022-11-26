import Auth from "./auth.js";
import { Errors, makeRequest } from "./authHelpers.js";

// makeRequest('login', 'POST', {
//     password: 'user1',
//     email: 'user1@email.com'
// });

const myErrors = new Errors('errors');
const authenticator = new Auth(myErrors);

const loginForm = document.querySelector('#login');
loginForm.querySelector('#submitBtn').addEventListener('click', () => {
    authenticator.login(getPosts);
});

async function getPosts() {
    try {
        const data = await makeRequest('posts', 'GET', null, authenticator.token);
        // make sure the element is shown
        document.querySelector('#content').classList.remove('hidden');
        console.log(data);
        var ul = document.querySelector('#list');
        ul.innerHTML = '';
        for (var i = 0; i < data.length; i++) {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(data[i].title));
            ul.appendChild(li);
        }
        myErrors.clearError();
    } catch (error) {
        // if there are any errors, display them
        myErrors.handleError(error);
    }
}

document.querySelector('#createSubmit').addEventListener('click', () => {
    createPost();
});

async function createPost() {
    const form = document.forms.postForm;
    console.dir(form);

    if (form.title.validity.valid && form.content.validity.valid) {
        myErrors.clearError();
        const data = {
            title: form.title.value,
            content: form.content.value
        };
        try {
            const res = await makeRequest('posts', 'POST', data, authenticator.token);
            console.log('Post create: ', data);
            form.title.value = '';
            form.content.value = '';
            getPosts();
        } catch (error) {
            myErrors.handleError(error);
        }
    } else {
        myErrors.displayError({ message: 'Title and Content are required.' })
    }
}