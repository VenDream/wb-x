/*
 * EventEmitter
 *
 * @Author: VenDream
 * @Date: 2024-09-11 16:37:30
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import EventEmitter from 'eventemitter3';

const EVENT_EMITTER = new EventEmitter();

export default EVENT_EMITTER;

export const RESIZE_ROW_ITEM = 'virtual-list:resize-row-item';
