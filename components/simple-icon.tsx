type IconName = 'build' | 'support' | 'grow' | 'website' | 'automation';

export function SimpleIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    build: <><path d="M8 9 4 12l4 3" /><path d="m16 9 4 3-4 3" /><path d="m14 5-4 14" /></>,
    support: <><path d="M12 3a7 7 0 0 0-7 7v3" /><path d="M5 11H3v5h4v-5H5Zm14 0h2v5h-4v-5h2Z" /><path d="M19 16a7 7 0 0 1-7 5h-1" /></>,
    grow: <><path d="M12 21V10" /><path d="M12 14c-4 0-7-2-7-6 4 0 7 2 7 6Z" /><path d="M12 10c4 0 7-2 7-6-4 0-7 2-7 6Z" /></>,
    website: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M7 6.5h.01M10 6.5h.01" /></>,
    automation: <><path d="M8 7h8l2 3-2 3H8l-2-3 2-3Z" /><path d="M12 13v5" /><path d="M9 21h6" /><path d="M12 3v4" /></>
  };
  return <span className="icon-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg></span>;
}
