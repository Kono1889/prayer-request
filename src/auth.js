import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Import `auth` from your Firebase initialization file

// Create a new user with email and password
export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Initialize GoogleAuthProvider
const provider = new GoogleAuthProvider();

// Sign in with Google
export const doSignInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider); // Use imported `auth`
        console.log("Google Sign-In Success:", result.user);
        return result.user;
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        throw error; // Ensure this error propagates back to the caller
    }
};


// export const doSignInWithEmailAndPassword=(email,password)=>{
//     return signInWithEmailAndPassword(auth,email,password);
// }
// export const doSignOut = ()=>{
//     return auth.signOut();
// }



// export const doPasswordReset = (email)=>{
//     return sendPasswordResetEmail(auth,email);
// }
// export const doPassWordChange = (password)=>{
//     return updatePassword(auth.currentUser, password);
// }
// export const doSendEmailVerification = ()=>{
//     return sendEmailVerification(auth.currentUser,{
//         url: `${window.location.origin}/home`,
//     });
// };