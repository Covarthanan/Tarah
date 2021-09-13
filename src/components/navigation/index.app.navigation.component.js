import React, { createRef } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "../screens/homescreen/homescreen.component";
import { YourProfileStackScreen } from "./yourprofile.stackscreen.component";
import { EditProfile } from "../profile/editprofile.component";
import { CreateProfile } from "../profile/createprofile.component";
import { AddPost } from "../addpost/addpost.component";
import { EditPost } from "../addpost/editpost.component";
import { NewPost } from "../addpost/newpost.component";
import { AppContextProvider } from "../../service/context/context.component";
import { Comments } from "../feed/comments.component";
import { CommentList } from "../feed/commentlist.component";
import { YourProfile } from "../profile/yourprofile.component";
import { YourPosts } from "../profile/yourposts.component";
import { ViewPost } from "../feed/viewpost.component";
import { YourCollections } from "../profile/yourcollections.component";
import { YourFollowers } from "../profile/yourfollowers.component";
import { YourFollowings } from "../profile/yourfollowings.component";
import { About } from "../about/about.component";
import { Settings } from "../profile/settings.component";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

let userid = "";
AsyncStorage.getItem("userid").then((value) => {
  if (value !== null) {
    userid = value;
  }
});

const HomeStack = () => {
  return (
    <Stack.Navigator headerMode={false}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddPost" component={AddPost} />
      <Stack.Screen name="EditPost" component={EditPost} />
      <Stack.Screen name="NewPost" component={NewPost} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="CommentList" component={CommentList} />
      <Stack.Screen name="YourProfile" component={YourProfile} />
      <Stack.Screen name="YourPosts" component={YourPosts} />
      <Stack.Screen name="ViewPost" component={ViewPost} />
      <Stack.Screen name="YourCollections" component={YourCollections} />
      <Stack.Screen name="YourFollowers" component={YourFollowers} />
      <Stack.Screen name="YourFollowings" component={YourFollowings} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer ref={createRef()}>
      <HomeStack />
    </NavigationContainer>

    // <AppContextProvider>
    //   <NavigationContainer ref={createRef()}>
    //     <Drawer.Navigator initialRouteName="Home">
    //       <Drawer.Screen name="Home" component={HomeStack} />
    //       <Drawer.Screen name="About Us" component={About} />
    //     </Drawer.Navigator>
    //   </NavigationContainer>
    // </AppContextProvider>
  );
};
