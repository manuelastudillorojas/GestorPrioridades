import React, {useState} from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import { useNavigate } from 'react-router-dom';



function Login(props) {
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    
    let navigate = useNavigate();


    const handleLogin = () => {
        setError(null);
        setLoading(true);

        axios.post('http://localhost:3010/auth/login', { correo: username.value, contrasena: password.value }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.correo);
            navigate("/home");
            //props.history.push('/home');
        }).catch(error => {
            setLoading(false);
            console.log(error, 'error')
            if (error.response.status === 401) setError(error.response.data.message);
            else setError("Something went wrong. Please try again later.");
        });
    }

    return (
        <div>
            Login <br /> <br />
            <div>
                Username <br />
                <input type="text" {...username} autoComplete="new-password" />
            </div>
            <div style={{ marginTiop: 10 }}>
                Password <br />
                <input type="text" {...password} autoComplete="new-password" />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small></>}
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /> <br />
        </div>
    )
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value)
    }

    return {
        value,
        onChange: handleChange
    }
}

export default Login;