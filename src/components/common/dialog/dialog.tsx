'use client';

/*
 * Dialog Component
 *
 * @Author: VenDream
 * @Date: 2024-08-15 14:06:54
 *
 * Copyright © 2024 VenDream. All Rights Reserved.
 */

import ScrollArea from '@/components/common/scroll-area';
import { Button } from '@/components/daisyui';
import { dialogMaskMotion, dialogMotion } from '@/constants/motions';
import { cn } from '@/utils/classnames';
import * as IDialog from '@radix-ui/react-dialog';
import { useControllableValue } from 'ahooks';
import { AnimatePresence, useAnimate } from 'framer-motion';
import { XIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, {
  type ComponentType,
  isValidElement,
  type MouseEvent,
  type PropsWithChildren,
  type ReactElement,
  useMemo,
} from 'react';
import MotionContainer from '../motion-container';
import { getPreset } from './presets';
import type { DialogProps } from './types';

type DialogChildrenProps = PropsWithChildren<{
  className?: string;
}>;

type DialogChildren = ReactElement<{ className?: string }> | null;

export default function Dialog(dialogProps: DialogProps) {
  const t1 = useTranslations();
  const t2 = useTranslations('global.dialog');

  const props = useMemo(
    () => getDialogProps(t1, dialogProps),
    [dialogProps, t1]
  );

  const [open, setOpen] = useControllableValue(props, {
    trigger: 'onOpenChange',
    valuePropName: 'open',
    defaultValue: false,
  });

  const parts = useMemo(() => {
    const children = React.Children.toArray(props.children);
    const getChild = (Component: ComponentType) =>
      children.find(child => isValidElement(child) && child.type === Component);
    const getChildClass = (child: DialogChildren) =>
      isValidElement(child) ? child.props.className : '';

    const trigger = getChild(Dialog.Trigger) as DialogChildren;
    const title = getChild(Dialog.Title) as DialogChildren;
    const desc = getChild(Dialog.Description) as DialogChildren;
    const content = getChild(Dialog.Content) as DialogChildren;
    const footer = getChild(Dialog.Footer) as DialogChildren;

    const titleClass = cn(getChildClass(title), props.classNames?.title);
    const descClass = cn(getChildClass(desc), props.classNames?.desc);
    const contentClass = cn(getChildClass(content), props.classNames?.content);
    const footerClass = cn(getChildClass(footer), props.classNames?.footer);

    return {
      trigger,
      title: title || props.title,
      desc: desc || props.desc,
      content: content || props.content,
      footer: footer || props.footer,
      titleClass,
      descClass,
      contentClass,
      footerClass,
    };
  }, [
    props.children,
    props.classNames?.content,
    props.classNames?.desc,
    props.classNames?.footer,
    props.classNames?.title,
    props.content,
    props.desc,
    props.footer,
    props.title,
  ]);

  const [scope, animate] = useAnimate();

  const onCancel = () => {
    if (props.onCancel) {
      props.onCancel();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const onOk = async () => {
    if (props.onOk) {
      const rlt = await props.onOk?.();
      if (!rlt) return;
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  const onMaskClick = async (evt: MouseEvent<HTMLDivElement>) => {
    if (props.loading) {
      evt.preventDefault();
      evt.stopPropagation();
      return;
    }

    if (!props.maskClosable) {
      evt.preventDefault();
      evt.stopPropagation();

      scope.current &&
        (await animate(
          scope.current,
          { scale: 1.05 },
          { type: 'spring', stiffness: 300, mass: 0.1 }
        ));
      scope.current &&
        (await animate(
          scope.current,
          { scale: 1 },
          { type: 'spring', stiffness: 300, mass: 0.1 }
        ));

      return;
    }

    onCancel();
  };

  const onEscapeKeyDown = (evt: KeyboardEvent) => {
    if (evt.key !== 'Escape') return;
    if (props.loading || !props.keyboard) {
      evt.preventDefault();
      evt.stopPropagation();
      return;
    }
    onCancel();
  };

  const DialogContent = (
    <IDialog.Portal forceMount>
      {props.mask && (
        <MotionContainer
          key="DIALOG_MASK"
          onClick={onMaskClick}
          motion={dialogMaskMotion}
          className={cn(
            'fixed inset-0 z-50 bg-base-100/80 backdrop-blur',
            props.classNames?.mask
          )}
        />
      )}
      <IDialog.Content
        className={cn(
          'fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]',
          'flex w-[30rem]',
          props.classNames?.wrapper
        )}
        onEscapeKeyDown={onEscapeKeyDown}
        onOpenAutoFocus={evt => evt.preventDefault()}
        onInteractOutside={evt => evt.preventDefault()}
        onPointerDownOutside={evt => evt.preventDefault()}
        aria-describedby={undefined}
      >
        <MotionContainer
          ref={scope}
          key="DIALOG_CONTENT"
          motion={dialogMotion}
          className={cn(
            'rounded-[--rounded-box] border border-base-content/10 bg-base-100/50 p-6',
            'relative flex flex-1 flex-col gap-6 shadow-sm',
            props.className
          )}
          onAnimationComplete={def => {
            def === 'open' && props.onOpened?.();
            def === 'closed' && props.onClosed?.();
          }}
        >
          <div className="flex flex-col gap-1">
            {parts.title && (
              <IDialog.Title
                className={cn('flex items-center text-base', parts.titleClass)}
              >
                {props.icon}
                {parts.title || t2('title')}
              </IDialog.Title>
            )}
            {parts.desc && (
              <IDialog.Description
                className={cn('text-xs text-base-content/50', parts.descClass)}
              >
                {parts.desc || t2('desc')}
              </IDialog.Description>
            )}
          </div>
          {parts.content && (
            <div className={cn('min-h-0 flex-1 text-sm', parts.contentClass)}>
              <ScrollArea viewportClassName={cn(props.classNames?.scrollArea)}>
                {parts.content || t2('content')}
              </ScrollArea>
            </div>
          )}
          {parts.footer ? (
            <div className={parts.footerClass}>{parts.footer}</div>
          ) : parts.footer !== null ? (
            <div className={cn('flex justify-end gap-4', parts.footerClass)}>
              {props.cancelBtn ? (
                props.cancelBtn
              ) : props.cancelBtn !== null ? (
                <Button
                  size="sm"
                  color="ghost"
                  onClick={onCancel}
                  disabled={props.loading}
                  className={cn(props.classNames?.cancelBtn)}
                  {...props.cancelBtnProps}
                >
                  {props.cancelBtnLabel || t2('cancel')}
                </Button>
              ) : null}
              {props.okBtn ? (
                props.okBtn
              ) : props.okBtn !== null ? (
                <Button
                  size="sm"
                  color="primary"
                  onClick={onOk}
                  disabled={props.loading}
                  className={cn(props.classNames?.okBtn)}
                  {...props.okBtnProps}
                >
                  {props.okBtnLabel || t2('ok')}
                </Button>
              ) : null}
            </div>
          ) : null}
          {props.closable !== false && (
            <Button
              size="sm"
              color="ghost"
              animation={false}
              onClick={onCancel}
              disabled={props.loading}
              className="absolute right-4 top-5 h-[2.1rem] w-[2.1rem] rounded-full p-0"
            >
              <XIcon size={20} />
            </Button>
          )}
        </MotionContainer>
      </IDialog.Content>
    </IDialog.Portal>
  );

  return (
    <IDialog.Root open={open} onOpenChange={setOpen} modal={false}>
      {parts.trigger}
      {props.disposable ? (
        DialogContent
      ) : (
        <AnimatePresence>{open && DialogContent}</AnimatePresence>
      )}
    </IDialog.Root>
  );
}

Dialog.Trigger = IDialog.Trigger;
Dialog.Title = (props: DialogChildrenProps) => props.children;
Dialog.Description = (props: DialogChildrenProps) => props.children;
Dialog.Content = (props: DialogChildrenProps) => props.children;
Dialog.Footer = (props: DialogChildrenProps) => props.children;

export function getDialogProps(t: TFunction, props: DialogProps) {
  const { preset } = props;
  const presetProps = getPreset(t, preset);
  return { ...presetProps, ...props };
}
