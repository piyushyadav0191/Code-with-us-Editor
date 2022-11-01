import React, { useEffect, useRef, useState } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/python/python";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../../Actions";
import { VscRunAll } from "react-icons/vsc";
import Slider from "../Slider/Slider";
import useSound from 'use-sound';
import notify from '../../assets/sound.mp3';


const Editor = ({ socketRef, roomId, onCodeChange }) => {
  // compiler code starts here
  const [play] = useSound(notify);
  const [inputt, setInputt] = useState(localStorage.getItem("input") || ``);
  const [outputt, setOutputt] = useState({
    result: "",
    time: "",
    memeory: "",
    error: "",
  });
  const [language_id, setLanguage_id] = useState(
    localStorage.getItem("language_Id") || 2
  );
  const [userInputt, setUserInputt] = useState(``);

  const [slider, setSlider] = useState(false);
  const onClick = () => {
    play()
    setSlider(true);
    submit();
  };

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
    const response = await fetch(
      process.env.REACT_APP_RAPID_URL,
      {
        method: "POST",
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_HOST_URL,
          "x-rapidapi-key":
            process.env.REACT_APP_RAPID_API_KEY, // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
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
        let url = `${process.env.REACT_APP_RAPID_URL}/${jsonResponse.token}?base64_encoded=true`;

        const getSolution = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-host": process.env.REACT_APP_HOST_URL,
            "x-rapidapi-key":
              process.env.REACT_APP_RAPID_API_KEY, // Get yours for free at https://rapidapi.com/judge0-official/api/judge0-ce/
            "content-type": "application/json",
          },
        });

        jsonGetSolution = await getSolution.json();
      }
    }

    if (jsonGetSolution.stdout) {
      const output = atob(jsonGetSolution.stdout);

      setOutputt({
        result: output,
        time: jsonGetSolution.time,
        memory: jsonGetSolution.memory,
        error: "",
      });
    } else if (jsonGetSolution.stderr) {
      const error = atob(jsonGetSolution.stderr);

      setOutputt({
        result: "",
        time: "",
        memory: "",
        error: error,
      });
    } else {
      const compilation_error = atob(jsonGetSolution.compile_output);
      setOutputt({
        result: "",
        time: "",
        memory: "",
        error: compilation_error,
      });
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
          mode: { name: "python" },
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
      <textarea required readOnly name="solution" id="realtimeEditor" className="source" value={inputt}></textarea>
      <VscRunAll size={50} className="runButton" type="submit" onClick={onClick} />
      <div id="languageSelector" className="select-dropdown">
        <select value={language_id} onChange={language} className="languageSelector">
          <option value="54">C++</option>
          <option value="50">C</option>
          <option value="62">Java</option>
          <option value="71">Python</option>
        </select>
      </div>
      {slider ? (
        <Slider setSlider={setSlider} setOutput={setOutputt}  output={outputt} />
      ) : (
        null
      )}
    </>
  );
};

export default Editor;
