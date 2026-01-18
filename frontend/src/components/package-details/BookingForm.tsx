'use client';
import { useState } from 'react';
import { TravelPackage, PackageOption } from '@/types';
import { api } from '@/services/api';
import { useAuth } from '@/context/AuthContext'; // Import Auth
import Button from '../ui/Button';
import Link from 'next/link';
import styles from './BookingForm.module.css';

export default function BookingForm({ pkg }: { pkg: TravelPackage }) {
  const { user } = useAuth(); // Check user
  const [selectedOption, setSelectedOption] = useState<PackageOption>(pkg.options[0]);
  
  // Pre-fill data ila kan user connecté
  const [formData, setFormData] = useState({
    clientName: '',
    phoneNumber: '',
    email: user?.email || '', // Auto-fill email
    numberOfPeople: 1
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; // Sécurité

    setLoading(true);
    try {
      // Sifet Token m3a request
      await api.createBooking(selectedOption.id, formData, user.token);
      alert('Réservation envoyée avec succès ! Un agent va vous contacter.');
    } catch (err) {
      alert('Erreur lors de la réservation');
    } finally {
      setLoading(false);
    }
  };

  // ILA MAKANCH CONNECTÉ: Affiche Message
  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.priceHeader}>
          <span>Prix à partir de</span>
          <h2>{selectedOption.pricePerPerson} DH</h2>
        </div>
        <div style={{textAlign: 'center', padding: '20px 0'}}>
          <p style={{marginBottom: '15px'}}>Connectez-vous pour réserver ce voyage.</p>
          <Link href="/login">
            <Button style={{width: '100%'}}>Se connecter</Button>
          </Link>
        </div>
      </div>
    );
  }

  // ILA KAN CONNECTÉ: Affiche Formulaire
  return (
    <div className={styles.container}>
      <div className={styles.priceHeader}>
        <span>Prix Total</span>
        <h2>{selectedOption.pricePerPerson * formData.numberOfPeople} DH</h2>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.group}>
          <label>Type de Chambre</label>
          <select 
            onChange={(e) => {
              const opt = pkg.options.find(o => o.id === parseInt(e.target.value));
              if(opt) setSelectedOption(opt);
            }}
            className={styles.input}
          >
            {pkg.options.map(opt => (
              <option key={opt.id} value={opt.id}>
                {opt.roomType} - {opt.pricePerPerson} DH/pers
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label>Nom Complet</label>
          <input 
            type="text" 
            required 
            className={styles.input}
            onChange={e => setFormData({...formData, clientName: e.target.value})}
          />
        </div>

        <div className={styles.group}>
          <label>Téléphone</label>
          <input 
            type="tel" 
            required 
            className={styles.input}
            onChange={e => setFormData({...formData, phoneNumber: e.target.value})}
          />
        </div>

        <div className={styles.group}>
          <label>Email</label>
          <input 
            type="email" 
            value={formData.email}
            disabled // Email fix hit jay mn compte
            className={styles.input}
            style={{backgroundColor: '#f0f0f0'}}
          />
        </div>

        <div className={styles.group}>
          <label>Nombre de personnes</label>
          <input 
            type="number" 
            min="1" 
            value={formData.numberOfPeople}
            className={styles.input}
            onChange={e => setFormData({...formData, numberOfPeople: parseInt(e.target.value)})}
          />
        </div>

        <Button type="submit" disabled={loading} style={{width: '100%'}}>
          {loading ? 'Envoi...' : 'Confirmer la Réservation'}
        </Button>
      </form>
    </div>
  );
}