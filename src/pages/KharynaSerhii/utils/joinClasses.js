/**
 * Об'єднує імена класів і пропускає порожні значення.
 * @param {...(string|false|null|undefined)} classNames Імена класів.
 * @returns {string} Рядок для атрибута className.
 */
export function joinClasses(...classNames) {

  return classNames.filter(Boolean).join(' ');
}
