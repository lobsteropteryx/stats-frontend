import * as request from 'request';

const API_KEY = 'e052546597a829919aae4fbd2a6e4095';

function getAuthorizationToken() {

    const popup = getAuthorizationWindow();

    return new Promise(function (resolve, reject) {

        function getAuthorization(event) {
            if (event.source !== popup) {
                return;
            }
            window.removeEventListener('message', getAuthorization, false);
            popup.close();
            if ((event.data != null) && /[0-9a-f]{64}/.test(event.data)) {
                resolve(event.data);
                return event.data;
            } else {
                reject(new Error(event.data));
            }
        }

        window.addEventListener('message', getAuthorization, false);
    });
}

function getAuthorizationWindow() {
    const width = 420;
    const height = 470;
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;
    const origin = /^[a-z]+:\/\/[^\/]*/.exec(location)[0];
    const authUrl = `https://trello.com/1/authorize?return_url=${origin}&callback_method=postMessage&expiration=never&name=Project&key=${API_KEY}`;
    return window.open(authUrl, 'trello', `width=${width},height=${height},left=${left},top=${top}`);
}

export {
    getAuthorizationToken
}
