import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => { 
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);

    }

}

export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            }
            return signedInUser;
            // console.log(displayName, photoURL, email);
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        })
}
export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        user.success = true;
        return user;
    })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
        });

}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {

            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: '',
                password: '',
                error: '',
                success: false

            }
            return signedOutUser;
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
        })
}
export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        return newUserInfo;

    })

    .catch(error => {
        // Handle Errors here.
        const newUserInfo = {};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo;
    })
    .catch(function (error) {
        // Handle Errors here.
        const newUserInfo = { };
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        return newUserInfo;
    });
}
const updateUserName = name => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name
    }).then(function () {
        console.log('User name updated successfully')

    }).catch(function (error) {
        console.log(error);
    });
}