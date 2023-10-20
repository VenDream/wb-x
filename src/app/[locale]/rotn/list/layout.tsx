/*
 * ROTN list layout
 *
 * @Author: VenDream
 * @Date: 2023-10-20 11:52:08
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

export default function Layout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  );
}
