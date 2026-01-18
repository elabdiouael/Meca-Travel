'use client';
import { useState } from 'react';
import { api } from '@/services/api';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../login/login.module.css'; // Nkhdmo b nefs CSS

export default function RegisterPage() {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.register(formData);
      alert('Compte créé ! Connectez-vous maintenant.');
      router.push('/login');
    } catch (err) {
      alert('Erreur lors de l\'inscription');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Créer un Compte</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input 
            type="text" 
            placeholder="Nom Complet" 
            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
            required className={styles.input}
          />
          <input 
            type="email" 
            placeholder="Email" 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required className={styles.input}
          />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required className={styles.input}
          />
          <Button type="submit" style={{width: '100%'}}>S'inscrire</Button>
        </form>
        <p className={styles.footer}>
          Déjà un compte ? <Link href="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}