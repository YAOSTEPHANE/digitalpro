import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"



const FAQS = () => {
    return ( 
        <div className=" mt-10 md:py-10 bg-[#f6f5f4] w-full
        rounded-3xl
        
        ">
          <div className=" p-10 md:p-4 md:px-20">
            <div className="text-3xl md:text-7xl font-bold text-black">
              Vous avez des questions ?
            </div>
            <div className="  font-semibold text-3xl md:text-6xl text-gradient bg-gradient-to-r from-emerald-600 to-blue-300 bg-clip-text text-transparent">
              Obtenez des réponses.
            </div>
            <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>Qu'est-ce que Digitalpro Solutions?</AccordionTrigger>
      <AccordionContent>
        Digitalpro Solutions est une agence de marketing à part entière qui se spécialise dans le branding, la conception de sites web et le marketing numérique.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-2">
      <AccordionTrigger>Comment commencer ?</AccordionTrigger>
      <AccordionContent>
        Vous pouvez commencer par nous contacter. Nous vous répondrons dans les 24 heures.
      </AccordionContent>
    </AccordionItem>
    <AccordionItem value="item-3">
      <AccordionTrigger>
    Tarification ?
      </AccordionTrigger>
      <AccordionContent>
        Nous offrons des solutions sur mesure pour votre entreprise. Contactez-nous pour obtenir un devis.

      </AccordionContent>
    </AccordionItem>
  
    <AccordionItem value="item-4">
      <AccordionTrigger>
    Support ?
        </AccordionTrigger>
      <AccordionContent>
        Nous offrons une assistance du lundi au vendredi pour tous nos clients.
      </AccordionContent>
    </AccordionItem>
  </Accordion>
  
  
          </div>
        </div> );
}
 
export default FAQS;