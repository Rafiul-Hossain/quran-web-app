export default function OrnamentalDivider({
  className = '',
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 my-6 ${className}`}
      aria-hidden
    >
      <span className="flex-1 gold-rule" />
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold-400 flex-shrink-0"
      >
        <path
          d="M14 2 L17 11 L26 14 L17 17 L14 26 L11 17 L2 14 L11 11 Z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="14" cy="14" r="2" fill="#faf8f3" />
      </svg>
      <span className="flex-1 gold-rule" />
    </div>
  );
}