import { connect } from 'react-redux';
import { setTrelloToken } from './actions';
import AuthPortal from './AuthPortal';

const mapStateToProps = state => {
    return {
        apiKey: state.trelloAuth.apiKey
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthorization: token => {
            dispatch(setTrelloToken(token))
        }
    }
};


const AuthPortalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthPortal);

export default AuthPortalContainer