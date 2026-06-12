import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import LuxSectionHeader from "@/components/lux-section-header";

const FAQS = () => {
  return (
    <div className="lux-section-premium lux-section-spotlight w-full rounded-3xl">
      <LuxSectionHeader
        label="FAQ"
        title="Vous avez des questions ?"
        description="Obtenez des réponses."
        align="center"
        accent="red"
      />

      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="item-1" className="border-[rgba(81,102,153,0.22)]">
          <AccordionTrigger className="lux-heading !text-lg md:!text-xl font-semibold text-[var(--lux-champagne)] hover:no-underline py-6">
            Qu&apos;est-ce que Digitalpro Solutions?
          </AccordionTrigger>
          <AccordionContent className="lux-muted text-base leading-relaxed">
            Digitalpro Solutions est une agence de marketing à part entière qui se spécialise dans le
            branding, la conception de sites web et le marketing numérique.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-[rgba(81,102,153,0.22)]">
          <AccordionTrigger className="lux-heading !text-lg md:!text-xl font-semibold text-[var(--lux-champagne)] hover:no-underline py-6">
            Comment commencer ?
          </AccordionTrigger>
          <AccordionContent className="lux-muted text-base leading-relaxed">
            Vous pouvez commencer par nous contacter. Nous vous répondrons dans les 24 heures.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-[rgba(81,102,153,0.22)]">
          <AccordionTrigger className="lux-heading !text-lg md:!text-xl font-semibold text-[var(--lux-champagne)] hover:no-underline py-6">
            Tarification ?
          </AccordionTrigger>
          <AccordionContent className="lux-muted text-base leading-relaxed">
            Nous offrons des solutions sur mesure pour votre entreprise. Contactez-nous pour obtenir
            un devis.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4" className="border-[rgba(81,102,153,0.22)]">
          <AccordionTrigger className="lux-heading !text-lg md:!text-xl font-semibold text-[var(--lux-champagne)] hover:no-underline py-6">
            Support ?
          </AccordionTrigger>
          <AccordionContent className="lux-muted text-base leading-relaxed">
            Nous offrons une assistance du lundi au vendredi pour tous nos clients.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQS;
