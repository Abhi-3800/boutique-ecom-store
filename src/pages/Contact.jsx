import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="bg-beige-light min-h-screen py-20 px-6 md:px-24 font-serif text-brand-black w-full">
      {/* Page Title */}
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-10 tracking-wide text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Contact Us
      </motion.h1>

      <motion.div
        className="grid md:grid-cols-2 gap-16"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } }
        }}
      >
        {/* Contact Form */}
        <motion.form
          action="https://formspree.io/f/xanbronl"
          method="POST"
          autoComplete="off"
          className="bg-white rounded-xl shadow-md p-8 text-[#7f6f54]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <label className="block mb-4">
            <span className="font-semibold text-beige-dark">Name</span>
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              placeholder="Your full name"
              className="mt-1 block w-full rounded border border-beige-dark px-3 py-2 outline-none focus:ring-2 focus:ring-beige-dark"
            />
          </label>

          <label className="block mb-4">
            <span className="font-semibold text-beige-dark">Phone Number</span>
            <input
              type="phone"
              name="phone_number"
              required
              autoComplete="off"
              placeholder="99999-99999"
              className="mt-1 block w-full rounded border border-beige-dark px-3 py-2 outline-none focus:ring-2 focus:ring-beige-dark"
            />
          </label>

          <label className="block mb-4">
            <span className="font-semibold text-beige-dark">Email</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="off"
              placeholder="user@gmail.com"
              className="mt-1 block w-full rounded border border-beige-dark px-3 py-2 outline-none focus:ring-2 focus:ring-beige-dark"
            />
          </label>

          <label className="block mb-6">
            <span className="font-semibold text-beige-dark">Message</span>
            <textarea
              name="message"
              rows="5"
              required
              placeholder="Your message here..."
              className="mt-1 block w-full rounded border border-beige-dark px-3 py-2 resize-none outline-none focus:ring-2 focus:ring-beige-dark"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-beige-dark text-white py-3 rounded hover:bg-[#917d63] transition"
          >
            Send Message
          </button>
        </motion.form>

        {/* Store Information and Map */}
        <motion.div
          className="flex flex-col gap-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Store Address */}
          <div className="bg-white rounded-xl shadow-md p-6 text-[#7f6f54]">
            <h2 className="text-2xl font-semibold text-beige-dark mb-4">Visit Our Boutique</h2>
            <p>
              123 Heritage Street<br />
              Amritsar, Punjab 143001<br />
              India
            </p>
            <p className="mt-4 font-semibold">Store Hours</p>
            <p>Mon - Fri: 10:00 AM – 7:00 PM</p>
            <p>Sat - Sun: 11:00 AM – 5:00 PM</p>
          </div>

          {/* Embedded Google Map iframe */}
          <div className="rounded-xl overflow-hidden shadow-md aspect-[16/9]">
            <iframe
              title="Pehnaava Boutique Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3390.4623022188083!2d74.86983931502231!3d31.634009981385725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39196d4f7c00a7ff%3A0x955b91544edda5cb!2sGolden%20Temple%20Amritsar!5e0!3m2!1sen!2sin!4v1692661809999!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
