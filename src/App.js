import React, {Component} from 'react';
import './App.css';
import Paho from 'paho-mqtt';


var MQTT_HOST = "test.mosquitto.org"
var MQTT_PORT = 8081
var MQTT_TOPIC = "bvgs"


var client = new Paho.Client(MQTT_HOST, MQTT_PORT, "clientId");


client.connect({
  useSSL: true,
  onSuccess: function () {
    console.log('connected to broker')
    client.subscribe(MQTT_TOPIC)
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {

    client.onMessageArrived = (message) => {
      console.log(message.payloadString)
      this.setState(state => {
        const list = state.list.concat(message.payloadString);
        return {
          list,
        };
      });
      };
  }

  render() {
    return (
        <div className="App" >
          <header className="App-header">
            <h1>Oversikt over gruppenes besvarelser</h1>
            <ol>
              {this.state.list.map(item => (
                  <li key={item}>{item}</li>
              ))}
            </ol>
          </header>
        </div>
    )
  }
}

export default App;
