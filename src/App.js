import "./App.css";
import { useState } from "react";

const EMPTY_STRING = "";
const NBSP = "&nbsp;";
const WHITE_SPACE = " ";
const LF_CODE = 10;
const CR_CODE = 13;
const BR_TAG = "<br>";
const FIRST_INDEX = 0;
const EMPTY_LIST = 0;

function App() {
  const [text, setText] = useState(EMPTY_STRING);
  const [htmlResult, setHtmlResult] = useState(EMPTY_STRING);
  const [textResult, setTextResult] = useState(EMPTY_STRING);

  const convertHtmlResult = () => {
    const value = addBr();
    setHtmlResult(fixFrench(value));
  };

  const convertTextResult = () => {
    const textArray = text.split(NBSP);
    const string = textArray.join(WHITE_SPACE);
    setTextResult(fixFrench(string));
  };

  const fixFrench = (value) => {
    let resultArray = [];
    let textArray = value.split(WHITE_SPACE);
    textArray.forEach((txt) => {
      txt = txt.replace("e?", "è").replace("a?", "à").replace("o?", "ô");
      resultArray.push(txt);
    });
    return resultArray.join(WHITE_SPACE);
  };

  const convert = () => {
    convertHtmlResult();
    convertTextResult();
  };

  const addBr = () => {
    let result = EMPTY_STRING;
    for (let i = FIRST_INDEX; i < text.length; i++) {
      if (text.charCodeAt(i) === LF_CODE || text.charCodeAt(i) === CR_CODE) {
        result += BR_TAG;
      } else {
        result += text.charAt(i);
      }
    }
    return result;
  };

  return (
    <div className="App">
      <h2>Fix French</h2>
      <div className="textarea">
        <textarea
          cols="60"
          rows="30"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="input"
        ></textarea>
        {textResult.length > EMPTY_LIST && (
          <textarea cols="60" rows="30" value={textResult} readOnly></textarea>
        )}
      </div>

      <button onClick={() => convert()}>Fix text</button>

      {htmlResult.length > EMPTY_LIST && (
        <div
          className="div__result"
          dangerouslySetInnerHTML={{ __html: htmlResult }}
        ></div>
      )}
    </div>
  );
}

export default App;
