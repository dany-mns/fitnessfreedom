import { Header, Hero, About, GoodMatch, Testimonials, Booking, Footer } from './components'

function App() {
  return (
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
}

export default App
