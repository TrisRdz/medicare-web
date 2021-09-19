import { useMemo, useState } from "react";
import { useHistory } from "react-router";

import { validateEmail } from "../../utils/validations";
import DefaultInput from "../../components/input/input";
import apiCall from "../../utils/api";
import '../../App.css'
import '../../components/input/inputStyles.css';
import { specializations } from "../../constants/specializations";

const RegisterPage = ({ submitButtonLabel = 'Register' }) => {

    const isDefault = submitButtonLabel === 'Register';
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [specialization, setSpecialization] = useState(specializations[0].value);
    const history = useHistory();

    const resetValues = () => {
        setEmail('');
        setName('');
        setPassword('');
        setConfirmPassword('');
        setSpecialization(specializations[0].value);
    }

    const registerUser = async () => {
        const params = {
            method: 'POST',
            data: {
                id: "0",
                name: name.trim(),
                email: email.trim(),
                password: password.trim(),
                ...(!isDefault ? { specialization } : {})
            },
            url: isDefault ? 'signup' : 'admin/add_doctor',
            withAuth: !isDefault
        }
        const response = await apiCall(params);
        if (response && response.status === 200) {
            if (isDefault) {
                history.replace('/login', { fromSignupFlow: true });
            } else {
                alert('Doctor added successfully');
                resetValues();
            }
        } else if (response && response.data) {
            alert(response.data.detail);
        }
    }

    const onSpecializationChange = (event) => {
        setSpecialization(event.target.value);
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
            {!isDefault && <div>
                <p className='inputLabel'>Specialization</p>
                <select value={specialization} onChange={onSpecializationChange} className='inputBox' style={{ width: '100%' }}>
                    {specializations.map(({ label, value }) => (
                        <option value={value} key={value}>{label}</option>
                    ))}
                </select>
            </div>}
            {isDefault && <div style={{ margin: '20px 0', fontSize: 14 }}>
                <a href='/login' >Existing user? Login here</a>
            </div>}
            <button className='primaryButton' style={{ marginTop: 20 }} onClick={registerUser} disabled={!isValidInput}>
                {submitButtonLabel}
            </button>
        </div>
    )
}

export default RegisterPage;
