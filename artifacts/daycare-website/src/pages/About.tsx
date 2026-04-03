import { useGetStats } from "@workspace/api-client-react";
import { motion } from "framer-motion";
import { Shield, Heart, Star, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const { data: stats } = useGetStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary py-24 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-white">Our Story</h1>
          <p className="text-xl text-primary-foreground/90 leading-relaxed">
            Founded with a simple mission: to provide a safe, nurturing, and joyful environment where every child can shine their brightest.
          </p>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="container mx-auto px-4 -mt-12 relative z-20">
          <div className="bg-white rounded-3xl shadow-xl p-8 border border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-serif font-bold text-brand-blue mb-2">{stats.yearsInOperation}+</div>
                <div className="text-sm font-medium text-muted-foreground uppercase">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-brand-coral mb-2">{stats.totalChildren}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase">Children Taught</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-brand-yellow mb-2">{stats.totalStaff}</div>
                <div className="text-sm font-medium text-muted-foreground uppercase">Expert Educators</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-brand-green mb-2">{stats.satisfactionRate}%</div>
                <div className="text-sm font-medium text-muted-foreground uppercase">Happy Parents</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission & Vision */}
      <section className="py-24 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">
          <div className="w-full md:w-1/2 aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-xl relative">
            <img 
              src="/images/hero.png" 
              alt="Children playing" 
              className="w-full h-full object-cover -rotate-3 scale-110"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <div>
              <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Philosophy</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Little Stars, we believe that early childhood is the most critical period of development. 
                Our play-based curriculum is designed to foster curiosity, creativity, and a lifelong love of learning.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand-coral/10 rounded-full flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-brand-coral" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif mb-2">Nurturing Growth</h3>
                  <p className="text-muted-foreground">We focus on the whole child—cognitive, emotional, social, and physical development.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif mb-2">Safety First</h3>
                  <p className="text-muted-foreground">Our facility and protocols are designed to give parents complete peace of mind.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary">Core Values</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Star, title: "Excellence", desc: "Striving for the highest standards in early childhood education.", color: "text-brand-yellow" },
              { icon: Heart, title: "Compassion", desc: "Treating every child with kindness, respect, and unconditional care.", color: "text-brand-coral" },
              { icon: Award, title: "Integrity", desc: "Building trust through transparency and honest communication with families.", color: "text-brand-green" },
            ].map((value, i) => (
              <Card key={i} className="border-none shadow-md bg-white">
                <CardContent className="p-8 text-center space-y-4">
                  <value.icon className={`w-12 h-12 mx-auto ${value.color}`} />
                  <h3 className="text-2xl font-bold font-serif">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
