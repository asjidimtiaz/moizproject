import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";

// Pages
import Home from "@/pages/Home";
import Programs from "@/pages/Programs";
import ProgramDetail from "@/pages/ProgramDetail";
import Enroll from "@/pages/Enroll";
import Staff from "@/pages/Staff";
import Gallery from "@/pages/Gallery";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import Faq from "@/pages/Faq";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/programs" component={Programs} />
        <Route path="/programs/:id" component={ProgramDetail} />
        <Route path="/enroll" component={Enroll} />
        <Route path="/staff" component={Staff} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/events" component={Events} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/faq" component={Faq} />
        <Route path="/admin-portal" component={Admin} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

import React from "react";

// Simple Error Boundary to catch production crashes
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any, errorInfo: any) { console.error("React Crash:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 text-center">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-primary">Something went wrong.</h1>
            <p className="text-muted-foreground">Please try refreshing the page or contact us if the issue persists.</p>
            <button onClick={() => window.location.assign("/")} className="px-4 py-2 bg-primary text-white rounded-full">Go to Home</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={(import.meta.env.BASE_URL || "").replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
