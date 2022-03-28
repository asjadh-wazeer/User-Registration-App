import React, { useState, useEffect } from "react";
import "./Details.css";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined, AttachFile, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import db from "./firebase"; 

import { useStateValue } from "./StateProvider";
import firebase from "firebase/compat/app";

function Details() {
  const [input, setInput] = useState(""); 
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]); 

  const [{ user }, dispatch] = useStateValue(); 

  

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name); 
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data())); 
        });
    }
  }, [roomId]);

  
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]); 

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("Typed ", input); 

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName, 
      timestamp: firebase.firestore.FieldValue.serverTimestamp(), 
    });

    setInput(""); 
  };



  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          
          <h3>{roomName}</h3>
          <p>{user?.displayName}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        {messages.map(
          (
            message 
          ) => (
            <p className="chat__message">
              {" "}
              {message.message}
              <span className="chat__timestamp">
                {new Date(message.timestamp?.toDate()).toUTCString()}
              </span>
            </p>
          )
        )}
      </div>

      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            type="text"
            placeholder="Add your details / message and press enter"
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={sendMessage} type="submit">
            Add details/message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Details;
