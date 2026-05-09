export function getFontFamily(id: string): string {
  switch (id) {
    case 'amiri':
      return 'var(--font-amiri)';
    case 'scheherazade':
      return 'var(--font-scheherazade)';
    case 'noto-naskh':
      return 'var(--font-noto-naskh)';
    case 'kfgq':
    default:
      return 'var(--font-kfgq)';
  }
}
