import Editor from 'rich-markdown-editor';
import React, { useState } from 'react';

const { forwardRef, useRef, useImperativeHandle } = React;

export interface MdEditorProps {
  placeholder?: string;
}

export interface MdEditorRef {
  getText: () => string;
  clear: () => void;
}

export const MdEditor = forwardRef<MdEditorRef, MdEditorProps>((props, ref) => {
  const [_, rerender] = useState(null);
  let textExtractor = () => '';
  useImperativeHandle(ref, () => ({
    getText() {
      return textExtractor();
    },
    clear() {
      rerender(null);
    },
  }));
  return (
    <div style={{ zIndex: 10000 }}>
      <Editor
        onChange={(e) => (textExtractor = e)}
        placeholder={props.placeholder}
      />
    </div>
  );
});
