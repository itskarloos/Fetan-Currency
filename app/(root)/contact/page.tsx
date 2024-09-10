"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formState);
    // Reset form after submission
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="container mx-auto px-4 my-20">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Get in Touch
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              placeholder="Your Name"
              value={formState.name}
              onChange={handleInputChange}
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Your Email"
              value={formState.email}
              onChange={handleInputChange}
              required
            />
            <Input
              name="subject"
              placeholder="Subject"
              value={formState.subject}
              onChange={handleInputChange}
              required
            />
            <Textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              value={formState.message}
              onChange={handleInputChange}
              required
            />
            <Button type="submit" className="w-full group">
              <span className="mr-2">Send Message</span>
              <Send
                className="inline-block transition-transform group-hover:translate-x-1"
                size={18}
              />
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-8"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <Mail className="text-primary" />
                <span>info@example.com</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <Phone className="text-primary" />
                <span>+1 (123) 456-7890</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <MapPin className="text-primary" />
                <span>123 Main St, City, Country</span>
              </motion.div>
            </div>
          </div>

          <div className="h-64 rounded-lg overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center">
            <p className="text-gray-600">Map placeholder</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
