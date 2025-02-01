export const getNormalizeError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error(String(error));
};