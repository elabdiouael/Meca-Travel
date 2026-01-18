'use client';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface Booking {
  id: number;
  status: string;
  bookingDate: string;
  numberOfPeople: number;
  packageOption: {
    roomType: string;
    pricePerPerson: number;
    travelPackage: {
      id: number;
      title: string;
      mainImageUrl: string;
    }
  };
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else {
        fetchMyBookings();
      }
    }
  }, [user, authLoading]);

  const fetchMyBookings = async () => {
    if (user?.token) {
      try {
        const data = await api.getMyBookings(user.token);
        setBookings(data.reverse());
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = { padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' };
    switch (status) {
      case 'CONFIRMED': return <span style={{...styles, backgroundColor: '#dcfce7', color: '#166534'}}>✅ Confirmé</span>;
      case 'PENDING': return <span style={{...styles, backgroundColor: '#fef9c3', color: '#854d0e'}}>⏳ En Attente</span>;
      case 'CANCELLED': return <span style={{...styles, backgroundColor: '#fee2e2', color: '#991b1b'}}>❌ Annulé</span>;
      default: return <span>{status}</span>;
    }
  };

  if (authLoading || loading) return <div style={{padding: 50, textAlign: 'center'}}>Chargement...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', minHeight: '80vh' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '2rem', color: '#0F172A' }}>Mon Espace</h1>
        <p style={{ color: '#64748b' }}>Bienvenue, {user?.email}</p>
      </header>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#D4AF37' }}>Mes Réservations</h2>

      {bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
          <p style={{ marginBottom: '20px', color: '#64748b' }}>Vous n'avez aucune réservation pour le moment.</p>
          <Link href="/">
            <Button>Découvrir nos offres</Button>
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {bookings.map((booking) => (
            <div key={booking.id} style={{ 
              background: 'white', 
              padding: '25px', 
              borderRadius: '12px', 
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                {booking.packageOption?.travelPackage?.mainImageUrl && (
                  <img 
                    src={booking.packageOption.travelPackage.mainImageUrl} 
                    alt="Package" 
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                )}
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#0F172A' }}>
                    {booking.packageOption?.travelPackage?.title || "Voyage"}
                  </h3>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
                    {booking.packageOption?.roomType} • {booking.numberOfPeople} Personnes
                  </p>
                  <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#D4AF37' }}>
                    {(booking.packageOption.pricePerPerson * booking.numberOfPeople).toLocaleString()} DH
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ marginBottom: '10px' }}>
                  {getStatusBadge(booking.status)}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Réservé le: {new Date(booking.bookingDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}