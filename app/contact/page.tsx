"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import * as z from "zod";

import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { toast } from "sonner";

import { Textarea } from "@/components/ui/textarea";
import { PiSmiley } from "react-icons/pi";
import Navbar from "@/components/navbar";

const FormSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  job_title: z.string(),
  company_name: z.string(),
  help: z.enum([
    "Evaluatez Digitalpro Solutions pour mon entreprise",
    "En savoir plus",
    "Obtenir une offre",
    "Autre",
  ]),
  services: z.enum([
    "Développement d'application mobile",
    "Marketing social",
    "Conception UI/UX",
    "Conception d'identité visuelle",
    "Développement de site web",
  ]),
  info: z.string(),
  terms: z.boolean(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      job_title: "",
      company_name: "",
      help: "Evaluatez Digitalpro Solutions pour mon entreprise",
      services: "Développement d'application mobile",
      info: "Je souhaite en savoir plus sur Digitalpro Solutions",
      terms: false,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      setSubmitted(true);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" w-full   md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden ">
      <Navbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />
      <div className="md:flex items-start justify-center md:py-20 px-6">
        <div className="">
          <div className="text-5xl font-medium  w-full md:w-2/3  pb-5 md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
            Contactez-nous
          </div>
          <div
            className="
              
              py-4
              text-gray-300
                    "
          >
            Parlez-nous de votre projet et nous vous contacterons dans les 24 heures.
          </div>

          <div className="bg-[#f6f5f4] md:w-4/5 space-y-6 p-4 rounded-2xl my-4 hidden md:flex md:flex-col">
            <div className="flex gap-4 border-b ">
              <div className=" font-normal pb-4 ">
                Une agence flexible pour votre entreprise pour partager des connaissances,
                livrer des projets, et collaborer.
              </div>
            </div>

            <div className="flex gap-4 border-b ">
              <div className=" font-normal pb-4 ">
                Fonctionnalités d&apos;entreprise pour gérer facilement l&apos;accès utilisateurs et la sécurité.
              </div>
            </div>

            <div className="flex gap-4  ">
              <div className=" font-normal pb-4 ">
                Support dédié pour travailler avec vous sur votre setup et vous aider
                à construire le meilleur plan pour votre entreprise.
              </div>
            </div>
          </div>
        </div>

        <Form {...form}>
          {!submitted ? (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
            space-y-4
            h-full
            border rounded-3xl p-10
            md:w-1/3
            
            
                     
                        "
            >
              <div className="md:flex items-center gap-6 ">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem className="items-center justify-center  w-full">
                      <FormLabel className="text-sm bg-clip-text text-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                        Prénom *
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem className="items-center justify-center  w-full">
                      <FormLabel className="text-sm bg-clip-text text-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                        Nom *
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="items-center justify-center  w-full">
                    <FormLabel className="text-sm bg-clip-text text-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                      Adresse email *
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem className="items-center justify-center  w-full">
                    <FormLabel className="text-sm bg-clip-text text-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                      Nom de l&apos;entreprise ?
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="services"
                render={({ field }) => (
                  <FormItem className="items-center justify-center w-full">
                    <FormLabel className="text-sm bg-clip-text text-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                    Services qui vous intéressent
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une option..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <div className="flex gap-4">
                          <SelectItem value="Développement d'application mobile">
                          Développement d&apos;application mobile
                          </SelectItem>
                        </div>
                        <SelectItem value="Marketing social">Marketing social</SelectItem>
                        <SelectItem value="Conception UI/UX">Conception UI/UX</SelectItem>
                        <SelectItem value="Conception d&apos;identité visuelle">Conception d&apos;identité visuelle</SelectItem>
                        <SelectItem value="Développement de site web">Développement de site web</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="help"
                render={({ field }) => (
                  <FormItem className="items-center justify-center  w-full">
                    <FormLabel className="text-sm bg-clip-text text-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                      Comment pouvons-nous vous aider ?
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                        
                        
                        >
                            <SelectValue placeholder="Sélectionnez une option..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <div className="flex gap-4">
                          <SelectItem value="Evaluatez Digitalpro Solutions pour mon entreprise">
                              Evaluatez Digitalpro Solutions pour mon entreprise
                          </SelectItem>
                        </div>
                        <SelectItem value="En savoir plus">En savoir plus</SelectItem>
                          <SelectItem value="Obtenir une offre">Obtenir une offre</SelectItem>
                        <SelectItem value="Autre">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="info"
                render={({ field }) => (
                  <FormItem className="items-center justify-center w-full">
                    <FormLabel className="text-sm bg-clip-text text-white bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                      Autre, pourquoi ?
                    </FormLabel>
                    <FormControl>
                      <Textarea style={{ height: "100px" }} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="
                        outline
                        border-2
                        text-sm
                        font-white
                        bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400
                        "
                      />
                    </FormControl>
                    <div className="text-xs font-light  md:w-3/4 mb-1 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                    J&apos;accepte que Digitalpro Solutions envoie des communications marketing liées à Digitalpro Solutions.
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4">
                <Button
                  type="submit"
                  className="
                            text-sm
                            font-light
                        
                            "
                  disabled={loading}
                >
                  Envoyer
                </Button>
              </div>
            </form>
          ) : (
            <>
              <div
                className="
        text-xl 
        
        md:text-2xl 
        flex 
        items-center
        justify-center
        flex-col
        

 
        px-8

        "
              >
                <div className="w-80 py-20">
                  <PiSmiley className="text-6xl text-[#6c6684] mx-auto" />

                  <div className="text-gray-500 font-light  text-center justify-center mx-auto py-10">
                    Nous avons reçu votre demande et nous vous contacterons
                    bientôt par email.
                  </div>
                </div>
              </div>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}
