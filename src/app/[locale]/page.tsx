/*
 * Home Page
 *
 * @Author: VenDream
 * @Date: 2023-05-31 11:59:47
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Stats from './stats';

export default async function Page({ params: { locale } }: LocaleProps) {
  return (
    <div className="page-home">
      <Stats locale={locale} />
    </div>
  );
}
