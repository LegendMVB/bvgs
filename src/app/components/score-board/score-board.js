import React, {useEffect, useReducer, useState} from "react";
import "./score-board.css";
import Paho from 'paho-mqtt';

const MQTT_HOST = "test.mosquitto.org";
const MQTT_PORT = 8081;
const MQTT_TOPIC = "bvgs";

export const ScoreBoard = () => {
  const [client, _] = useState(new Paho.Client(MQTT_HOST, MQTT_PORT, "clientId-1FG2i7jIhb"));


  const [scores, scoreReducer] = useReducer((state, payload) => {
    return {
      ...state,
      [payload.gruppenavn]: {
        ...state[payload.gruppenavn],
        [payload.oppgavenavn]: payload.svar
      }
    };
  }, {});

  const [tasks, taskReducer] = useReducer((state, taskName) => {
    if (state[taskName] !== undefined) {
      return state;
    } else {
      return {
        ...state,
        [taskName]: {
          color: ""
        }
      }
    }
  }, {});

  useEffect(() => {
    client.connect({
      useSSL: true,
      onSuccess: function () {
        console.log('connected to broker');
        client.subscribe(MQTT_TOPIC);
      }
    });
    client.onMessageArrived = (message) => handleMessage(JSON.parse(message.payloadString));
  }, []);


  const handleMessage = (content) => {
    console.debug(content);
    taskReducer(content.oppgavenavn);
    scoreReducer(content);
  };

  return (
    <section className="score-board">
      <div className="task-names">
        <h2 className="invis"><br/></h2>
        {Object.keys(tasks).map(task => {
          return (
            <div className="task-name" key={task}>{task}</div>
          )
        })}
      </div>
      {Object.keys(scores).map(groupName => {
        return (
          <div className="score-group" key={groupName}>
            <h2>{groupName}</h2>
            {Object.keys(tasks).map(task => {
              return (
                <div className="score" key={groupName + task}>{scores[groupName][task]}</div>
              );
            })}
          </div>
        );
      })}
    </section>
  );
};
