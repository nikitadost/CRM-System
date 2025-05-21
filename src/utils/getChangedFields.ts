export function getChangedFields<T extends object>(
  original: T,
  updated: Partial<T>,
  keys: (keyof T)[]
): Partial<T> {
  const changed: Partial<T> = {};

  for (const key of keys) {
    if (updated[key] !== undefined && updated[key] !== original[key]) {
      changed[key] = updated[key];
    }
  }

  return changed;
}
