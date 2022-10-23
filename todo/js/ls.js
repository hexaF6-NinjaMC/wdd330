export function readFromLS(key) {
    /*
    Read a value from the localStorage and parse it as JSON
    */
    let todoStorage = JSON.parse(localStorage.getItem(key));
    console.log(todoStorage);
    return todoStorage;
}

export function writeToLS(key, data) {
    /*
    write an array of objects to local storage under the provided key
    key (String): The key under which the value is stored under in LS
    data (Array): The information to be stored as an array of objects. Must be serialized.
    */
    let dataSerialized = JSON.stringify(data);
    window.localStorage.setItem(key, dataSerialized);
}