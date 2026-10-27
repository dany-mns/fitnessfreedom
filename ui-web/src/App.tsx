import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header, Hero, GoodMatch, Offer, Testimonials, Process, About, Faq, Booking, Footer, FormPage, ScrollToTop } from './components'
import { LanguageProvider } from './i18n'

const HomePage = () => (
  <div className="min-h-screen bg-surface">
    <Header />
    <main>
      <Hero />
      <GoodMatch />
      <Offer />
      <Testimonials />
      <Process />
      <About />
      <Faq />
      <Booking />
    </main>
    <Footer />
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <Routes>
          <Route path="/form/:slug" element={<FormPage />} />
          <Route path="/en/form/:slug" element={<FormPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/en" element={<HomePage />} />
          <Route path="/en/*" element={<HomePage />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </LanguageProvider>
    </BrowserRouter>
  )
}

export default App
