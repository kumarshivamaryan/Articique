import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"

import * as EditorModule from "react-simple-code-editor"
const Editor = EditorModule.default?.default || EditorModule.default || EditorModule
import Prism from "prismjs"
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'


const defaultCodes = {
 javascript: `function sum(a, b) {\n  return a + b;\n}`,
  python: `def sum(a, b):\n    return a + b`,
  cpp: `#include <iostream>\n\nint main() {\n    return 0;\n}`,
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello World");\n    }\n}`,
  c: `#include <stdio.h>\n\nint main() {\n    return 0;\n}`,
  // Naya CSS aur HTML code yahan hai
  css: `body {\n    background-color: #f0f0f0;\n    font-family: Arial, sans-serif;\n}\n\n.container {\n    max-width: 1200px;\n    margin: 0 auto;\n}`,
};


function App() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(defaultCodes.javascript);

 const [review, setReview] = useState(``)

  useEffect(() => { 
    Prism.highlightAll()
  }, [code , language]);

  async function reviewCode(){
  const response = await axios.post(`${import.meta.env.VITE_API_URL}/ai/get-review`, {code})

  setReview(response.data)
  }

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    // Jab language badle, tab uska default code set kar do
    setCode(defaultCodes[newLang] || ""); 
  };

  return (
    <main>
      <div className="left">
       
        {/* Language Selection Dropdown */}
        <div className="controls">
          <select 
            value={language} 
            onChange={handleLanguageChange}
            className="lang-select"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="css">CSS</option>
            <option value="java">Java</option>
          </select>
          </div>
        <div className="code">
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
           highlight={(code) =>
    Prism.highlight(code, Prism.languages[language] || Prism.languages.javascript, language)
  }
            padding={10}
            style={{
             fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
              
                borderRadius: "5px",
               
             
            }}
          />
         
      </div>
       
         <div onClick={reviewCode}
        className="review">Review</div>
         </div>
       
      <div className="right">
        <Markdown
        rehypePlugins = {[rehypeHighlight]}
        >{review}</Markdown>
</div>
    </main>
  )
}

export default App;