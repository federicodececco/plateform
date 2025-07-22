import React, { useState } from 'react';
import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import {
    FaEye, FaEyeSlash
} from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {

    const { t } = useTranslation();
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Stato per mostrare/nascondere la password
    const { usePlace, addPlace } = useGlobalContext(); //queste sono le funzioni dello usePlace

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // da inserire Api per inviare i dati di login
        console.log('Nickname:', nickname);
        console.log('Password:', password);
        alert('Login Tentato!\nNickname: ' + nickname + '\nPassword: ' + password);
        setNickname('');
        setPassword('');

        navigate('/'); //Reindirizza alla home page
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return (
        <div className={styles.loginPage}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="nickname">Nickname</label>
                    <input
                        type="text"
                        id="nickname"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
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
                <button onClick={() => navigate(-1)} className={styles.loginButton}>{t('goBack')}</button>
            </form>

            {/* sezione agiunta solo per velocizzare il login in fase di sviluppo */}
            <div className={styles["admin-credentials"]}>
                <h3>Admin Access Credentials</h3>
                <p><strong>Username:</strong> admin</p>
                <p><strong>Password:</strong> admin</p>
            </div>
        </div>
    );
};