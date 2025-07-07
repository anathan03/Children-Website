import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2 } from 'lucide-react';

interface PdfCardProps {
  id: string;
  fileName: string;
  fileUrl: string;
  onDelete: (id: string) => void;
}

const PdfCard: React.FC<PdfCardProps> = ({ id, fileName, fileUrl, onDelete }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="relative flex flex-col items-center p-4 rounded-xl shadow-md bg-white border-2 border-pastel-blue hover:shadow-lg transition-shadow duration-200">
      <FileText className="w-16 h-16 text-pastel-blue mb-2" />
      <p className="text-center text-sm font-semibold text-gray-700 mb-3 line-clamp-2">{fileName}</p>
      <div className="flex gap-2 w-full justify-center">
        <Button
          onClick={() => window.open(fileUrl, '_blank')}
          className="flex-1 bg-pastel-peach hover:bg-pastel-pink text-white text-sm py-2 rounded-full"
        >
          <Download className="w-4 h-4 mr-1" /> View
        </Button>
        <Button
          onClick={() => onDelete(id)}
          variant="destructive"
          className="bg-red-500 hover:bg-red-600 text-white text-sm py-2 rounded-full"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default PdfCard;