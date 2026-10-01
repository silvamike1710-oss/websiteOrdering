const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
const isEnglishPage = /(?:^|\/)(?:index\.html)?$/.test(window.location.pathname);
const preferredLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
const preferredSupportedLanguage = preferredLanguages.find((language) =>
  /^(en|pt)(-|$)/i.test(language)
);
const prefersPortuguese = preferredSupportedLanguage?.toLowerCase().startsWith("pt");

if (
  isEnglishPage &&
  requestedLanguage !== "en" &&
  (requestedLanguage?.toLowerCase().startsWith("pt") || (!requestedLanguage && prefersPortuguese))
) {
  window.location.replace("pt-br.html");
}

const orderForm = document.querySelector("#order-form");

if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(orderForm);
    const isPortuguese = document.documentElement.lang === "pt-BR";
    const packageName = formData.get("package");
    const subject = isPortuguese
      ? `Orçamento de site — ${packageName}`
      : `Website project inquiry — ${packageName}`;
    const body = isPortuguese
      ? [
          `Nome: ${formData.get("name")}`,
          `E-mail: ${formData.get("email")}`,
          `Opção: ${packageName}`,
          "",
          "Sobre o projeto:",
          formData.get("details"),
        ].join("\n")
      : [
          `Name: ${formData.get("name")}`,
          `Email: ${formData.get("email")}`,
          `Package: ${packageName}`,
          "",
          "Project details:",
          formData.get("details"),
        ].join("\n");

    window.location.href = `mailto:hello@yourdomain.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}
