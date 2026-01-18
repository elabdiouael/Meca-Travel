'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // DEBUG: Chouf console bach t-t2akked
      console.log("👮‍♂️ AdminLayout Check -> User Role:", user?.role);

      // HNA L-FIX: Beddelna 'ADMIN' b 'ROLE_ADMIN'
      if (!user || user.role !== 'ROLE_ADMIN') { 
        console.log("⛔ Accès refusé, redirection vers Home");
        router.push('/');
      }
    }
  }, [user, loading, router]);

  if (loading) return (
    <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      Chargement de l'espace Admin...
    </div>
  );

  // Sécurité visuelle
  if (!user || user.role !== 'ROLE_ADMIN') return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* SIDEBAR */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: '#0F172A', 
        color: 'white', 
        padding: '30px 20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        zIndex: 100
      }}>
        <div>
          <h2 style={{ marginBottom: '50px', color: '#D4AF37', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px' }}>
            Meca<span style={{color: 'white'}}>Admin</span> 🛡️
          </h2>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link href="/admin/dashboard" style={{ 
              color: 'white', 
              textDecoration: 'none', 
              fontSize: '1rem',
              padding: '12px 15px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: '8px',
              display: 'block'
            }}>
              📊 Tableau de bord
            </Link>
            
            <Link href="#" style={{ color: '#94a3b8', textDecoration: 'none', padding: '12px 15px', display: 'block', cursor: 'not-allowed' }}>
              📦 Gestion Offres (Bientôt)
            </Link>
          </nav>
        </div>

        <div>
          <div style={{marginBottom: '20px', fontSize: '0.8rem', color: '#64748b'}}>
            Connecté en tant que:<br/>
            <strong style={{color: 'white'}}>{user.email}</strong>
          </div>
          <Button variant="outline" onClick={logout} style={{borderColor: 'rgba(255,255,255,0.3)', color: 'white', width: '100%'}}>
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* CONTENT AREA */}
      <main style={{ 
        flex: 1, 
        marginLeft: '260px', 
        padding: '40px', 
        overflowY: 'auto' 
      }}>
        {children}
      </main>
    </div>
  );
}