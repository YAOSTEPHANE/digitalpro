'use client'

import { CardHoverEffectDemo } from "./snippets/card-hover-effect-snippet";

const Services = () => {
    return ( <div className="max-w-5xl mx-auto py-20">
   
        <div className="text-4xl pb-5 md:text-7xl text-center
         bg-clip-text text-transparent bg-gradient-to-b
          from-blue-500 to-neutral-50 bg-opacity-50 mt-20">
          Optimisez votre entreprise grâce à nos services
        </div>
        <p className="mt-4 text-lg font-normal
          text-neutral-300 max-w-lg 
          text-center mx-auto">
          De la conception de sites Web à la gestion des médias sociaux, nous offrons une large gamme de services pour vous aider à développer votre entreprise.
        </p>

        <CardHoverEffectDemo />

    </div> 
    
    );
}
 
export default Services;