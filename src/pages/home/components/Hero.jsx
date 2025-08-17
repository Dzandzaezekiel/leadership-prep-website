const Hero = () => {
  return (
    <section
      className="hero h-screen flex items-center justify-center text-white text-center p-4 bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://i.postimg.cc/fTwRnvzp/background.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 fade-in-section">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase drop-shadow-lg">
          Leadership Prep
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold mb-4">
          August Edition
        </h2>
        <p className="max-w-3xl mx-auto md:text-xl mb-6">
          Building Kingdom Leaders: Understanding Our Calling, Embracing Our
          Constitution
        </p>
        <p className="text-lg md:text-2xl font-semibold mb-8">
          Event Concluded on 14th August 2025
        </p>
      </div>
    </section>
  );
};

export default Hero;
