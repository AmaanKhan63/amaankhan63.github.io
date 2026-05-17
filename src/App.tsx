import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Work from "./pages/Work";
import Writing from "./pages/Writing";
import NotFound from "./pages/NotFound";
import CostEstimation from "./pages/work/CostEstimation";
import MultiProviderAi from "./pages/work/MultiProviderAi";
import WopiAdidas from "./pages/work/WopiAdidas";
import RealtimeCollab from "./pages/work/RealtimeCollab";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/cost-estimation" element={<CostEstimation />} />
            <Route path="/work/multi-provider-ai" element={<MultiProviderAi />} />
            <Route path="/work/wopi-adidas" element={<WopiAdidas />} />
            <Route path="/work/realtime-collab" element={<RealtimeCollab />} />
            <Route path="/writing" element={<Writing />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
