/*
 * Weibo Text Preprocessor
 *
 * @Author: VenDream
 * @Date: 2023-12-12 14:34:13
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { WEIBO_HOST } from '@/contants';

type Replacer = string | ((substring: string, ...args: any[]) => string);

interface ReplaceRule {
  /** match regex */
  regex: RegExp;
  /** replace value */
  value: Replacer;
}

/**
 * preprocess status text
 *
 * @export
 * @param {string} text text
 */
export function preprocessStatusText(text: string) {
  const rules: ReplaceRule[] = [
    // weibo profile: https://weibo.com/n/xxx
    {
      regex: /\<a\shref='(\/n\/[^<]+)'\>/g,
      value: `<a href='${WEIBO_HOST}$1'>`,
    },
  ];

  return rules.reduce((prevText, rule) => {
    const { regex, value } = rule;
    // string
    if (typeof value === 'string') return prevText.replace(regex, value);
    // function
    return prevText.replace(regex, value);
  }, text);
}

/**
 * preprocess comment text
 *
 * @export
 * @param {string} text text
 */
export function preprocessCommentText(text: string) {
  const rules: ReplaceRule[] = [
    // reply text: 回复xxx
    { regex: /回复(.+)\<\/a\>\:/g, value: '' },
    // weibo profile: https://weibo.com/n/xxx
    {
      regex: /\<a\shref='(\/n\/[^<]+)'\>/g,
      value: `<a href='${WEIBO_HOST}$1'>`,
    },
  ];

  return rules.reduce((prevText, rule) => {
    const { regex, value } = rule;
    // string
    if (typeof value === 'string') return prevText.replace(regex, value);
    // function
    return prevText.replace(regex, value);
  }, text);
}
