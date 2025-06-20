/*
 * Twitter Tweet List Params
 *
 * @Author: VenDream
 * @Date: 2025-06-20 14:43:33
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

type Params = Twitter.TweetListFilterParams;
type ParamsKeys = keyof Params;

export const DEFAULT_FILTER_PARAMS: Params = {
  order: 'desc',
  orderBy: 'createdAt',
  scope: 'tracking',
};

export const BOOLEAN_PARAMS_KEYS: ParamsKeys[] = [
  'isOriginal',
  'isFavourite',
  'hasVideos',
  'hasImages',
];
export const NUMBER_PARAMS_KEYS: ParamsKeys[] = [
  'leastImagesCount',
  'leastVideosCount',
];
export const STRING_PARAMS_KEYS: ParamsKeys[] = [
  'id',
  'uid',
  'startDate',
  'endDate',
  'keyword',
  'order',
  'scope',
];

export const PARAMS_KEYS: ParamsKeys[] = [
  ...BOOLEAN_PARAMS_KEYS,
  ...NUMBER_PARAMS_KEYS,
  ...STRING_PARAMS_KEYS,
];
