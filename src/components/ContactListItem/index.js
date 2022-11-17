import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {  Auth, API, graphqlOperation } from "aws-amplify";
import { createUserChatRoom, createChatRoom } from "../../graphql/mutations";
import { getCommonChatRoomWithUser } from "../../services/chatRoomService";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {
  const navigation = useNavigation();

  
  const onPress = async () => {
    //check if we already have a chatRoom with user
    const existingChatRoom = await getCommonChatRoomWithUser(user.id);
    // console.log('existing chat room:',existingChatRoom.chatRoom.id);
    if (existingChatRoom) {
      navigation.navigate("Chat", { id: existingChatRoom.chatRoom.id });
      return;
    }
    // Create a new chatRoom
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, { input: {} })
    );

    if (!newChatRoomData.data?.createChatRoom) {
      console.log("error creating the chat ");
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;

    //add the clicked user to this chatRoom
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomID: newChatRoom.id, userID: user.id },
      })
    );
    //add the auth user to the chatRoom
    const authUser = await Auth.currentAuthenticatedUser();
    await API.graphql(
      graphqlOperation(createUserChatRoom, {
        input: { chatRoomID: newChatRoom.id, userID: authUser.attributes.sub },
      })
    );
    //navigate to the newly created room
    navigation.navigate("Chat", { id: newChatRoom.id });
  };
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image source={{ uri: user.image }} style={styles.image} />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.name}>
          {user.name}
        </Text>

        <Text numberOfLines={2} style={styles.subTitle}>
          {user.status}
        </Text>
      </View>
    </Pressable>
  );
};

export default ContactListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
    alignItems: "center",
  },
  content: {
    flex: 1,
  },

  name: {
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
