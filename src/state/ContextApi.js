import React, { createContext, useEffect, useState } from "react";
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [TrackingURL, setTrackingURL] = useState("");

  useEffect(() => {
    const storedTrackingURL = sessionStorage.getItem("TrackingURL");

    if (storedTrackingURL) {
      setTrackingURL(storedTrackingURL);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("TrackingURL", TrackingURL);
  }, [TrackingURL]);

  const contextValue = {
    TrackingURL,
    setTrackingURL,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
