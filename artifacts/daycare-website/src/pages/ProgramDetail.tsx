import { useGetProgram } from "@workspace/api-client-react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, Users, DollarSign, Calendar, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProgramDetail() {
  const [, params] = useRoute("/programs/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  
  const { data: program, isLoading } = useGetProgram(id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 space-y-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-[400px] w-full rounded-3xl" />
        <div className="space-y-4">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    );
  }

  if (!program) {
    return <div className="container mx-auto px-4 py-24 text-center">Program not found.</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero Image */}
      <div className="relative h-[40vh] min-h-[300px] md:h-[50vh] w-full">
        <img 
          src={program.imageUrl || `/images/program-${program.name.toLowerCase().split(' ')[0]}.png`} 
          alt={program.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=800&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground/70 mb-6 hover:text-foreground transition-colors w-fit">
          <ArrowLeft className="w-4 h-4" />
          <Link href="/programs">Back to Programs</Link>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-brand-yellow text-primary font-semibold text-sm shadow-sm">
                Ages: {program.ageRange}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">{program.name}</h1>
              <div className="prose prose-lg prose-slate max-w-none text-muted-foreground leading-relaxed">
                <p>{program.description}</p>
                <p>Our {program.name.toLowerCase()} is thoughtfully designed to provide a safe, engaging, and developmentally appropriate environment. We focus on nurturing each child's unique potential through structured activities, free play, and compassionate guidance.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-serif font-bold text-foreground">Program Features</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {program.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 bg-muted/50 p-4 rounded-xl border border-border/50">
                    <CheckCircle2 className="w-6 h-6 text-brand-green shrink-0 mt-0.5" />
                    <span className="text-foreground/80 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="shadow-lg border-primary/10 sticky top-24">
              <CardContent className="p-8 space-y-8">
                <h3 className="text-2xl font-serif font-bold text-center border-b pb-4">Program Details</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Schedule</p>
                      <p className="font-bold text-foreground">Mon-Fri (Weekend private care available)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center shrink-0">
                      <Calendar className="w-6 h-6 text-brand-yellow" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Availability</p>
                      <p className="font-bold text-foreground">{program.capacity - program.enrolled} spots left</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center shrink-0">
                      <DollarSign className="w-6 h-6 text-brand-green" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Tuition</p>
                      <p className="font-bold text-foreground">Full time $326 / Part time $230</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button asChild size="xl" className="w-full rounded-xl text-lg h-14 shadow-md">
                    <Link href={`/enroll?program=${program.id}`}>Apply for Enrollment</Link>
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-3">
                    Applying does not guarantee a spot. We will contact you to confirm availability.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
