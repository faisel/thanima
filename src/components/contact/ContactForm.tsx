"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface ContactFormTranslations {
  name: string;
  email: string;
  message: string;
  gdpr: string;
  submit: string;
  success: string;
  error: string;
}

interface ContactFormProps {
  translations: ContactFormTranslations;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must be at most 500 characters." }),
  gdpr: z.boolean().refine((val) => val === true, { message: "You must accept the terms and conditions." }),
});

type FormData = z.infer<typeof formSchema>;

// Dummy server action
async function submitContactForm(data: FormData): Promise<{ success: boolean; message: string }> {
  console.log("Form data submitted:", data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate random success/failure
  // const isSuccess = Math.random() > 0.3;
  // For testing, let's assume success
  const isSuccess = true;

  if (isSuccess) {
    return { success: true, message: "Form submitted successfully!" };
  } else {
    return { success: false, message: "Failed to submit form. Please try again." };
  }
}


export function ContactForm({ translations }: ContactFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      gdpr: false,
    },
  });

  async function onSubmit(values: FormData) {
    setIsSubmitting(true);
    try {
      // Here you would call your server action or API endpoint
      // For now, using a dummy function
      const result = await submitContactForm(values);

      if (result.success) {
        toast({
          title: translations.success,
          description: result.message, // Could use a specific success message from translations if available
        });
        form.reset();
      } else {
        toast({
          title: translations.error,
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: translations.error,
        description: (error as Error).message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-6 border rounded-lg shadow-subtle bg-card">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.name}</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} aria-required="true" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.email}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} aria-required="true" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{translations.message}</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message..." {...field} rows={5} aria-required="true" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gdpr"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-muted/50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-required="true"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  {translations.gdpr}
                </FormLabel>
                 {/* Add a link to privacy policy if available */}
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full md:w-auto transform transition-transform hover:scale-105" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {translations.submit}
        </Button>
      </form>
    </Form>
  );
}
