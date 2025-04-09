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
import useIsDarkTheme from '@/hooks/use-is-dark-theme';
import { cn } from '@/utils/classnames';
import { useControllableValue } from 'ahooks';
import { FileCodeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import Editor from 'react-simple-code-editor';
import type { HighlighterCore } from 'shiki';
import { createHighlighter } from 'shiki';

import './code-editor.css';

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

  const isDark = useIsDarkTheme();

  console.log('isDark', isDark);

  useEffect(() => {
    (async function setup() {
      const highlighter = await createHighlighter({
        langs: [lang],
        themes: ['min-light', 'min-dark'],
      });
      setHighlighter(highlighter);
    })();
  }, [lang]);

  return highlighter ? (
    <MotionContainer
      className={cn(
        'flex w-full flex-col justify-start',
        'border-primary rounded-sm border'
      )}
    >
      {title && (
        <p
          className={cn(
            'flex items-center rounded-sm',
            'bg-primary rounded-b-none p-2 text-xs',
            'border-primary text-primary-content border-b'
          )}
        >
          <FileCodeIcon size={16} className="mr-2" />
          {title}
        </p>
      )}
      <div className="code-editor flex-1">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code =>
            highlighter.codeToHtml(code, {
              lang,
              theme: isDark ? 'min-dark' : 'min-light',
            })
          }
          className={cn('code-editor__container rounded-sm', 'rounded-t-none')}
          padding={10}
          textareaClassName="code-editor__textarea"
          style={{ fontSize: 13 }}
        />
      </div>
    </MotionContainer>
  ) : (
    <div className="p-4">
      <Loading />
    </div>
  );
}
