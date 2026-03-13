import React from "react";
import { View, ScrollView } from "react-native";
import ButtonBox from "../../templete/ButtonBox";

const categories = ["For You", "Design", "Technology", "Product"];

type Props = {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
};

const CategoryList = ({ activeCategory, setActiveCategory }: Props) => {
  const handleCategoryPress = (item: string) => {
    if (item === "For You") {
      setActiveCategory(null);
      return;
    }

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
          <ButtonBox
            key={item}
            text={item}
            active={item === "For You" ? activeCategory === null : activeCategory === item}
            onButtonPressed={() => handleCategoryPress(item)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default CategoryList;