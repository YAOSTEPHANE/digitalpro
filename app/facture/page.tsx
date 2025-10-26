"use client";

import { useState } from "react";

import Link from "next/link";

import { PiCheckCircleFill } from "react-icons/pi";

import Navbar from "@/components/navbar";

const plans = [
  {
    index: 0,
    name: "Basic",
    price: " 200.000 FCFA",
    features: [
      "Entièrement réactif sur tous les écrans",

      "Conception + Développement",

      "Canal de communication privé",
      "Délai d'exécution de 1 à 3 jours",
    ],
    style:
      " rounded-3xl  py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
    description:
      "Composants autonomes adaptés à vos besoins et facilement intégrables. Parfaits pour les éléments ou sections de sites web.",
    button: "Acheter maintenant",
  },
  {
    index: 1,
    name: "Premium",
    price: "500.000 FCFA",
    features: [
      "Entièrement réactif sur tous les écrans",
      "Code React / Next.js / Tailwind CSS",
      "Conception + développement",
      "Délai de réponse du support de 24 heures",
      "Canal de communication privé",
      "Délai d'exécution de 3 à 5 jours",
    ],
    style:
      " rounded-3xl  py-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50",
    description:
      "Idéal pour les startups en phase de démarrage, les entreprises et les freelances qui ont besoin d’un volet marketing pour présenter leur travail et leur vision.",
    button: "Acheter maintenant",
  },
  {
    index: 2,
    name: "Enterprise",
    feature: "Contactez-nous",
    price: "Discutons-en!",
    features: [
      "Entièrement réactif sur tous les écrans",
      "Code React / Next.js / Tailwind CSS",
      "Conception + développement",
      "Révisions illimitées",
      "Délai de réponse du support de 24 heures",
      "Canal de communication privé",
      "File d'attente de développement prioritaire",
      "Chef de projet dédié",
    ],
    style:
      " h-full rounded-3xl py-10 flex flex-col  bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-50  ",
    description:
      "Idéal pour les petites entreprises et les startups qui ont besoin d'un site web performant qui a fière allure et convertit les visiteurs en clients.",
    button: "Contactez-nous",
  },
];

const Facture = () => {
  return (
    <div
      className="w-full  md:items-center md:justify-center
     bg-black/[0.96] antialiased 
     bg-grid-white/[0.02] relative overflow-hidden"
    >
      <Navbar
        scrollToWebsiteDesign={() => {}}
        scrollToGraphicDesign={() => {}}
        scrollToShopifyStores={() => {}}
        scrollToBrands={() => {}}
        scrollToServices={() => {}}
      />

      <div className="flex items-center justify-center flex-col   ">
        <div className="text-5xl pb-10 md:pb-20 text-slate-300 px-6 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 bg-opacity-50">
          Tarification Simple <br /> Choisissez votre plan
        </div>
        <div className="grid md:grid-cols-3 gap-6 px-6 md:w-4/5 2xl:w-3/4 cursor-pointer pb-20  items-start ">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className="h-full flex flex-col justify-between border rounded-3xl px-6  "
            >
              <div className={plan.style}>
                <div className="text-4xl flex  items-center font-medium">
                  {plan.name}
                  {/* render feature tag only for enterprise tab*/}
                  {plan.feature === "Contactez-nous" && (
                    <div className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full ml-4 items-center ">
                      Contactez-nous
                    </div>
                  )}
                </div>
                <div className="text-3xl pt-6 ">{plan.price}</div>
                <div className="py-6">{plan.description}</div>

                <ul>
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="text-lg  py-2 flex space-x-2 items-center"
                    >
                      {/* render checkmark only for enterprise tab*/}
                      {plan.feature === "Contactez-nous" ? (
                        <PiCheckCircleFill className="text-blue-400 mr-2 text-xl" />
                      ) : (
                        <PiCheckCircleFill className="text-green-600 mr-2 text-xl" />
                      )}

                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={plan.button}>
                {index === 0 && (
                  <Link
                    href=""
                    className="rounded-3xl my-4  py-2 text-white w-full mx-auto items-center flex justify-center bg-gradient-to-r from-emerald-500 to-blue-300"
                  >
                    Acheter maintenant
                  </Link>
                )}
                {index === 1 && (
                  <Link
                    href=""
                    className="rounded-3xl my-4  py-2 text-white w-full mx-auto items-center flex justify-center bg-gradient-to-r from-emerald-500 to-blue-300"
                  >
                    Acheter maintenant
                  </Link>
                )}
                {index === 2 && (
                  <Link
                    href="/contact"
                    className="rounded-3xl my-4  py-2 text-white w-full mx-auto items-center flex justify-center bg-gradient-to-r from-purple-500 to-blue-300"
                  >
                    Contactez-nous
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facture;
