"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

const Providers = ({ children }: ProviderProps) => (
  <NextUIProvider>{children}</NextUIProvider>
);

export default Providers;
