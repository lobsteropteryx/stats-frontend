import { fetchAuthSession } from 'aws-amplify/auth';

export const getAuthToken = async () => {
    const session = await fetchAuthSession();
    return session.tokens.idToken.toString()!
};

