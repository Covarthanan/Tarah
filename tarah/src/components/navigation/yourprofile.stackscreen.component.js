import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { YourProfile } from "../profile/yourprofile.component";
import { EditProfile } from "../profile/editprofile.component";

const Stack = createStackNavigator();

export const YourProfileStackScreen = ({ navigation }) => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen
        name="YourProfile"
        component={YourProfile}
        navigation={navigation}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
};
