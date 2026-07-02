import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
      {children}
    </section>
  );
}
