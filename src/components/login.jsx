import { useState } from 'react';
import './login.css';
import logo from '../assets/logo.jpg';

export default function Login({ Login = () => {} }) {
  const [clientCode, setClientCode] = useState('');
  const [usr, setUsr] = useState('');
  const [pswd, setPswd] = useState('');

  const disabled = !clientCode || !usr || !pswd;

  const onSubmit = (e) => {
    e.preventDefault();
    if (disabled) return;
    Login({ clientCode, usr, pswd });
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={onSubmit} noValidate>
        <img src={logo} alt="FinTrust Logo" className="login-logo" />

        <label htmlFor="clientCode" className="field-label">Código de cliente</label>
        <input
          id="clientCode"
          className="field-input"
          value={clientCode}
          onChange={(e) => setClientCode(e.target.value)}
          placeholder="Código de cliente"
          autoComplete="off"
        />

        <label htmlFor="usr" className="field-label">Usuario</label>
        <input
          id="usr"
          className="field-input"
          value={usr}
          onChange={(e) => setUsr(e.target.value)}
          placeholder="Usuario"
          autoComplete="username"
        />

        <label htmlFor="pswd" className="field-label">Contraseña</label>
        <input
          id="pswd"
          className="field-input"
          type="password"
          value={pswd}
          onChange={(e) => setPswd(e.target.value)}
          placeholder="Contraseña"
          autoComplete="current-password"
        />

        <button type="submit" className="login-btn" disabled={disabled}>
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

/*Para commit*/