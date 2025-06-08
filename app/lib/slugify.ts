/**
 * Converts a string to a URL-friendly slug
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Replace spaces with hyphens
    .replace(/\s+/g, '-')
    // Remove special characters
    .replace(/[^\w\-]+/g, '')
    // Replace multiple hyphens with single hyphen
    .replace(/\-\-+/g, '-')
    // Remove leading and trailing hyphens
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Generates a unique slug for a news article
 * @param title The title of the news article
 * @param existingSlugs Optional array of existing slugs to check for uniqueness
 * @returns A unique URL-friendly slug
 */
export function generateNewsSlug(title: string, existingSlugs: string[] = []): string {
  let slug = slugify(title);
  let counter = 1;
  let uniqueSlug = slug;

  // If the slug already exists, append a number until we find a unique one
  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${slug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
} 