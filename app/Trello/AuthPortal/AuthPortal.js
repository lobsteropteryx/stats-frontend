import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class AuthPortal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.externalWindow = null;
    }

    componentDidMount() {
        this.externalWindow = this.getAuthorizationWindow(this.props.apiKey);
        window.addEventListener('message', this.getAuthorization.bind(this), false);
    }

    getAuthorizationWindow() {
        const width = 420;
        const height = 470;
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;
        const origin = /^[a-z]+:\/\/[^\/]*/.exec(location)[0];
        const authUrl = `https://trello.com/1/authorize?return_url=${origin}&callback_method=postMessage&expiration=never&name=Project&key=${this.props.apiKey}`;
        return window.open(authUrl, 'trello', `width=${width},height=${height},left=${left},top=${top}`);
    };

    getAuthorization(event) {
        if (event.source !== this.externalWindow) {
            return;
        }
        window.removeEventListener('message', this.getAuthorization, false);
        this.externalWindow.close();
        if ((event.data != null) && /[0-9a-f]{64}/.test(event.data)) {
            this.props.onAuthorization(this.props.apiKey, event.data);
        }
    }

    componentWillUnmount() {
        this.externalWindow.removeEventListener('message', this.getAuthorization, false);
        this.externalWindow.close();
    }

    render() {
        return (<div></div>);
    }
}

AuthPortal.propTypes = {
    apiKey: PropTypes.string.isRequired,
    onAuthorization: PropTypes.func.isRequired
};

export default AuthPortal;
