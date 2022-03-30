import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from '../ChatInput/ChatInput'
import ChatMessage from '../ChatMessage/ChatMessgae'

import db from '../../firebase'
import { selectRoomId } from "../../features/appSlice";
import { useSelector } from "react-redux";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { useParams } from 'react-router-dom'
import { collection, doc, getDoc, getDocs, getFirestore, Timestamp, query, orderBy, addDoc, snapshotEqual } from "firebase/firestore"; 

function Chat({ user }) {
  let { channelId } = useParams();
  const [ channel, setChannel ] = useState();
  const [ messages, setMessages ] = useState([])
  const postsCollectionRef = collection(db, `rooms`)
  const messagesCollectionRef = doc(db, `rooms`, 'message')

  const getMessages = async () => {
    const messagedata = messagesCollectionRef;
    console.log(messagedata);

      // db.collection('rooms')
      // .doc(channelId)
      // .collection('messages')
      // .orderBy('timestamp', 'asc')
      // .onSnapshot((snapshot)=>{
      //     let messages = snapshot.docs.map((doc)=>doc.data());
      //     setMessages(messages);
      // })
  }

  // const sendMessage = (text) => {
  //   text.preventDefault();
  //     if(channelId){
  //         let payload = {
  //             text: text,
  //             user: user.name,
  //             userImage: user.photo
  //         }
  //         addDoc(collection(db, 'message'), {
  //           payload
  //         });
  //     }
  // }
  const getChannels = async () => {
    const data = await getDocs(postsCollectionRef);
    const channelData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const filterData = channelData.find((doc) => {
      if(doc.id === channelId){
        return doc
      }
    })
    setChannel(filterData);
  };

  useEffect(() => {
    getMessages();
    getChannels();
  }, [channelId]);
  
  // const getChannel = () => {
  //     db.collection('rooms')
  //     .doc(channelId)
  //     .onSnapshot((snapshot)=>{
  //         setChannel(snapshot.data());
  //     })
  // }

  // useEffect(()=>{
  //     getChannel();
  //     getMessages();
  // }, [channelId])
  return (
      <Container>
          <Header>
              <Channel>
                  <ChannelName>
                      # { channel && channel.name}
                  </ChannelName>
                  <ChannelInfo>
                  Company-wide announcements and work-based matters
                  </ChannelInfo>
              </Channel>
              <ChannelDetails>
                  <div>
                      Details
                  </div>
                  <Info />
              </ChannelDetails>
          </Header>
          <MessageContainer>
              {
                  messages.length > 0 &&
                  messages.map((data, index)=>(
                      <ChatMessage
                          text={data.text}
                          name={data.user}
                          image={data.userImage}
                          timestamp={data.timestamp}
                      />
                  ))
              }
          </MessageContainer>
          <ChatInput/>
      </Container>

  )
}

export default Chat;

const Container = styled.div`
  display: grid;
  grid-template-rows: 64px auto min-content;
  min-height: 0;
`

const Channel = styled.div``

const ChannelDetails = styled.div`
  display: flex;
  align-items: center;
  color: #606060;
`

const ChannelName = styled.div`
  font-weight: 700;
`

const ChannelInfo = styled.div`
  font-weight: 400;
  color: #606060;
  font-size: 13px;
  margin-top: 8px;
`

const Info = styled(InfoOutlinedIcon)`
  margin-left: 10px;
`

const Header = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(83, 39, 83,.13);
  justify-content: space-between;
`

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`