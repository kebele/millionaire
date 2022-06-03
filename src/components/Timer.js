import { useState, useEffect } from "react";

const Timer = ({ setStop, questionNumber }) => {
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (timer === 0) return setStop(true);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    //bazı durumlarda sonraki çalışmaları etkileyebilecek şekilde çalışan func'lar olur, useEffect'in çalışmasını ağlayacak durumlarıda etkileyecek b durumda her useEffect çalıştığında sonraki çalışmasını etkilememesi için clear yapılması gerekir, buna clean up func denir
    return () => clearInterval(interval);
  }, [setStop, timer]);

  useEffect(() => {
    setTimer(30);
  }, [questionNumber]);

  return timer;
};

export default Timer;
