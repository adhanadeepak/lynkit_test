import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import './login.style.scss';

import BgImage from 'Assets/Images/sand_dunes.jpg';
import {Link, useHistory} from "react-router-dom";
import {isAuthenticated} from "Services/Authentication/authService";

function Index(props) {

    const [email, setEmail] = useState('');

    let history = useHistory();

    const [emailError, setEmailError] = useState('');
    const backgroundImageStyle = {
        backgroundImage: `url(${BgImage})`,
        backgroundRepeat: 'none',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    };

    const handleInput = (e) => {
        let email = e.target.value;
        setEmail(email);
        setEmailError('');

    };

    const validateEmail = (e) => {
        if(!window.validateEmail(e.target.value)){
            setEmailError('Enter a valid email.')
        }
        else{
            setEmailError('');
        }
    };

    const submit = (e) => {
        e.preventDefault();

        if(!emailError && emailError === ''){
            localStorage['user_email'] = email;
            localStorage['login'] = 1;
            history.push('/')
        }
        else{
            localStorage['login'] = 0;
            localStorage['user_email'] = '';
        }
    };

    useEffect(() => {

        if(isAuthenticated()){
            history.push('/');
        }
    }, []);


    return (
        <div id={`login-page`}>
            <div  className={`login-page-section`} style={backgroundImageStyle}>
                <div className={`welcome-content`}>
                    <h2 className={`text-white text-left`}>Hello there!</h2>
                    <p className={`text-left text-white capitalize text-lg`}>have we met before?</p>
                </div>
                <form id={`login-form`} className={`login-form `} onSubmit={ (e) => submit(e)}>
                    <input value={email} onBlur={(e) => validateEmail(e)} className={`input input-primary block`} type="email" id={`email`} placeholder={`Email`} onChange={(e) => handleInput(e)}/>
                    <span className={`block error text-left ${emailError && emailError !== '' ? '' : 'hide' }`}>{emailError}</span>
                    <input type="password" className={`input block input-primary`} id={`password`} placeholder={`Password`}/>

                    <button className={`btn btn-secondary`} type={`submit`}>Login</button>

                    <Link to={`/register`} className={`block register-link`} >
                        Register new account
                    </Link>
                </form>

            </div>
        </div>
    );
}

Index.propTypes = {};
Index.defaultProps = {};

export default Index;
