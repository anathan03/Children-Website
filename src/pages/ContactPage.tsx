import React, { useState, FormEvent } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset(); // Clear the form fields
      } else {
        // Handle errors, e.g., show an error toast
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-blue to-pastel-mint">
      <Header />

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-12">
          Get in Touch!
        </h1>

        <section className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border-4 border-pastel-peach">
          {submitted ? (
            <div className="text-center text-pastel-purple text-2xl font-bold py-10">
              <p>Thank you for your message! We'll get back to you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} action="https://formspree.io/f/mnnzavyd" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 text-lg font-semibold mb-2">Your Name</label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full p-3 rounded-lg border-2 border-pastel-mint focus:border-pastel-purple focus:ring-2 focus:ring-pastel-purple text-gray-800 shadow-inner"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-lg font-semibold mb-2">Your Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className="w-full p-3 rounded-lg border-2 border-pastel-mint focus:border-pastel-purple focus:ring-2 focus:ring-pastel-purple text-gray-800 shadow-inner"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 text-lg font-semibold mb-2">Your Message</label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Type your message here..."
                  rows={6}
                  className="w-full p-3 rounded-lg border-2 border-pastel-mint focus:border-pastel-purple focus:ring-2 focus:ring-pastel-purple text-gray-800 shadow-inner"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-pastel-red hover:bg-pastel-purple text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                Send Message
              </Button>
            </form>
          )}

          <div className="mt-8 text-center text-gray-700">
            <p className="text-lg font-semibold mb-2">Or reach us directly:</p>
            <p className="flex items-center justify-center text-pastel-purple text-xl font-bold">
              <Mail size={24} className="mr-2" /> support@animalactivityzone.com
            </p>
            {/* <p className="flex items-center justify-center text-pastel-purple text-xl font-bold mt-2">
              <Phone size={24} className="mr-2" /> (123) 456-7890
            </p> */}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;