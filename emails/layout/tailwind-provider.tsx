import { Tailwind } from "@react-email/components";

export default function TailwindProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#007291",
              secondary: "#0284a8",
              background: "#F9FAFB",
            },
            fontFamily: {
              sans: ["Nunito", "sans-serif"],
            },
          },
        },
      }}
    >
      {children}
    </Tailwind>
  );
}
