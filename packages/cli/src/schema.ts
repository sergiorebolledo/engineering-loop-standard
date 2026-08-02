import { readFileSync } from "node:fs";
import { Ajv2020 } from "ajv/dist/2020.js";
import type { ErrorObject } from "ajv";
import { SCHEMA_PATH } from "./paths.js";

let compiledValidator: ((data: unknown) => boolean) | undefined;
let lastErrors: ErrorObject[] | null | undefined;

function getValidator() {
  if (!compiledValidator) {
    const schema = JSON.parse(readFileSync(SCHEMA_PATH, "utf-8"));
    const ajv = new Ajv2020({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    compiledValidator = (data: unknown) => {
      const ok = validate(data);
      lastErrors = validate.errors;
      return ok;
    };
  }
  return compiledValidator;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateConfig(data: unknown): ValidationResult {
  const validate = getValidator();
  const valid = validate(data);
  const errors = (lastErrors ?? []).map(
    (err) => `${err.instancePath || "/"} ${err.message ?? "is invalid"}`,
  );
  return { valid, errors };
}
