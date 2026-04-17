import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <p className="text-6xl font-amiri text-gold-500 mb-4">٤٠٤</p>
      <h1 className="text-2xl font-bold text-brand-800 mb-2">Page not found</h1>
      <p className="text-brand-700/70 mb-6">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-block px-5 py-2 bg-brand-800 text-gold-200 rounded-lg hover:bg-brand-900 transition-colors font-medium shadow-md hover:shadow-lg"
      >
        Go home
      </Link>
    </div>
  );
}