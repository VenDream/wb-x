/*
 * Home Page
 *
 * @Author: VenDream
 * @Date: 2023-05-31 11:59:47
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Stats from './stats';

// revalidate homepage requests at most every hour - 60 * 60
export const revalidate = 3600;

export default async function Page({ params: { locale } }: LocaleProps) {
  return (
    <div className="page-home">
      <Stats locale={locale} />
    </div>
  );
}
