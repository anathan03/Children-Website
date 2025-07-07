import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionCard from "@/components/SectionCard";

const Index: React.FC = () => {
  const sections = [
    {
      title: "ABC Animal Coloring Book",
      description: "Color your favorite animals from A to Z!",
      imageSrc: "https://via.placeholder.com/150/FFDDC1/FFFFFF?text=Lion", // Placeholder for Lion
      linkTo: "/coloring-book",
      bgColor: "bg-pastel-peach",
    },
    {
      title: "Animal Fun Facts",
      description: "Discover amazing facts about creatures big and small!",
      imageSrc: "https://via.placeholder.com/150/B2EBF2/FFFFFF?text=Elephant", // Placeholder for Elephant
      linkTo: "/fun-facts",
      bgColor: "bg-pastel-blue",
    },
    {
      title: "Animal Mazes",
      description: "Help animals find their way through tricky mazes!",
      imageSrc: "https://via.placeholder.com/150/FFF9C4/FFFFFF?text=Monkey", // Placeholder for Monkey
      linkTo: "/animal-mazes",
      bgColor: "bg-pastel-yellow",
    },
    {
      title: "Animal Word Searches",
      description: "Find hidden animal names in exciting puzzles!",
      imageSrc: "https://via.placeholder.com/150/C8E6C9/FFFFFF?text=Panda", // Placeholder for Panda
      linkTo: "/word-searches",
      bgColor: "bg-pastel-mint",
    },
    {
      title: "Certificate of Achievement",
      description: "Print your special certificate for being an Animal Expert!",
      imageSrc: "https://via.placeholder.com/150/F8BBDA/FFFFFF?text=Star", // Placeholder for Star/Award
      linkTo: "/certificate",
      bgColor: "bg-pastel-pink",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-blue to-pastel-mint">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
            Welcome to the Animal Activity Zone!
          </h1>
          <p className="text-xl md:text-2xl text-white font-semibold drop-shadow-md">
            Get ready for a wild adventure with fun printables!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {sections.map((section) => (
            <SectionCard
              key={section.title}
              title={section.title}
              description={section.description}
              imageSrc={section.imageSrc}
              linkTo={section.linkTo}
              bgColor={section.bgColor}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;