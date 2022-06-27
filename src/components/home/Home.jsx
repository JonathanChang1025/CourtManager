import React from "react";
import { RESOURCES } from "../../resource"
import { Navigation } from "../";

function Home() {
  return (
    <>
      <Navigation/>
      <div className="jumbotron m-4 p-5 rounded">
        <div className="container">
          <h1 className="display-4">{RESOURCES.HOME.SUMMARY.TITLE}</h1>
          <p className="lead">{RESOURCES.HOME.SUMMARY.MESSAGE}</p>
          <p className="lead">
            <b>{RESOURCES.HOME.INFOMATION.LABEL.LOCATION}: </b>{RESOURCES.HOME.INFOMATION.INFO.LOCATION}
          </p>
          <p className="lead">
            <b>{RESOURCES.HOME.INFOMATION.LABEL.TIME}: </b>{RESOURCES.HOME.INFOMATION.INFO.TIME}
          </p>
          <p className="lead">
            <b>{RESOURCES.HOME.INFOMATION.LABEL.CAPACITY}: </b>{RESOURCES.HOME.INFOMATION.INFO.CAPACITY}
          </p>
          <p className="lead">
            <b>{RESOURCES.HOME.INFOMATION.LABEL.DROPIN_COST}: </b>{RESOURCES.HOME.INFOMATION.INFO.DROPIN_COST}
          </p>
          <p className="lead">
            <b>{RESOURCES.HOME.INFOMATION.LABEL.MEMBER_COST}: </b>{RESOURCES.HOME.INFOMATION.INFO.MEMBER_COST}
          </p>
          <p className="lead">
            <b>{RESOURCES.HOME.INFOMATION.LABEL.EQUIPMENT}: </b>{RESOURCES.HOME.INFOMATION.INFO.EQUIPMENT}
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;