import React, { useState, useEffect } from "react";
import { WelcomeScreen } from "./src/components/welcomescreen/welcomescreen.component";
import { Navigation } from "./src/components/navigation/index.app.navigation.component";
import { useFonts, CarterOne_400Regular } from "@expo-google-fonts/carter-one";
import { FredokaOne_400Regular } from "@expo-google-fonts/fredoka-one";
import { Andika_400Regular } from "@expo-google-fonts/andika";
import { SecularOne_400Regular } from "@expo-google-fonts/secular-one";
import { AlikeAngular_400Regular } from "@expo-google-fonts/alike-angular";
import {
  Sen_400Regular,
  Sen_700Bold,
  Sen_800ExtraBold,
} from "@expo-google-fonts/sen";

import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { Satisfy_400Regular } from "@expo-google-fonts/satisfy";
import { KaushanScript_400Regular } from "@expo-google-fonts/kaushan-script";
import { Sacramento_400Regular } from "@expo-google-fonts/sacramento";
import { GloriaHallelujah_400Regular } from "@expo-google-fonts/gloria-hallelujah";
import { Cookie_400Regular } from "@expo-google-fonts/cookie";
import { LilitaOne_400Regular } from "@expo-google-fonts/lilita-one";
import { Aclonica_400Regular } from "@expo-google-fonts/aclonica";
import { Knewave_400Regular } from "@expo-google-fonts/knewave";
import { Cinzel_500Medium, Cinzel_700Bold } from "@expo-google-fonts/cinzel";
import { CaesarDressing_400Regular } from "@expo-google-fonts/caesar-dressing";
import { Piedra_400Regular } from "@expo-google-fonts/piedra";
import {
  ZillaSlabHighlight_400Regular,
  ZillaSlabHighlight_700Bold,
} from "@expo-google-fonts/zilla-slab-highlight";
import { FontdinerSwanky_400Regular } from "@expo-google-fonts/fontdiner-swanky";
import { Eater_400Regular } from "@expo-google-fonts/eater";
import { BungeeShade_400Regular } from "@expo-google-fonts/bungee-shade";
import { PressStart2P_400Regular } from "@expo-google-fonts/press-start-2p";

import * as firebase from "firebase";
import { firebaseConfig } from "./src/service/firebase/firebase.config.service";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [carterOne] = useFonts({
    CarterOne_400Regular,
  });

  const [fredoka] = useFonts({
    FredokaOne_400Regular,
  });

  const [andika] = useFonts({
    Andika_400Regular,
  });

  const [secular] = useFonts({
    SecularOne_400Regular,
  });

  const [alike] = useFonts({
    AlikeAngular_400Regular,
  });

  const [sen_400] = useFonts({
    Sen_400Regular,
  });

  const [sen_700] = useFonts({
    Sen_700Bold,
  });

  const [sen_800] = useFonts({
    Sen_800ExtraBold,
  });

  const [pac_400] = useFonts({
    Pacifico_400Regular,
  });

  const [satisfy_400] = useFonts({
    Satisfy_400Regular,
  });

  const [kan_400] = useFonts({
    KaushanScript_400Regular,
  });

  const [sacramento] = useFonts({
    Sacramento_400Regular,
  });

  const [gloria] = useFonts({
    GloriaHallelujah_400Regular,
  });

  const [cookie] = useFonts({
    Cookie_400Regular,
  });

  const [lilita] = useFonts({
    LilitaOne_400Regular,
  });

  const [aclonica] = useFonts({
    Aclonica_400Regular,
  });

  const [knewave] = useFonts({
    Knewave_400Regular,
  });

  const [cinzel] = useFonts({
    Cinzel_500Medium,
  });

  const [cinzel_700] = useFonts({
    Cinzel_700Bold,
  });

  const [caesar] = useFonts({
    CaesarDressing_400Regular,
  });

  const [piedra] = useFonts({
    Piedra_400Regular,
  });

  const [zilla_400] = useFonts({
    ZillaSlabHighlight_400Regular,
  });

  const [zilla_700] = useFonts({
    ZillaSlabHighlight_700Bold,
  });

  const [fontdiner] = useFonts({
    FontdinerSwanky_400Regular,
  });

  const [eater] = useFonts({
    Eater_400Regular,
  });

  const [bungee] = useFonts({
    BungeeShade_400Regular,
  });

  const [PressStart2P] = useFonts({
    PressStart2P_400Regular,
  });

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    wait(3000).then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <WelcomeScreen />;
  }
  if (!isLoading) {
    return <Navigation />;
  }
};
