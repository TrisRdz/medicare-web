import { useMemo, useState } from "react";
import { useHistory } from "react-router";

import { validateEmail } from "../../utils/validations";
import DefaultInput from "../../components/input/input";
import apiCall from "../../utils/api";
import '../../App.css'

const RegisterPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const history = useHistory();

    const registerUser = async () => {
        const params = {
            method: 'POST',
            data: {
                id: "0",
                name,
                email,
                password
            },
            url: 'signup'
        }
        const response = await apiCall(params);
        if (response.status === 200) {
            history.replace('/login', { fromSignupFlow: true });
        }
    }

    const isValidInput = useMemo(() => {
        if (!email.length || !name.length || !password.length || !confirmPassword.length || password !== confirmPassword) {
            return false;
        };
        if (!validateEmail(email)) {
            return false;
        }
        return true;
    }, [email, password, confirmPassword, name])

    return (
        <div className='authContainer'>
            <DefaultInput 
                value={name}
                placeholder='Enter full name'
                label='Full name'
                onChange={(event) => setName(event.target.value)}
           />
            <DefaultInput 
                value={email}
                placeholder='Enter email'
                label='Email'
                onChange={(event) => setEmail(event.target.value)}
           />
           <DefaultInput 
                value={password}
                placeholder='Enter password'
                label='Password'
                onChange={(event) => setPassword(event.target.value)}
                type='password'
           />
            <DefaultInput 
                value={confirmPassword}
                placeholder='Confirm password'
                label='Confirm Password'
                onChange={(event) => setConfirmPassword(event.target.value)}
                type='password'
           />
           {Boolean(confirmPassword.length && confirmPassword !== password) && <p className='errorMessage'>
                Passwords do not match
            </p>}
            <div style={{ margin: '20px 0', fontSize: 14 }}>
                <a href='/login' >Existing user? Login here</a>
           </div>
           <button className='primaryButton' style={{ marginTop: 20 }} onClick={registerUser} disabled={!isValidInput}>
               Register
           </button>
        </div>
    )
}

export default RegisterPage;
