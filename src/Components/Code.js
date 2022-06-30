import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
const Code = ({ sourceCode, language }) => {
  return (
    <SyntaxHighlighter
      language={language || "cpp"}
      style={a11yDark}
      showLineNumbers
      wrapLongLines
    >
      {sourceCode}
    </SyntaxHighlighter>
  );
};

export default Code;
