import type { Metadata } from "next";
import { Providers } from "./providers";
import { Navbar } from "../components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "A365 Agent Assistant",
  description: "Herramienta de consulta para agentes de asistencia al viajero",
};

const themeScript = `
(function(){
  var t=localStorage.getItem('a365-theme');
  var d=t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme:dark)').matches);
  if(d)document.documentElement.classList.add('dark');
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-surface-secondary min-h-screen text-foreground-primary">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
