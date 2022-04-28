import React from "react";
import { resources } from '../resource'

function Home() {
  return (
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="mx-5">
          <div class="card text-center">
          <div class="card-header"></div>
            <div class="card-body">
              <h5 class="card-title">{resources.HOME.SUMMARY.TITLE}</h5>
              <p class="card-text">{resources.HOME.SUMMARY.MESSAGE}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;