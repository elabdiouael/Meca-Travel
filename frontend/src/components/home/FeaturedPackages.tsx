import { TravelPackage } from '@/types';
import PackageCard from '../ui/PackageCard';
import styles from './FeaturedPackages.module.css';

export default function FeaturedPackages({ packages }: { packages: TravelPackage[] }) {
  return (
    <section className={styles.section}>
      <div className="container mx-auto px-4">
        <h2 className={styles.title}>Nos Offres à la Une</h2>
        <div className={styles.grid}>
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}