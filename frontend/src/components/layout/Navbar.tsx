'use client';
import Link from 'next/link';
import Button from '../ui/Button';
import styles from './Navbar.module.css';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Meca<span>Travel</span>
        </Link>

        <ul className={styles.navLinks}>
          <li><Link href="/">Accueil</Link></li>
          <li><Link href="/omra">Omra</Link></li>
          <li><Link href="/hajj">Hajj</Link></li>
          
          {user?.role === 'ROLE_ADMIN' && (
            <li><Link href="/admin/dashboard" style={{color: '#D4AF37', fontWeight: 'bold'}}>Dashboard</Link></li>
          )}
        </ul>

        <div className={styles.actions}>
          {user ? (
            <div style={{display: 'flex', gap: '15px', alignItems: 'center'}}>
              {/* HNA L-FIX: Lien vers Profile */}
              <Link href="/profile" style={{textDecoration: 'none', color: '#0F172A', fontWeight: 500}}>
                {user.role === 'ROLE_ADMIN' ? 'Admin' : 'Mon Espace'}
              </Link>
              <Button variant="outline" onClick={logout} style={{padding: '8px 15px', fontSize: '0.9rem'}}>
                Déconnexion
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="primary">Se connecter</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}