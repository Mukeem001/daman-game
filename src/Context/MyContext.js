import React, { createContext, useState, useEffect } from "react";

import mukeem from "../jsfile/Mukeem";
import Wingo3min from "../jsfile/Wingo3min";
import config from "../config/config";

export const MyContext = createContext();

const MyContextProvider = (props) => {
  const [exampleState, setExampleState] = useState("");
  const [usebalance, setusebalance] = useState("0.00");
  const [footershow, setfootershow] = useState("");
  const [showPopup, setshowPopup] = useState(false);
  const [myhistory, setmyhistory] = useState(true);
  const [selects, setselects] = useState(null);
  const [totolbet, settotolbet] = useState(null);
  const [Result, setResult] = useState(null);
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
  const [timeid, settimeid] = useState(null);

  const [token, settoken] = useState(null);
  const [userinfo, setuserinfo] = useState(null);

  const [status, setstatus] = useState("");

  const [historyi, sethistoryi] = useState([]);
  const [userbethistory, setuserbethistory] = useState([]);

  const [Seconds, setSeconds] = useState(null);
  const [currentTime, setcurrentTime] = useState(new Date());
  const [shouldSubmit, setshouldSubmit] = useState(false);

  const [Resultcolor, setResultcolor] = useState(null);
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

  // this 0 and 5 color number

  const [Num0resultg, setNum0resultg] = useState(null);
  const [Num5resultg, setNum5resultg] = useState(null);

  // this is for set 1min or 3min or 5min or 10min

  const [games, setgames] = useState("1min");

  // ✅ Use config from environment
  const url = `${config.API_BASE_URL}`;

  const { harry, handelper } = mukeem();

  const {
    timeid3min,
    formattedTime3min,
    history3min,
    histor3minyitem,
    addhistoryitem3min,
    addbetcontrol3min,
    adduserbethis3min,
  } = Wingo3min();

  useEffect(() => {
    const timerID = setInterval(() => setcurrentTime(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

 

  useEffect(() => {
    historyitem();
    setInterval(() => {
      if(Seconds==1)
      historyitem();
    }, 1000);

    
  }, [Seconds]);

  useEffect(() => {
    Getuser();
  }, []);

  // useEffect(() => {
  //   if (Seconds == 2) {
  //     historyitem();
  //     // addbetcontrol(); // Uncomment if needed
  //   }
  // }, [Seconds]);

  useEffect(() => {
    getuserbethis();
  }, []);

  useEffect(() => {
    if (!shouldSubmit) return;

    const submitBet = async () => {
      try {
        const requestBody = {
          priodno: timeid,
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

        const betControlEndpointByGame = {
          "30sec": "/api/wingo30secbetcontrol/getwingoitems",
          "1min": "/api/betcontrol/getwingoitems",
          "3min": "/api/wingo3minbetcontrol/getwingoitems",
          "5min": "/api/wingo5minbetcontrol/getwingoitems",
        };
        const betControlEndpoint = betControlEndpointByGame[games] || "/api/betcontrol/getwingoitems";

        const updateResponse = await fetch(
          `${url}${betControlEndpoint}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const updatedUserData = await updateResponse.json();
        resetState();
        // console.log(updatedUserData,"this is cheack for data");
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
    timeid,
    url,
  ]);

  // useEffect(() => {
  //   if (Seconds == 5) {
  //     // Call getwingosresult to update bigresult and smallresult
  //     getwingosresult();
  //     console.log(bigresult, smallresult);

  //     // Determine if the result is "Big" or "Small"
  //     if (bigresult < smallresult) {
  //       setResult("Big");
  //       getbignumber();

  //       console.log("this is big result");
  //     } else if (bigresult > smallresult) {
  //       setResult("Small");
  //       getsmallnumber()
  //       console.log("this is small result");
  //     } else {
  //       let randomNumber = Math.random();

  //       // Set result based on random number
  //       if (randomNumber < 0.5) {
  //         setResult("small");
  //         getsmallnumber()
  //         console.log("this is random small");
  //       } else {
  //         setResult("big");
  //         getbignumber();

  //         console.log("this is random big");
  //       }
  //     }

  //     // Determine the smallest variable among greenresult, redresult, and violetresult
  //     const variables = { bigresult, smallresult };
  //     const variableNames = Object.keys(variables);
  //     const values = Object.values(variables);

  //     const smallestValue = Math.min(...values);
  //     const smallestVariableName = variableNames[values.indexOf(smallestValue)];

  //     // if (Result == "big") {
  //     //   console.log(Result,"this is is very big number")
  //     //   console.log("this is green");
  //     //   // setResultcolor("green");
  //     //   getbignumber();
  //     // } else if (Result == "small") {
  //     //   console.log(Result,"this is is very small number")
  //     //   // setResultcolor("red");
  //     //   getsmallnumber();
  //     // } else {
  //     //   console.log("this is violet");
  //     //   setResultcolor("violet");
  //     // }

  //     // Call addhistoryitem() once after the result is determined
  //   }
  // }, [
  //   Seconds,
  //   bigresult,
  //   smallresult,
  //   greenresult,
  //   redresult,
  //   violetresult,
  //   Num1resultg,
  //   Num2resultg,
  //   Num3resultg,
  //   Num4resultg,
  //   Num5resultg,
  //   Num6resultg,
  //   Num7resultg,
  //   Num8resultg,
  //   Num9resultg,
  //   Num0resultg,
  // ]);

  //   const getsmallnumber = () => {
  //     const redvariables = {
  //         Num0resultg,
  //         Num1resultg,
  //         Num2resultg,
  //         Num3resultg,
  //         Num4resultg,
  //     };

  //     console.log(redvariables);
  //     const redvariableNames = Object.keys(redvariables);
  //     const redvalues = Object.values(redvariables);

  //     // Check if all values are the same
  //     const allValuesSame = redvalues.every(val => val === redvalues[0]);

  //     if (allValuesSame) {
  //         // Apply random condition
  //         const randomNumber = Math.floor(Math.random() * 5); // Generates a random number between 5 and 9
  //         // setResultNumber(randomNumber);
  //         // setResultcolor("blue"); // Set a color or any other condition for random case
  //         console.log("All values are the same. Applying random  small apluafdfnkladf condition:", randomNumber);

  //         switch (randomNumber) {
  //           case 1:
  //               console.log("this is Num0resultg");
  //               setResultNumber(1);
  //               setResultcolor("greenColor");
  //               break;
  //           case 2:
  //               console.log("this is Num1resultg");
  //               setResultNumber(2);
  //               setResultcolor("defaultColor");
  //               break;
  //           case 3:
  //               console.log("this is Num2resultg");
  //               setResultNumber(3);
  //               setResultcolor("greenColor");
  //               break;
  //           case 4:
  //               console.log("this is Num3resultg");
  //               setResultNumber(4);
  //               setResultcolor("defaultColor");
  //               break;
  //           case 0:
  //               console.log("this is Num4resultg");
  //               setResultNumber(0);
  //               setResultcolor("mixedColor0");
  //               break;
  //           default:
  //               let randomNumber = Math.floor(Math.random() * 4);
  //               setResultNumber(randomNumber);
  //               setResultcolor("yellow"); // Set a color for the default case
  //               console.log("Default case applied with this is for small aplly random number:", randomNumber);
  //       }
  //     } else {
  //         // Proceed with finding the smallest value and original logic
  //         const redsmallestValue = Math.min(...redvalues);
  //         const redsmallestVariableName =
  //             redvariableNames[redvalues.indexOf(redsmallestValue)];

  //         console.log(redsmallestVariableName, "this is khusbu");

  //         switch (redsmallestVariableName) {
  //             case "Num0resultg":
  //                 console.log("this is Num0resultg");
  //                 setResultNumber(0);
  //                 setResultcolor("mixedColor0");
  //                 break;
  //             case "Num1resultg":
  //                 console.log("this is Num1resultg");
  //                 setResultNumber(1);
  //                 setResultcolor("greenColor");
  //                 break;
  //             case "Num2resultg":
  //                 console.log("this is Num2resultg");
  //                 setResultNumber(2);
  //                 setResultcolor("defaultColor");
  //                 break;
  //             case "Num3resultg":
  //                 console.log("this is Num3resultg");
  //                 setResultNumber(3);
  //                 setResultcolor("greenColor");
  //                 break;
  //             case "Num4resultg":
  //                 console.log("this is Num4resultg");
  //                 setResultNumber(4);
  //                 setResultcolor("defaultColor");
  //                 break;
  //             default:
  //                 let randomNumber = Math.floor(Math.random() * 6);
  //                 setResultNumber(randomNumber);
  //                 setResultcolor("yellow"); // Set a color for the default case
  //                 console.log("Default case applied with random number:", randomNumber);
  //         }
  //     }
  // };

  // const getbignumber = () => {
  //   const redvariables = {
  //       Num5resultg,
  //       Num6resultg,
  //       Num7resultg,
  //       Num8resultg,
  //       Num9resultg,
  //   };

  //   console.log(redvariables);
  //   const redvariableNames = Object.keys(redvariables);
  //   const redvalues = Object.values(redvariables);

  //   // Check if all values are the same
  //   const allValuesSame = redvalues.every(val => val === redvalues[0]);

  //   if (allValuesSame) {
  //       // Apply random condition
  //       const randomNumber = Math.floor(Math.random() * 5) + 5; // Generates a random number between 5 and 9
  //       // setResultNumber(randomNumber);
  //       // setResultcolor("blue"); // Set a color or any other condition for random case
  //       console.log("All values are the same. Applying random condition:", randomNumber);

  //       switch (randomNumber) {
  //         case 5:
  //             console.log("this is Num5resultg");
  //             setResultNumber(5);
  //             setResultcolor("mixedColor5");
  //             break;
  //         case 6:
  //             console.log("this is Num6resultg");
  //             setResultNumber(6);
  //             setResultcolor("defaultColor");
  //             break;
  //         case 7:
  //             console.log("this is Num7resultg");
  //             setResultNumber(7);
  //             setResultcolor("greenColor");
  //             break;
  //         case 8:
  //             console.log("this is Num8resultg");
  //             setResultNumber(8);
  //             setResultcolor("defaultColor");
  //             break;
  //         case 9:
  //             console.log("this is Num9resultg");
  //             setResultNumber(9);
  //             setResultcolor("greenColor");
  //             break;
  //         default:
  //             let randomNumber = Math.floor(Math.random() * 5) + 5;
  //             console.log(randomNumber);
  //             setResultNumber(randomNumber);
  //             setResultcolor("red");
  //     }
  //   } else {
  //       // Proceed with finding the smallest value and original logic
  //       const redsmallestValue = Math.min(...redvalues);
  //       const redsmallestVariableName =
  //           redvariableNames[redvalues.indexOf(redsmallestValue)];

  //       console.log(redsmallestVariableName, "this is khusbu");

  //       switch (redsmallestVariableName) {
  //           case "Num5resultg":
  //               console.log("this is Num5resultg");
  //               setResultNumber(5);
  //               setResultcolor("mixedColor5");
  //               break;
  //           case "Num6resultg":
  //               console.log("this is Num6resultg");
  //               setResultNumber(6);
  //               setResultcolor("defaultColor");
  //               break;
  //           case "Num7resultg":
  //               console.log("this is Num7resultg");
  //               setResultNumber(7);
  //               setResultcolor("greenColor");
  //               break;
  //           case "Num8resultg":
  //               console.log("this is Num8resultg");
  //               setResultNumber(8);
  //               setResultcolor("defaultColor");
  //               break;
  //           case "Num9resultg":
  //               console.log("this is Num9resultg");
  //               setResultNumber(9);
  //               setResultcolor("greenColor");
  //               break;
  //           default:
  //               let randomNumber = Math.floor(Math.random() * 5) + 5;
  //               console.log(randomNumber);
  //               setResultNumber(randomNumber);
  //               setResultcolor("red");
  //       }
  //   }
  // };

  useEffect(() => {
    if (Seconds == 1) {
      upuserbethistory();

      // setHistoryItemAdded(false);
    }
  }, [Seconds]);

  const formattedTime = () => {
    const roundSecondsMap = {
      "30sec": 30,
      "1min": 60,
      "3min": 180,
      "5min": 300,
    };

    const roundSeconds = roundSecondsMap[games] || 60;
    const nowUnix = Math.floor(currentTime.getTime() / 1000);
    const roundStartUnix = nowUnix - (nowUnix % roundSeconds);
    const roundStart = new Date(roundStartUnix * 1000);

    const year = roundStart.getFullYear();
    const month = String(roundStart.getMonth() + 1).padStart(2, "0");
    const day = String(roundStart.getDate()).padStart(2, "0");
    const hours = String(roundStart.getHours()).padStart(2, "0");
    const minutes = String(roundStart.getMinutes()).padStart(2, "0");
    const secondsPart = String(roundStart.getSeconds()).padStart(2, "0");

    const remaining = String(roundSeconds - (nowUnix % roundSeconds)).padStart(2, "0");
    const periodId = roundSeconds === 30
      ? `${year}${month}${day}${hours}${minutes}${secondsPart}`
      : `${year}${month}${day}${hours}${minutes}`;

    settimeid(periodId);
    setSeconds(remaining);
    return `${remaining}`;
  };

  const Getuser = async () => {
    try {
      const token = localStorage.getItem("token");
      settoken(token);
      if (token) {
        const response = await fetch(`${url}/api/user/Getuser`, {
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

        setusebalance(json.userbalance);
        setuserinfo(json);
      }
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const updateuserb = async (totalAmountValue) => {
    try {
      const token = localStorage.getItem("token");
      const totolbet = totalAmountValue;

      if (!token) {
        throw new Error("Token not found");
      }

      const balanceResponse = await fetch(`${url}/api/user/Getuser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auto-token": token,
        },
      });

      if (!balanceResponse.ok) {
        throw new Error("Failed to fetch user balance");
      }

      const balanceData = await balanceResponse.json();
      const currentUserBalance = parseFloat(balanceData.userbalance);

      if (isNaN(currentUserBalance)) {
        throw new Error("Invalid user balance value");
      }

      const parsedTotolbet = parseFloat(totolbet);

      if (isNaN(parsedTotolbet)) {
        throw new Error("Invalid totolbet value");
      }

      const updatedBalance = currentUserBalance - parsedTotolbet;

      const requestBody = {
        userbalance: updatedBalance,
      };

      const updateResponse = await fetch(`${url}/api/user/userupdate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auto-token": token,
        },
        body: JSON.stringify(requestBody),
      });

      if (!updateResponse.ok) {
        throw new Error("Failed to update user balance");
      }

      const updatedUserData = await updateResponse.json();
      setusebalance(updatedUserData.userbalance);
    } catch (error) {
      console.error("Error updating user balance:", error.message);
    }
  };

  const historyitem = async () => {
    try {
      const response = await fetch(`${url}/api/history/getwingoitems`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const json = await response.json();


      const updatedJson = json.slice(0, -1);

    sethistoryi(updatedJson);
    } catch (error) {
      console.error("Error fetching history items:", error.message);
    }
  };

  const addhistoryitem = async () => {
    try {
      const requestBody = {
        periodno: timeid,
        betnumbers: ResultNumber,
        bigsmall: Result,
        color: Resultcolor,
      };

      console.log(ResultNumber, "this is number");

      const updateResponse = await fetch(
        `${url}/api/history/updatewingoitems`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const updatedUserData = await updateResponse.json();

      // sethistoryi(historyi.concat(updatedUserData));
      console.log(updatedUserData);
    } catch (error) {
      console.error("Error adding history item:", error.message);
    }
  };

  const addbetcontrol = (totalAmountValue, Selects) => {
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

  // const getwingosresult = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     settoken(token);

  //     const requestBody = {
  //       priodno: timeid,
  //     };

  //     if (token) {
  //       const response = await fetch(`${url}/api/betcontrol/getwingosresult`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "auto-token": token,
  //         },
  //         body: JSON.stringify(requestBody),
  //       });

  //       if (!response.ok) {
  //         throw new Error(
  //           `Network response was not ok, status: ${response.status}`
  //         );
  //       }

  //       const json = await response.json();
  //       setbigresult(json.totalBig);
  //       setsmallresult(json.totalSmall);
  //       setgreenresult(json.totalGreen);
  //       setredresult(json.totalRed);
  //       setvioletresult(json.totalViolet);

  //       // this is set green number  value

  //       setNum1resultg(json.totalNum1);
  //       setNum3resultg(json.totalNum3);
  //       setNum7resultg(json.totalNum7);
  //       setNum9resultg(json.totalNum9);

  //       //  this is set red number value

  //       setNum2resultg(json.totalNum2);
  //       setNum4resultg(json.totalNum4);
  //       setNum6resultg(json.totalNum6);
  //       setNum8resultg(json.totalNum8);

  //       //  this is  set 0 and 5 value

  //       setNum0resultg(json.totalNum0);
  //       setNum5resultg(json.totalNum5);

  //       console.log(json);
  //     } else {
  //       throw new Error("Token not found");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error.message);
  //     // Handle error, show error message, etc.
  //   }
  // };

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

  const getuserbethis = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }
      const response = await fetch(`${url}/api/userbethistory/getuserbethis`, {
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

      setuserbethistory(json);
    } catch (error) {
      console.error("Error fetching history items:", error.message);
    }
  };

  //  this is for user bet history

  const adduserbethis = async (totalAmountValue) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Token not found");
      }

      const requestBody = {
        priodno: timeid,
        pamount: totalAmountValue,
        amountaftertax: (totalAmountValue * 98) / 100,
        resultnumber: ResultNumber,
        resultcolor: Resultcolor,
        resultbigsmall: Result,
        select: selects,
        status: " ",
        winloss: 0,
        ordertime: timeid,
        tax: (totalAmountValue * 2) / 100,
      };

      console.log(ResultNumber, "this is number");

      const updateResponse = await fetch(
        `${url}/api/userbethistory/adduserbethis`,
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

      setuserbethistory(userbethistory.concat(updatedUserData));
      console.log(updatedUserData);
    } catch (error) {
      console.error("Error adding history item:", error.message);
    }
  };

  const upuserbethistory = async () => {
    try {
      // Fetch user bets
      const responses = await fetch(`${url}/api/history/getwingoitemsone`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ periodno: timeid }),
      });

      if (!responses.ok) {
        throw new Error("Network response was not ok for getwingoitemsone");
      }

      const userBets = await responses.json();
      console.log("Fetched user bets result:", userBets);

      if (userBets.length === 0) {
        throw new Error("No user bets found for the provided periodno");
      }

      // Extracting betnumbers, bigsmall, and color from userBets
      const { betnumbers, bigsmall, color } = userBets[0];

      // Fetch user history
      const response = await fetch(
        `${url}/api/userbethistory/getuserselectedbet`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ priodno: timeid }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userHistory = await response.json();
      console.log("Fetched user history:", userHistory);

      if (userHistory.length === 0) {
        throw new Error("No user history found for the provided priodno");
      }

      // Loop through each record in user history to update status
      for (const record of userHistory) {
        let status = "failed";
        let number = 1;
        if (
          record.select === betnumbers.toString() ||
          record.select.toLowerCase() === bigsmall.toLowerCase() ||
          record.select.toLowerCase() === color.toLowerCase()
        ) {
          status = "success";
        }

        // Update each record with new status using the record's _id
        const updateResponse = await fetch(
          `${url}/api/userbethistory/upuserbethistory/${record._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              resultnumber: betnumbers,
              resultcolor: color,
              resultbigsmall: bigsmall,
              winloss: record.amountaftertax * number,
              status: status,
            }),
          }
        );

        console.log("Update request payload:", {
          resultnumber: betnumbers,
          resultcolor: color,
          resultbigsmall: bigsmall,
          status: status,
        });

        if (!updateResponse.ok) {
          throw new Error(`HTTP error! status: ${updateResponse.status}`);
        }

        const updatedRecord = await updateResponse.json();
        console.log("Updated record:", updatedRecord);

        getuserbethis();
      }
    } catch (error) {
      console.error("Error processing bet history:", error.message);
    }
  };

  return (
    <MyContext.Provider
      value={{
        exampleState,
        setExampleState,
        Seconds,
        setSeconds,
        Result,
        setResult,
        usebalance,
        setusebalance,
        updateuserb,
        footershow,
        setfootershow,
        showPopup,
        setshowPopup,
        myhistory,
        setmyhistory,
        selects,
        setselects,
        totolbet,
        settotolbet,
        big,
        setbig,
        green,
        setgreen,
        white,
        setwhite,
        red,
        setred,
        small,
        setsmall,
        num1,
        setnum1,
        num2,
        setnum2,
        num3,
        setnum3,
        num4,
        setnum4,
        num5,
        setnum5,
        num6,
        setnum6,
        num7,
        setnum7,
        num8,
        setnum8,
        num9,
        setnum9,
        userinfo,
        formattedTime,

        timeid,
        settimeid,
        historyitem,
        sethistoryi,
        historyi,
        addbetcontrol,
        resetState,
        adduserbethis,
        userbethistory,
        timeid3min,
        history3min,
        formattedTime3min,
        harry,
        handelper,
        addhistoryitem3min,
        addbetcontrol3min,
        games,
        setgames,
        adduserbethis3min,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyContextProvider;
