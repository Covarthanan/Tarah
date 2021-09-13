import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useContext, createContext } from "react";
import { CustomFontFamily } from "../../components/styles/styles.component";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [textColorContext, setTextColorContext] = useState("black");
  const [textFontContext, setTextFontContext] = useState(
    CustomFontFamily.eight
  );
  const [bgColorContext, setBgColorContext] = useState("white");

  let userid = "";
  let username="";

  AsyncStorage.getItem("userid").then((value)=>{
    if(value!==null){
      userid = value;
    }
  })

  AsyncStorage.getItem("username").then((value)=>{
    if(value!==null){
      username = value;
    }
  })

  const SetTextColorContext = (textcolor) => {
    setTextColorContext(textcolor);
  };

  const SetBgColorContext = (bgcolor) => {
    setBgColorContext(bgcolor);
  };

  const SetTextFontContext = (font) => {
    setTextFontContext(font);
  };

  return (
    <AppContext.Provider
      value={{
        textColorContext,
        textFontContext,
        bgColorContext,
        SetBgColorContext,
        SetTextColorContext,
        SetTextFontContext,
        userid,
        username
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
