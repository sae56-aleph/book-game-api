/**
 * Compare le nombre de caractères différents entre deux chaines
 * @param {string} s1 - Chaine de base
 * @param {string} s2 - Chaine à comparer
 * @returns {number}
 *
 * @author Alexie GROSBOIS
 */
export function levenshteinDistance(s1, s2) {
  const matrix = [];
  for (let i = 0; i <= s1.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= s2.length; j++) {
    matrix[0][j] = j;
  }

  // Calcule la distance
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // Suppression
        matrix[i][j - 1] + 1, // Insertion
        matrix[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return matrix[s1.length][s2.length];
}
