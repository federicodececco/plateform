import React, { useState, useEffect } from 'react';
import styles from './LoginPage.module.css';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';

export default function LoginPage() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { t } = useTranslation();

    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated } = useAuthContext();

    //se sei già auth ti reindirizza o da dove sei venuto o alla root
    useEffect(() => {
        if (isAuthenticated()) {
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    //aggiorna i campi e rimuove eventuali errori quando digiti
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (error) setError('');
    };

    //chiamata per autenticazione, ritorna un errore se fallsce, altrimenti ti reindirizza o alla root o da dove sei arrivato
    const handleSubmit = async (e) => {
        e.preventDefault();

        //basilare validazione, controlla che eistano password e username diversi da " "
        if (!formData.username.trim() || !formData.password.trim()) {
            setError('Username e password sono obbligatori');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await login(formData.username.trim(), formData.password);

            if (result.success) {

                const from = location.state?.from?.pathname || '/';
                navigate(from, { replace: true });
            } else {
                setError(result.error || 'Login fallito. Verifica le credenziali.');
            }
        } catch (error) {
            console.error('Errore durante il login:', error);
            setError('Si è verificato un errore. Riprova più tardi.');
        } finally {
            setLoading(false);
        }
    };



    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(prevShowPassword => !prevShowPassword);
    };

    return (
        <div className={styles.loginPage}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                {error && (
                    <div className={styles.errorMessage}>
                        <span>{error}</span>
                    </div>
                )}
                <h2>Login</h2>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onKeyUp={handleKeyPress}
                        disabled={loading}
                        onChange={handleInputChange}
                        required
                        className={styles.inputField}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.passwordWrapper}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            onKeyUp={handleKeyPress}
                            required
                            disabled={loading}
                            className={styles.inputField}
                            placeholder="Inserisci la tua password"

                        />
                        <span
                            className={styles.passwordToggle}
                            onClick={togglePasswordVisibility}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {showPassword ? (
                                <FaEye />
                            ) : (
                                <FaEyeSlash />
                            )}
                        </span>
                    </div>
                </div>

                <button type="submit" className={styles.loginButton}>{loading ? (
                    <span className={styles.loadingSpinner}>
                        Accesso in corso...
                    </span>
                ) : (
                    'Login'
                )}
                </button>
                <button onClick={() => navigate(-1)} className={styles.loginButton}>{t('goBack')}</button>

            </form>

            {/* sezione agiunta solo per velocizzare il login in fase di sviluppo */}
            <div className={styles["admin-credentials"]}>
                <h3>Admin Access Credentials</h3>
                <p><strong>Username:</strong> admin</p>
                <p><strong>Password:</strong> admin123</p>
            </div>
        </div>
    );
};