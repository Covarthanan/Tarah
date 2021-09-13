import * as Google from "expo-google-app-auth";

export const GoogleSignin = async () => {
  try {
    const result = await Google.logInAsync({
      androidClientId:
        "83747186809-m7143ckbis8ssrrbvibl8h2pptdu2ac0.apps.googleusercontent.com",
      //iosClientId: YOUR_CLIENT_ID_HERE,
      scopes: ["profile", "email"],
      redirect_url: "{Your Bundle ID (com.example.app)}:/oauth2redirect/google",
    });

    if (result.type === "success") {
      //console.log(result.accessToken);
      console.log("id", result.user.id);
      console.log("name", result.user.name);
      console.log("givenName", result.user.givenName);
      console.log("familyName", result.user.familyName);
      // console.log("photoUrl", result.user.photoUrl);
      console.log("email", result.user.email);
    } else {
      console.log("cancelled");
    }
  } catch (e) {
    console.log("error", e);
  }
};
