import React, { useState, FormEvent } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Puzzle, Award, CheckCircle, ShieldCheck, Quote } from 'lucide-react';

const HomePage: React.FC = () => {
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
        {/* Hero Section */}
        <section className="text-center py-12 md:py-20 bg-pastel-pink rounded-3xl shadow-xl mb-12 border-4 border-pastel-purple animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 px-4">
            Make Learning the ABCs Fun Again — Without the Struggles & Tears
          </h1>
          <p className="text-xl md:text-2xl text-white font-semibold drop-shadow-md mb-8 px-4">
            Only $5 for a Printable Bundle Packed with Coloring Pages, Mazes, Fun Facts & More
          </p>
          <Button
            asChild
            className="bg-pastel-yellow hover:bg-pastel-peach text-white text-lg md:text-xl font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <a href="https://www.etsy.com/shop/studyflowco/?etsrc=sdt" target="_blank" rel="noopener noreferrer">
              Buy on Etsy <span className="ml-2 text-sm">(Limited-Time Price!)</span>
            </a>
          </Button>
        </section>

        {/* 3-Column Product Highlights */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-pastel-peach text-white rounded-2xl shadow-lg border-4 border-pastel-red transform transition-transform hover:scale-105">
            <CardHeader className="flex flex-col items-center text-center">
              <Palette size={48} className="mb-4 drop-shadow-md" />
              <CardTitle className="text-2xl font-bold">A-Z Animal Coloring Book</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-lg">
              Engage little artists with delightful animal illustrations for every letter!
            </CardContent>
          </Card>
          <Card className="bg-pastel-blue text-white rounded-2xl shadow-lg border-4 border-pastel-purple transform transition-transform hover:scale-105">
            <CardHeader className="flex flex-col items-center text-center">
              <Puzzle size={48} className="mb-4 drop-shadow-md" />
              <CardTitle className="text-2xl font-bold">Animal Mazes & Word Searches</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-lg">
              Boost problem-solving skills and vocabulary with fun animal-themed puzzles!
            </CardContent>
          </Card>
          <Card className="bg-pastel-mint text-white rounded-2xl shadow-lg border-4 border-pastel-yellow transform transition-transform hover:scale-105">
            <CardHeader className="flex flex-col items-center text-center">
              <Award size={48} className="mb-4 drop-shadow-md" />
              <CardTitle className="text-2xl font-bold">Certificate of Achievement</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-lg">
              Celebrate their learning journey with a special printable award!
            </CardContent>
          </Card>
        </section>

        {/* Try a Free Sample Section */}
        <section className="bg-pastel-yellow p-8 rounded-3xl shadow-xl text-center mb-12 border-4 border-pastel-peach">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-4">
            Get a Free Sample Coloring Page!
          </h2>
          <p className="text-lg md:text-xl text-white font-semibold mb-6">
            Enter your name and email to get a sneak peek of our amazing bundle!
          </p>
          {submitted ? (
            <p className="text-white text-2xl font-bold">Thank you for signing up! Check your email for the sample.</p>
          ) : (
            <form onSubmit={handleSubmit} action="https://formspree.io/f/mnnzavyd" method="POST" className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                className="flex-grow p-3 rounded-full border-2 border-white focus:border-pastel-purple focus:ring-2 focus:ring-pastel-purple text-gray-800 placeholder-gray-500 shadow-inner"
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email Address"
                className="flex-grow p-3 rounded-full border-2 border-white focus:border-pastel-purple focus:ring-2 focus:ring-pastel-purple text-gray-800 placeholder-gray-500 shadow-inner"
                required
              />
              <Button type="submit" className="bg-pastel-red hover:bg-pastel-purple text-white text-lg font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105">
                Get Sample
              </Button>
            </form>
          )}
          <p className="text-sm text-white mt-4">
            *No spam, just fun!
          </p>
        </section>

        {/* Trust Bar */}
        <section className="bg-white p-6 rounded-2xl shadow-lg flex flex-wrap justify-around items-center gap-6 mb-12 border-4 border-pastel-mint">
          <div className="flex items-center text-pastel-blue font-bold text-lg md:text-xl">
            <CheckCircle size={30} className="mr-2" /> Kid-tested
          </div>
          <div className="flex items-center text-pastel-peach font-bold text-lg md:text-xl">
            <CheckCircle size={30} className="mr-2" /> Parent-approved
          </div>
          <div className="flex items-center text-pastel-yellow font-bold text-lg md:text-xl">
            <CheckCircle size={30} className="mr-2" /> Instant download
          </div>
        </section>

        {/* Guarantee Badge Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center bg-pastel-purple text-white p-6 rounded-full shadow-xl border-4 border-pastel-pink">
            <ShieldCheck size={60} className="mr-4 drop-shadow-md" />
            <span className="text-3xl md:text-4xl font-extrabold drop-shadow-lg">
              100% Satisfaction or Your Money Back!
            </span>
          </div>
        </section>

        {/* Testimonials Carousel (Placeholder) */}
        <section className="mb-12">
          <h2 className="text-center text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-8">
            What Parents Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white p-6 rounded-2xl shadow-lg border-4 border-pastel-blue">
              <CardContent className="text-center">
                <Quote size={36} className="text-pastel-blue mx-auto mb-4" />
                <p className="text-gray-700 italic mb-4">
                  "My daughter absolutely loves the coloring book! It's made learning letters so much fun."
                </p>
                <p className="font-bold text-pastel-blue">- Happy Parent A</p>
              </CardContent>
            </Card>
            <Card className="bg-white p-6 rounded-2xl shadow-lg border-4 border-pastel-peach">
              <CardContent className="text-center">
                <Quote size={36} className="text-pastel-peach mx-auto mb-4" />
                <p className="text-gray-700 italic mb-4">
                  "The mazes are a hit! My son is engaged and learning without even realizing it."
                </p>
                <p className="font-bold text-pastel-peach">- Delighted Teacher B</p>
              </CardContent>
            </Card>
            <Card className="bg-white p-6 rounded-2xl shadow-lg border-4 border-pastel-mint">
              <CardContent className="text-center">
                <Quote size={36} className="text-pastel-mint mx-auto mb-4" />
                <p className="text-gray-700 italic mb-4">
                  "Such a fantastic bundle for the price. The fun facts are a great bonus!"
                </p>
                <p className="font-bold text-pastel-mint">- Satisfied Customer C</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;