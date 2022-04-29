import React from "react";
import { resources } from '../resource'

function Home() {
  return (
    <div className="jumbotron m-4 p-5 rounded">
      <div className="container">
        <h1 className="display-4">{resources.HOME.SUMMARY.TITLE}</h1>
        <p className="lead">{resources.HOME.SUMMARY.MESSAGE}</p>
        <p className="lead">
          <b>{resources.HOME.INFOMATION.LABEL.LOCATION}: </b>{resources.HOME.INFOMATION.INFO.LOCATION}
        </p>
        <p className="lead">
          <b>{resources.HOME.INFOMATION.LABEL.TIME}: </b>{resources.HOME.INFOMATION.INFO.TIME}
        </p>
        <p className="lead">
          <b>{resources.HOME.INFOMATION.LABEL.CAPACITY}: </b>{resources.HOME.INFOMATION.INFO.CAPACITY}
        </p>
        <p className="lead">
          <b>{resources.HOME.INFOMATION.LABEL.DROPIN_COST}: </b>{resources.HOME.INFOMATION.INFO.DROPIN_COST}
        </p>
        <p className="lead">
          <b>{resources.HOME.INFOMATION.LABEL.MEMBER_COST}: </b>{resources.HOME.INFOMATION.INFO.MEMBER_COST}
        </p>
        <p className="lead">
          <b>{resources.HOME.INFOMATION.LABEL.EQUIPMENT}: </b>{resources.HOME.INFOMATION.INFO.EQUIPMENT}
        </p>
      </div>
    </div>
  );
}

export default Home;