// import React, { useEffect } from "react";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import { useParams } from "react-router-dom";

// function randomID(len) {
//   let result = "";
//   const chars =
//     "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
//   const maxPos = chars.length;

//   for (let i = 0; i < len; i++) {
//     result += chars.charAt(Math.floor(Math.random() * maxPos));
//   }

//   return result;
// }

// async function generateToken(tokenServerUrl, userID) {
//   try {
//     const response = await fetch(
//       `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`
//     );

//     if (response.ok) {
//       const token = await response.json();
//       return token;
//     }
//   } catch (error) {
//     console.error("Error generating token:", error);
//   }

//   return null;
// }

// export default function VideoChatComponent() {
//   useEffect(() => {
//     const roomID = new URLSearchParams(window.location.search).get("roomID");
//     const userID = randomID(5);
//     const userName = randomID(5);

//     const myMeeting = async (element) => {
//       const token = await generateToken(
//         "https://nextjs-token.vercel.app/api",
//         userID
//       );

//       if (token) {
//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(
//           1484647939,
//           token,
//           roomID,
//           userID,
//           userName
//         );

//         const zp = ZegoUIKitPrebuilt.create(kitToken);
//         zp.joinRoom({
//           container: element,
//           sharedLinks: [
//             {
//               name: "Personal link",
//               url: `${window.location.origin}${window.location.pathname}?roomID=${roomID}`,
//             },
//           ],
//           scenario: {
//             mode: ZegoUIKitPrebuilt.GroupCall,
//           },
//         });
//       } else {
//         console.error("Failed to generate token.");
//       }
//     };

//     const containerElement = document.querySelector(".myCallContainer");
//     if (containerElement) {
//       myMeeting(containerElement);
//     }

//     return () => {
//       // Cleanup logic if needed
//     };
//   }, []);

//   return (
//     <div
//       className="myCallContainer"
//       style={{ width: "100vw", height: "100vh" }}
//     ></div>
//   );
// }

import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 331314442;
    const serverSecret = "77dd5f51a25fdc6bdd8e899bff9417ca";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
