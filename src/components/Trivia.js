import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import play from "../assets/src_sounds_play.mp3";
import correct from "../assets/src_sounds_correct.mp3";
import wrong from "../assets/src_sounds_wrong.mp3";

const Trivia = ({ data, setStop, questionNumber, setQuestionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);

  // chrome başlangıçta izin vermiyor, sesle ilgili başka bir şey yapınca bunuda başta çalıyor, bunu başka bir şeye bağlayayım
  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  // soruyu ayarlayacak func
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectedAnswer(a);
    setClassName("answer active");
    // tıkladık class'ı değişti şimdi 3 saniye bekleyecek ve doğru yanlış karşılaştırması yapacak ona göre class atayacak, bunu setTimeout ile yaptık ancak bunun için kendimiz ayrı bir func hazırlayalım delay() olarak
    // setTimeout(() => {
    //   setClassName(a.correct ? "answer correct" : "answer wrong");
    // }, 3000);
    delay(3000, () => {
      setClassName(a.correct ? "answer correct" : "answer wrong");
    });
    // şimdi soruyu değiştirelim, 3sn önceden cevabı check'te vardı yeni soru içinde 3sn 6sn etti, eğer cevap doğru ise setQuestion'ın önceki değerini 1 tane arttıracak ve seçili cevabı nll yapacak, useEffect çalışacak qestionNumber değiştiği için, eğer cevap yanlış ise setStop'u true yapacak
    delay(5000, () => {
      if (a.correct) {
        correctAnswer();
        delay(1000, () => {
          setQuestionNumber((prev) => prev + 1);
          setSelectedAnswer(null);
        });
      } else {
        wrongAnswer();
        delay(1000, () => {
          setStop(true);
        });
      }
    });
  };

  return (
    <div className="trivia">
      <div className="question">{question?.question}</div>
      {/* ?. ifadesi eğer question null veya undefined ise ilerle null olmayan haline demek, optional chaining yani
      answer'da tıklama ile handleClick ile className'i answer active olacak ve seçilen şık selectedAnswer olacak, bu className state kullanımına dikkat */}
      <div className="answers">
        {question?.answers.map((a) => (
          <div
            key={a.text}
            className={selectedAnswer === a ? className : "answer"}
            onClick={() => handleClick(a)}
          >
            {a.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trivia;
