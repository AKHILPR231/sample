type Props = {
  brand: string;
};

function initials(brand: string): string {
  const words = brand.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

/**
 * Square brand mark. Uses initials for now; swap the inner content for an
 * <img src={logoUrl} /> once brand logos are available.
 */
export function BrandLogo({ brand }: Props) {
  return <span className="sd-logo">{initials(brand)}</span>;
}
