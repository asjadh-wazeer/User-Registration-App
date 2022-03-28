import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarDetails from "./SidebarDetails";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";


function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);
console.log("Display Name",user.displayName);

const LogOut=()=>{
  // const navigate = useNavigate();
  // const history = useHistory();
  // navigate.go(0);
  window.location.reload(false);
}
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} /> 
        <div className="sidebar__headerRight">
          
          <h3>{user?.displayName}</h3>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <button onClick={LogOut} className="logout__button">Logout</button>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__search__container">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarDetails addNewRoom />
        {" "}
        
        {rooms.map((room) => (
          <SidebarDetails key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
