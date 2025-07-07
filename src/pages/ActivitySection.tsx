import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PdfCard from "@/components/PdfCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface ActivitySectionProps {
  sectionTitle: string;
  animalImageSrc: string;
  localStorageKey: string;
  bgColor: string;
}

interface PdfFile {
  id: string;
  name: string;
  url: string;
}

const ActivitySection: React.FC<ActivitySectionProps> = ({ sectionTitle, animalImageSrc, localStorageKey, bgColor }) => {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);

  useEffect(() => {
    const storedPdfs = localStorage.getItem(localStorageKey);
    if (storedPdfs) {
      setPdfFiles(JSON.parse(storedPdfs));
    }
  }, [localStorageKey]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPdf: PdfFile = {
          id: Date.now().toString(), // Simple unique ID
          name: file.name,
          url: e.target?.result as string,
        };
        const updatedPdfs = [...pdfFiles, newPdf];
        setPdfFiles(updatedPdfs);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedPdfs));
        toast.success(`"${file.name}" uploaded successfully!`);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a valid PDF file.");
    }
    // Clear the input field after selection
    event.target.value = '';
  };

  const handleDeletePdf = (id: string) => {
    const updatedPdfs = pdfFiles.filter(pdf => pdf.id !== id);
    setPdfFiles(updatedPdfs);
    localStorage.setItem(localStorageKey, JSON.stringify(updatedPdfs));
    toast.info("PDF deleted.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pastel-blue to-pastel-mint">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-white hover:text-gray-200 font-semibold text-lg transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Home
          </Link>
        </div>

        <Card className={`p-6 rounded-3xl shadow-xl border-4 border-white ${bgColor} text-white mb-8`}>
          <CardHeader className="flex flex-col md:flex-row items-center justify-center text-center md:text-left pb-4">
            <img src={animalImageSrc} alt={sectionTitle} className="w-28 h-28 md:w-36 md:h-36 object-contain mr-0 md:mr-6 mb-4 md:mb-0" />
            <CardTitle className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">{sectionTitle}</CardTitle>
          </CardHeader>
          <CardContent className="text-lg md:text-xl font-semibold text-center">
            <p>Here you can upload and manage your printable documents for this section!</p>
          </CardContent>
        </Card>

        <Card className="p-6 rounded-3xl shadow-xl border-4 border-pastel-blue bg-white mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">Upload New PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="pdf-upload" className="text-lg font-semibold text-gray-700 mb-2">Select a PDF file:</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="flex-grow text-gray-700 file:text-pastel-blue file:font-semibold file:rounded-full file:border-0 file:bg-pastel-blue/10 hover:file:bg-pastel-blue/20"
                />
                <Button
                  onClick={() => document.getElementById('pdf-upload')?.click()}
                  className="bg-pastel-yellow hover:bg-pastel-peach text-white font-bold py-2 px-4 rounded-full shadow-md"
                >
                  <Upload className="w-5 h-5 mr-2" /> Upload
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 rounded-3xl shadow-xl border-4 border-pastel-mint bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">Your Uploaded PDFs</CardTitle>
          </CardHeader>
          <CardContent>
            {pdfFiles.length === 0 ? (
              <p className="text-gray-600 text-lg text-center py-4">No PDFs uploaded yet. Start by adding one above!</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pdfFiles.map((pdf) => (
                  <PdfCard key={pdf.id} id={pdf.id} fileName={pdf.name} fileUrl={pdf.url} onDelete={handleDeletePdf} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ActivitySection;