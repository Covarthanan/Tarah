import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { YourProfile } from "../profile/yourprofile.component";
import { EditProfile } from "../profile/editprofile.component";
import { YourCollections } from "../profile/yourcollections.component";
import { YourPosts } from "../profile/yourposts.component";

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export const YourProfileTabScreen = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Posts"
          component={YourPosts}
          navigation={navigation}
        />
        <Tab.Screen
          name="Collections"
          component={YourCollections}
          navigation={navigation}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
