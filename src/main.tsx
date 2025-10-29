import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const observer = new MutationObserver(() => {
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    document.body.classList.remove('light');
  } else {
    document.body.classList.add('light');
  }
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
});

if (!document.documentElement.classList.contains('dark')) {
  document.body.classList.add('light');
}

createRoot(rootElement).render(<App />);
