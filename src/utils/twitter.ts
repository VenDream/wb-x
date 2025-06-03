/*
 * Twitter Utils
 *
 * @Author: VenDream
 * @Date: 2025-05-15 14:31:06
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { getFileName } from './common';
import { getAppSettings } from './settings';
import { fixHttps } from './url';

const IMAGE_PROXY = process.env.NEXT_PUBLIC_IMAGE_PROXY;
const VIDEO_PROXY = process.env.NEXT_PUBLIC_VIDEO_PROXY;

interface ImageVariants {
  sm: string;
  md: string;
  lg: string;
  origin: string;
  filename?: string;
}

/**
 * get twitter image variants
 *
 * @export
 * @param {string} src image src
 */
export function getImageVariants(src: string) {
  const url = fixHttps(src);
  let filename = getFileName(url);
  if (!filename.endsWith('.jpg')) {
    filename = `${filename}.jpg`;
  }

  const variants: ImageVariants = {
    sm: url,
    md: url,
    lg: url,
    origin: url,
    filename,
  };

  // invalid src
  if (!src || !src.includes('pbs.twimg.com')) return variants;

  // process
  variants.sm = getProxiedImageUrl(url.replace('name=orig', 'name=small'));
  variants.md = getProxiedImageUrl(url.replace('name=orig', 'name=medium'));
  variants.lg = getProxiedImageUrl(url.replace('name=orig', 'name=large'));

  return variants;
}

/**
 * get proxied twitter image url
 *
 * @export
 * @param {string} src src
 */
export function getProxiedImageUrl(src: string) {
  const { useImageProxy } = getAppSettings();

  if (!!useImageProxy && IMAGE_PROXY) {
    return `${IMAGE_PROXY}?url=${encodeURIComponent(src)}`;
  }
  return src;
}

/**
 * get proxied twitter video url
 *
 * @export
 * @param {string} src src
 */
export function getProxiedVideoUrl(src: string) {
  const { useVideoProxy } = getAppSettings();

  if (!!useVideoProxy && VIDEO_PROXY) {
    return `${VIDEO_PROXY}?url=${encodeURIComponent(src)}`;
  }
  return src;
}

/**
 * dedupe tweet list
 *
 * @export
 * @param {Twitter.Tweet[]} list tweet list
 */
export function dedupeTweetList(list: Twitter.Tweet[]) {
  const map = new Map<string, Twitter.Tweet>();
  list.forEach(tweet => {
    map.set(tweet.id, tweet);
  });
  return Array.from(map.values());
}

/**
 * dedupe comment list
 *
 * @export
 * @param {Twitter.ConversationThread[]} list comment list
 */
export function dedupeCommentList(list: Twitter.ConversationThread[]) {
  const map = new Map<string, Twitter.ConversationThread>();
  list.forEach(thread => {
    map.set(thread.id, thread);
  });
  return Array.from(map.values());
}

/**
 * dedupe comment thread items
 *
 * @export
 * @param {Twitter.ConversationTweet[]} list comment items
 */
export function dedupeCommentThreadItems(
  list: Twitter.ConversationThread['items']
) {
  const map = new Map<
    string,
    Twitter.ConversationTweet | Twitter.ConversationShowRepliesCursor
  >();
  list.forEach(item => {
    const tweet = item as Twitter.ConversationTweet;
    const cursor = item as Twitter.ConversationShowRepliesCursor;
    map.set(tweet.id || cursor.cursor, item);
  });
  return Array.from(map.values());
}
