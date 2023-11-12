import React, { useContext, useState } from "react";
import "./Header.css";
import logo from "../images/logo.png";
import { useTranslation } from "react-i18next";
import { MyContext } from "../state/ContextApi";
import { FaAlignRight, FaRegWindowClose } from "react-icons/fa";

export default function Header({ ConvertToENG, ConvertToAR }) {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const { TrackingURL } = useContext(MyContext);
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const CallChangeLangENG = () => {
    ConvertToENG();
    setSelectedLanguage("ENG");
  };
  const CallChangeLangAR = () => {
    ConvertToAR();
    setSelectedLanguage("AR");
  };
  console.log("TrackingURL", TrackingURL);
  return (
    <>
      <div className="HeaderContainer">
        <div className="ARENG">
          <h4
            className={`h3ForENG ${selectedLanguage === "ENG" ? "active" : ""}`}
            onClick={CallChangeLangENG}
          >
            ENG
          </h4>
          <h4
            className={`h3ForENG ${selectedLanguage === "AR" ? "active" : ""}`}
            onClick={CallChangeLangAR}
          >
            AR
          </h4>
        </div>
        <div className="LoginContainer">
          <h4 className="colorGray">{t("header.Login")}</h4>
          <a href={"http://" + TrackingURL} target="_blank" rel="noreferrer">
            {t("header.Track your shipment")}
          </a>
        </div>

        <div className="DivContainerLinks">
          <ui className="UiLinksContainer">
            <li className="">{t("header.Call Sales")}</li>
            <li className=""> {t("header.Prices")} </li>
            <li className="">{t("header.Home")}</li>
          </ui>
        </div>
        <div className="LogoContainer">
          <img className="" alt="logo" src={logo} />
        </div>
        <div className="menu-bars">
          <FaAlignRight onClick={showSidebar} />
        </div>
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle ">
            <div className="menu-bars ">
              <FaRegWindowClose className="svgClose" />
            </div>
          </li>
          <>
            <li className="navbar-toggle ">
              <div className="menu-bars ">
                <p> {t("header.Call Sales")}</p>
              </div>
            </li>
            <li className="navbar-toggle ">
              <div className="menu-bars ">
                <p> {t("header.Prices")}</p>
              </div>
            </li>
            <li className="navbar-toggle ">
              <div className="menu-bars ">
                <p> {t("header.Home")}</p>
              </div>
            </li>
            <li className="navbar-toggle ">
              <div className="menu-bars ">
                <p> {t("header.Login")}</p>
              </div>
            </li>
            <li className="navbar-toggle ">
              <div className="menu-bars ">
                <a
                  href={"http://" + TrackingURL}
                  target="_blank"
                  rel="noreferrer"
                >
                  {" "}
                  {t("header.Track your shipment")}
                </a>
              </div>
            </li>
          </>
        </ul>
      </nav>
    </>
  );
}
