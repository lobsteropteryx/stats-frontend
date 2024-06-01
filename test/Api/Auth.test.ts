import { vi } from "vitest";
import getAuthToken from "../../app/Api/Auth";

describe('Getting auth tokens', () => {

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns an auth string', async () => {
        vi.mock('aws-amplify/auth', async (importOriginal) => {
            const mod = await importOriginal<typeof import('aws-amplify/auth')>()
            return {
                ...mod,
                fetchAuthSession: vi.fn(() => ({
                    tokens: {
                        idToken: "token"
                    }
                }))
            }
        });

        const expected = "token";
        expect(await getAuthToken()).toEqual(expected);
    });
});