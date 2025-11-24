import { motion } from "framer-motion";
import Link from "next/link";

const DropDownMenu: React.FC = () => {
  return (
    <motion.div
      className="
    w-screen
    h-screen
    bg-gradient-to-b 
    from-neutral-50
     to-neutral-400 
     bg-opacity-50
     text-slate-300
     p-6
     space-y-4
     absolute
     top-28
     left-0
     right-0
     z-50
     rounded-t-3xl
    "
      initial={{ opacity: 0, y: "-80%" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "-100%" }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-col flex space-y-10">
        <Link href="/prisée">Prisée</Link>
        <Link href="/solutionsservices" className="text-black text-2xl">Solutions et Services</Link>
        <Link href="/etude de cas" className="text-black text-2xl">Etude de cas</Link>
        <Link href="/notretravail" className="text-black text-2xl"> Notre travail</Link>
        <Link href="/environ" className="text-black text-2xl">Environ</Link>
        <Link href="/idées" className="text-black text-2xl">Idées</Link>
        <Link href="/clientele" className="text-black text-2xl">Clientèle</Link>
        <Link href="/contact" className="text-black text-2xl">Contact</Link>
        <Link href="/apropos" className="text-black text-2xl">À propos</Link>
      </div>
    </motion.div>
  );
};

export default DropDownMenu;
