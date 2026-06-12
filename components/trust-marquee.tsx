"use client";

const items = [
  "Sites vitrine premium",
  "Applications SaaS",
  "E-commerce sur mesure",
  "SEO & acquisition",
  "UI/UX haut de gamme",
  "Abidjan · Côte d'Ivoire",
  "Performance & conversion",
  "Accompagnement dédié",
];

export default function TrustMarquee() {
  const track = [...items, ...items];

  return (
    <div className="lux-marquee-wrap mt-16 md:mt-20" aria-hidden>
      <div className="lux-marquee-fade-left" />
      <div className="lux-marquee-fade-right" />
      <div className="lux-marquee-track">
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="lux-marquee-item">
            <span className="lux-marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
