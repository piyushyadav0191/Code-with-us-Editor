import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../../Actions";
import { GiSplitCross } from 'react-icons/gi'
import { VscRunAll } from "react-icons/vsc";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  // compiler code starts here


  const [inputt, setInputt] = useState(localStorage.getItem("input") || ``);
  console.log(inputt);
  const [language_id, setLanguage_id] = useState(
    localStorage.getItem("language_Id") || 2
  );
  const [userInputt, setUserInputt] = useState(``);
  
  const [slider, setSlider] = useState(false)
    const onClick =  () => {
      setSlider(true)
      submit()
  
    }

  const userInput = (event) => {
    event.preventDefault();
    setUserInputt(event.target.value);
  };

  const language = (event) => {
    event.preventDefault();
    setLanguage_id(event.target.value);
    localStorage.setItem("language_Id", event.target.value);
  };

  const submit = async (e) => {

      let outputText = document.getElementById("output");
     
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions",
        {
          method: "POST",
          headers: {
            "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
            "x-rapidapi-key":
              "50b92e009bmshe264941892b61b4p1504fejsn9d02876aa42e", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            source_code: inputt,
            stdin: userInputt,
            language_id: language_id,
          }),
        }
      );
     
      const jsonResponse = await response.json();
  
      let jsonGetSolution = {
        status: { description: "Queue" },
        stderr: null,
        compile_output: null,
      };
  
      while (
        jsonGetSolution.status.description !== "Accepted" &&
        jsonGetSolution.stderr == null &&
        jsonGetSolution.compile_output == null
      ) {
        // outputText.innerHTML = `Creating Submission ... \nSubmission Created ...\nChecking Submission Status\nstatus : ${jsonGetSolution.status.description}`;
        if (jsonResponse.token) {
          let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
  
          const getSolution = await fetch(url, {
            method: "GET",
            headers: {
              "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
              "x-rapidapi-key":
                "50b92e009bmshe264941892b61b4p1504fejsn9d02876aa42e", // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
              "content-type": "application/json",
            },
          });
  
          jsonGetSolution = await getSolution.json();
        }
      
      }
      if (jsonGetSolution.stdout) {
        const output = atob(jsonGetSolution.stdout);
  
        outputText.innerHTML = "";
  
        outputText.innerHTML += `Results :\n${output}\nExecution Time : ${jsonGetSolution.time} Secs\nMemory used : ${jsonGetSolution.memory} bytes`;
      } else if (jsonGetSolution.stderr) {
        const error = atob(jsonGetSolution.stderr);
  
        outputText.innerHTML = "";
  
        outputText.innerHTML += `\n Error :${error}`;
      } else {
        const compilation_error = atob(jsonGetSolution.compile_output);
  
        outputText.innerHTML = "";
  
        outputText.innerHTML += `\n Error :${compilation_error}`;
      }
    
   
  };
  // compiler code ends here

  // edtior code starts here
  const editorRef = useRef(null);
  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        setInputt(code);
        onCodeChange(code);
        localStorage.setItem("input", code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGE, {
            roomId,
            code,
          });
        }
      });
    }
    init();
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
    //eslint-disable-next-line
  }, [socketRef.current]);
  // it ends here

  return (
    <>
      <div className="row container-fluid">
        <div className="col-6 ml-4 ">
         
          <textarea
            required
            readOnly
            name="solution"
            id="realtimeEditor"
            className="source"
            value={inputt}
          ></textarea>

          <button type="submit" onClick={onClick}> Run </button>

          <label htmlFor="tags" className="mr-1">
            <b className="heading">Language:</b>
          </label>
          <select
            value={language_id}
            onChange={language}
            id="tags"
            className="form-control form-inline mb-2 language"
          >
            <option value="54">C++</option>
            <option value="50">C</option>
            <option value="62">Java</option>
            <option value="71">Python</option>
          </select>
        </div>
        <div className="col-5">
          <div>
            <span className="badge badge-info heading my-2 ">
              <i className="fas fa-exclamation fa-fw fa-md"></i> Output
            </span>

       {slider ? <aside className='sidebar' >
              <div className='closeButton' >
                <GiSplitCross color='#fff' size={50} />
              </div>
              <h1 style={{ color: 'white' }}>
                  <div id="output"></div>
                   </h1>
            </aside> : <h1>bnd h bhai</h1> }
                        
          </div>
        </div>
      </div>

      <div className="mt-2 ml-5">
        <span className="badge badge-primary heading my-2 ">
          <i className="fas fa-user fa-fw fa-md"></i> User Input
        </span>
        <br />
        <textarea id="input" onChange={userInput}></textarea>
      </div>
    </>
  );
};

export default Editor;
