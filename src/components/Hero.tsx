const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen gradient-bg flex items-center justify-center pt-20 px-4"
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Your Body,
              <br />
              <span className="text-gradient">Unlock Your Freedom</span>
            </h1>
            <p className="text-white/70 text-base sm:text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0">
              Personalized fitness coaching that fits your lifestyle. 
              Get the results you deserve with a program designed specifically for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#booking"
                className="bg-gradient-to-r from-[#ff6b35] to-[#ff8f6b] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition-all hover:scale-105"
              >
                Book Free Consultation
              </a>
              <a
                href="#about"
                className="glass-effect text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="flex-1 order-1 lg:order-2 w-full max-w-lg lg:max-w-none">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#ff6b35] to-[#ff8f6b] rounded-2xl blur-2xl opacity-30"></div>
              <div className="relative glass-effect rounded-2xl p-4 sm:p-6">
                <div className="aspect-video bg-[#1a1a2e] rounded-xl overflow-hidden flex items-center justify-center">
                  <div className="text-center p-4 sm:p-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-[#ff6b35]/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff6b35]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white/60 text-sm sm:text-base">
                      Your introduction video will appear here
                    </p>
                    <p className="text-white/40 text-xs sm:text-sm mt-2">
                      Replace with your video embed code
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero