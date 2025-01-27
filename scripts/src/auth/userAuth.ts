import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../db/fb";
import { theme } from "../shared/theme";

async function authenticateUser(email: string, password: string): Promise<string> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    return idToken;
  } catch (error) {
    throw error;
  }
}

export { authenticateUser };