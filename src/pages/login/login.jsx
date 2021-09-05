import { useState } from "react"

import DefaultInput from "../../components/input/input"

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
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
           />
           <button className='primaryButton' style={{ marginTop: 20 }}>
               Login
           </button>
        </div>
    )
};

export default LoginPage;
