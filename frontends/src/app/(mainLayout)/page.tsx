"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const features = [
  {
    title: "Open Fixed Deposit",
    desc: "Earn high interest on your savings with flexible tenure options.",
    icon: "💰",
  },
  {
    title: "View Transactions",
    desc: "Stay on top of your finances with detailed transaction history.",
    icon: "📜",
  },
  {
    title: "Instant Transfers",
    desc: "Send and receive money instantly with advanced security.",
    icon: "⚡",
  },
  {
    title: "24/7 Support",
    desc: "Access real-time assistance whenever you need help.",
    icon: "🛎️",
  },
  {
    title: "Smart ATM Cards",
    desc: "Track spending and set goals with our budgeting tools.",
    icon: "📊",
  },
  {
    title: "Secure Login",
    desc: "Biometric and OTP-based logins for top-notch security.",
    icon: "🔐",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col items-center justify-center px-6 py-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-red-600">CBI</span> Bank
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-6">
          Your secure and modern banking partner — Fast. Reliable. Intelligent.
        </p>
        <Link href={"/login"}>
          <Button className="bg-red-600 hover:bg-red-700 text-white text-sm px-6 py-2 transition-all">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </motion.section>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-2">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex"
          >
            <Card className="shadow-lg rounded-2xl w-full flex-grow">
              <CardContent className="p-6 text-center h-full flex flex-col justify-center items-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
