import React from "react";
import { useState } from "react";
import { SHA256 } from "crypto-js";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Welcome } from "./images/welcome.svg"

import styles from './Login.module.css'

const Login = () => {

    let navigate = useNavigate();

    const [inputUserName, setInputUserName] = useState("");
    const [inputpassword, setInputPassword] = useState('');

    // const [hashing, setHashing] = useState('')

    const inputDetails = (event) => {
        // console.log(event.target.value);
        setInputUserName(event.target.value)
    }

    const inputPassword = (event) => {
        // console.log(event.target.value)
        setInputPassword(event.target.value)
    }

    const formSubmitHandler = (event) => {
        event.preventDefault();
        // console.log(inputpassword)
        const hashedPassword = SHA256(inputpassword)
        //setHashing(hashedPassword)



    }

    return <div className={styles.mainContainer}>
        
        <div >
            <p className={styles.mainText}>Please Login Here</p>
            <form onSubmit={formSubmitHandler} className={styles.formHandler}>
                <label className={styles.labelText}>Username</label>
                <input type="text" onChange={inputDetails} required className={styles.inputFeedback}></input>
                
                <label className={styles.labelText}>Password</label>
                <input type="password" onChange={inputPassword} required className={styles.inputFeedback}></input>
               

                <button type="submit" onClick={() => {
                    if (inputUserName === '')
                        return
                    navigate("/display")
                }}
                 className={styles.loginButton}>SIGN IN</button>
            </form>
            
        </div>
        <Welcome className={styles.imageEdit} />

    </div>
}


export default Login;