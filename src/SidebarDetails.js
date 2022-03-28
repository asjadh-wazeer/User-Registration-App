import React, { useState, useEffect } from "react";
import "./SidebarDetails.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function SidebarDetails({ addNewRoom, id, name }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  const { roomId } = useParams();
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []); 

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]); 

  console.log(messages, "Messages");
  const createChat = () => {
    const roomName = prompt("Enter your name for chat");

    if (roomName) {
      
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  //

  const abc = () => {
    // db.collection("rooms").doc(roomId).delete({
    //   name
    // })
    db.collection("rooms").doc(id).delete();
    //console.log("ID", db.collection("rooms").doc(roomId));
    console.log("Deleted");
  };
  console.log("Rooom ID", db.collection("rooms").doc(id).id);

  
  return !addNewRoom ? (
    <Link to={`/rooms/${id}`}>
      {" "}
      {" "}
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p> 
        </div>{" "}
      </div>
      <button onClick={abc} className="sidebarChat__delete">
        <i class="fas fa-trash-alt"></i>
      </button>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat sidebarChat__section">
      <h2>Add new room</h2>
      <i className="fas fa-plus"></i>
    </div>
  );
}

export default SidebarDetails;
