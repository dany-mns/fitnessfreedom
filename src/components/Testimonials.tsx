import { useState } from 'react'
import { useLanguage } from '../i18n'

const Testimonials = () => {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos')
  const { t } = useLanguage()

  const photoTestimonials = [
    {
      name: 'Client Name 1',
      result: t.testimonials.client1Result,
      quote: t.testimonials.client1Quote,
      image: '/testimonials/ptestimonil01.jpeg',
    },
    {
      name: 'Client Name 2',
      result: t.testimonials.client2Result,
      quote: t.testimonials.client2Quote,
      image: '/testimonials/ptestimonil02.jpeg',
    },
    {
      name: 'Client Name 3',
      result: t.testimonials.client3Result,
      quote: t.testimonials.client3Quote,
      image: '/testimonials/ptestimonil03.jpeg',
    },
  ]

  const videoTestimonials = [
    { name: 'Video Testimonial 1', youtubeId: 'F8_GaFYPyz8' },
    { name: 'Video Testimonial 2', youtubeId: 'gGFqysUc-cQ' },
    { name: 'Video Testimonial 3', youtubeId: 'N5RVd8jS4_c' },
  ]

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-[#0f0f1a] px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#ff6b35] font-semibold text-sm uppercase tracking-wider">
            {t.testimonials.label}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            {t.testimonials.title1} <span className="text-gradient">{t.testimonials.title2}</span>
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            {t.testimonials.description}
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'photos'
                ? 'bg-gradient-to-r from-[#ff6b35] to-[#ff8f6b] text-white'
                : 'glass-effect text-white/70 hover:text-white'
            }`}
          >
            {t.testimonials.photoResults}
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'videos'
                ? 'bg-gradient-to-r from-[#ff6b35] to-[#ff8f6b] text-white'
                : 'glass-effect text-white/70 hover:text-white'
            }`}
          >
            {t.testimonials.videoStories}
          </button>
        </div>

        {activeTab === 'photos' && (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {photoTestimonials.map((testimonial, index) => (
              <div key={index} className="glass-effect rounded-2xl overflow-hidden hover-lift">
                <div className="aspect-square bg-[#1a1a2e] overflow-hidden">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-[#ff6b35] font-semibold mb-2">
                    {testimonial.result}
                  </div>
                  <p className="text-white/70 text-sm mb-4 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-white font-semibold">{testimonial.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {videoTestimonials.map((video, index) => (
              <div key={index} className="glass-effect rounded-2xl overflow-hidden hover-lift">
                <div className="aspect-video bg-[#1a1a2e]">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <p className="text-white font-semibold">{video.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials