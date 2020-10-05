import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import AWS from "aws-sdk/global";

import S3 from "aws-sdk/clients/s3";

class App extends Component {
  state = {
    pics: [],
  };

  componentDidMount() {
    // Initialize the Amazon Cognito credentials provider
    AWS.config.region = "us-east-2"; // Region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "us-east-2:c76953da-fa4f-460f-a589-7b23095940d3",
    });
    const s3 = new AWS.S3();

    const params = {
      Bucket: "goose-hollow-road",
      Delimiter: "",
      Prefix: "",
    };

    s3.listObjectsV2(params, (err, data) => {
      if (err) {
        console.log("errr....", err);
      } else {
        console.log(data.Contents);
        this.setState({
          pics: data.Contents.map(c => {
            return {
              ...c,
              url:
                "https://goose-hollow-road.s3.us-east-2.amazonaws.com/" + c.Key,
            };
          }),
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Goose Hollow Road</h2>
        </div>
        <div className="pics">
          {this.state.pics.map(p => {
            return <img src={p.url} className="img" key={p.Key} />;
          })}
        </div>
      </div>
    );
  }
}

export default App;
