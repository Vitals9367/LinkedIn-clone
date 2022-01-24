import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

import './Login.css';

const Login = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [profilePic,setProfilePic] = useState('');

    const dispatch = useDispatch();

    const register = (e) => {
        e.preventDefault();

        if(!name) return alert("Please enter full name!");

        createUserWithEmailAndPassword(auth,email,password)
        .then((userAuth) => {
            updateProfile(auth.currentUser,{
                displayName: name,
                photoURL: profilePic,
            })
            .then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoURL: profilePic,
                }));
            })
        }).catch(err => alert(err))
    }

    const loginToApp = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
        .then((userAuth) => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoURL: userAuth.user.photoURL,
            }));
        }).catch(err => alert(err))

    }

  return <div className='login'>
    <img
        src="https://logos-world.net/wp-content/uploads/2020/04/Linkedin-Logo-2011-2019.png"
        alt="logo"
    />
    <form>
        <input placeholder='Full name' value={name} onChange={e => setName(e.target.value)} type="text" />
        <input placeholder='Profile url' value={profilePic} onChange={e => setProfilePic(e.target.value)} type="text" />
        <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} type="email" />
        <input placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} type="password" />
        <button type='submit' onClick={loginToApp}>Sign In</button>
    </form>
    <p>Not a member? {" "}
        <span className='login__register' onClick={register}>Register Now</span>
    </p>
  </div>;
};

export default Login;
