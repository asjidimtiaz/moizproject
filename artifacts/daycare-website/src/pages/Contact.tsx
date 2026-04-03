import { useState } from "react";
import { useSubmitContact } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const submitContact = useSubmitContact();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submitContact.mutate({ data }, {
      onSuccess: () => {
        setIsSuccess(true);
        form.reset();
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary">Get in Touch</h1>
          <p className="text-xl text-muted-foreground">
            We'd love to hear from you. Reach out with any questions or to schedule a tour of our facility.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-8">
            <Card className="border-none shadow-lg bg-brand-yellow/10">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-6 h-6 text-brand-coral" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-primary">Location</h3>
                    <p className="text-muted-foreground mt-1">123 Sunshine Blvd<br/>Springfield, ST 12345</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Phone className="w-6 h-6 text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-primary">Phone</h3>
                    <p className="text-muted-foreground mt-1">(555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Mail className="w-6 h-6 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-primary">Email</h3>
                    <p className="text-muted-foreground mt-1">hello@littlestars.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 pt-6 border-t border-brand-yellow/20">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-primary">Hours of Operation</h3>
                    <ul className="text-muted-foreground mt-1 space-y-1 text-sm">
                      <li className="flex justify-between"><span>Mon - Fri:</span> <span className="font-medium">7:00 AM - 6:00 PM</span></li>
                      <li className="flex justify-between"><span>Sat - Sun:</span> <span className="font-medium">Closed</span></li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            <Card className="border-none shadow-xl">
              <CardContent className="p-8 md:p-12">
                {isSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-brand-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Mail className="w-8 h-8 text-brand-green" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary">Message Sent!</h3>
                    <p className="text-muted-foreground">Thank you for reaching out. We will get back to you as soon as possible.</p>
                    <Button variant="outline" className="mt-8 rounded-full" onClick={() => setIsSuccess(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Name</FormLabel>
                            <FormControl><Input placeholder="John Doe" {...field} className="bg-muted/50 h-12" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl><Input type="email" placeholder="john@example.com" {...field} className="bg-muted/50 h-12" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl><Input type="tel" placeholder="(555) 123-4567" {...field} className="bg-muted/50 h-12" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />

                        <FormField control={form.control} name="subject" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl><Input placeholder="Schedule a tour" {...field} className="bg-muted/50 h-12" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      </div>

                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="How can we help you?" 
                              className="min-h-[150px] bg-muted/50" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full rounded-full bg-brand-coral hover:bg-brand-coral/90 text-white h-14 text-lg"
                        disabled={submitContact.isPending}
                      >
                        {submitContact.isPending ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
