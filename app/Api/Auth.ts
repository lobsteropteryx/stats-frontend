import { fetchAuthSession } from 'aws-amplify/auth';

const getAuthToken = async () => {
    const session = await fetchAuthSession();
    return session.tokens.idToken.toString()!
};

export default getAuthToken;
