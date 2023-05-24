import Head from "next/head";
import styles from "../styles/Home.module.css";
import Context from "../utils/context";
import { useReducer, useEffect, useState, useContext } from "react";
import { pages } from "../utils/pages";
import { database } from "../utils/firebase";

export default function Home() {
  const { state, dispatch } = useContext(Context);
  const [appVisible, setAppVisible] = useState(false);

  useEffect(() => {
    dispatch({ type: "SET_VIEW", param: "home2" });
    setAppVisible(true);
  }, []);

  const setData = async () => {
    try {
      let user = { 1: { username: "dor", password: "123" } };
      await database.ref("Users").set(user);
      console.log("Data has been set.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`app-container transition-opacity duration-2000 ${
        appVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {pages[state.view]}
    </div>
  );
}