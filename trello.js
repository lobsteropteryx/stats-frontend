const display = (data) => {
    var displayData = getBugs(data);
    var pre = document.createElement('pre');
    pre.innerText = JSON.stringify(displayData, null, 4);
    document.body.appendChild(pre);
};

const getBugs = (cards) => {
    var regex = new RegExp('\\bBUG\\b', 'i');
    return cards
        .filter((card) => {
            return regex.test(card.name);
        })
        .map((card) => {
            return {
                date: getCreateDate(card.id),
                url: card.url
            }
        })
};

const getCreateDate = (id) => {
    return new Date(1000 * parseInt(id.substring(0, 8), 16));
};

const authenticationSuccess = () => {
    var ashesID = '597755a8422f9194d7ff34cf';
    trello.get(`/boards/${ashesID}/cards`, display);
};

const authenticationFailure = () => {
    console.log('Failed authentication');
};

const trello = window.Trello;

trello.authorize({
    type: 'popup',
    name: 'Getting Started Application',
    scope: {
        read: 'true',
        write: 'true'
    },
    expiration: 'never',
    success: authenticationSuccess,
    error: authenticationFailure
});

