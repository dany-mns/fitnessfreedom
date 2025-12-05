const GoodMatch = () => {
  const points = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "You're Ready for Change",
      description:
        "You're tired of quick fixes and ready to commit to a sustainable transformation. You understand that real results take time and consistent effort.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "You Value Your Time",
      description:
        "You have a busy schedule but you're willing to prioritize your health. You want efficient workouts that deliver maximum results without spending hours at the gym.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      title: "You Want Expert Guidance",
      description:
        "You're looking for personalized coaching, not generic programs. You want someone who understands your unique challenges and creates a plan tailored to your goals.",
    },
  ]

  return (
    <section id="match" className="py-20 md:py-32 gradient-bg px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#ff6b35] font-semibold text-sm uppercase tracking-wider">
            Is This For You?
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            You're a <span className="text-gradient">Good Match</span> If...
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            My coaching is designed for people who are serious about making a lasting change. 
            See if we're the right fit for each other.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {points.map((point, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-6 sm:p-8 hover-lift text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#ff6b35] to-[#ff8f6b] rounded-2xl flex items-center justify-center text-white">
                {point.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {point.title}
              </h3>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#booking"
            className="inline-block bg-gradient-to-r from-[#ff6b35] to-[#ff8f6b] text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-[#ff6b35]/30 transition-all hover:scale-105"
          >
            Let's Work Together
          </a>
        </div>
      </div>
    </section>
  )
}

export default GoodMatch