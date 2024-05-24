import { connect } from 'react-redux';
import AuthPortal from './AuthPortal';
import { ApiClient } from '../ApiClient';
import { setTrelloToken } from '../../Filter/Query/queryFilterSlice';
import { fetchBoards } from '../../Filter/Query/queryFilterSlice';

const mapStateToProps = state => {
    return {
        apiKey: state.queryFilter.apiKey,
        token: state.queryFilter.token
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