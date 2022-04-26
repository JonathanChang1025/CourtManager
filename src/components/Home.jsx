import React from "react";
import {resources} from '../resource'

function Home() {
  return (
    <div class="row justify-content-center">
        <div class="card w-50">
          <div class="card text-center">
            <div class="card-header"></div>
            <div class="card-body">
              <h5 class="card-title">{resources.HOME.SUMMARY.TITLE}</h5>
              <p class="card-text">{resources.HOME.SUMMARY.MESSAGE}</p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            <div class="card-footer text-muted">
              2 days ago
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;