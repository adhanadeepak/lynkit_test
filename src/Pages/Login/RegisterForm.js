import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import './registerForm.style.scss';

import {useHistory} from 'react-router-dom';

function RegisterForm(props) {

    let history = useHistory();
    const [user, setUser] = useState({
        name: '',
        email: '',
        mobile_number: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState({
        name: '',
        email: '',
        mobile_number: '',
        password: '',
        confirmPassword: '',
    });

    const submit = (e) => {
        e.preventDefault();
        if(error.name || error.email || error.mobile_number || error.password || error.confirmPassword){
            alert('Check error fields');
            return;
        }
        history.push('/');
    };

    const checkErrors = (e) => {

        let fieldName = e.target.name;
        let fieldValue = e.target.value;

        if(!fieldValue) return;

        if(fieldName === 'name'){

            if(fieldValue.length < 3){
                setError(error => ({
                    ...error,
                    name: 'Please enter minimum 3 characters!'
                }));
            }

        }
        else if(fieldName === 'email'){

            if(!window.validateEmail(e.target.value)){
                setError(error => ({
                    ...error,
                    email: 'Please type a valid email'
                }));
            }

        }
        else if(fieldName === 'mobile-number'){
            if(fieldValue.length < 10){
                setError(error => ({
                    ...error,
                    mobile_number: 'Please enter a 10 digit mobile number!'
                }));
            }
        }
        else if(fieldName === 'password'){
            if(!window.validatePassword(fieldValue)){
                setError(error => ({
                    ...error,
                    password: 'Invalid Password'
                }));
            }

        }
        else if(fieldName === 'confirm-password'){
            if(fieldValue !== user.password){
                setError(error => ({
                    ...error,
                    confirmPassword: 'Password do not match!'
                }));
            }
        }

    };


    const handleInput = (e) => {

        e.preventDefault();
        e.stopPropagation();

        let fieldName = e.target.name;
        let fieldValue = e.target.value;
        let data = {...user};


        if(fieldName === 'name'){

            setUser(user => ({
                ...user,
                name: fieldValue
            }));

            setError(error => ({
                ...error,
                name: '',
            }));

            data['name'] = fieldValue;
            props.setFormData(data, 1);
        }
        else if(fieldName === 'email'){

            setUser(user => ({
                ...user,
                email: fieldValue
            }));
            setError(error => ({
                ...error,
                email: '',
            }));

            data['email'] = fieldValue;
            props.setFormData(data, 1);
        }
        else if(fieldName === 'mobile-number'){
            setUser(user => ({
                ...user,
                mobile_number: fieldValue
            }));
            setError(error => ({
                ...error,
                mobile_number: '',
            }));


            data['mobile_number'] = fieldValue;
            props.setFormData(data, 1);
        }
        else if(fieldName === 'password'){
            setUser(user => ({
                ...user,
                password: fieldValue
            }));
            setError(error => ({
                ...error,
                password: '',
            }));

            data['password'] = fieldValue;
            props.setFormData(data, 1);
        }
        else if(fieldName === 'confirm-password'){
            setUser(user => ({
                ...user,
                confirmPassword: fieldValue
            }));
            setError(error => ({
                ...error,
                confirmPassword: '',
            }));

            data['confirmPassword'] = fieldValue;
            props.setFormData(data, 1);
        }




    };


    useEffect(() => {
        if(props.user && Object.keys(props.user).length > 0){
            setUser(props.user);
        }

    }, []);

    return (
            <form className={`registration-form`} onSubmit={(e) => submit(e)} autoComplete={`off`} autoSave={`false`}>
                <div className={`flex`}>
                    <div className={`form-group`}>
                        <label htmlFor="">Full name</label>
                        <input type="text" name={`name`} value={user.name} onBlur={(e) => checkErrors(e)} onChange={(e) => handleInput(e)}  className={`input input-secondary`} placeholder={`Type your full name.`}/>
                        <span className={`error`}>{error.name}</span>
                    </div>

                </div>
                <div className={`flex justify-between`}>
                    <div className={`form-group`}>
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder={`Email`} value={user.email}  onBlur={(e) => checkErrors(e)} onChange={(e) => handleInput(e)}   className={`input input-secondary`}  name={`email`}/>
                        <span className={`error`}>{error.email}</span>
                    </div>
                    <div className={`form-group`}>
                        <label htmlFor="">Mobile Number</label>
                        <input type="tel" maxLength='10' value={user.mobile_number} placeholder={`Mobile number`}  onBlur={(e) => checkErrors(e)} onChange={(e) => handleInput(e)}  className={`input input-secondary`} name={`mobile-number`}/>
                        <span className={`error`}>{error.mobile_number}</span>
                    </div>
                </div>
                <div className={`flex justify-between`}>
                    <div className={`form-group`}>
                        <label htmlFor="">Password</label>
                        <input type="password" placeholder={`password`} value={user.password} onBlur={(e) => checkErrors(e)} onChange={(e) => handleInput(e)} className={`input input-secondary`} name={`password`}/>
                        <span className={`error`}>{error.password}</span>
                    </div>
                    <div className={`form-group`}>
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" placeholder={`Confirm password`} value={user.confirmPassword} onBlur={(e) => checkErrors(e)} onChange={(e) => handleInput(e)} className={`input input-secondary`} name={`confirm-password`}/>
                        <span className={`error`}>{error.confirmPassword}</span>
                    </div>
                </div>
                <div className={`form-footer`}>
                    {
                        props.userIndex && props.userIndex === 1 &&
                        <button className={`btn btn-secondary`} type={`button`} onClick={() => props.addUser()}>
                            Add user
                        </button>
                    }
                    {
                        props.user && props.userIndex === 2 &&
                        <button className={`btn btn-secondary`} type={`button`} onClick={() => props.previousUser()}>Previous user</button>
                    }

                    <button className={`btn btn-primary`}>Register</button>
                </div>
            </form>
    );
}

RegisterForm.propTypes = {};
RegisterForm.defaultProps = {};

export default RegisterForm;
