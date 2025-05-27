"use client";

import { motion } from "framer-motion";
import { Users, ShieldCheck, ThumbsUp } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen px-6 py-16 sm:px-10 lg:px-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          About CBI Bank
        </h1>
        <p className="text-gray-600 text-lg">
          We are a forward-thinking digital bank built on trust, innovation, and
          security. Serving people and businesses with smart, secure, and fast
          financial services.
        </p>
      </motion.section>

      {/* Mission and Vision */}
      <section className="grid gap-12 lg:grid-cols-2 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-6">
            To revolutionize how people interact with their finances by
            providing a seamless, secure, and empowering banking experience.
          </p>
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
            Our Values
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Customer-Centric Innovation</li>
            <li>Transparent Operations</li>
            <li>Data-Driven Security</li>
            <li>Community and Inclusion</li>
          </ul>
        </motion.div>

        <motion.img
          src="https://images.unsplash.com/photo-1667960732761-c5ddf308edbc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Bank team"
          className="rounded-3xl w-full shadow-md object-cover max-h-[400px]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        />
      </section>

      {/* Trust Indicators */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {[
          {
            icon: <Users className="h-8 w-8 text-blue-600" />,
            title: "500,000+ Customers",
            desc: "We serve a diverse community of users across the country.",
          },
          {
            icon: <ShieldCheck className="h-8 w-8 text-green-600" />,
            title: "Military-Grade Security",
            desc: "Advanced encryption and fraud monitoring at every level.",
          },
          {
            icon: <ThumbsUp className="h-8 w-8 text-indigo-600" />,
            title: "98% Customer Satisfaction",
            desc: "We prioritize your experience and feedback.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="p-6 border rounded-3xl text-center shadow-sm bg-white"
          >
            <div className="mb-3 flex justify-center">{item.icon}</div>
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              {item.title}
            </h4>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <motion.section
        className="bg-red-700 text-white py-12 px-6 rounded-3xl text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-4">
          Join the CBI Bank Family
        </h2>
        <p className="mb-6">
          Experience banking built for the digital age — secure, smart, and
          customer-first.
        </p>
        <Link href="/register">
          <button className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
            Open Your Account
          </button>
        </Link>
      </motion.section>
    </main>
  );
}
