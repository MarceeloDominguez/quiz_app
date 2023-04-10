import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Color, Font, Sizes } from "../constants/theme";

const listCategory = ["Geografía", "Deporte", "Historia"];

type Props = {
  handleCategory: (category: string) => void;
  selectCategory: string;
};

export default function SelectCategory({
  handleCategory,
  selectCategory,
}: Props) {
  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.containerItems}>
          {listCategory.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.wrapItem,
                  {
                    backgroundColor:
                      selectCategory === item ? "#0d172e" : null!,
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => handleCategory(item)}
              >
                <Text style={styles.item}>{item}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerItems: {
    flexDirection: "row",
    gap: 15,
    paddingVertical: 10,
  },
  wrapItem: {
    height: 35,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#242931",
  },
  item: {
    fontSize: Sizes.small,
    fontFamily: Font.regular,
    letterSpacing: 0.4,
    color: Color.secondary,
  },
});
