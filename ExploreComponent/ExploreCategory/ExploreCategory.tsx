import React from "react";
import { View, ScrollView } from "react-native";
import ExploreButtonBox from "../../templete/ButtonBox";

const categories = ["#All", "#Design", "#Technology", "#Lifestyle", "#AI", "#Web3"];

type Props = {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
};

const ExploreCategory = ({ activeCategory, setActiveCategory }: Props) => {

  const handleCategoryPress = (item: string) => {

    // If user clicks #All → remove filter
    if (item === "#All") {
      setActiveCategory(null);
      return;
    }

    // Toggle category
    if (activeCategory === item) {
      setActiveCategory(null);
    } else {
      setActiveCategory(item);
    }
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: "row", gap: 10 }}>
        {categories.map((item) => (
          <ExploreButtonBox
            key={item}
            text={item}
            active={item === "#All" ? activeCategory === null : activeCategory === item}
            onButtonPressed={() => handleCategoryPress(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default ExploreCategory;