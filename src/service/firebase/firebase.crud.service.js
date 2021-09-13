import { useState } from "react";
import * as firebase from "firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotificationTokenIdFirebase } from "../IDGeneration/Id.generation.service";

const APPNAME = "tarah";
let PATH = "";

//To Write
export const StoreYourProfile = (userdata) => {
  console.log("StoreYourProfile Firebase", userdata);
  PATH = `${APPNAME}/Users/${userdata.userid}/`;
  const pathReference = firebase.database().ref(PATH);
  pathReference.set({
    userid: userdata.userid,
    name: userdata.name,
    username: userdata.username,
    bio: userdata.bio,
    postcount: userdata.postcount,
    followerscount: userdata.followerscount,
    followingcount: userdata.followingcount,
  });
  console.log("Firebase calling 3");
};

//To Write
export const EditYourProfile = (userdata) => {
  console.log("EditYourProfile Firebase", userdata);
  PATH = `${APPNAME}/Users/${userdata.userid}/`;
  const pathReference = firebase.database().ref(PATH);
  pathReference.set({
    userid: userdata.userid,
    name: userdata.name,
    username: userdata.username,
    bio: userdata.bio,
    postcount: userdata.postcount,
    followerscount: userdata.followerscount,
    followingcount: userdata.followingcount,
    getPostList: userdata.getPostList ? userdata.getPostList : null,
    getCollectionList: userdata.getCollectionList
      ? userdata.getCollectionList
      : null,
  });
  console.log("Firebase calling 3");
};

//To Write
export const StoreUsersCredentials = (userdata) => {
  console.log("StoreUsersCredentials Firebase", userdata);
  let gmail = userdata.gmail.split("@");
  console.log(gmail);
  PATH = `${APPNAME}/UsersCredentials/${gmail[0]}/`;
  const pathReference = firebase.database().ref(PATH);
  pathReference.set({
    userid: userdata.userid,
    username: userdata.username,
    //gmail: userdata.gmail,
    password: userdata.password,
  });
  console.log("Firebase calling 3");
};

//To Write
export const StoreUserNameList = (userdata) => {
  console.log("StoreUsersCredentials Firebase", userdata);
  PATH = `${APPNAME}/UsersNameList/${userdata.username}/`;
  const pathReference = firebase.database().ref(PATH);
  pathReference.set({
    userid: userdata.userid,
    username: userdata.username,
    password: userdata.password,
  });
};

//To Read user profile
export const ReadUsersNameList = (username) => {
  let details = {};
  let list;
  if (username) {
    PATH = `${APPNAME}/UsersNameList/${username}`;
  } else {
    PATH = `${APPNAME}/UsersNameList/`;
  }
  const data = firebase.database().ref(PATH);
  data.on("value", (dtasnp) => {
    details = dtasnp.val();
    list = details;
  });
  return details;
};

//To upload profile
export const UploadProfile = async (userid, uri) => {
  console.log("UploadProfile Calling");
  console.log("userid", userid);
  const res = await fetch(uri);
  const blob = await res.blob();
  PATH = `${APPNAME}/Users/${userid}/`;
  var ref = firebase.storage().ref().child(PATH);
  ref.put(blob);
};

//To Read user profile
export const ReadUserProfile = (userid) => {
  let details = {};
  let list;
  PATH = `${APPNAME}/Users/${userid}/`;
  const data = firebase.database().ref(PATH);
  data.on("value", (dtasnp) => {
    details = dtasnp.val();
    list = details;
  });
  return details;
};

//To upload profile
export const UploadPost = async (userid, uri) => {
  console.log("UploadPost Calling");
  console.log("userid", userid);
  const res = await fetch(uri);
  const blob = await res.blob();
  PATH = `${APPNAME}/Posts/${userid}/`;
  var ref = firebase.storage().ref().child(PATH);
  ref
    .put(blob)
    .then((res) => {
      return true;
    })
    .catch((e) => {
      return false;
    });
};

