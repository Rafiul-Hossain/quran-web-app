import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <p className="font-amiri text-gold text-8xl mb-4" dir="rtl">٤٠٤</p>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Page Not Found</h1>
      <p className="text-text-muted text-sm mb-8">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-5 py-2.5 rounded-xl bg-accent text-[#0f1117] text-sm font-medium hover:bg-accent-light transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}