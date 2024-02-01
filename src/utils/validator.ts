export function isNameValid(name: string) {
  const spaceTrimName = name.replace(/\s+/g, ' ').trim();

  const regex = /^[a-zA-Zа-яА-Я]+(?:\s[a-zA-Zа-яА-Я]+)*$/;
  return regex.test(spaceTrimName) && spaceTrimName.length <= 40;
}

export function isEmailValid(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

