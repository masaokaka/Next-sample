import { useContext } from "react";
import styles from "../styles/Home.module.css";
import SampleContext from "../store/sample-context";

export default function Home() {
  const sampleCtx = useContext(SampleContext);
  const number = sampleCtx.num;
  const addNumberHandler = () => {
    sampleCtx.addNumber();
  };
  const reduceNumberHandler = () => {
    sampleCtx.reduceNumber();
  };
  return (
    <div className={styles.container}>
      <h1>Hello Next World</h1>
      <p>Number:{number}</p>
      <button onClick={addNumberHandler}>Add</button>
      <button onClick={reduceNumberHandler}>reduce</button>
    </div>
  );
}
