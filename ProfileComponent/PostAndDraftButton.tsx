import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colorType } from "../tools/colorSet";

type Props = {
  activeTab: "posts" | "drafts";
  setActiveTab: (tab: "posts" | "drafts") => void;
};

const tabs = [
  { label: "My Posts", value: "posts" as const },
  { label: "Drafts", value: "drafts" as const },
];

const PostAndDraftButton = ({ activeTab, setActiveTab }: Props) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
          <Pressable
            key={tab.value}
            onPress={() => setActiveTab(tab.value)}
            style={styles.tabButton}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab.label}
            </Text>

            <View
              style={[
                styles.activeLine,
                { opacity: isActive ? 1 : 0 },
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default PostAndDraftButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(100,100,100,0.5)",
    marginBottom: 15,
  },

  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    margin: 6,
    width: "44%",
  },

  tabText: {
    fontSize: 13,
    color: "#7A869A",
    fontWeight: "500",
  },

  activeTabText: {
    color: "#A020F0",
    fontWeight: "700",
  },

  activeLine: {
    marginTop: 6,
    width: "100%",
    height: 2,
    backgroundColor: "#A020F0",
    borderRadius: 10,
  },
});