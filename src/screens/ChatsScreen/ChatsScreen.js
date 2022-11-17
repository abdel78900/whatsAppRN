import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import ChatListItem from "../../components/ChatListItem";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { listChatRooms } from "./queries";

const ChatsScreen = () => {
  const [chatRoom, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(false)

  const fetchChatRooms = async () => {
    setLoading(true)
    const authUser = await Auth.currentAuthenticatedUser();

    const response = await API.graphql(
      graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
    );
    const rooms= response?.data?.getUser?.ChatRooms?.items;
    const sortedRooms= rooms.sort((room1, room2)=> new Date(room2.chatRoom.updatedAt) - new Date(room1.chatRoom.updatedAt));
    setChatRooms(sortedRooms);
    setLoading(false)
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  return (
    <FlatList
      data={chatRoom}
      renderItem={({ item }) => <ChatListItem chat={item.chatRoom} 
      />}
      refreshing={loading}
      onRefresh={fetchChatRooms}
      style={{ backgroundColor: "white" }}
    />
  );
};

export default ChatsScreen;
