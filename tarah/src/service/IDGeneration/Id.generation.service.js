export const CreateUserId = (from) => {
  let id = "";
  let userid = "TARAHUSER";
  let post = "POST";
  let comment = "COMMENT";
  const now = Date.now().toString();
  // console.log("now", now);
  if (from == "user") {
    id = userid + now;
  } else if (from == "post") {
    id = post + now;
  } else if (from == "comment") {
    id = comment + now;
  }
  //console.log("OrderNumber", OrderNumber);
  return id;
};

export const TokenIdForFirebase = (token) => {
  let expoToken = token.toString().split("[");
  expoToken = expoToken[1].split("]");
  return (expoToken = "CUSTOMERTOKEN" + expoToken[0]);
};

export const GetDateAndTime = (input_date_time) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let hours, minutes, ampm;

  const dateObj = new Date(input_date_time);

  let input_month = monthNames[dateObj.getMonth()];
  //let input_month = "vzxv";
  let input_day = String(dateObj.getDate()).padStart(2, "0");
  let input_year = dateObj.getFullYear().toString();

  const currentDateAndTime = new Date();
  const currentMonth = monthNames[currentDateAndTime.getMonth()];
  const currentDay = String(currentDateAndTime.getDate()).padStart(2, "0");
  const currentYear = currentDateAndTime.getFullYear().toString();

  if (
    input_month === currentMonth &&
    input_day === currentDay &&
    input_year === currentYear
  ) {
    input_day = "Today";
    input_month = "";
    input_year = "";
  } else if (
    input_month == currentMonth &&
    input_day == currentDay - 1 &&
    input_year == currentYear
  ) {
    input_day = "Yesterday";
    input_month = "";
    input_year = "";
  }
  let output_date = "";
  if (input_month.length > 0 && input_year.length > 0) {
    output_date = input_day + " " + input_month + " " + input_year;
  } else {
    output_date = input_day;
  }

  hours = dateObj.getHours();
  minutes = dateObj.getMinutes();
  ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  const output_time = hours + ":" + minutes + " " + ampm;

  const output_date_and_time = output_date + " " + output_time;

  console.log("output_date_and_time", output_date_and_time);

  return output_date_and_time;
};

export const NotificationTokenIdFirebase = (token) => {
  let expoToken = token.toString().split("[");
  expoToken = expoToken[1].split("]");
  return (expoToken = "EXPOTOKEN" + expoToken[0]);
  //return (expoToken = "EXPOTOKEN" + token);
};
