/**
 * Returns millis in n minutes
 * @param minutes The minutes
 */
const minutes = (minutes: number): number => {
  return minutes * 60 * 1000;
};

export { minutes };
