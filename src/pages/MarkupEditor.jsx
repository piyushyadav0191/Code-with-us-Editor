import { useState } from "react";
// This is the package we need now
import ReactMarkdown from "react-markdown";

const MarkdownEditor = () => {
  const [markDown, setMarkdown] = useState(
		`# Hello World`
	);
 // ok so i have named my file react markdown thats why
  return (
    <>
		<div className="container1">
		<div className="container">
        <textarea
          value={markDown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="textarea"
        ></textarea>
        <div className="output">
					
          <ReactMarkdown>{markDown}</ReactMarkdown>
        </div>
      </div>
		</div>
    
    </>
  );
};

export default MarkdownEditor;