interface VideoBackgroundProps {
  videoUrl: string;
  children: React.ReactNode;
}

export default function VideoBackground({ videoUrl, children }: VideoBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.4)' }} // Darken the video to make text more readable
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}