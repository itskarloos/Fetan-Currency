"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("mission");

  return (
    <div className="container mt-10 mx-auto px-4 py-25">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <motion.div
          className="md:w-1/2 mb-8 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src="/assets/about-image.jpeg"
            alt="About Us"
            width={500}
            height={375}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
        <div className="md:w-1/2 md:pl-8">
          <div className="flex mb-4">
            <Button
              className={`mr-4 px-4 py-2 rounded ${
                activeTab === "mission"
                  ? "bg-blue-500 text-white dark:bg-orange-500 dark:text-black"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              }`}
              onClick={() => setActiveTab("mission")}
            >
              Mission
            </Button>
            <Button
              className={`px-4 py-2 rounded ${
                activeTab === "vision"
                  ? "bg-blue-500 text-white dark:bg-orange-500 dark:text-black"
                  : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
              }`}
              onClick={() => setActiveTab("vision")}
            >
              Vision
            </Button>
          </div>
          {activeTab === "mission" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We are dedicated to providing accurate and up-to-date currency
                exchange information from Ethiopian banks. Our goal is to
                empower users with the knowledge they need to make informed
                financial decisions.
              </p>
            </motion.div>
          )}
          {activeTab === "vision" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-4 dark:text-white">
                Our Vision
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                To become the most trusted and comprehensive source of currency
                exchange information in Ethiopia, fostering financial literacy
                and transparency in the banking sector.
              </p>
            </motion.div>
          )}
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-4 text-center dark:text-white">
          Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Michael Seyoum", role: "Founder & CEO" },
            { name: "Nahom Teguade", role: "Head of Operations" },
            { name: "Zeamanuel Tsegaye", role: "Lead Developer" },
          ].map((member, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4"></div>
              <h3 className="font-semibold dark:text-white">{member.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
