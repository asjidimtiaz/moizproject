import { useListEvents } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Events() {
  const { data: events, isLoading } = useListEvents();

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'open-house': return <Ticket className="w-6 h-6 text-brand-blue" />;
      case 'holiday': return <Calendar className="w-6 h-6 text-brand-coral" />;
      case 'workshop': return <Calendar className="w-6 h-6 text-brand-green" />;
      default: return <Calendar className="w-6 h-6 text-brand-yellow" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'open-house': return "bg-brand-blue/10 border-brand-blue/20 text-brand-blue";
      case 'holiday': return "bg-brand-coral/10 border-brand-coral/20 text-brand-coral";
      case 'workshop': return "bg-brand-green/10 border-brand-green/20 text-brand-green";
      default: return "bg-brand-yellow/20 border-brand-yellow/30 text-brand-yellow";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-brand-green/10 py-24 border-b border-brand-green/20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Calendar className="w-12 h-12 text-brand-green mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">Upcoming Events</h1>
          <p className="text-xl text-primary/80">
            Join us for open houses, family workshops, and community celebrations.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 max-w-4xl">
        {isLoading ? (
          <div className="space-y-6">
            {[1,2,3].map(i => (
              <Card key={i} className="h-48 border-none bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {events?.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No upcoming events at this time.</div>
            ) : (
              events?.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0, transition: { delay: i * 0.1 } }
                  }}
                >
                  <Card className="border border-border/50 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col md:flex-row">
                    <div className={`md:w-48 shrink-0 flex flex-col items-center justify-center p-6 ${getEventColor(event.type)}`}>
                      <div className="text-center">
                        <span className="block text-sm font-bold uppercase tracking-widest opacity-80">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="block text-5xl font-serif font-bold my-1">
                          {new Date(event.date).getDate()}
                        </span>
                        <span className="block text-sm font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long' })}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-8 flex-1 flex flex-col justify-center relative bg-white">
                      <div className="absolute top-8 right-8">
                        {getEventIcon(event.type)}
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-2 py-1 bg-muted rounded-md inline-block mb-3">
                          {event.type.replace('-', ' ')}
                        </span>
                        <h2 className="text-2xl font-serif font-bold text-primary mb-2">{event.title}</h2>
                        <p className="text-muted-foreground">{event.description}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                          <Clock className="w-4 h-4 text-brand-coral" /> {event.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                          <MapPin className="w-4 h-4 text-brand-blue" /> {event.location}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        )}
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Want to schedule a private tour instead?</p>
          <Button asChild size="lg" className="rounded-full shadow-md bg-primary hover:bg-primary/90">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
