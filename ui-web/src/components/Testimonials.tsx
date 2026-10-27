import { useState } from 'react'
import { useLanguage } from '../i18n'
import SectionHeading from './SectionHeading'

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

  const tabs = [
    { id: 'photos' as const, label: t.testimonials.photoResults },
    { id: 'videos' as const, label: t.testimonials.videoStories },
  ]

  return (
    <section id="testimonials" className="border-t border-white/5 bg-surface px-4 py-20 md:py-28">
      <div className="container mx-auto">
        <SectionHeading
          label={t.testimonials.label}
          title={t.testimonials.title}
          description={t.testimonials.description}
        />

        <div className="mb-12 flex justify-center">
          <div role="tablist" className="inline-flex rounded-full border border-white/10 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  activeTab === tab.id ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'photos' && (
          <div className="grid gap-6 md:grid-cols-3">
            {photoTestimonials.map((testimonial) => (
              <figure key={testimonial.image} className="card overflow-hidden">
                <div className="aspect-square overflow-hidden bg-ink">
                  <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                </div>
                <figcaption className="p-6">
                  <div className="mb-3 text-sm font-semibold text-primary">{testimonial.result}</div>
                  <blockquote className="mb-4 text-sm leading-relaxed text-white/60">“{testimonial.quote}”</blockquote>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="grid gap-6 md:grid-cols-3">
            {videoTestimonials.map((video) => (
              <div key={video.youtubeId} className="card overflow-hidden">
                <div className="aspect-video bg-ink">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-white">{video.name}</p>
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
