interface SectionBannerProps {
  title: string;
  description: string;
}

export function SectionBanner({ title, description }: SectionBannerProps) {
  return (
    <div
      className="py-8"
      style={{
        background:
          "linear-gradient(135deg, rgb(var(--color-primary)) 0%, rgb(var(--color-accent)) 100%)",
        color: "rgb(var(--color-primary-foreground, 255 255 255))",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <p style={{ opacity: 0.9 }}>{description}</p>
      </div>
    </div>
  );
}
