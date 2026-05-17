import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CategoryCard from '@/components/CategoryCard';

const categories = [
  {
    name: 'Education',
    slug: 'education',
    icon: '📘',
    desc: 'Study apps, learning tools, notes, exam prep.',
  },
  {
    name: 'Prank',
    slug: 'prank',
    icon: '🎭',
    desc: 'Funny prank apps, joke tools and entertainment.',
  },
  {
    name: 'Social Media',
    slug: 'social-media',
    icon: '📱',
    desc: 'Chat tools, social apps and status saver tools.',
  },
  {
    name: 'Editors',
    slug: 'editors',
    icon: '✂️',
    desc: 'Photo editors, video editors and creator tools.',
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen text-white">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        <div className="glass rounded-[38px] p-6 sm:p-8 border border-white/10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            New Canvas UI Experience
          </div>

          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight">
            Discover APKs by <span className="text-accent">Category</span>
          </h1>

          <p className="mt-8 max-w-3xl text-base sm:text-lg lg:text-2xl text-slate-300 leading-8">
            Education, prank, social media, editors aur aur bhi categories modern glassmorphism canvas UI me.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              name={cat.name}
              slug={cat.slug}
              icon={cat.icon}
              desc={cat.desc}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
