import Button from "../common/button"

export default function ContactUs() {
    return  (
        <section className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-6">Contact Us</h2>
        <p className="text-gray-400 mb-8">
          Interested in working together? Send us a message and we’ll get back to you.
        </p>
        <form className="space-y-6 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-600 text-white"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-600 text-white"
          />
          <textarea
            rows={4}
            placeholder="Your Message"
            className="w-full px-4 py-3 bg-gray-800 rounded-xl border border-gray-600 text-white"
          ></textarea>
          <Button className="text-lg px-6 py-3 rounded-xl">Send Message</Button>
        </form>
      </section>
    )
    
}