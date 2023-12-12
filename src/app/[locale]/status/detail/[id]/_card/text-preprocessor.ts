/*
 * Weibo Text Preprocessor
 *
 * @Author: VenDream
 * @Date: 2023-12-12 14:34:13
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

interface ReplaceRule {
  /** match regex */
  regex: RegExp;
  /** replace value */
  value: string;
}

/**
 * preprocess status text
 *
 * @export
 * @param {string} text text
 */
export function preprocessStatusText(text: string) {
  const rules: ReplaceRule[] = [];

  return rules.reduce(
    (prevText, replacer) => prevText.replace(replacer.regex, replacer.value),
    text
  );
}

/**
 * preprocess comment text
 *
 * @export
 * @param {string} text text
 */
export function preprocessCommentText(text: string) {
  const rules: ReplaceRule[] = [];

  rules.push({ regex: /回复(.+)\<\/a\>\:/g, value: '' });

  return rules.reduce(
    (prevText, replacer) => prevText.replace(replacer.regex, replacer.value),
    text
  );
}
