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
    },
    {
      name: 'Client Name 2',
      result: t.testimonials.client2Result,
      quote: t.testimonials.client2Quote,
    },
    {
      name: 'Client Name 3',
      result: t.testimonials.client3Result,
      quote: t.testimonials.client3Quote,
    },
  ]

  const videoTestimonials = [
    { name: 'Video Testimonial 1', duration: '2:30' },
    { name: 'Video Testimonial 2', duration: '3:15' },
    { name: 'Video Testimonial 3', duration: '1:45' },
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
                <div className="aspect-square bg-[#1a1a2e] flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-[#ff6b35]/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-[#ff6b35]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-white/60 text-sm">{t.testimonials.photoPlaceholder}</p>
                  </div>
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
                <div className="aspect-video bg-[#1a1a2e] flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#ff6b35]/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-[#ff6b35]/30 transition-colors">
                      <svg
                        className="w-8 h-8 text-[#ff6b35]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white/60 text-sm">{t.testimonials.videoPlaceholder}</p>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/50 px-2 py-1 rounded text-white text-xs">
                    {video.duration}
                  </div>
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