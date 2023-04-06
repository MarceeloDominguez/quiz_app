import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Color, Font, Sizes } from "../constants/theme";

type Props = {
  handleNext: () => void;
  currentOptionSelected: string;
};

export default function NextButton({
  handleNext,
  currentOptionSelected,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.containerButton,
          { opacity: currentOptionSelected !== "" ? 1 : 0.8 },
        ]}
        activeOpacity={0.8}
        onPress={handleNext}
        disabled={currentOptionSelected !== "" ? false : true}
      >
        <Text style={styles.titleButtonNext}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  containerButton: {
    backgroundColor: "#FF6000",
    marginBottom: 40,
    height: 45,
    width: 100,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  titleButtonNext: {
    color: Color.primary,
    fontFamily: Font.bold,
    letterSpacing: 0.4,
    fontSize: Sizes.small,
  },
});
