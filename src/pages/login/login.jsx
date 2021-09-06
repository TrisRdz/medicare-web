import { useState } from "react"

import DefaultInput from "../../components/input/input"
import '../../App.css'

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='authContainer'>
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
           <div style={{ margin: '20px 0', fontSize: 14 }}>
                <a href='/register' >New user? Register here</a>
           </div>
           <button className='primaryButton'>
               Login
           </button>
        </div>
    )
};

export default LoginPage;