//To Read user profile
export const ReadPost = (userid) => {
  let details = {};
  let list;
  PATH = `${APPNAME}/Posts/${userid}/`;
  const data = firebase.database().ref(PATH);
  data.on("value", (dtasnp) => {
    details = dtasnp.val();
    list = details;
    // console.log("Customer Token list from Firebase ", list);
    // console.log("Customer Token list from Firebase ", details);
  });
  return details;
};

//To Read user profile
export const ReadUserCredentials = (mail) => {
  let details = {};
  let list;
  let gmail = mail.split("@");
  PATH = `${APPNAME}/UsersCredentials/${gmail[0]}/`;
  const data = firebase.database().ref(PATH);
  data.on("value", (dtasnp) => {
    details = dtasnp.val();
    list = details;
    // console.log("Customer Token list from Firebase ", list);
    // console.log("Customer Token list from Firebase ", details);
  });
  return details;
};

// To retrive profile
export const RetriveProfile = (userid) => {
  let uri;
  PATH = `${APPNAME}/Users/${userid}`;
  const ref = firebase.storage().ref(PATH);
  console.log("Ref", ref);
  ref
    .getDownloadURL()
    .then((url) => {
      console.log("URL Eruku", url);
      uri = url;
      console.log("Firebase URI", uri);
    })
    .catch((e) => {
      console.log("URL ila", e);
    });

  console.log("Firebase URI", uri);
};

export const GetUserName = (userid) => {
  let username = {};
  PATH = `${APPNAME}/Users/${userid}/`;
  const data = firebase.database().ref(PATH);
  data.on("value", (dtasnp) => {
    username = dtasnp.val();
    console.log("GetUserName", dtasnp.val());
  });
  return username;
};

//TO Store Post
export const StorePost = (object) => {
  console.log("StoreYourProfile Firebase", object);
  PATH = `${APPNAME}/Feed/${object.postid}/`;
  const pathReference = firebase.database().ref(PATH);
  pathReference.set({
    userid: object.userid,
    postid: object.postid,
    getAuthor: object.getAuthor,
    getUserName: object.getUserName,
    getBgColor: object.getBgColor,
    getPoem: object.getPoem,
    getTextAlign: object.getTextAlign,
    getTextColor: object.getTextColor,
    getTextFont: object.getTextFont,
    getTextSize: object.getTextSize,
    getTitle: object.getTitle,
    getCaption: object.getCaption,
    getDateTime: object.getDateTime,
    getLikesCount: object.getLikesCount,
    getCommentList: object.getCommentList,
    getCollectionList: object.getCollectionList,
    postURI: object.postURI ? object.postURI : null,
  });
  console.log("Firebase calling 3");
};

export const AddPostAndCollectionListToUser = (where, object) => {
  if (where === "post") {
    PATH = `${APPNAME}/Users/${object.userid}/getPostList/${object.postid}/`;
  } else if (where === "collection") {
    PATH = `${APPNAME}/Users/${object.myuserid}/getCollectionList/${object.postid}/`;
  }
  const pathReference = firebase.database().ref(PATH);
  pathReference.set({
    userid: object.userid,
    postid: object.postid,
  });
};

export const RemovePostAndCollectionToUser = (
  where,
  userid,
  postid,
  myuserid
) => {
  PATH = "";
  if (where === "post") {
    PATH = `${APPNAME}/Users/${userid}/getPostList/${postid}/`;
  } else if (where === "collection" && myuserid) {
    PATH = `${APPNAME}/Users/${myuserid}/getCollectionList/${postid}/`;
  } else if (where === "feed") {
    PATH = `${APPNAME}/Feed/${postid}/`;
  }
  if (PATH) {
    const pathReference = firebase.database().ref(PATH);
    pathReference.set({
      postid: null,
    });
  }
};

