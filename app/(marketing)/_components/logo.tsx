import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Image alt="Logo" src={"/logo.svg"} height={40} width={40} />

      <p className={cn("font-semibold", font.className)}>Notion</p>
    </div>
  );
};

export default Logo;
