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
import { cn } from '@/utils/classnames';
import { useControllableValue } from 'ahooks';
import { FileCodeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import type { HighlighterCore } from 'shiki';
import { createHighlighter } from 'shiki';

import './code-editor.sass';

interface CodeEditorProps {
  /** title */
  title?: string;
  /** raw code */
  code: string;
  /** languange */
  lang: string;
  /** onCodeChange callback */
  onCodeChange?: (code: string) => void;
}

export default function CodeEditor(props: CodeEditorProps) {
  const { title, lang } = props;
  const [code, setCode] = useControllableValue(props, {
    defaultValue: props.code,
    valuePropName: 'code',
    trigger: 'onCodeChange',
  });
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  useEffect(() => {
    (async function setup() {
      const highlighter = await createHighlighter({
        langs: [lang],
        themes: ['min-light'],
      });
      setHighlighter(highlighter);
    })();
  }, [lang]);

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
    </MotionContainer>
  ) : (
    <div className="p-4">
      <Loading />
    </div>
  );
}
