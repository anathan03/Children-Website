import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ActivitySection from "./pages/ActivitySection"; // Import the new ActivitySection component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route
            path="/coloring-book"
            element={<ActivitySection
              sectionTitle="ABC Animal Coloring Book"
              animalImageSrc="https://via.placeholder.com/150/FFDDC1/FFFFFF?text=Lion"
              localStorageKey="coloringBookPdfs"
              bgColor="bg-pastel-peach"
            />}
          />
          <Route
            path="/fun-facts"
            element={<ActivitySection
              sectionTitle="Animal Fun Facts"
              animalImageSrc="https://via.placeholder.com/150/B2EBF2/FFFFFF?text=Elephant"
              localStorageKey="funFactsPdfs"
              bgColor="bg-pastel-blue"
            />}
          />
          <Route
            path="/animal-mazes"
            element={<ActivitySection
              sectionTitle="Animal Mazes"
              animalImageSrc="https://via.placeholder.com/150/FFF9C4/FFFFFF?text=Monkey"
              localStorageKey="animalMazesPdfs"
              bgColor="bg-pastel-yellow"
            />}
          />
          <Route
            path="/word-searches"
            element={<ActivitySection
              sectionTitle="Animal Word Searches"
              animalImageSrc="https://via.placeholder.com/150/C8E6C9/FFFFFF?text=Panda"
              localStorageKey="wordSearchesPdfs"
              bgColor="bg-pastel-mint"
            />}
          />
          <Route
            path="/certificate"
            element={<ActivitySection
              sectionTitle="Certificate of Achievement"
              animalImageSrc="https://via.placeholder.com/150/F8BBDA/FFFFFF?text=Star"
              localStorageKey="certificatePdfs"
              bgColor="bg-pastel-pink"
            />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;