export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-20">
      <h2 className="text-5xl sm:text-6xl font-extrabold mb-6">
        All your needs at your fingertips
      </h2>
      <p className="text-lg text-black-400 max-w-xl mb-8">
        ZM QuickServe connects clients with trusted service providers —
        fast, reliable, and seamless.
      </p>
      <a
        href="/register"
        className="bg-purple-400 shadow-md px-6 py-3 rounded-md text-white font-semibold hover:bg-green-600 transition"
      >
        Get Started
      </a>
      <img src="/ZMQS service providers.png" alt="Collage Image of Service Providers" className="mt-4" />
    </section>
  );
}
