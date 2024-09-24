import { HeroHighlight } from "@/components/ui/hero-highlight";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full bg-cover bg-fixed bg-center justify-center items-center">
      {children}
    </div>
  );
};

export default layout;
