import { connect } from 'react-redux';
import AuthPortal from './AuthPortal';
import { setTrelloToken } from '../filterSlice';
import { fetchBoards } from '../filterSlice';

const mapStateToProps = state => {
    return {
        apiKey: state.filter.apiKey
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthorization: token => {
            dispatch(setTrelloToken(token));
            dispatch(fetchBoards());
        }
    }
};


const AuthPortalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthPortal);

export default AuthPortalContainer