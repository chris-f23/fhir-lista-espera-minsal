import { ZodError } from "zod";

export const printZodError = (error: ZodError) => {
  console.error(
    error.issues
      .map((issue) => {
        let issuePath = [];
        issuePath.push("root");

        issuePath.push(
          ...issue.path.map((p) => {
            if (typeof p === "number") {
              return `[${p}]`;
            }

            return p;
          })
        );

        return `❌ ${issuePath.join(".")}: ${issue.message}`;
      })
      .join("\n")
  );
};
