import React, { useEffect, useState } from "react";
import config from "../config/config";

function Wingo3min() {
  const [history3min, sethistory3min] = useState();
  const [timeid3min, settimeid3min] = useState(null);
  const [Secound3min, setSecound3min] = useState(null);

  const [Resultcolor, setResultcolor] = useState(null);

  const [totolbet, settotolbet] = useState(null);

  const [big, setbig] = useState(null);
  const [small, setsmall] = useState(0);
  const [red, setred] = useState(0);
  const [green, setgreen] = useState(0);
  const [white, setwhite] = useState(0);
  const [num1, setnum1] = useState(0);
  const [num2, setnum2] = useState(0);
  const [num3, setnum3] = useState(0);
  const [num4, setnum4] = useState(0);
  const [num5, setnum5] = useState(0);
  const [num6, setnum6] = useState(0);
  const [num7, setnum7] = useState(0);
  const [num8, setnum8] = useState(0);
  const [num9, setnum9] = useState(0);
  const [num0, setnum0] = useState(0);

  const [shouldSubmit, setshouldSubmit] = useState(false);

  const [Num0resultg, setNum0resultg] = useState(null);
  const [Num5resultg, setNum5resultg] = useState(null);

  const [ResultNumber, setResultNumber] = useState(null);

  const [bigresult, setbigresult] = useState(null);
  const [smallresult, setsmallresult] = useState(null);
  const [greenresult, setgreenresult] = useState(null);
  const [redresult, setredresult] = useState(null);
  const [violetresult, setvioletresult] = useState(null);

  //  this is for number result green number

  const [Num1resultg, setNum1resultg] = useState(null);
  const [Num7resultg, setNum7resultg] = useState(null);
  const [Num3resultg, setNum3resultg] = useState(null);
  const [Num9resultg, setNum9resultg] = useState(null);

  //  this is for red number

  const [Num2resultg, setNum2resultg] = useState(null);
  const [Num4resultg, setNum4resultg] = useState(null);
  const [Num6resultg, setNum6resultg] = useState(null);
  const [Num8resultg, setNum8resultg] = useState(null);
  const [remainingMinutes, setremainingMinutes] = useState(0);
  const [remainingSecondsInMinute, setremainingSecondsInMinute] = useState(0);

  const [userbethis3min, setuserbethis3min] = useState([]);

  const [token, settoken] = useState(null);

  const [Result, setResult] = useState(null);
  
  // ✅ Use config from environment
  const url = `${config.API_BASE_URL}`;

  useEffect(() => {
    if (remainingMinutes == 0 && remainingSecondsInMinute == 5) {
      console.log("mukeem is check ho gyi maaf mujeh");
      addhistoryitem3min();

      // setHistoryItemAdded(false);
    }
  }, [remainingMinutes, remainingSecondsInMinute]);

  const formattedTime3min = () => {
    const currentTime = new Date(); // Assuming currentTime is a Date object
    const totalSeconds = 180; // Total countdown time in seconds (3 minutes)

    // Calculate elapsed time in seconds since the start of the timer
    const elapsedSeconds =
      currentTime.getMinutes() * 60 + currentTime.getSeconds();

    // Calculate remaining time in seconds
    const remainingSeconds = totalSeconds - (elapsedSeconds % totalSeconds);

    // Convert remaining time to minutes and seconds
    const remainingMinutes = Math.floor(remainingSeconds / 60);
    const remainingSecondsInMinute = remainingSeconds % 60;

    setremainingMinutes(remainingMinutes);
    setremainingSecondsInMinute(remainingSecondsInMinute);

    // Format minutes and seconds to always have two digits
    const formattedMinutes = String(remainingMinutes).padStart(2, "0");
    const formattedSeconds = String(remainingSecondsInMinute).padStart(2, "0");

    // Generate time ID
    const year = currentTime.getFullYear();
    const month = String(currentTime.getMonth() + 1).padStart(2, "0");
    const day = String(currentTime.getDate()).padStart(2, "0");
    const hours = String(currentTime.getHours()).padStart(2, "0");
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    let timeid3min = `${year}${month}${day}${hours}${minutes}`;

    // Adding a numeric value to the timeid
    const incrementedValue = parseInt(timeid3min) + 9;
    timeid3min = incrementedValue.toString();
    // console.log(timeid3min, "this mukeem is ");
    settimeid3min(timeid3min);
    setSecound3min(formattedSeconds);

    return [
      formattedMinutes,
      formattedSeconds,
      remainingMinutes,
      remainingSecondsInMinute,
    ];
  };

  useEffect(() => {
    if (remainingMinutes == 1 && remainingSecondsInMinute == 30) {
      // Call getwingosresult to update bigresult and smallresult
      getwingosresult3min();

      // Determine if the result is "Big" or "Small"
      if (bigresult < smallresult) {
        setResult("Big");
        console.log("this is big result");
      } else if (bigresult > smallresult) {
        setResult("Small");
        console.log("this is small result");
      } else {
        let randomNumber = Math.random();

        // Set result based on random number
        if (randomNumber < 0.5) {
          setResult("small");
          console.log("this is random small");
        } else {
          setResult("big");
          console.log("this is random big");
        }
      }

      // Determine the smallest variable among greenresult, redresult, and violetresult
      const variables = { bigresult, smallresult };
      const variableNames = Object.keys(variables);
      const values = Object.values(variables);

      const smallestValue = Math.min(...values);
      const smallestVariableName = variableNames[values.indexOf(smallestValue)];

      if (smallestVariableName === "bigresult") {
        console.log("this is green");
        setResultcolor("green");
        getbignumber3min();
      } else if (smallestVariableName === "smallresult") {
        console.log("this is red");
        setResultcolor("red");
        getsmallnumber3min();
      } else {
        console.log("this is violet");
        setResultcolor("violet");
      }

      // Call once after the result is determined

      addhistoryitem3min();
    }
  }, [
    Secound3min,
    bigresult,
    smallresult,
    greenresult,
    redresult,
    violetresult,
    Num1resultg,
    Num2resultg,
    Num3resultg,
    Num4resultg,
    Num5resultg,
    Num6resultg,
    Num7resultg,
    Num8resultg,
    Num9resultg,
    Num0resultg,
  ]);

  useEffect(() => {
    if (!shouldSubmit) return;

    const submitBet = async () => {
      try {
        const requestBody = {
          priodno: timeid3min,
          big: big,
          small: small,
          red: red,
          green: green,
          violet: white,
          Num1: num1,
          Num2: num2,
          Num3: num3,
          Num4: num4,
          Num5: num5,
          Num6: num6,
          Num7: num7,
          Num8: num8,
          Num9: num9,
          Num0: num0,
        };

        const updateResponse = await fetch(
          `${url}/api/wingo3minbetcontrol/addwingoitems`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const updatedUserData = await updateResponse.json();
        resetState();
        console.log(updatedUserData);
      } catch (error) {
        console.error("Error updating user balance:", error.message);
      } finally {
        setshouldSubmit(false); // Reset the flag
      }
    };

    submitBet();
  }, [
    big,
    small,
    red,
    green,
    white,
    num1,
    num2,
    num3,
    num4,
    num5,
    num6,
    num7,
    num8,
    num9,
    num0,
    shouldSubmit,
    timeid3min,
    url,
  ]);

  const histor3minyitem = async () => {
    try {
      const response = await fetch(`${url}/api/history3min/getwingoitems`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();

      sethistory3min(json);
    } catch (error) {
      console.error("Error fetching history items:", error.message);
    }
  };

  const addhistoryitem3min = async () => {
    try {
      const requestBody = {
        periodno: timeid3min,
        betnumbers: ResultNumber,
        bigsmall: Result,
        color: Resultcolor,
      };

      console.log(ResultNumber, "this is number");

      const updateResponse = await fetch(
        `${url}/api/history3min/addwingoitems`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const updatedUserData = await updateResponse.json();

      sethistory3min(history3min.concat(updatedUserData));
      console.log(updatedUserData);
    } catch (error) {
      console.error("Error adding history item:", error.message);
    }
  };

  const addbetcontrol3min = (totalAmountValue, Selects) => {
    const parsedTotolbet = parseFloat(totalAmountValue);
    console.log(Selects, "this is select value");

    switch (Selects) {
      case "big":
        setbig(parsedTotolbet);
        break;
      case "small":
        setsmall(parsedTotolbet);
        break;
      case "White":
        setwhite(parsedTotolbet);
        break;
      case "Red":
        setred(parsedTotolbet);
        break;
      case "Green":
        setgreen(parsedTotolbet);
        break;
      case "1":
        setnum1(parsedTotolbet);
        break;
      case "2":
        setnum2(parsedTotolbet);
        break;
      case "3":
        setnum3(parsedTotolbet);
        break;
      case "4":
        setnum4(parsedTotolbet);
        break;
      case "5":
        setnum5(parsedTotolbet);
        break;
      case "6":
        setnum6(parsedTotolbet);
        break;
      case "7":
        setnum7(parsedTotolbet);
        break;
      case "8":
        setnum8(parsedTotolbet);
        break;
      case "9":
        setnum9(parsedTotolbet);
        break;
      case "0":
        setnum0(parsedTotolbet);
        break;
      default:
        console.log("Invalid selection");
    }
    setshouldSubmit(true);
    // Reset state after running addbetcontrol
  };

  const adduserbethis3min = async (totalAmountValue, selects) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const requestBody = {
        priodno: timeid3min,
        pamount: totalAmountValue,
        amountaftertax: (totalAmountValue * 98) / 100,
        resultnumber: ResultNumber,
        resultcolor: Resultcolor,
        resultbigsmall: Result,
        select: selects,
        status: " ",
        winloss: 0,
        ordertime: timeid3min,
        tax: (totalAmountValue * 2) / 100,
      };

      console.log(ResultNumber, "this is number");

      const updateResponse = await fetch(
        `${url}/api/userbethis3min/adduserbethis`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auto-token": token, // Add the token here
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(`HTTP error! status: ${updateResponse.status}`);
      }

      const updatedUserData = await updateResponse.json();

      setuserbethis3min(userbethis3min.concat(updatedUserData));
      console.log(updatedUserData);
    } catch (error) {
      console.error("Error adding history item:", error.message);
    }
  };

  const getwingosresult3min = async () => {
    try {
      const token = localStorage.getItem("token");
      settoken(token);

      const requestBody = {
        priodno: timeid3min,
      };

      if (token) {
        const response = await fetch(
          `${url}/api/wingo3minbetcontrol/getwingosresult`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auto-token": token,
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Network response was not ok, status: ${response.status}`
          );
        }

        const json = await response.json();
        setbigresult(json.totalBig);
        setsmallresult(json.totalSmall);
        setgreenresult(json.totalGreen);
        setredresult(json.totalRed);
        setvioletresult(json.totalViolet);

        // this is set green number  value

        setNum1resultg(json.totalNum1);
        setNum3resultg(json.totalNum3);
        setNum7resultg(json.totalNum7);
        setNum9resultg(json.totalNum9);

        //  this is set red number value

        setNum2resultg(json.totalNum2);
        setNum4resultg(json.totalNum4);
        setNum6resultg(json.totalNum6);
        setNum8resultg(json.totalNum8);

        //  this is  set 0 and 5 value

        setNum0resultg(json.totalNum0);
        setNum5resultg(json.totalNum5);

        console.log(json);
      } else {
        throw new Error("Token not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      // Handle error, show error message, etc.
    }
  };

  const resetState = () => {
    setbig(0);
    setsmall(0);
    setred(0);
    setgreen(0);
    setwhite(0);
    setnum1(0);
    setnum2(0);
    setnum3(0);
    setnum4(0);
    setnum5(0);
    setnum6(0);
    setnum7(0);
    setnum8(0);
    setnum9(0);
    setnum0(0);
  };

  const getuserbethis3min = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`${url}/api/userbethis3min/getuserbethis`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auto-token": token,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();

      setuserbethis3min(json);
    } catch (error) {
      console.error("Error fetching history items:", error.message);
    }
  };

  const getsmallnumber3min = () => {
    const redvariables = {
      Num0resultg,
      Num1resultg,
      Num3resultg,
      Num2resultg,
      Num4resultg,
    };

    console.log(redvariables);
    const redvariableNames = Object.keys(redvariables);
    const redvalues = Object.values(redvariables);

    const redsmallestValue = Math.min(...redvalues);
    const redsmallestVariableName =
      redvariableNames[redvalues.indexOf(redsmallestValue)];

    console.log(redsmallestVariableName, "this is khusbu");

    switch (redsmallestVariableName) {
      case "Num0resultg":
        console.log("this is Num2resultg");
        setResultNumber(0);
        setResultcolor("red");
        break;
      case "Num1resultg":
        console.log("this is Num4resultg");
        setResultNumber(1);
        setResultcolor("green");
        break;

      case "Num2resultg":
        console.log("this is Num8resultg");
        setResultNumber(2);
        setResultcolor("red");
        break;

      case "Num3resultg":
        console.log("this is Num6resultg");
        setResultNumber(3);
        setResultcolor("green");
        break;
      case "Num4resultg":
        console.log("this is Num8resultg");
        setResultNumber(4);
        setResultcolor("red");
        break;

      default:
        let randomNumber = Math.floor(Math.random() * 6);
        setResultcolor(randomNumber);

      // Set result based on random number
      // switch (randomNumber) {
      //   case 0:
      //     console.log("this is violet");
      //     setResultcolor("0");
      //     break;
      //   case 1:
      //     console.log("this is red");
      //     setResultcolor("1");
      //     break;
      //   case 2:
      //     console.log("this is orange");
      //     setResultcolor("2");
      //     break;
      //   case 3:
      //     console.log("this is yellow");
      //     setResultcolor("3");
      //     break;
      //   case 4:
      //     console.log("this is green");
      //     setResultcolor("4");
      //     break;
      //   default:
      //     console.log("Unexpected random number generated.");
      //     break;
      // }
    }
  };

  const getbignumber3min = () => {
    const redvariables = {
      Num5resultg,
      Num6resultg,
      Num7resultg,
      Num8resultg,
      Num9resultg,
    };

    console.log(redvariables);
    const redvariableNames = Object.keys(redvariables);
    const redvalues = Object.values(redvariables);

    const redsmallestValue = Math.min(...redvalues);
    const redsmallestVariableName =
      redvariableNames[redvalues.indexOf(redsmallestValue)];

    console.log(redsmallestVariableName, "this is khusbu");

    switch (redsmallestVariableName) {
      case "Num5resultg":
        console.log("this is Num2resultg");
        setResultNumber(5);
        setResultcolor("green");
        break;
      case "Num6resultg":
        console.log("this is Num4resultg");
        setResultNumber(6);
        setResultcolor("red");
        break;

      case "Num7resultg":
        console.log("this is Num6resultg");
        setResultNumber(7);
        setResultcolor("green");
        break;
      case "Num8resultg":
        console.log("this is Num8resultg");
        setResultNumber(8);
        setResultcolor("red");
        break;

      case "Num9resultg":
        console.log("this is Num8resultg");
        setResultNumber(9);
        setResultcolor("green");
        break;

      default:
        let randomNumber = Math.floor(Math.random() * 5) + 5;
        console.log(randomNumber);
        setResultNumber(randomNumber);
        setResultcolor("red");
        
    }
  };

  return {
    formattedTime3min,
    histor3minyitem,
    history3min,
    timeid3min,
    settimeid3min,
    addbetcontrol3min,
    adduserbethis3min,
    getuserbethis3min,
    getwingosresult3min,
  };
}

export default Wingo3min;
