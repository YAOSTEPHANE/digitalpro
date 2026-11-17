"use client";

const STARS = [
  { id: 1, x: 8, y: 14, size: 3, accent: "blue" },
  { id: 2, x: 19, y: 32, size: 2, accent: "blue" },
  { id: 3, x: 27, y: 12, size: 3, accent: "red" },
  { id: 4, x: 38, y: 24, size: 2, accent: "blue" },
  { id: 5, x: 52, y: 9, size: 3, accent: "blue" },
  { id: 6, x: 64, y: 21, size: 2.5, accent: "red" },
  { id: 7, x: 76, y: 14, size: 2, accent: "blue" },
  { id: 8, x: 89, y: 28, size: 3, accent: "blue" },
  { id: 9, x: 14, y: 58, size: 2.5, accent: "red" },
  { id: 10, x: 31, y: 68, size: 2, accent: "blue" },
  { id: 11, x: 46, y: 52, size: 2.5, accent: "blue" },
  { id: 12, x: 68, y: 63, size: 2.5, accent: "red" },
  { id: 13, x: 83, y: 54, size: 2, accent: "blue" },
  { id: 14, x: 92, y: 74, size: 2.5, accent: "blue" },
  { id: 15, x: 11, y: 86, size: 2, accent: "blue" },
  { id: 16, x: 41, y: 84, size: 3, accent: "blue" },
  { id: 17, x: 59, y: 89, size: 2, accent: "red" },
  { id: 18, x: 78, y: 82, size: 2.5, accent: "blue" },
] as const;

const StarsBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      <div className="absolute inset-0 lux-grid-backdrop opacity-55 [mask-image:radial-gradient(ellipse_90%_70%_at_50%_20%,#000_35%,transparent_100%)]" />
      <div className="absolute -top-40 left-[12%] h-[460px] w-[460px] rounded-full bg-[rgba(81,102,153,0.09)] blur-[120px]" />
      <div className="absolute top-[20%] right-[8%] h-[360px] w-[360px] rounded-full bg-[rgba(204,38,40,0.05)] blur-[120px]" />

      {STARS.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full animate-lux-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: `${(star.id % 6) * 0.55}s`,
            background:
              star.accent === "red"
                ? "rgba(204, 38, 40, 0.35)"
                : "rgba(81, 102, 153, 0.38)",
          }}
        />
      ))}
    </div>
  );
};

export default StarsBackground;
