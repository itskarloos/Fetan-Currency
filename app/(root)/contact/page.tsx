"use client";

import { useState } from "react";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Simulate form submission
    setTimeout(() => {
      // Integrate with your backend API here
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    // <HeroHighlight>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 p-5 w-full items-center justify-between">
        <Card className="relative h-[280px] md:h-[600px] md:w-max-[600px] overflow-hidden">
          <CardContent className="p-0">
            <Image
              src="/assets/BusinessCard.jpg"
              alt="Contact"
              layout="fill"
              objectFit="cover"
              className="brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/50 to-purple-500/50" />
            <div className="absolute bottom-8 left-8 text-white">
              <CardTitle className="text-3xl font-bold mb-2">
                Get in Touch
              </CardTitle>
              <CardDescription className="text-lg text-white">
                We&aposd love to hear from you!
              </CardDescription>
            </div>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Contact Us
            </CardTitle>
            <CardDescription className="text-center">
              We&aposd love to hear from you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full h-32"
                />
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full sm:w-auto"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    // </HeroHighlight>
  );
};

export default ContactPage;
