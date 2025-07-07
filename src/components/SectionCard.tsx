import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  description: string;
  imageSrc: string;
  linkTo: string;
  bgColor: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description, imageSrc, linkTo, bgColor }) => {
  return (
    <Link to={linkTo} className="block h-full">
      <Card className={cn(
        "h-full flex flex-col items-center justify-center text-center p-4 rounded-3xl shadow-xl transition-all duration-300 hover:scale-105 border-4 border-white",
        bgColor
      )}>
        <CardHeader className="pb-2">
          <img src={imageSrc} alt={title} className="w-24 h-24 md:w-32 md:h-32 object-contain mb-2 mx-auto" />
          <CardTitle className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-md">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white text-base md:text-lg font-semibold">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SectionCard;