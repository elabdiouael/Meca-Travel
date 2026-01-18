import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>Voyagez vers l'Essentiel</h1>
        <p>Hajj & Omra avec un accompagnement spirituel et un confort absolu.</p>
      </div>
    </section>
  );
}