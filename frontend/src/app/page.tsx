import Hero from '@/components/home/Hero';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import { api } from '@/services/api';

export default async function Home() {
  // Server Component Fetching
  let packages = [];
  try {
    packages = await api.getAllPackages();
  } catch (e) {
    console.error("Backend down?", e);
  }

  return (
    <main>
      <Hero />
      <FeaturedPackages packages={packages} />
    </main>
  );
}