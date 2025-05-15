/*
 * Twitter Text Preprocessor
 *
 * @Author: VenDream
 * @Date: 2025-05-15 15:07:02
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

type Replacer = string | ((substring: string, ...args: any[]) => string);

interface ReplaceRule {
  /** match regex */
  regex: RegExp;
  /** replace value */
  value: Replacer;
}

/**
 * preprocess tweet text
 *
 * @export
 * @param {string} text text
 */
export function preprocessTweetText(text: string) {
  const rules: ReplaceRule[] = [];

  return rules.reduce((prevText, rule) => {
    const { regex, value } = rule;
    // string
    if (typeof value === 'string') return prevText.replace(regex, value);
    // function
    return prevText.replace(regex, value);
  }, text);
}
