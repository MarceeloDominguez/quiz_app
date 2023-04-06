import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Color, Font, Sizes } from "../constants/theme";
import { Quiz } from "../interface/quizInterface";

type Props = {
  allQuestion: Quiz[];
  currentQuestionIndex: number;
};

export default function Question({ currentQuestionIndex, allQuestion }: Props) {
  return (
    <View style={styles.container}>
      <Text style={[styles.question, { fontSize: Sizes.small }]}>
        {currentQuestionIndex + 1} / {allQuestion.length}
      </Text>
      <Text style={styles.question}>
        {allQuestion[currentQuestionIndex].question}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  question: {
    color: Color.secondary,
    fontFamily: Font.bold,
    fontSize: Sizes.large,
    lineHeight: 25,
    letterSpacing: 0.4,
  },
});
