import { useEffect, useState } from "react";

const useCountdown = (targetDate: string | number | Date) => {
  const [countDown, setCountDown] = useState(
    new Date(targetDate).getTime() - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(new Date(targetDate).getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return [days, hours, minutes, seconds];
};

export { useCountdown };
