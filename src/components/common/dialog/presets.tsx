/*
 * Dialog Presets
 *
 * @Author: VenDream
 * @Date: 2024-08-20 10:46:35
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import {
  CircleAlertIcon,
  CircleCheckBigIcon,
  CircleHelpIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
} from 'lucide-react';
import type { DialogProps } from './types';

type PresetGetter = (t: TFunction) => DialogProps;

const ICON_SIZE = 18;
const ICON_CLASS = 'mr-2 !stroke-2';

export const DEFAULT_PRESET: DialogProps = {
  keyboard: true,
  mask: true,
  maskClosable: true,
};

export const ALERT_PRESET: PresetGetter = t => ({
  ...DEFAULT_PRESET,

  icon: <TriangleAlertIcon size={ICON_SIZE} className={ICON_CLASS} />,
  title: t('global.status.caution'),
  keyboard: false,
  closable: false,
  maskClosable: false,
  okBtnProps: { color: 'error' },
  classNames: { title: 'text-error' },
});

export const CONFIRM_PRESET: PresetGetter = t => ({
  ...DEFAULT_PRESET,

  icon: <CircleHelpIcon size={ICON_SIZE} className={ICON_CLASS} />,
  title: t('global.status.confirm'),
  okBtnProps: { color: 'info' },
  classNames: { title: 'text-info' },
});

export const INFO_PRESET: PresetGetter = t => ({
  ...DEFAULT_PRESET,

  icon: <InfoIcon size={ICON_SIZE} className={ICON_CLASS} />,
  title: t('global.status.info'),
  cancelBtn: null,
  okBtnProps: { color: 'info' },
  classNames: { title: 'text-info' },
});

export const SUCCESS_PRESET: PresetGetter = t => ({
  ...DEFAULT_PRESET,

  icon: <CircleCheckBigIcon size={ICON_SIZE} className={ICON_CLASS} />,
  title: t('global.status.success'),
  cancelBtn: null,
  okBtnProps: { color: 'success' },
  classNames: { title: 'text-success' },
});

export const WARNING_PRESET: PresetGetter = t => ({
  ...DEFAULT_PRESET,

  icon: <CircleAlertIcon size={ICON_SIZE} className={ICON_CLASS} />,
  title: t('global.status.warning'),
  cancelBtn: null,
  okBtnProps: { color: 'warning' },
  classNames: { title: 'text-warning' },
});

export const ERROR_PRESET: PresetGetter = t => ({
  ...DEFAULT_PRESET,

  icon: <CircleXIcon size={ICON_SIZE} className={ICON_CLASS} />,
  title: t('global.status.error'),
  cancelBtn: null,
  okBtnProps: { color: 'error' },
  classNames: { title: 'text-error' },
});

export const PRESETS: Record<DialogProps['preset'] & string, PresetGetter> = {
  alert: ALERT_PRESET,
  confirm: CONFIRM_PRESET,
  info: INFO_PRESET,
  success: SUCCESS_PRESET,
  warning: WARNING_PRESET,
  error: ERROR_PRESET,
};

export function getPreset(t: TFunction, preset: DialogProps['preset']) {
  if (!preset) return DEFAULT_PRESET;
  return PRESETS[preset](t);
}
