import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import {
    FaEye, FaEyeSlash
} from 'react-icons/fa';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Stato per mostrare/nascondere la password
    const navigate = useNavigate();
    const  {login}  = useAuthContext();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
     try {
        console.log(username);
        console.log(password);
      const result = await login(username, password);
      
      if (result.success) {
        navigate('/'); 
      } else {
        setError(result.error || 'Login Fallito');
      }
    } catch (error) {
      setError('errore');
      console.log(error)
    } finally {
      setLoading(false);
      console.log(error)
    }
  };
    

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return (
        <div className={styles.loginPage}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? 'text' : 'password'} // Cambia il tipo in base allo stato
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={styles.inputField}
                        />
                        <span
                            className={styles.passwordToggle}
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {/* Icona SVG per l'occhio. Puoi sostituirla con un componente da react-icons (es. <FaEye />) */}
                            {showPassword ? (
                                <FaEye />
                            ) : (
                                <FaEyeSlash />
                            )}
                        </span>
                    </div>
                </div>
                <button type="submit" className={styles.loginButton}>Login</button>
            </form>
        </div>
    );
};