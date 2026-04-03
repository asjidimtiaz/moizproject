import { useListStaff } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Staff() {
  const { data: staff, isLoading } = useListStaff();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-brand-yellow/20 py-24 border-b border-brand-yellow/30">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Heart className="w-12 h-12 text-brand-coral mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">Meet Our Educators</h1>
          <p className="text-xl text-primary/80">
            Our team of passionate, certified professionals is dedicated to providing a safe, nurturing, and stimulating environment for your child.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1,2,3,4].map(i => (
              <Card key={i} className="border-none shadow-lg">
                <Skeleton className="h-64 w-full" />
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {staff?.map((member, i) => (
              <motion.div
                key={member.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } }
                }}
              >
                <Card className="h-full border-none shadow-xl overflow-hidden group hover:-translate-y-2 transition-all duration-300">
                  <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                    <img 
                      src={member.imageUrl || `/images/staff-${(i % 4) + 1}.png`} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                          <BookOpen className="w-4 h-4 text-brand-yellow" />
                          {member.education}
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Award className="w-4 h-4 text-brand-yellow" />
                          {member.yearsExperience} Years Experience
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-8 space-y-4 bg-white relative">
                    <div className="absolute top-0 right-8 -translate-y-1/2 w-12 h-12 bg-brand-coral rounded-full flex items-center justify-center shadow-lg">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-primary">{member.name}</h3>
                      <p className="text-brand-coral font-medium tracking-wide text-sm uppercase">{member.role}</p>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all">
                      {member.bio}
                    </p>

                    <div className="pt-4 border-t border-border flex flex-wrap gap-2">
                      {member.certifications.map((cert, j) => (
                        <span key={j} className="text-xs font-medium px-2 py-1 bg-muted rounded-md text-muted-foreground">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
