import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from './fb';
import ora from "ora";


export const getAppIds = async (tokenId: string, email: string): Promise<string[]> => {
    const spinner = ora('Fetching App IDs...').start();
    try {

        const uid = auth.currentUser?.uid;
        if (!uid) {
            throw new Error('No authenticated user found');
        }

        if (!tokenId || !email) {
            throw new Error('TokenId and email are required parameters');
        }

        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            try {
                await setDoc(userDocRef, {
                    dateCreated: new Date(),
                    appIds: []
                });
                
                spinner.succeed('New Profile created successfully');
                return [];
            } catch (error) {
                console.error('Error creating new user document:', error);
                throw new Error('Failed to create new user profile');
            }
        } else {
            const userData = userDoc.data();
            if (!userData || !Array.isArray(userData.appIds)) {
                throw new Error('Invalid user data structure');
            }
            
            spinner.succeed('App IDs fetched successfully');
            return userData.appIds;
        }
    } catch (error) {
        console.error('Error in getAppIds:', error.toString());
        
        spinner.fail('Failed to fetch App IDs');
        return []
        
    } finally {
        spinner.stop();
    }
}
export const addAppId = async (appId: string): Promise<void> => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error('User not authenticated');
    }
    
    const userDocRef = doc(db, "users", currentUser.uid);
    await updateDoc(userDocRef, {
        appIds: arrayUnion(appId)
    });
}