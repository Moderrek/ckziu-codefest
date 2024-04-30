function validate_name(name: string): {
  valid: boolean;
  message: Set<string>;
} {
  let has_spaces = false;
  let is_lowercase = true;
  let ends_with_line = false;
  let valid = false;
  const has_special = false;
  const message = new Set<string>();
  for (let i = 0; i < name.length; i++) {
    const c = name[i];
    if (c != c.toLowerCase()) {
      is_lowercase = false;
      message.add('Nazwa nie może zawierać wielkich liter!');
    }
    if (c === ' ') {
      has_spaces = true;
      message.add('Nazwa nie może zawierać spacji!');
    }
  }
  if (name[name.length - 1] === '-') {
    ends_with_line = true;
    message.add("Nazwa użytkownika nie może kończyć się '-'!");
  }
  if (name.length < 3) {
    message.add('Nazwa musi być dłuższa niż 3 znaki!');
  }
  if (!has_spaces && is_lowercase && !ends_with_line && name.length >= 3)
    valid = true;
  return {
    valid,
    message,
  };
}

export { validate_name };
