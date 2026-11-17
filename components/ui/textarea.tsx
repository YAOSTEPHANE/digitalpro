import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-[rgba(81,102,153,0.22)] placeholder:text-slate-400 focus-visible:border-[var(--brand-blue)] focus-visible:bg-white focus-visible:ring-[rgba(81,102,153,0.18)] aria-invalid:ring-destructive/20 aria-invalid:border-destructive flex field-sizing-content min-h-24 w-full rounded-xl border bg-white px-3.5 py-2.5 text-base text-slate-900 shadow-xs transition-[color,box-shadow,border-color,background-color] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
