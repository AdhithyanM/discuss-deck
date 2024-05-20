import { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface backButtonProps {
  label: string;
  href: string;
}

const BackButton: FC<backButtonProps> = ({ label, href }) => {
  return (
    <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
