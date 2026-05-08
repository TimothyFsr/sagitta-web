import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Sagitta",
  description:
    "Get in touch with Sagitta for sales, pricing, setup quotes, or technical support. Email us at info@sagittascore.com",
  openGraph: {
    title: "Contact — Sagitta",
    description:
      "Get in touch with Sagitta for sales, pricing, setup quotes, or technical support. Email us at info@sagittascore.com",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
