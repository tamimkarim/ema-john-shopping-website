import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from './loginManager';

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: ''
    });

    initializeLoginFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };



    const googleSignIn =() =>{
        handleGoogleSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }
    const fbSignIn = () => {
        handleFbSignIn()
        .then(res => {
            handleResponse(res, true);
        })
    }

    const signOut = () => {
        handleSignOut()
        .then(res => {
           handleResponse(res, false);
        })
    }
    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    }

    const handleBlur = (event) => {
        let isFormValid = true;

        if (event.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {

            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFormValid = isPasswordValid && passwordHasNumber;
        }
        if (isFormValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;

            setUser(newUserInfo);
        }
    }

    const handleSubmit = (event) => {
        console.log(user.email, user.password)
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
            .then(res => {
                handleResponse(res, true);
            })
           
        }

        if (!newUser && user.email && user.password) {
           signInWithEmailAndPassword(user.email, user.password)
           .then(res => {
            handleResponse(res, true);
             })
        }
        event.preventDefault();

    }
    return (
        <div style={{ textAlign: 'center' }}>
            {
                user.isSignedIn ? <button onClick={signOut} > Sign out</button> :
                    <button onClick={googleSignIn} > Sign in</button>
            }
            <br />
            <button onClick={fbSignIn}>Log in using facebook</button>
            {
                user.isSignedIn && <div>
                    <p>Welcome , {user.name}</p>
                    <p>Welcome, {user.email}</p>
                    <img src={user.photo} alt="" />

                </div>
            }
            <h4>Create your account</h4>

            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">New user Sign Up</label>

            <form onSubmit={handleSubmit}>

                {newUser && <input name="name" onBlur={handleBlur} placeholder="Enter your name" type="text" />}
                <br />
                <input type="text" onBlur={handleBlur} name="email" required placeholder="Write your email address" />
                <br />
                <input type="password" onBlur={handleBlur} name="password" required placeholder="Write your password" />
                <br />

                <input type="submit" value={newUser ? 'Sign up' : 'Sign in'} />
            </form>
            <p style={{ color: 'red' }}> {user.error} </p>
            {
                user.success && <p style={{ color: 'green' }}>User {newUser ? 'created' : 'Logged In'} successfully</p>
            }

        </div>
    );
}

export default Login;
