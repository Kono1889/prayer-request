import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { doSignInWithGoogle } from "../auth"; // Ensure this is correctly implemented
import { useAuth } from "../contexts/authContext/index.jsx"; // Ensure the import path is correct

const AdminLogin = () => {
    const { userLoggedIn } = useAuth(); // Ensure AuthProvider wraps this component
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onGoogleSignIn = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            try {
                await doSignInWithGoogle();
            } catch (error) {
                console.error("Google Sign-In Error:", error);
                setErrorMessage("Google Sign-In failed. Please try again.");
            } finally {
                setIsSigningIn(false);
            }
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/Admin" replace />;
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Admin Login
                </h2>
                <button
                    onClick={onGoogleSignIn}
                    className="w-full bg-red-500 text-white py-2 rounded-md font-semibold hover:bg-red-600 transition-colors"
                >
                    Sign in with Google
                </button>
                {errorMessage && (
                    <div className="mt-4 text-red-500 text-sm">{errorMessage}</div>
                )}
            </div>
        </div>
    );
};

export default AdminLogin;
