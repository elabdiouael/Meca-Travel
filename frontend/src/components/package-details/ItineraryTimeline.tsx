import { PackageItinerary } from '@/types';
import styles from './ItineraryTimeline.module.css';

export default function ItineraryTimeline({ itinerary }: { itinerary: PackageItinerary[] }) {
  return (
    <div className={styles.timeline}>
      <h3>Programme du Séjour</h3>
      <div className={styles.list}>
        {itinerary.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.dayBadge}>Jour {item.dayNumber}</div>
            <div className={styles.content}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}