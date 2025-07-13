import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Lightbulb, Trophy, Grid, Search } from 'lucide-react'; // Changed Maze to Grid

const WhatsInsidePage: React.FC = () => {
  const bundleItems = [
    {
      icon: <BookOpen size={48} className="text-pastel-blue mb-4 drop-shadow-md" />,
      title: "A-Z Animal Coloring Book",
      description: "26 pages of delightful animal illustrations, one for each letter of the alphabet, perfect for fostering creativity and letter recognition.",
      benefits: [
        "Encourages fine motor skills",
        "Boosts letter-sound association",
        "Provides hours of creative fun",
      ],
      color: "bg-pastel-peach",
      borderColor: "border-pastel-red",
    },
    {
      icon: <Lightbulb size={48} className="text-pastel-yellow mb-4 drop-shadow-md" />,
      title: "Matching Animal Fun Facts",
      description: "Engaging facts about each animal, designed to spark curiosity and enhance learning alongside the coloring pages.",
      benefits: [
        "Expands general knowledge",
        "Promotes reading comprehension",
        "Makes learning interactive",
      ],
      color: "bg-pastel-blue",
      borderColor: "border-pastel-purple",
    },
    {
      icon: <Trophy size={48} className="text-pastel-mint mb-4 drop-shadow-md" />,
      title: "Certificate of Achievement",
      description: "A printable certificate to celebrate your child's accomplishment upon completing the ABC Animal Activity Bundle.",
      benefits: [
        "Boosts confidence and pride",
        "Provides a tangible reward",
        "Encourages continued learning",
      ],
      color: "bg-pastel-purple",
      borderColor: "border-pastel-pink",
    },
    {
      icon: <Grid size={48} className="text-pastel-red mb-4 drop-shadow-md" />, // Changed Maze to Grid
      title: "Animal Mazes",
      description: "Fun and challenging mazes featuring various animals, designed to improve problem-solving skills and hand-eye coordination.",
      benefits: [
        "Develops critical thinking",
        "Enhances spatial reasoning",
        "Offers engaging screen-free activity",
      ],
      color: "bg-pastel-yellow",
      borderColor: "border-pastel-peach",
    },
    {
      icon: <Search size={48} className="text-pastel-purple mb-4 drop-shadow-md" />,
      title: "Animal Word Searches",
      description: "Exciting word search puzzles with animal themes, perfect for expanding vocabulary and reinforcing spelling.",
      benefits: [
        "Improves vocabulary and spelling",
        "Boosts concentration",
        "Fun way to learn new words",
      ],
      color: "bg-pastel-mint",
      borderColor: "border-pastel-yellow",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-blue to-pastel-mint">
      <Header />

      <main className="flex-grow container mx-auto p-4 md:p-8">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg mb-12">
          What's Inside the ABC Animal Activity Bundle?
        </h1>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {bundleItems.map((item, index) => (
            <Card key={index} className={`${item.color} text-white rounded-2xl shadow-lg border-4 ${item.borderColor} transform transition-transform hover:scale-105`}>
              <CardHeader className="flex flex-col items-center text-center">
                {item.icon}
                <CardTitle className="text-2xl font-bold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-lg">
                <p className="mb-4">{item.description}</p>
                <ul className="list-disc list-inside text-left mx-auto max-w-xs">
                  {item.benefits.map((benefit, bIndex) => (
                    <li key={bIndex}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="text-center py-8">
          <Button
            asChild
            className="bg-pastel-yellow hover:bg-pastel-peach text-white text-lg md:text-xl font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <a href="https://www.etsy.com/shop/studyflowco/?etsrc=sdt" target="_blank" rel="noopener noreferrer">
              See Bundle on Etsy
            </a>
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default WhatsInsidePage;