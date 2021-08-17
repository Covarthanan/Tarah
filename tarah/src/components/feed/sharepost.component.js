import { Share } from "react-native";

export const SharePost = async (title, poem, author, extramsg) => {
  try {
    const result = await Share.share({
      message:
        title + "\n\n" + poem + "\n\n" + "@" + author + "\n\n" + extramsg,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
        console.log(Share.sharedAction);
        console.log(result.activityType);
      } else {
        // shared
        console.log(Share.dismissedAction);
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
      console.log(Share.dismissedAction);
    }
  } catch (error) {
    console.log(error.message);
  }
};
