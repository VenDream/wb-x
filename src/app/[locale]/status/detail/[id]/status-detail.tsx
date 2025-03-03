'use client';

/*
 * Status Detail
 *
 * @Author: VenDream
 * @Date: 2024-10-30 11:19:28
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import StatusCard from './_card';
import CommentList from './_card/comment-list';

interface IProps {
  status: Backend.Status;
}

export default function StatusDetail(props: IProps) {
  return (
    <>
      <StatusCard status={props.status} menu={{ viewComments: false }} />
      <CommentList id={props.status.id} />
    </>
  );
}
