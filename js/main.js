const links = [
    {
        label: "Week 1 notes",
        url: "./notes/w01_Master_Mobile_UX.html"
    },
    {
        label: "Week 2 notes",
        url: "./notes/w02_c2Basics_c3ArraysLogicAndLoops_c4Functions.html"
    },
    {
        label: "Week 3 notes",
        url: "./notes/w03_c5Objects_c6DOM_c7Events.html"
    }
]

// Where everything posts to...
const postList = document.querySelector('#weeklyListOfLinks');

// For each link in {links}, create the list-items and anchors needed:
links.forEach((entry) => {
    const listElem = document.createElement('li');
    const listLink = `<a href="${entry.url}">${entry.label}</a>`;

    listElem.innerHTML = listLink;
    postList.appendChild(listElem);
});
