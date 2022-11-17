import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Auth, API, graphqlOperation } from "aws-amplify";
import {onUpdateChatRoom} from '../../graphql/subscriptions'



const ChatListItem = ({ chat }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [chatRooms, setChatRooms] = useState(chat)

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      //loop through chat.users.items and find a user that is not us( Authenticated user)
      const userItem = chatRooms.users.items.find(
        (item) => item.user.id !== authUser.attributes.sub
      );
      setUser(userItem?.user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const subscription = API.graphql(graphqlOperation(onUpdateChatRoom , {filter: {id:{eq:chat.id}}})).subscribe(
      {next: ({value}) => {
        setChatRooms((cr) =>({...(cr || {}), ...value.data.onUpdateChatRoom,
      }))
      },

      error: (err)=> console.warn(err),
    }
    )
  }, [chat.id]);


  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Chat", {
          id: chatRooms.id,
          name: user?.name,
        })
      }
      style={styles.container}
    >
      <Image source={{ uri: user?.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.row}>
          <Text numberOfLines={1} style={styles.name}>
            {user?.name}
          </Text>
          {chatRooms.LastMessage && (

          <Text style={styles.subTitle}>
            {dayjs(chatRooms.LastMessage?.createdAt).fromNow(true)}
          </Text>
          )}
        </View>
        <Text numberOfLines={2} style={styles.subTitle}>
          {chatRooms.LastMessage?.text}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  content: {
    flex: 1,
    borderBottomColor: "lightgray",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  name: {
    flex: 1,
    fontWeight: "bold",
  },
  subTitle: {
    color: "gray",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
});
