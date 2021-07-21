import { createContext, useState } from "react";

const SampleContext = createContext({
  num: 0,
  addNumber: () => {},
  reduceNumber: () => {},
});

export const SampleContextProvider = (props) => {
  const [num, setNumber] = useState(0);
  const addNumberHandler = () => {
    setNumber((prev) => {
      return prev + 1;
    });
  };
  const reduceNumberHandler = () => {
    setNumber((prev) => {
      return prev - 1;
    });
  };
  const context = {
    num: num,
    addNumber: addNumberHandler,
    reduceNumber: reduceNumberHandler,
  };
  return (
    <SampleContext.Provider value={context}>
      {props.children}
    </SampleContext.Provider>
  );
};

export default SampleContext;
