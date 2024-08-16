/*
 * Store Wrapper
 *
 * @Author: VenDream
 * @Date: 2024-08-16 14:58:37
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import store from '@/store';
import { Provider } from 'jotai';

interface IProps {
  children: React.ReactNode;
}

export default function StoreWrapper(props: IProps) {
  return <Provider store={store}>{props.children}</Provider>;
}
