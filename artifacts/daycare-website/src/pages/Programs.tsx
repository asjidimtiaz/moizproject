import { useListPrograms } from "@workspace/api-client-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Users, DollarSign } from "lucide-react";

export default function Programs() {
  const { data: programs, isLoading } = useListPrograms();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading programs...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary/5 py-24 border-b border-primary/10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">Our Programs</h1>
          <p className="text-xl text-muted-foreground">
            Age-appropriate curriculum designed to nurture development, inspire creativity, and build confidence at every stage.
          </p>
        </div>
      </div>

      {/* Programs List */}
      <div className="container mx-auto px-4 py-24 space-y-16">
        {programs?.map((program, index) => (
          <motion.div
            key={program.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
          >
            <div className="w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <img 
                src={program.imageUrl || `/images/program-${program.name.toLowerCase().split(' ')[0]}.png`} 
                alt={program.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80';
                }}
              />
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
              <div className="inline-block px-4 py-2 rounded-full bg-brand-coral/10 text-brand-coral font-semibold text-sm">
                Ages: {program.ageRange}
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold">{program.name}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {program.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm">Mon-Fri (Weekend private care available)</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="w-5 h-5 text-primary" />
                  <span className="text-sm">Capacity: {program.capacity}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="text-sm">Full time $326 / Part time $230</span>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild size="lg" className="rounded-full shadow-md">
                  <Link href={`/programs/${program.id}`}>
                    Program Details <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <section className="py-24 bg-brand-coral/10">
        <div className="container mx-auto px-4 text-center space-y-8 max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Not sure which program is right?</h2>
          <p className="text-lg text-muted-foreground">
            We'd love to give you a tour and help you find the perfect fit for your child.
          </p>
          <Button asChild size="xl" className="rounded-full bg-brand-coral hover:bg-brand-coral/90 text-white">
            <Link href="/contact">Schedule a Tour</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
