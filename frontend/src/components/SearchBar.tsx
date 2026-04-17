'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface SearchBarProps {
  defaultValue?: string;
  autoFocus?: boolean;
  placeholder?: string;
}

const DEBOUNCE_MS = 300;
const MIN_CHARS = 2;

export default function SearchBar({
  defaultValue = '',
  autoFocus = false,
  placeholder = 'Search verses by translation...',
}: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(defaultValue);
  const isSearchPage = pathname === '/search';

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const firstRun = useRef(true);
  useEffect(() => {
    if (!isSearchPage) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const timer = setTimeout(() => {
      const q = value.trim();
      const target = q.length >= MIN_CHARS ? `/search?q=${encodeURIComponent(q)}` : '/search';
      router.replace(target);
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [value, isSearchPage, router]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = value.trim();
    if (q.length < MIN_CHARS) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
      <span
        aria-hidden
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-600 pointer-events-none"
      >
        <SearchIcon />
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Search ayahs"
        className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-gold-300/60 shadow-sm text-brand-900 placeholder:text-brand-600/50 focus:outline-none focus:ring-2 focus:ring-gold-400 focus:border-gold-400 transition-shadow"
      />
    </form>
  );
}

function SearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}