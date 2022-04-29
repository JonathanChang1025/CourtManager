import React from "react";
import QRCode from "react-qr-code";
import { resources } from '../resource'

function QRScan() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="form-group col-md-4 col-md-offset-5 align-center ">
          <div className="card mt-4">
            <div className="m-3">
            <div className="card-body">
              <div className="row justify-content-center">
                  <h4 className="card-title">
                    {resources.QR.TITLE}
                  </h4>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {resources.QR.SUBTITLE}
                  </h6>
                  <h4 className="card-text">
                    {resources.QR.URL}
                  </h4>
                  <br/><br/><br/>
                  <QRCode
                    value={resources.QR.LINK}
                    size={256}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRScan;