import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import Header from "../Header/Header";
import Problem from "../images/Problems.png";
import "./DeliveryDetails.css";
import { MyContext } from "../state/ContextApi";
import { GoCheckCircleFill } from "react-icons/go";
import { FaTruck } from "react-icons/fa";
const DeliveryDetails = () => {
  const { t } = useTranslation();
  const [deliveryDetails, setDeliveryDetails] = useState(null);
  const { id } = useParams();
  const [orderStatus, setOrderStatus] = useState(null);
  const { TrackingURL, setTrackingURL } = useContext(MyContext);
  const GetDeliveryDetails = () => {
    fetch(`https://tracking.bosta.co/shipments/track/${id}`, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert(t("deliveryDetails.failedToGetDetails"));
        }
      })
      .then((data) => {
        if (data) {
          setDeliveryDetails(data);
          setOrderStatus(data?.CurrentStatus?.state);
          setTrackingURL(data?.TrackingURL);
        }
      });
  };
  useEffect(() => {
    GetDeliveryDetails();
  }, []);

  const ConvertDateForonlydate = (data) => {
    const originalDate = new Date(data);

    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    };

    return originalDate.toLocaleString("en-US", options);
  };
  const ConvertDate = (data) => {
    const originalDate = new Date(data);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour clock
    };

    return originalDate.toLocaleString("en-US", options);
  };
  const ConvertDateForPromisedDate = (data) => {
    const originalDate = new Date(data);

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return originalDate.toLocaleString("en-US", options);
  };
  const ConvertDateToTime = (data) => {
    const originalDate = new Date(data);

    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true, // Use 12-hour clock
    };

    return originalDate.toLocaleString("en-US", options);
  };
  const ConvertToAR = () => {
    i18n.changeLanguage("ar");
  };
  const ConvertToENG = () => {
    i18n.changeLanguage("en");
  };
  const getStatusWidth = (status) => {
    switch (status) {
      case "TICKET_CREATED":
        return "25%";
      case "PACKAGE_RECEIVED":
        return "50%";
      case "OUT_FOR_DELIVERY":
        return "75%";
      case "CANCELLED":
        return "75%";
      case "DELIVERED":
        return "100%";
      case "DELIVERED_TO_SENDER":
        return "100%";

      default:
        return "0%";
    }
  };
  return (
    <div className="DetailsContainer">
      <Header ConvertToAR={ConvertToAR} ConvertToENG={ConvertToENG} />
      <div className="deliveryContainer">
        <div className="DeliveryCycleContainer">
          <div className="topData">
            <div className="DivContTitleAndDataDeliveryDetails">
              <p className="ColorGray">{t("deliveryDetails.promisedDate")}</p>
              <p className="FontBold">
                {deliveryDetails?.PromisedDate
                  ? ConvertDateForPromisedDate(deliveryDetails?.PromisedDate)
                  : t("deliveryDetails.cancelled")}
              </p>
            </div>
            <div className="DivContTitleAndDataDeliveryDetails">
              <p className="ColorGray">{t("deliveryDetails.merchantName")}</p>
              <p className="FontBold"> {deliveryDetails?.provider} </p>
            </div>
            <div className="DivContTitleAndDataDeliveryDetails">
              <p className="ColorGray">{t("deliveryDetails.lastUpdate")}</p>
              <p className="FontBold">
                {ConvertDate(deliveryDetails?.CurrentStatus?.timestamp)}
              </p>
            </div>

            <div className="DivContTitleAndDataDeliveryDetails">
              <p className="ColorGray">
                {t("deliveryDetails.shipmentNumber")} {id}
              </p>
              <p
                className="FontBold ColorRed"
                style={{
                  color:
                    orderStatus === "DELIVERED_TO_SENDER"
                      ? "green"
                      : orderStatus === "DELIVERED"
                      ? "green"
                      : "red",
                }}
              >
                {orderStatus === "DELIVERED_TO_SENDER"
                  ? t("deliveryDetails.delivered")
                  : ""}
                {orderStatus === "DELIVERED"
                  ? t("deliveryDetails.delivered")
                  : ""}
                {orderStatus === "CANCELLED"
                  ? t("deliveryDetails.cancelled")
                  : ""}
              </p>
            </div>
          </div>
          <div className="statusProgressBar">
            <div className="ContainerStatus">
              <div>{t("Bar.Created")}</div>
              <div>{t("Bar.Recieved")}</div>
              <div className="ContainerCancelledInBar">
                {t("data.Out for Recieved")}
                <p style={{ color: "red" }}>
                  {orderStatus === "CANCELLED" ? t("Bar.CANCELLED") : ""}
                </p>
              </div>
              <div>{t("data.DELIVERED")}</div>
            </div>
            <div
              className="progressBar"
              style={{
                width: getStatusWidth(orderStatus),
                backgroundColor:
                  orderStatus === "DELIVERED_TO_SENDER"
                    ? "green"
                    : orderStatus === "DELIVERED"
                    ? "green"
                    : "red",
              }}
            ></div>
            <div className="ContainerStatus">
              <div>
                <GoCheckCircleFill
                  style={{
                    color:
                      orderStatus === "DELIVERED"
                        ? "green"
                        : orderStatus === "DELIVERED_TO_SENDER"
                        ? "green"
                        : "red",
                  }}
                />
              </div>
              <div>
                <GoCheckCircleFill
                  style={{
                    color:
                      orderStatus === "DELIVERED"
                        ? "green"
                        : orderStatus === "DELIVERED_TO_SENDER"
                        ? "green"
                        : "red",
                  }}
                />
              </div>
              <div>
                <FaTruck
                  style={{
                    color:
                      orderStatus === "DELIVERED"
                        ? "green"
                        : orderStatus === "DELIVERED_TO_SENDER"
                        ? "green"
                        : "red",
                  }}
                />
              </div>
              <div>
                <GoCheckCircleFill
                  style={{
                    color:
                      orderStatus === "DELIVERED"
                        ? "green"
                        : orderStatus === "DELIVERED_TO_SENDER"
                        ? "green"
                        : "",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="ContainerAddressAndTableData">
          <div className="Address">
            <h4 className="colorLikeGray">{t("address.deliveryAddress")}</h4>
            <div className="containerAddress">
              <p> {t("address.deliveryAddressDetails")}</p>
            </div>
            <div className="ContainerProblems">
              <div className="question">
                <p style={{ textAlign: "center" }}>
                  {t("address.reportProblem")}
                </p>
                <button>{t("address.reportProblemBtn")}</button>
              </div>
              <img src={Problem} alt="problem" />
            </div>
          </div>
          <div className="DeliveryDetailsCycleData">
            <h4 className="colorLikeGray">{t("transitDetails.details")}</h4>
            <div className="DivForTableData">
              <table className="tableData">
                <thead>
                  <tr>
                    <th>{t("transitDetails.details")}</th>
                    <th>{t("transitDetails.time")}</th>
                    <th>{t("transitDetails.date")}</th>
                    <th>{t("transitDetails.branch")}</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryDetails?.TransitEvents.map((row, i) => (
                    <tr key={i}>
                      <td>{t(`data.${row?.translatedState || row?.state}`)}</td>
                      <td>{ConvertDateToTime(row?.timestamp)}</td>
                      <td>{ConvertDateForonlydate(row?.timestamp)}</td>
                      <td>
                        {row?.hub
                          ? t(`data.` + row?.hub)
                          : t("transitDetails.noHub")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
