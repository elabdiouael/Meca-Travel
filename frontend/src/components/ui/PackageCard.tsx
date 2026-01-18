import Image from 'next/image';
import Link from 'next/link';
import { TravelPackage } from '@/types';
import styles from './PackageCard.module.css';
import Button from './Button';

export default function PackageCard({ pkg }: { pkg: TravelPackage }) {
  // Nl9aw a9ll taman bach naffichiwh "A partir de"
  const minPrice = Math.min(...pkg.options.map(o => o.pricePerPerson));

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image 
          src={pkg.mainImageUrl} 
          alt={pkg.title} 
          fill 
          className={styles.image}
        />
        <div className={styles.badge}>{pkg.type}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <h3>{pkg.title}</h3>
          {pkg.airlineLogoUrl && (
            <img src={pkg.airlineLogoUrl} alt={pkg.airlineName} className={styles.airlineLogo} />
          )}
        </div>
        <p className={styles.dates}>
          📅 {pkg.departureDate} ➔ {pkg.returnDate}
        </p>
        <div className={styles.footer}>
          <div className={styles.price}>
            <span>À partir de</span>
            <strong>{minPrice} DH</strong>
          </div>
          <Link href={`/packages/${pkg.id}`}>
            <Button variant="outline">Voir Détails</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}