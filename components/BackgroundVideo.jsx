export default function BackgroundVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="fixed top-0 left-0 w-full h-full object-cover -z-20 pointer-events-none"
    >
      <source src="/background_video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
