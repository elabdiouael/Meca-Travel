'use client';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext';

// Definition dyal Type Booking
interface Booking {
  id: number;
  clientName: string;
  email: string;
  phoneNumber: string;
  numberOfPeople: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'PAID';
  bookingDate: string;
  packageOption: {
    roomType: string;
    pricePerPerson: number;
    // Hna zedna '?' bach n-evitiw crash ila backend masifetch package
    travelPackage?: {
      title: string;
    }
  };
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, revenue: 0 });

  // 1. Fetch Data mn Backend
  const fetchBookings = async () => {
    if (user?.token) {
      try {
        const data = await api.getAllBookings(user.token);
        
        // Trier: Jdad lfo9
        const sortedData = data.reverse();
        setBookings(sortedData);

        // Calculer Stats
        const pendingCount = data.filter((b: Booking) => b.status === 'PENDING').length;
        const revenueCount = data
          .filter((b: Booking) => b.status === 'CONFIRMED')
          .reduce((acc: number, b: Booking) => acc + (b.packageOption.pricePerPerson * b.numberOfPeople), 0);

        setStats({
          total: data.length,
          pending: pendingCount,
          revenue: revenueCount
        });

      } catch (err) {
        console.error("Erreur fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Lance fetch mli user ykoun wajed
  useEffect(() => {
    fetchBookings();
  }, [user]);

  // 2. Handle Actions (Valider / Refuser)
  const handleStatusChange = async (id: number, newStatus: string) => {
    if (!user?.token) return;
    
    const confirmMessage = newStatus === 'CONFIRMED' 
      ? "Confirmer cette réservation ?" 
      : "Annuler cette réservation ?";

    if (window.confirm(confirmMessage)) {
      try {
        await api.updateBookingStatus(id, newStatus, user.token);
        fetchBookings(); // Refresh table automatique
      } catch (e) {
        alert("Erreur lors de la mise à jour du status");
      }
    }
  };

  // Helper: Couleurs des badges
  const getStatusBadge = (status: string) => {
    const baseStyle = { padding: '5px 10px', borderRadius: '15px', fontSize: '0.8rem', fontWeight: 'bold' };
    switch (status) {
      case 'CONFIRMED': return <span style={{...baseStyle, backgroundColor: '#dcfce7', color: '#166534'}}>Confirmé</span>;
      case 'PENDING': return <span style={{...baseStyle, backgroundColor: '#fef9c3', color: '#854d0e'}}>En Attente</span>;
      case 'CANCELLED': return <span style={{...baseStyle, backgroundColor: '#fee2e2', color: '#991b1b'}}>Annulé</span>;
      default: return <span>{status}</span>;
    }
  };

  if (loading) return <div style={{padding: 40, textAlign: 'center'}}>Chargement des données...</div>;

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '10px' }}>
        Tableau de Bord
      </h1>
      <p style={{color: '#64748b', marginBottom: '40px'}}>Aperçu de l'activité MecaTravel.</p>

      {/* --- CARDS STATS --- */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        {/* Total */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '5px solid #3b82f6' }}>
          <h3 style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>Total Réservations</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0F172A', margin: '10px 0 0' }}>{stats.total}</p>
        </div>
        
        {/* Pending */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '5px solid #eab308' }}>
          <h3 style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>En Attente</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#eab308', margin: '10px 0 0' }}>{stats.pending}</p>
        </div>

        {/* Revenue */}
        <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '5px solid #10b981' }}>
          <h3 style={{ color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' }}>Chiffre d'Affaires</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', margin: '10px 0 0' }}>
            {stats.revenue.toLocaleString()} <span style={{fontSize: '1rem', color: '#64748b'}}>DH</span>
          </p>
        </div>
      </div>

      {/* --- TABLEAU --- */}
      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
        <div style={{padding: '20px', borderBottom: '1px solid #e2e8f0'}}>
          <h3 style={{fontWeight: 'bold', color: '#1e293b'}}>Dernières Réservations</h3>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead style={{ backgroundColor: '#f8fafc', color: '#475569' }}>
            <tr>
              <th style={{ padding: '15px 20px', textAlign: 'left' }}>#ID</th>
              <th style={{ padding: '15px 20px', textAlign: 'left' }}>Client</th>
              <th style={{ padding: '15px 20px', textAlign: 'left' }}>Voyage</th>
              <th style={{ padding: '15px 20px', textAlign: 'left' }}>Montant</th>
              <th style={{ padding: '15px 20px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '15px 20px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} style={{padding: '40px', textAlign: 'center', color: '#94a3b8'}}>
                  Aucune réservation pour le moment.
                </td>
              </tr>
            ) : bookings.map((booking) => (
              <tr key={booking.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '15px 20px', color: '#64748b' }}>#{booking.id}</td>
                
                <td style={{ padding: '15px 20px' }}>
                  <div style={{fontWeight: '600', color: '#0F172A'}}>{booking.clientName}</div>
                  <div style={{fontSize: '0.85rem', color: '#64748b'}}>{booking.email}</div>
                  <div style={{fontSize: '0.85rem', color: '#64748b'}}>{booking.phoneNumber}</div>
                </td>
                
                <td style={{ padding: '15px 20px' }}>
                  {/* HNA L-FIX: Zidna '?' bach ma-y-crashich */}
                  <div style={{color: '#0F172A'}}>
                    {booking.packageOption?.travelPackage?.title || "Package Inconnu"}
                  </div>
                  <div style={{fontSize: '0.85rem', color: '#64748b'}}>
                    {booking.packageOption?.roomType} • {booking.numberOfPeople} pers.
                  </div>
                </td>
                
                <td style={{ padding: '15px 20px', fontWeight: 'bold', color: '#0F172A' }}>
                  {(booking.packageOption.pricePerPerson * booking.numberOfPeople).toLocaleString()} DH
                </td>
                
                <td style={{ padding: '15px 20px' }}>
                  {getStatusBadge(booking.status)}
                </td>
                
                <td style={{ padding: '15px 20px', textAlign: 'right' }}>
                  {booking.status === 'PENDING' && (
                    <div style={{display: 'flex', gap: '10px', justifyContent: 'flex-end'}}>
                      <button 
                        onClick={() => handleStatusChange(booking.id, 'CONFIRMED')}
                        style={{background: '#dcfce7', color: '#166534', border: 'none', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        title="Valider"
                      >✓</button>
                      <button 
                        onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                        style={{background: '#fee2e2', color: '#991b1b', border: 'none', width: '30px', height: '30px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        title="Refuser"
                      >✕</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}