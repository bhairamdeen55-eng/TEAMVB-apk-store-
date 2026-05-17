import Link from 'next/link';

export default function CategoryCard({
  name,
  slug,
  icon,
  desc,
}: {
  name: string;
  slug: string;
  icon: string;
  desc: string;
}) {
  return (
    <Link href={`/category/${slug}`}>
      <div className="glass rounded-[34px] p-6 sm:p-7 hover:-translate-y-1 transition duration-300 border border-white/10">
        <div className="w-20 h-20 rounded-[24px] accent flex items-center justify-center text-4xl shadow-glow">
          {icon}
        </div>
        <h3 className="mt-6 text-3xl sm:text-4xl font-bold">{name}</h3>
        <p className="mt-3 text-slate-400 leading-7">{desc}</p>
        <div className="mt-5 text-indigo-300 font-semibold">Explore →</div>
      </div>
    </Link>
  );
}
