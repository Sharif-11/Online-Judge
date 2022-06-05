import React, { useRef } from "react";
import {
	useCreateUserWithEmailAndPassword,
	useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const withAuth = (Child) => {
	const Component = () => {
		const [createUserWithEmailAndPassword, user, loading, error] =
			useCreateUserWithEmailAndPassword(auth);
		const [signInWithGoogle, googleUser, googleLoading, googleError] =
			useSignInWithGoogle(auth);
		const emailRef = useRef("");
		const passwordRef = useRef("");
		const handleSubmit = (e) => {
			e.preventDefault();
			const email = emailRef.current.value;
			const password = passwordRef.current.value;
			createUserWithEmailAndPassword(email, password);
		};
		const handleGoogleSignIn = () => {
			signInWithGoogle();
		};
		const props = {
			createUserWithEmailAndPassword,
			user,
			loading,
			error,
			signInWithGoogle,
			googleError,
			googleLoading,
			googleUser,
			handleGoogleSignIn,
			handleSubmit,
			emailRef,
			passwordRef,
		};
		return <Child {...props} />;
	};
	return Component;
};
export default withAuth;
