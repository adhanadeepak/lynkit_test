import React, {useState} from 'react';
import PropTypes from 'prop-types';
import RegisterForm from "Pages/Login/RegisterForm";

import Charles from 'Assets/Images/charles-deluvio-oWTW-jNGl9I-unsplash.jpg';

import './login.style.scss'

function Index(props) {

    const [user1, setUser1] = useState({
        name: '',
        email: '',
        mobile_number: '',
        password: '',
    });
    const [user2,, setUser2 ] = useState({});
    const [userIndex, setUserIndex] = useState(1);

    const bgImageStyle = {
      backgroundImage: `url(${Charles})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };


    const setFormData = (data, userNumber) => {
        if(userNumber === 1){
            setUser1(data);
        }
        else {
            setUser2(data);
        }

    };

    const addUser = () => {
        setUserIndex(2);
    };

    return (
        <div id={`register-page`} className={`outer-wrapper`}>
            <div className={`inner-div`}>

                <div className={`left-image-wrapper`} style={bgImageStyle}>
                    <h4 className={`text-white text-left content`}>Hey there, welcome aboard !</h4>
                </div>
                <div className={`register-form-right-wrapper`}>
                    <div>
                        <h3 className={`heading`}>Lets get started</h3>
                        <p className={`sub-heading`}>We are glad you are here. Please fill up some information so <br/>that we can save you some comfort next.</p>
                    </div>
                    {
                        user1 && userIndex === 1 &&
                        <RegisterForm user={user1} setFormData={setFormData} userIndex={userIndex} addUser={addUser} previousUser={() => setUserIndex(1)}/>
                    }
                    {
                        user2 && userIndex === 2 &&
                        <RegisterForm user={user2} setFormData={setFormData} userIndex={userIndex} addUser={addUser} previousUser={() => setUserIndex(1)}/>
                    }

                </div>

            </div>

        </div>
    );
}

Index.propTypes = {};
Index.defaultProps = {};

export default Index;
