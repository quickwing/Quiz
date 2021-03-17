import React, { useState } from "react";
import { motion } from "framer-motion";
import "./styles.css";
import Choice from "./Choice";
import myData from "./myData";

export default function App() {
  const [out, setOut] = useState(1); // For framer motion
  const [visi, setVisi] = useState(true); // to rerender
  const [num, setNum] = useState(1); //page number - internal router
  const [selected, setSelected] = useState(false); //passed as prop-> track selected item
  const [pickedChoice, setPickedChoice] = useState(); // is picked answer true or false
  const [isQuestion, setIsQuestion] = useState(true); // current page is answer or question
  const [score, setScore] = useState(0); //current score
  const [answers, setAnswers] = useState([]);
  document.body.style = "background: snow;";
  const selector = (bool, tr) => {
    setSelected(bool);
    setPickedChoice(tr);
    tr && setScore(score + 1);
    console.log(pickedChoice);
  };
  const next = (to) => {
    setTimeout(() => {
      setOut(0);
      setTimeout(() => {
        setOut(1);
        setVisi(false);
        setVisi(true);
        !isQuestion && (num < myData.totalQs ? setNum(num + 1) : setNum(99));
        setIsQuestion(!isQuestion);
        setSelected(false);
        setPickedChoice();
        console.log(to);
      }, 400);
    }, 400);
  };
  return (
    <div>
      {visi && (
        <motion.div
          animate={{ opacity: out }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="card">
            {isQuestion && num < 90 && (
              <div style={{ width: "100%" }}>
                {" "}
                <h2 className="choice">
                  {num} de {myData.totalQs} : <br />
                  {myData[num].question}
                </h2>
                <div className="break"></div>
                <div className="choice">
                  {pickedChoice ? "Bravo!" : selected ? "Wrong" : "Please pick"}
                </div>
                {myData[num].answers.map((ans, index) => (
                  <Choice
                    key={index}
                    answer={ans.answer}
                    tr={ans.tr}
                    selected={selected}
                    selector={selector}
                    clicked={next}
                    answers={answers}
                    addAnswer={setAnswers}
                  />
                ))}
              </div>
            )}
            {!isQuestion && num < 90 && (
              <div className="answer">
                {myData[num].explanation}
                <button className="nextbutton" onClick={next}>
                  Next
                </button>
              </div>
            )}
            {num === 99 && (
              <div>
                Final page: your score is {(score / myData.totalQs) * 100}%{" "}
                <br />
                You selected: <br />
                {answers.map((answer) => (
                  <div>{answer}</div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
