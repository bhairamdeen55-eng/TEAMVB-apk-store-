export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center text-slate-400 text-sm">
      <p>{process.env.NEXT_PUBLIC_TEAM_SUBTITLE || 'Deployed by Bhairamdeen Kushwaha and Vikas Vishwakarma'}</p>
      <p className="mt-2">© 2026 TEAMVB APK Store</p>
    </footer>
  );
}
