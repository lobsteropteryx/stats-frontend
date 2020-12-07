import { connect } from 'react-redux';
import AuthPortal from './AuthPortal';
import { ApiClient } from '../../Trello/ApiClient';
import { setTrelloToken } from '../../Filter/filterSlice';
import { fetchBoards } from '../../Filter/filterSlice';

const mapStateToProps = state => {
    return {
        apiKey: state.filter.apiKey,
        token: state.filter.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthorization: (apiKey, token) => {
            dispatch(setTrelloToken(token));
            dispatch(fetchBoards(new ApiClient(apiKey, token)));
        }
    }
};

const AuthPortalContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthPortal);

export default AuthPortalContainer