//Add Comment on Post
export const AddComment = (postid, object) => {
  console.log("StoreYourProfile Firebase", object);
  PATH = `${APPNAME}/Feed/${postid}/getCommentList/${object.commentid}/`;
  const pathReference = firebase.database().ref(PATH);
  pathReference.set({
    userid: object.userid,
    commentid: object.commentid,
    comment: object.comment,
    datetime: object.datetime,
  });

  console.log("calling AddComment");

  PATH = `${APPNAME}/Users/${object.postuserid}/getPostList/${postid}/getCommentList/${object.commentid}/`;
  const pathReference2 = firebase.database().ref(PATH);
  pathReference2.set({
    userid: object.userid,
    commentid: object.commentid,
    comment: object.comment,
    datetime: object.datetime,
  });
};

//Remove Comment on Post
export const RemoveComment = (postuserid, postid, commentid) => {
  PATH = `${APPNAME}/Feed/${postid}/getCommentList/${commentid}/`;
  const pathReference = firebase.database().ref(PATH);
  pathReference.set({
    userid: null,
  });

  console.log("calling Remove Comment");

  PATH = `${APPNAME}/Users/${postuserid}/getPostList/${postid}/getCommentList/${commentid}/`;
  const pathReference2 = firebase.database().ref(PATH);
  pathReference2.set({
    userid: null,
  });
};

export const AddFollow = (object) => {
  //you follow others
  PATH = `${APPNAME}/Users/${object.userid}/getFollowingList/${object.followid}/`;
  const pathReference = firebase.database().ref(PATH);
  pathReference.set({
    userid: object.followid,
    username: object.folllowusername,
  });

  //you are in the following list of others
  PATH = `${APPNAME}/Users/${object.followid}/getFollowerList/${object.userid}/`;
  const pathReference2 = firebase.database().ref(PATH);
  pathReference2.set({
    userid: object.userid,
    username: object.username,
  });
};

export const RemoveFollow = (object) => {
  //you are removing follow others
  PATH = `${APPNAME}/Users/${object.userid}/getFollowingList/${object.followid}/`;
  const pathReference = firebase.database().ref(PATH);
  pathReference.set({
    userid: null,
  });

  //you are removing in the following list of others
  PATH = `${APPNAME}/Users/${object.followid}/getFollowerList/${object.userid}/`;
  const pathReference2 = firebase.database().ref(PATH);
  pathReference2.set({
    userid: null,
  });
};

//UpdateLikesCount on the post
export const UpdateLikesCount = (postid, count) => {
  PATH = `${APPNAME}/Feed/${postid}/`;
  const pathReference = firebase.database().ref(PATH);
  pathReference.update({
    getLikesCount: count,
  });
  console.log("Firebase calling Add Comment");
};

//To Read Share information
export const GetShareInfo = () => {
  let info = "";
  PATH = `${APPNAME}/Share/`;
  const data = firebase.database().ref(PATH);
  data.on("value", (dtasnp) => {
    info = dtasnp.val().Info;
    console.log("GetShareInfo", dtasnp.val().Info);
  });
  return info;
};

export const ChangeObjToArry = (object) => {
  var arr = [];
  if (object) {
    keys = Object.keys(object);
    console.log("Array");
    // console.log(keys);
    console.log(keys.length);

    for (var i = 0, n = keys.length; i < n; i++) {
      var key = keys[i];
      arr[i] = object[key];
    }
  }
  return arr;
};

//To Write
export const StoreExpoToken = (token) => {
  let CustToken = NotificationTokenIdFirebase(token);
  //let CustToken = "token";
  console.log("ProductObject token", token);
  PATH = `${APPNAME}/Notification/ExpoToken/${CustToken}`;
  const pathReference = firebase.database().ref(PATH);
  pathReference.set({
    token: token,
  });
};

//To Read
export const ReadAllStoredExpoToken = () => {
  let details = {};
  let list;
  PATH = `${APPNAME}/Notification/ExpoToken/`;
  const data = firebase.database().ref(PATH);
  data.on("value", (dtasnp) => {
    details = dtasnp.val();
    list = details;
    console.log("Expo Token list from Firebase ", list);
  });
  return list;
};
