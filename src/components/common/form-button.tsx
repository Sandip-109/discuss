import { Button } from "@nextui-org/react";
import { ReactNode } from "react";

interface FormButtonProps {
  children: ReactNode;
  isLoading: boolean;
}

export default function FormButton({ children, isLoading }: FormButtonProps) {
  return (
    <Button type="submit" isLoading={isLoading}>
      {children}
    </Button>
  );
}
