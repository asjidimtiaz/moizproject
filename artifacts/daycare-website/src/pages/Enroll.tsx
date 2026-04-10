// @ts-nocheck
import { useState } from "react";
import { useListPrograms, useCreateEnrollment } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ChevronRight, ChevronLeft } from "lucide-react";

const formSchema = z.object({
  parentName: z.string().min(2, "Parent name is required"),
  parentEmail: z.string().email("Invalid email address"),
  parentPhone: z.string().min(10, "Phone number is required"),
  childName: z.string().min(2, "Child name is required"),
  childAge: z.coerce.number().min(0, "Age must be at least 0").max(6, "Age must be 6 or under"),
  childDateOfBirth: z.string().min(1, "Date of birth is required"),
  programId: z.coerce.number().min(1, "Please select a program"),
  startDate: z.string().min(1, "Start date is required"),
  specialNeeds: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function Enroll() {
  const { data: programs } = useListPrograms();
  const createEnrollment = useCreateEnrollment();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const defaultProgramId = searchParams.get("program");

  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      childName: "",
      childAge: "" as any,
      childDateOfBirth: "",
      programId: defaultProgramId ? parseInt(defaultProgramId) : ("" as any),
      startDate: "",
      specialNeeds: "",
    },
  });

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger(["parentName", "parentEmail", "parentPhone"]);
    } else if (step === 2) {
      isValid = await form.trigger(["childName", "childAge", "childDateOfBirth"]);
    }
    
    if (isValid) {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => {
    setStep(s => s - 1);
  };

  const onSubmit = (data: FormValues) => {
    createEnrollment.mutate({ data }, {
      onSuccess: () => {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: (error) => {
        toast({
          title: "Submission Failed",
          description: "There was an error submitting your application. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-background py-24 px-4">
        <Card className="max-w-xl w-full border-none shadow-xl text-center">
          <CardContent className="p-12 space-y-6">
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              className="w-24 h-24 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto"
            >
              <CheckCircle2 className="w-12 h-12 text-brand-green" />
            </motion.div>
            <h2 className="text-3xl font-serif font-bold text-primary">Application Received!</h2>
            <p className="text-lg text-muted-foreground">
              Thank you for trusting our daycare. We have received your enrollment application and our director will be in touch within 2 business days to discuss the next steps and schedule a tour.
            </p>
            <div className="pt-8">
              <Button onClick={() => setLocation("/")} size="xl" className="rounded-full">
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">Enrollment Application</h1>
          <p className="text-xl text-muted-foreground">
            Take the first step towards joining our childcare family.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-brand-coral"
              initial={{ width: "33%" }}
              animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
            />
          </div>
          <div className="flex justify-between relative z-10">
            {[1, 2, 3].map((num) => (
              <div 
                key={num}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  step >= num ? "bg-brand-coral text-white" : "bg-muted border-2 border-border text-muted-foreground"
                }`}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        <Card className="border-none shadow-xl bg-white overflow-hidden relative">
          <CardContent className="p-8 md:p-12">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <AnimatePresence mode="wait">
                  
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-serif font-bold">Parent / Guardian Information</h2>
                        <p className="text-muted-foreground">Let's start with your contact details.</p>
                      </div>

                      <FormField control={form.control} name="parentName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="Jane Doe" {...field} className="h-12 bg-muted/50" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="parentEmail" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl><Input type="email" placeholder="jane@example.com" {...field} className="h-12 bg-muted/50" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="parentPhone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl><Input type="tel" placeholder="(555) 123-4567" {...field} className="h-12 bg-muted/50" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-serif font-bold">Child Information</h2>
                        <p className="text-muted-foreground">Tell us about the little star joining us.</p>
                      </div>

                      <FormField control={form.control} name="childName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Child's Full Name</FormLabel>
                          <FormControl><Input placeholder="Tommy Doe" {...field} className="h-12 bg-muted/50" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="childAge" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Age (Years)</FormLabel>
                            <FormControl><Input type="number" min="0" max="6" placeholder="3" {...field} className="h-12 bg-muted/50" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="childDateOfBirth" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <FormControl><Input type="date" {...field} className="h-12 bg-muted/50" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>
                      
                      <FormField control={form.control} name="specialNeeds" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Special Needs or Allergies (Optional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Please list any allergies, dietary restrictions, or developmental needs we should know about..." 
                              className="min-h-[100px] bg-muted/50" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="mb-8 border-b pb-4">
                        <h2 className="text-2xl font-serif font-bold">Program Selection</h2>
                        <p className="text-muted-foreground">Choose the program and desired start date.</p>
                      </div>

                      <FormField control={form.control} name="programId" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select Program</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-muted/50">
                                <SelectValue placeholder="Select a program" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {programs?.map(p => (
                                <SelectItem key={p.id} value={p.id.toString()}>{p.name} ({p.ageRange})</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <FormField control={form.control} name="startDate" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Desired Start Date</FormLabel>
                          <FormControl><Input type="date" {...field} className="h-12 bg-muted/50" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between pt-8 border-t">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={prevStep} size="lg" className="rounded-full">
                      <ChevronLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                  ) : <div></div>}

                  {step < 3 ? (
                    <Button type="button" onClick={nextStep} size="lg" className="rounded-full bg-brand-coral hover:bg-brand-coral/90 text-white">
                      Next Step <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="rounded-full bg-primary"
                      disabled={createEnrollment.isPending}
                    >
                      {createEnrollment.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
