import React from "react";
import { resources } from '../resource'

function Home() {
  return (
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="mx-5">
          <div class="card text-center">
          <h5 class="card-header">{resources.HOME.SUMMARY.TITLE}</h5>
            <div class="card-body">
              <h5 class="card-title"></h5>
              <p class="card-text">{resources.HOME.SUMMARY.MESSAGE}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;