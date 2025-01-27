import { input, password } from "@inquirer/prompts";
import ora from "ora";
import { theme } from "../shared/theme";
import { authenticateUser } from "./userAuth";
import { getAppIds } from "../db/management";

export const authenticate = async (attempts = 1): Promise<string> => {

    const email = await input({
        message: 'Enter your email:',
        validate: (value) => {
            if (!value) {
                return 'Please enter your email'
            }
            if (!value.includes('@')) {
                return 'Please enter a valid email'
            }
            return true
        },
        theme: theme
    })

    const pword = await password({
        message: 'Enter your Password:',
        mask: true,
        validate: (value) => {
            if (!value) {
                return 'Please enter your password'
            }
            if (value.length < 6) {
                return 'Auth tokens are at least 6 characters long'
            }
            return true
        },
        theme: theme
    })

    const spinner = ora('Authenticating Account...').start();

    
    try {
        const idToken = await authenticateUser(email, pword);
        spinner.succeed('Authentication successful');
        spinner.stop();
        const appIds = await getAppIds(idToken, email)
        console.log(theme.style.answer('App IDs:'), appIds);

        return idToken;
    } catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email' || error.code === 'auth/invalid-credential') {
            if (attempts >= 3) {
                spinner.fail(theme.style.error(`Authentication failed: Invalid credentials. Attempts exceeded, exiting...`));
                throw error
            } else {
                spinner.fail(theme.style.error(`Authentication failed: Invalid credentials. Attempts left: ${3 - attempts}`));
                return authenticate(attempts + 1);
            }
        } else {
            spinner.fail('Authentication failed');
            throw error
        }
    }

}