/*
 * Common Utils
 *
 * @Author: VenDream
 * @Date: 2023-11-20 16:29:02
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

/**
 * sleep for a period of time
 *
 * @export
 * @param {number} ms time in ms
 */
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * copy text
 *
 * @export
 * @param {string} text text
 */
export function copyText(text: string) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}
