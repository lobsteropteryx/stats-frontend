import { connect } from 'react-redux';
import { initializeData } from '../actions';
import AuthPortal from './AuthPortal';

const mapStateToProps = state => {
    return {
        apiKey: state.trello.apiKey
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthorization: token => {
            dispatch(initializeData(token))
        }
    }
};


const AuthPortalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthPortal);

export default AuthPortalContainer