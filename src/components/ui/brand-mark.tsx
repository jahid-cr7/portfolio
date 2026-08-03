import Link from "next/link";

export function BrandMark() {
  return (
    <Link
      href="/"
      className="group inline-flex items-center font-sans text-xl font-semibold tracking-tight text-foreground"
      aria-label="Jahid portfolio homepage"
    >
      <span>JAHID</span>
      <span className="text-accent transition-colors group-hover:text-accent-hover">
        .
      </span>
    </Link>
  );
}
