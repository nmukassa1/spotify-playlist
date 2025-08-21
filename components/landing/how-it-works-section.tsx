export default function HowItWorksSection() {
  const steps = [
    {
      number: "1",
      title: "Connect Spotify",
      description: "Securely link your Spotify account to analyze your listening history and preferences.",
    },
    {
      number: "2",
      title: "Set Your Rules",
      description: "Define preferences for genres, moods, energy levels, and when you want new playlists created.",
    },
    {
      number: "3",
      title: "Enjoy Perfect Music",
      description: "Discover automatically generated playlists that evolve with your taste and keep you engaged.",
    },
  ]

  return (
    <section id="how-it-works" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-spotify-gray-light max-w-2xl mx-auto">
            Get started in minutes and let AI transform your music experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-spotify-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-black">{step.number}</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-spotify-gray-light">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
