import React, { useRef, useState } from "react";

import Editor from "@monaco-editor/react";

function MonacoEditor({ setCode, height, language, width }) {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  return (
    <Editor
      height={height || "450px"}
      width={width || "450px"}
      defaultLanguage="cpp"
      language={language}
      defaultValue="//add your code here"
      onMount={handleEditorDidMount}
      onChange={(value) => setCode(value)}
      className="border-2"
    />
  );
}
export default MonacoEditor;
