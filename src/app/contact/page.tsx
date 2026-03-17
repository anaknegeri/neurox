"use client";

import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import {
  Building2,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8 },
};

// Ganti dengan nomor WhatsApp Neurox (kode negara + nomor, tanpa + atau spasi)
const WHATSAPP_NUMBER = "971554141235";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubjectChange = (value: string) => {
    setFormData({ ...formData, subject: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, company, subject, message } =
      formData;

    const text = `Hello Neurox Team! 👋

*Name:* ${firstName} ${lastName}
*Email:* ${email}
*Phone:* ${phone || "-"}
*Company:* ${company || "-"}
*Subject:* ${subject || "-"}

*Message:*
${message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-accent text-sm font-medium tracking-widest uppercase mb-4"
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient tracking-tight"
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted-foreground text-lg md:text-xl mt-6 max-w-2xl mx-auto"
        >
          Have questions about our biometric solutions? Our team is here to
          help.
        </motion.p>
      </section>

      {/* Contact Info Cards */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            {
              icon: Mail,
              title: "Email",
              value: "info@neurox.ae",
              link: "mailto:info@neurox.ae",
            },
            {
              icon: Phone,
              title: "Phone",
              value: "+971554141235",
              link: "tel:+971554141235",
            },
            {
              icon: MapPin,
              title: "Address",
              value: "Meydan Grandstand & Barsha Heights, Dubai, UAE",
              link: null,
            },
            {
              icon: Clock,
              title: "Business Hours",
              value: "Sun-Thu: 9AM - 6PM GST",
              link: null,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border/50 rounded-2xl p-6 text-center hover:border-accent/30 transition-colors"
            >
              <item.icon className="w-8 h-8 text-accent mx-auto mb-4" />
              <p className="text-muted-foreground text-sm mb-2">{item.title}</p>
              {item.link ? (
                <a
                  href={item.link}
                  className="text-foreground font-medium hover:text-accent transition-colors"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-foreground font-medium">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-32 px-6 section-dark">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Form */}
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Send us a message
            </h2>
            <p className="text-muted-foreground mb-8">
              Fill out the form below and our team will get back to you within
              24 hours.
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="bg-background border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="bg-background border-border/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@company.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-background border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-background border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Your Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-background border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Select onValueChange={handleSubjectChange}>
                  <SelectTrigger className="bg-background border-border/50">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Biometric Enrollment Kit">
                      Biometric Enrollment Kit
                    </SelectItem>
                    <SelectItem value="NeuroBio NB-07">
                      NeuroBio NB-07
                    </SelectItem>
                    <SelectItem value="Request Quote">Request Quote</SelectItem>
                    <SelectItem value="Product Demo">Product Demo</SelectItem>
                    <SelectItem value="Technical Support">
                      Technical Support
                    </SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your requirements..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-background border-border/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-accent text-accent-foreground hover:opacity-90"
                size="lg"
              >
                <Send className="w-4 h-4 mr-2" />
                Send via WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By submitting this form, you agree to our Privacy Policy and
                Terms of Service.
              </p>
            </form>
          </motion.div>

          {/* Right: Additional Info */}
          <motion.div {...fadeIn} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Why choose us?
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Building2,
                    title: "Government-Grade Solutions",
                    desc: "FBI-certified and ISO-compliant biometric systems trusted by organizations worldwide.",
                  },
                  {
                    icon: Globe,
                    title: "Global Presence",
                    desc: "Deployed in 30+ countries with local support teams ready to assist you.",
                  },
                  {
                    icon: MessageSquare,
                    title: "Expert Consultation",
                    desc: "Free consultation and product demonstrations tailored to your specific needs.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border/30"
                  >
                    <item.icon className="w-6 h-6 text-accent shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office Locations */}
            <div className="bg-card/50 border border-border/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-accent" />
                Office Locations
              </h3>
              <div className="space-y-4">
                {[
                  {
                    city: "Free Zone Office",
                    address:
                      "Meydan Grandstand - 6th Floor, Al Meydan Rd - Nad Al Sheba, Nadd Al Shiba First, Dubai, UAE",
                    phone: "",
                  },
                  {
                    city: "Barsha Heights Office",
                    address:
                      "23rd Floor, Damac Smart Heights, Barsha Heights, P.O.Box 393578, Dubai, UAE",
                    phone: "+97142757445",
                  },
                ].map((office, i) => (
                  <div
                    key={i}
                    className="pb-4 border-b border-border/30 last:border-0 last:pb-0"
                  >
                    <p className="font-semibold text-foreground mb-1">
                      {office.city}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      {office.address}
                    </p>
                    {office.phone && (
                      <a
                        href={`tel:${office.phone.replace(/\s/g, "")}`}
                        className="text-sm text-accent hover:underline"
                      >
                        {office.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                24/7 Support Available
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                For urgent technical support, our team is available around the
                clock.
              </p>
              <a
                href="mailto:support@neurox.ae"
                className="text-sm text-accent hover:underline font-medium"
              >
                support@neurox.ae
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              Looking for something specific?
            </h2>
            <p className="text-muted-foreground mb-10">
              Quick links to help you find what you need faster.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: "Product Demo",
                  desc: "Schedule a live demo",
                  link: "#",
                },
                {
                  title: "Technical Docs",
                  desc: "View documentation",
                  link: "#",
                },
                {
                  title: "Request Quote",
                  desc: "Get custom pricing",
                  link: "#",
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="block p-6 rounded-2xl border border-border/50 bg-card hover:border-accent/30 transition-colors group"
                >
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <BackToTop />
      <Footer />
    </div>
  );
};

export default ContactUs;
