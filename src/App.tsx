import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header, Hero, About, GoodMatch, Testimonials, Booking, Footer } from './components'
import { LanguageProvider } from './i18n'

const HomePage = () => (
  <div className="min-h-screen bg-[#1a1a2e]">
    <Header />
    <main>
      <Hero />
      <About />
      <GoodMatch />
      <Testimonials />
      <Booking />
    </main>
    <Footer />
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <Routes>
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
