import Image from 'next/image';
import { api } from '@/services/api';
import BookingForm from '@/components/package-details/BookingForm';
import ItineraryTimeline from '@/components/package-details/ItineraryTimeline';
import styles from './page.module.css';

// HNA L-FIX: params type wella Promise
export default async function PackageDetails({ params }: { params: Promise<{ id: string }> }) {
  
  // 1. Unwrap params (Hadi hiya li kant na9sa)
  const { id } = await params;

  // 2. Daba 3ad n3iyto l API b l-ID s7i7
  const pkg = await api.getPackageById(id);

  return (
    <div className={styles.container}>
      {/* Header Image */}
      <div className={styles.headerImage}>
        <Image 
          src={pkg.mainImageUrl} 
          alt={pkg.title} 
          fill 
          className={styles.img}
          priority // Bach t-chargé b zerba
        />
        <div className={styles.overlay}>
          <h1>{pkg.title}</h1>
        </div>
      </div>

      <div className={styles.contentGrid}>
        {/* Left Column: Details */}
        <div className={styles.details}>
          <section className={styles.section}>
            <h2>Description</h2>
            <p>{pkg.description}</p>
          </section>

          <section className={styles.section}>
            <h2>Ce qui est inclus</h2>
            <ul className={styles.features}>
              {pkg.features.map((f, i) => <li key={i}>✅ {f}</li>)}
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Hôtels</h2>
            <div className={styles.hotels}>
              {pkg.hotels.map(h => (
                <div key={h.id} className={styles.hotelCard}>
                  {/* Check ila kanet tswira kayna */}
                  {h.mainImageUrl && <img src={h.mainImageUrl} alt={h.name} />}
                  <div>
                    <h4>{h.name}</h4>
                    <span>{h.stars}⭐ - {h.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <ItineraryTimeline itinerary={pkg.itinerary} />
        </div>

        {/* Right Column: Booking */}
        <div className={styles.sidebar}>
          <BookingForm pkg={pkg} />
        </div>
      </div>
    </div>
  );
}