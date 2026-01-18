'use client';
import { useState } from 'react';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await api.login({ email, password });
      
      // HNA L-MOCHKIL: Ila knti dayer router.push('/') hna, msse7ha!
      // Khalli ghir login(data)
      login(data); 
      
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Connexion</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className={styles.input}
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className={styles.input}
          />
          <Button type="submit" style={{width: '100%'}}>Se connecter</Button>
        </form>
        <p className={styles.footer}>
          Pas encore de compte ? <Link href="/register">Créer un compte</Link>
        </p>
      </div>
    </div>
  );
}