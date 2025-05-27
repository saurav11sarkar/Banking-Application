"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  DollarSign,
  Send,
  Clock,
  Banknote,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Secure Digital Banking",
    description:
      "Enjoy peace of mind with end-to-end encryption, biometric login, and fraud detection powered by AI.",
    icon: <ShieldCheck className="h-10 w-10 text-indigo-600" />,
  },
  {
    title: "High-Yield Fixed Deposits",
    description:
      "Lock in your savings and earn competitive interest rates with flexible maturity periods.",
    icon: <DollarSign className="h-10 w-10 text-green-600" />,
  },
  {
    title: "Instant Money Transfers",
    description:
      "Transfer funds across banks in seconds — no hidden charges, no delays.",
    icon: <Send className="h-10 w-10 text-blue-600" />,
  },
  {
    title: "24/7 Account Access",
    description:
      "Access your account, make payments, and view transactions anytime, anywhere with our web and mobile apps.",
    icon: <Clock className="h-10 w-10 text-yellow-500" />,
  },
  {
    title: "Smart Payment Solutions",
    description:
      "Use UPI, QR, NFC, or card-based payments — all supported securely under one roof.",
    icon: <Smartphone className="h-10 w-10 text-pink-600" />,
  },
  {
    title: "Loan & Credit Management",
    description:
      "Track, repay, and manage loans effortlessly with transparent EMIs and instant approvals.",
    icon: <Banknote className="h-10 w-10 text-red-600" />,
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-6 py-16 sm:px-10 lg:px-20">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Discover Our Banking Services
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          At CBI Bank, we provide modern banking solutions tailored for speed,
          security, and simplicity.
        </p>
      </motion.section>

      {/* Services Grid */}
      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={index}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="p-6 bg-white border border-gray-200 rounded-3xl shadow-sm text-center hover:shadow-lg transition duration-300"
          >
            <div className="mb-4 flex justify-center">{service.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </motion.div>
        ))}
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-20 text-center"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ready to experience smart banking?
        </h2>
        <p className="text-gray-600 mb-6">
          Open your account in minutes and start managing your money like a pro.
        </p>
      </motion.section>
    </main>
  );
}
