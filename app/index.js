import * as trello from '../app/trello';

trello.getAuthorizationToken()
    .then((token) => {
        console.log(token);
    })
    .catch((err) => {
        throw(err);
    });
