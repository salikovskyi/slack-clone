import "./App.css";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar/SideBar";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "./firebase";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import db from "./firebase";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const postsCollectionRef = collection(db, "rooms");


  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setUser(false);
      window.location.pathname = "/login";
    });
  };

  useEffect(() => {
    const getChannels = async () => {
      const data = await getDocs(postsCollectionRef);
      setRooms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getChannels();
  }, []);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <Container>
            <Header user={user}/>
            <Main>
              <SideBar rooms={rooms}  user={user} />
              <Routes>
                <Route path="/room/:channelId" element={<Chat user={user}/>} />
                <Route path="/" element={<p>Select or Create Channel</p>} />
              </Routes>
            </Main>
          </Container>
        )}
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 38px minmax(0, 1fr);
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 260px auto;
`;
