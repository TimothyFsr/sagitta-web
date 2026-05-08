import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Purchase — Sagitta",
  description:
    "Lifetime and yearly licenses for Sagitta scoreboard software. Includes DIY install and preconfigured Mac setup options.",
  openGraph: {
    title: "Purchase Sagitta - Simple Pricing",
    description:
      "Lifetime and yearly licenses for Sagitta scoreboard software. Includes DIY install and preconfigured Mac setup options.",
  },
};

export default function PurchaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
