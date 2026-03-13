import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
} from "react-native";
import React from "react";
import { colorType } from "../../../tools/colorSet";
import { fontSizeType } from "../../../tools/textSet";

type PublisherDetailProps = {
  postUser: string;
  timePosted: string;
  readTime: string;
  profilePic: ImageSourcePropType;
};

const PublisherDetail = ({
  postUser,
  timePosted,
  readTime,
  profilePic,
}: PublisherDetailProps) => {
  return (
    <View style={style.container}>
      <View style={style.leftSection}>
        <Image source={profilePic} style={style.profilePic} />

        <View>
          <Text style={style.userName}>{postUser}</Text>
          <Text style={style.userRole}>Design Lead at TechFlow</Text>
        </View>
      </View>

      <View>
        <Text style={style.publishedText}>Published</Text>
        <Text style={style.timeText}>{timePosted}</Text>
      </View>
    </View>
  );
};

export default PublisherDetail;

const style = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: "rgba(148,6,249,0.05)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userName: {
    fontSize: fontSizeType.base,
    fontWeight: "700",
    color: colorType.hTextColor,
  },
  userRole: {
    fontSize: fontSizeType.sm,
    color: colorType.contentText,
    marginTop: 3,
  },
  publishedText: {
    fontSize: fontSizeType.base,
    color: colorType.contentText,
  },
  timeText: {
    fontSize: fontSizeType.base,
    color: colorType.hTextColor,
    marginTop: 3,
  },
});
