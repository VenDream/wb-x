'use client';

/*
 * Code editor
 *
 * @Author: VenDream
 * @Date: 2023-08-25 11:18:23
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import { Button, Loading } from '@/components/daisyui';
import {
  DocumentTextIcon,
  InboxArrowDownIcon,
} from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import type { HighlighterCore } from 'shiki';
import { getHighlighterCore } from 'shiki/core';
import theme from 'shiki/themes/min-light.mjs';
import getWasmInlined from 'shiki/wasm';

import './code-editor.sass';

interface CodeEditorProps {
  /** title */
  title?: string;
  /** raw code */
  code: string;
  /** languange */
  lang: string;
  /** onSave callback */
  onSave?: (code: string) => void;
}

export default function CodeEditor(props: CodeEditorProps) {
  const t = useTranslations('global');
  const { title, lang, onSave } = props;
  const [code, setCode] = useState(props.code);
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  useEffect(() => {
    (async function setup() {
      const highlighter = await getHighlighterCore({
        themes: [theme],
        langs: [import('shiki/langs/yaml.mjs')],
        loadWasm: getWasmInlined,
      });
      setTimeout(() => {
        setHighlighter(highlighter);
      }, 500);
    })();
  }, []);

  return (
    <div className="code-editor flex min-h-[50vh] w-full flex-col">
      {highlighter ? (
        <>
          {title && (
            <p className="border-regular-20 rou relative top-[1px] flex items-center !border-b-0 bg-base-200 p-2 text-sm">
              <DocumentTextIcon className="mr-1" />
              {title}
            </p>
          )}
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code =>
              highlighter.codeToHtml(code, { lang, theme: 'min-light' })
            }
            className="code-editor__container flex-1"
            preClassName="code-editor__pre"
            textareaClassName="code-editor__textarea"
            padding={10}
            style={{
              fontFamily: 'monospace',
              fontSize: 12,
            }}
          />
          <div className="mt-4">
            <Button size="sm" color="primary" onClick={() => onSave?.(code)}>
              <InboxArrowDownIcon className="mr-1" />
              {t('action.save')}
            </Button>
          </div>
        </>
      ) : (
        <div className="flex items-center">
          <Loading color="primary" className="mr-2" />
          {t('action.loading')}...
        </div>
      )}
    </div>
  );
}
