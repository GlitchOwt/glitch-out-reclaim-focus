import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates Instagram embed code from a reel URL
 * @param instagramUrl - The Instagram reel URL
 * @returns The embed code HTML string
 */
export const generateInstagramEmbedCode = (instagramUrl: string): string => {
  // Extract the reel ID from various Instagram URL formats
  const reelIdMatch = instagramUrl.match(/\/reel\/([A-Za-z0-9_-]+)/);
  if (!reelIdMatch) {
    throw new Error("Invalid Instagram reel URL");
  }
  
  const reelId = reelIdMatch[1];
  
  // Generate the embed code
  return `<iframe src="https://www.instagram.com/reel/${reelId}/embed/" 
    width="100%" 
    height="100%" 
    frameborder="0" 
    scrolling="no" 
    allowtransparency="true"
    style="background: transparent;">
  </iframe>`;
};

/**
 * Validates if a URL is a valid Instagram reel URL
 * @param url - The URL to validate
 * @returns boolean indicating if it's a valid Instagram reel URL
 */
export const isValidInstagramReelUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'www.instagram.com' && 
           urlObj.pathname.includes('/reel/');
  } catch {
    return false;
  }
};
