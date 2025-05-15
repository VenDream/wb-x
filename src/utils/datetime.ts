/*
 * DateTime Utils
 *
 * @Author: VenDream
 * @Date: 2025-05-15 10:29:16
 *
 * Copyright © 2025 VenDream. All Rights Reserved.
 */

import { LANGS } from '@/constants';
import { getLocale } from '@/utils/common';
import dayjs, { EN, ZH } from '@/utils/dayjs';
import type { OpUnitType } from 'dayjs';

interface GetCreateTimeOptions {
  relative?: boolean;
  relativeUnit?: OpUnitType;
  relativeValue?: number;
  relativeAlways?: boolean;
}

type ConcreteGetCreateTimeOptions = {
  [key in keyof GetCreateTimeOptions]-?: GetCreateTimeOptions[key];
};

const DEFUALT_OPTIONS: GetCreateTimeOptions = {
  relative: true,
  relativeUnit: 'month',
  relativeValue: 6,
  relativeAlways: false,
};

/**
 * get create time
 *
 * @export
 * @param {string} ct createtime
 * @param {GetCreateTimeOptions} [options] options
 */
export function getCreateTime(ct: string, options?: GetCreateTimeOptions) {
  const { relative, relativeUnit, relativeValue, relativeAlways } = {
    ...DEFUALT_OPTIONS,
    ...options,
  } as ConcreteGetCreateTimeOptions;

  const now = dayjs();
  const createtime = dayjs(ct);
  const diffs = now.diff(createtime, relativeUnit, true);

  if (!!relativeAlways || (!!relative && diffs < relativeValue)) {
    const locale = getLocale();
    return dayjs(ct)
      .locale(locale === LANGS.en ? EN : ZH)
      .fromNow();
  }

  return createtime.format('YYYY-MM-DD[\xa0\xa0]HH:mm');
}
