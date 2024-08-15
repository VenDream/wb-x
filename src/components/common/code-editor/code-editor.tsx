'use client';

/*
 * Code editor
 *
 * @Author: VenDream
 * @Date: 2023-08-25 11:18:23
 *
 * Copyright © 2023 VenDream. All Rights Reserved.
 */

import Loading from '@/components/common/loading';
import MotionContainer from '@/components/common/motion-container';
import { Button } from '@/components/daisyui';
import { cn } from '@/utils/classnames';
import { FileCodeIcon, SaveIcon } from 'lucide-react';
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

  return highlighter ? (
    <MotionContainer className="flex min-h-[50vh] w-full flex-col justify-start bg-base-100">
      {title && (
        <p
          className={cn(
            'flex items-center rounded-[--rounded-box]',
            'rounded-b-none bg-base-200 p-2 text-sm',
            'border-b border-base-content/10'
          )}
        >
          <FileCodeIcon size={16} className="mr-2" />
          {title}
        </p>
      )}
      <Editor
        value={code}
        onValueChange={code => setCode(code)}
        highlight={code =>
          highlighter.codeToHtml(code, { lang, theme: 'min-light' })
        }
        className={cn(
          'code-editor__container flex-1 rounded-[--rounded-box]',
          'rounded-t-none'
        )}
        preClassName="code-editor__pre"
        textareaClassName="code-editor__textarea"
        padding={10}
        style={{
          fontSize: 13,
        }}
      />
      <div className="mt-4">
        <Button size="sm" color="primary" onClick={() => onSave?.(code)}>
          <SaveIcon size={16} />
          {t('action.save')}
        </Button>
      </div>
    </MotionContainer>
  ) : (
    <div className="p-4">
      <Loading />
    </div>
  );
}
