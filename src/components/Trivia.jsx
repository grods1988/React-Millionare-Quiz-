import React, { useState, useEffect } from "react";
import useSound from "use-sound";

import play from "../assets/play.mp3";
import correct from "../assets/correct.mp3";
import wrong from "../assets/wrong.mp3";
import wait from "../assets/wait.mp3";

export default function Trivia({
  data,
  setStop,
  questionNumber,
  setquestionNumber,
}) {
  const [question, setQuestion] = useState(null); /*select Question */
  const [selectedAnswer, setselectedAnswer] = useState(null); /*answer */
  const [className, setClassName] = useState("answer");
  /*select class for the color change after selection */
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  // on Page Load
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  // delay function
  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  //   Click Handler func
  const handleClick = (a) => {
    setselectedAnswer(a);
    setClassName("answer active");
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    delay(5000, () => {
      if (a.correct) {
        delay(1000, () => {
          correctAnswer();
          setquestionNumber((prev) => prev + 1);
          setselectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  // setTimeout(() => {
  //   setClassName(a.correct ? "answer correct" : "answer wrong");
  // }, 3000); /*SetTimeout after answer is selected */

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      <div className="answers">
        {/* we use the map method to map throught all the options in answers  */}
        {question?.answers.map((a) => (
          <div
            className={selectedAnswer === a ? className : "answer"}
            // depending on the answer we toggle animation.
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
}
