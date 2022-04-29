import React from "react";
import { resources } from '../resource'

function Home() {
  return (
    <div class="jumbotron  m-4 p-5 rounded">
      <div class="container">
        <h1 class="display-4">{resources.HOME.SUMMARY.TITLE}</h1>
        <p class="lead">{resources.HOME.SUMMARY.MESSAGE}</p>
        <p class="lead">
          <b>{resources.HOME.INFOMATION.LABEL.LOCATION}: </b>{resources.HOME.INFOMATION.INFO.LOCATION}
        </p>
        <p class="lead">
          <b>{resources.HOME.INFOMATION.LABEL.TIME}: </b>{resources.HOME.INFOMATION.INFO.TIME}
        </p>
        <p class="lead">
          <b>{resources.HOME.INFOMATION.LABEL.CAPACITY}: </b>{resources.HOME.INFOMATION.INFO.CAPACITY}
        </p>
        <p class="lead">
          <b>{resources.HOME.INFOMATION.LABEL.DROPIN_COST}: </b>{resources.HOME.INFOMATION.INFO.DROPIN_COST}
        </p>
        <p class="lead">
          <b>{resources.HOME.INFOMATION.LABEL.MEMBER_COST}: </b>{resources.HOME.INFOMATION.INFO.MEMBER_COST}
        </p>
        <p class="lead">
          <b>{resources.HOME.INFOMATION.LABEL.EQUIPMENT}: </b>{resources.HOME.INFOMATION.INFO.EQUIPMENT}
        </p>
      </div>
    </div>
  );
}

export default Home;