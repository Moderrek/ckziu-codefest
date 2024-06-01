export type ValidationResult = {
  valid: boolean;
  message: Set<string>;
};

function validate_name(name: string): ValidationResult {
  const MIN_LENGTH = 3;
  const has_whitespace = name.trim().length !== name.length;

  let is_lowercase = true;
  let ends_with_line = false;
  let has_special_chars = false;
  const warnings = new Set<string>();

  for (let i = 0; i < name.length; i++) {
    const symbol = name[i];
    // is char
    if (symbol.toLowerCase() !== symbol.toUpperCase()) {
      if (symbol != symbol.toLowerCase()) {
        is_lowercase = false;
        warnings.add("Nazwa nie może zawierać wielkich liter!");
      }
      continue;
    }
    if ("0123456789-".split("").includes(symbol)) continue;
    // unknown symbol
    has_special_chars = true;
    warnings.add("Nazwa zawiera niedozwolone znaki!");
  }

  if (name[name.length - 1] === "-") {
    ends_with_line = true;
    warnings.add(
      "Nazwa użytkownika nie może zaczynać się lub kończyć znakiem '-'!"
    );
  }
  if (name[0] === "-") {
    ends_with_line = true;
    warnings.add("Nazwa użytkownika nie może kończyć się znakiem '-'!");
  }

  if (name.length < MIN_LENGTH) {
    warnings.add(`Nazwa musi być zawierać minimum ${MIN_LENGTH} znaki!`);
  }

  return {
    valid:
      !has_whitespace &&
      !has_special_chars &&
      is_lowercase &&
      !ends_with_line &&
      name.length >= MIN_LENGTH,
    message: warnings
  };
}

function validate_password(
  password: string,
  passwordAgain: string
): ValidationResult {
  return {
    valid: true,
    message: new Set<string>()
  };
}

export { validate_name, validate_password };
