import React, { useEffect, useState } from "react";
import "./SideBar.css";
import styled from 'styled-components'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from "@material-ui/icons/Create";
import db from '../../firebase'
import { sidebarItemsData } from '../../data/SideBarData'
import AddIcon from '@material-ui/icons/Add';
import { addDoc, collection, getDocs } from "firebase/firestore";
import {useNavigate} from 'react-router-dom'



function SideBar({rooms, user}) {


  const navigate = useNavigate();

  const goToChannel = (id) => {
    if(id){
        navigate(`/room/${id}`)
    }
}  ;

const postsCollectionRef = collection(db, "rooms");

const addChannel = async () => {
  const promptName = prompt("Enter channel name"); 
  await addDoc(postsCollectionRef, {
    name: promptName
  })
  navigate('/')
}
  return (
    <Container>
            <WorkspaceContainer>
                <Name>
                <img src={user.photo} alt="photo" className='avatar'/>
                    {user.name}
                </Name>
                <NewMessage>
                    <AddCircleOutlineIcon />
                </NewMessage>
            </WorkspaceContainer>
            <MainChannels>
                {
                    sidebarItemsData.map(item => (
                        <MainChannelItem>
                            {item.icon}
                            {item.text}
                        </MainChannelItem>
                    ))
                }
            </MainChannels>
            <ChannelsContainer>
                <NewChannelContainer>
                    <div>
                        Channels
                    </div>
                    <AddIcon onClick={addChannel} />
                </NewChannelContainer>
                <ChannelsList>
                    {
                        rooms.map(item => (
                            <Channel onClick={()=>goToChannel(item.id)}>
                                # {item.name}
                            </Channel>
                        ))
                    }
                </ChannelsList>
            </ChannelsContainer>
            
        </Container>

  );
}

export default SideBar;



const Container = styled.div`
    background: #3F0E40;
`

const WorkspaceContainer = styled.div`
    color: white;
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    justify-content: space-between;
    border-bottom: 1px solid  #532753;
`

const Name = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const NewMessage = styled.div`
    width: 36px;
    height: 36px;
    background: white;
    color: #3F0E40;
    fill: #3F0E40;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 20px;
    cursor: pointer;
`

const MainChannels = styled.div`
    padding-top: 20px;
`

const MainChannelItem = styled.div`
    color: rgb(188,171,188);
    display: grid;
    grid-template-columns: 15% auto;
    height: 28px;
    align-items: center;
    padding-left: 19px;
    cursor: pointer;
    :hover {
        background: #350D36;
    }
`

const ChannelsContainer = styled.div`
    color: rgb(188,171,188);
    margin-top: 10px;
`

const NewChannelContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 28px;
    padding-left: 19px;
    padding-right: 12px;
`

const ChannelsList = styled.div``

const Channel = styled.div`
    height: 28px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    cursor: pointer;
    :hover {
        background: #350D36;
    }
`