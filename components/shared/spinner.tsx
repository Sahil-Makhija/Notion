import { cva, type VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

const spinnerVariants = cva("text-muted-foreground animate-spin", {
  variants: {
    size: {
      default: "size-4",
      sm: "size-2",
      md: "size-6",
      lg: "size-8",
      icon: "size-10",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

interface SpinnerProps extends VariantProps<typeof spinnerVariants> {}

export const Spinner = ({ size }: SpinnerProps) => {
  return <Loader className={cn(spinnerVariants({ size }))} />;
};
