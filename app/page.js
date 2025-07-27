import React from "react";
import Opener from "./components/landingPage/opener";
import ProductAndServices from "./components/landingPage/productAndServices";
import ContactUs from "./components/landingPage/contactus";

export function HeroHeadline() {
  const services = [
    { title: "Private ChatGPT for Your Company", icon: "🧠" },
    { title: "Custom AI Agents for Unique Use Cases", icon: "🤖" },
    { title: "Automated Data Collection Systems", icon: "⚙️" },
    { title: "Crypto Analyst Bots", icon: "📈" },
  ];

  return (
    <section className="bg-gray-950 text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
          Build Private AI Infrastructure for Your Business
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-400 mb-6 max-w-3xl mx-auto">
          We build custom AI solutions — from intelligent chatbots to fully abstracted LLM systems —
          tailored for your organization. Everything is deployable on your infrastructure with no third-party dependency.
        </p>
        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-4xl mx-auto">
          Our services cover AI agents, bots, LLM integration, automation systems, Web3 dApps, and DevOps
          — helping you scale faster, smarter, and with full control.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {services.map((s, idx) => (
            <div
              key={idx}
              className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-gray-700 transition duration-200"
            >
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="text-lg font-semibold text-gray-200">{s.title}</h3>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="bg-white text-gray-900 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-100 transition">
            Get in Touch
          </button>
          <button className="border border-gray-700 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
            Explore Our Services
          </button>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-12">
      {/* Hero Section */}
      <HeroHeadline />

      {/* Opener Section */}
      {/* <Opener />      */}

      {/* Products and Services */}
      <ProductAndServices />

      {/* Contact Section */}
      <ContactUs />
    </div>
  );
}
