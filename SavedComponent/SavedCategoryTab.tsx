import React from "react";
import { Text, Pressable, StyleSheet, ScrollView, View } from "react-native";

const tabs = ["All", "Design", "Tech", "Lifestyle", "Productivity"];

type Props = {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
};

const SavedCategoryTab = ({ activeCategory, setActiveCategory }: Props) => {
  const handleTabPress = (tab: string) => {
    if (tab === "All") {
      setActiveCategory(null);
      return;
    }

    if (activeCategory === tab) {
      setActiveCategory(null);
    } else {
      setActiveCategory(tab);
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.container}
      >
        {tabs.map((tab) => {
          const isActive =
            tab === "All" ? activeCategory === null : activeCategory === tab;

          return (
            <Pressable
              key={tab}
              onPress={() => handleTabPress(tab)}
              style={[
                styles.tabButton,
                {
                  borderBottomColor: isActive ? "#A020F0" : "transparent",
                },
              ]}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SavedCategoryTab;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "rgba(100,100,100,0.5)",
  },

  scrollView: {
    width: "100%",
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  tabButton: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 10,
    marginRight: 18,
    borderBottomWidth: 2,
    minHeight: 42,
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
});