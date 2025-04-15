import { chromium } from "playwright";
import axios, { AxiosError } from "axios";
import fs from "fs";
import path from "path";
import { z } from "zod";

const artifactDefinitionSchema = z.object({
  resourceType: z.string().nonempty(),
  name: z.string().nonempty(),
});

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    "https://interoperabilidad.minsal.cl/fhir/ig/tei/0.2.1/artifacts.html"
  );

  const links: string[] = [];

  for (const valueSet of await page
    .locator("a[title^='ValueSet']")
    .or(page.locator("a[title^='CodeSystem']"))
    .all()) {
    const href = await valueSet.getAttribute("href");
    links.push(
      `https://interoperabilidad.minsal.cl/fhir/ig/tei/0.2.1/${href.replace(
        ".html",
        ".json"
      )}`
    );
  }

  await browser.close();

  // Create pages, interact with UI elements, assert values
  await browser.close();

  for (const link of links) {
    try {
      console.log(`Descargando '${link}'...`);
      const response = await axios.get(link, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.data;

      const { name, resourceType } = artifactDefinitionSchema.parse(json);

      const pathToResourceType = path.join(".", "Artifacts", resourceType);

      if (!fs.existsSync(pathToResourceType)) {
        fs.mkdirSync(pathToResourceType, { recursive: true });
      }

      fs.writeFileSync(
        path.join(pathToResourceType, `${name}.json`),
        JSON.stringify(json, null, 2) + "\n"
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(`Ocurrió el siguiente error: '${error.message}'`);
      } else {
        console.error("Unexpected error", error);
      }
    }
  }
})();
