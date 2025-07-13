import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqPage: React.FC = () => {
  const faqs = [
    {
      question: "Is this printable or physical?",
      answer: "This is a digital, printable bundle. No physical product will be shipped. You will receive digital files that you can print at home or at a local print shop as many times as you like!",
    },
    {
      question: "How do I get the files?",
      answer: "After your purchase is complete on Etsy, you will receive an email with a download link. You can also access your downloads by going to your Etsy Profile > Purchases and Reviews.",
    },
    {
      question: "Can I print it multiple times?",
      answer: "Yes! Once you download the files, they are yours to keep forever. You can print them as many times as you need for personal use, for multiple children, or for different classes if you are a teacher.",
    },
    {
      question: "What age range is this for?",
      answer: "This bundle is specifically designed for children ages 3-6 who are beginning to learn the alphabet or need extra practice in a fun, engaging way.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Due to the digital nature of this product, we generally do not offer refunds. However, if you encounter any issues or are not 100% satisfied, please contact us, and we'll do our best to help!",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-blue to-pastel-mint">
      <Header />

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-12">
          Frequently Asked Questions
        </h1>

        <section className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg border-4 border-pastel-yellow">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-pastel-mint">
                <AccordionTrigger className="text-left text-xl font-semibold text-pastel-purple hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-lg pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FaqPage;