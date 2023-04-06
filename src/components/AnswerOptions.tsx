import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Color, Font, Sizes } from "../constants/theme";
import { Quiz } from "../interface/quizInterface";
import Icon from "@expo/vector-icons/Ionicons";

type Props = {
  allQuestion: Quiz[];
  currentQuestionIndex: number;
  validateAnswer: (selectedAnswer: string) => void;
  currentOptionSelected: string;
  correctOption: string;
  isOptionsDisabled: boolean;
};

export default function AnswerOptions({
  allQuestion,
  currentQuestionIndex,
  validateAnswer,
  currentOptionSelected,
  correctOption,
  isOptionsDisabled,
}: Props) {
  return (
    <View style={styles.container}>
      <View>
        {allQuestion[currentQuestionIndex].options.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              disabled={isOptionsDisabled}
              style={[
                styles.wrapOptions,
                {
                  borderColor:
                    item === correctOption
                      ? "#379237"
                      : item === currentOptionSelected
                      ? "#F90716"
                      : "#242931",

                  backgroundColor:
                    item === correctOption
                      ? Color.success
                      : item === currentOptionSelected
                      ? Color.error
                      : "#0d172e",
                },
              ]}
              activeOpacity={1}
              onPress={() => validateAnswer(item)}
            >
              <View style={styles.contentIcon}>
                <Text style={styles.options}>{item}</Text>
                <View
                  style={[
                    styles.wrapIcon,
                    {
                      backgroundColor:
                        item === correctOption
                          ? "#379237"
                          : item === currentOptionSelected
                          ? "#F90716"
                          : null!,
                    },
                  ]}
                >
                  <Icon
                    name={
                      item === correctOption
                        ? "checkmark-outline"
                        : item === currentOptionSelected
                        ? "add-outline"
                        : null!
                    }
                    size={20}
                    color={Color.secondary}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  wrapOptions: {
    marginBottom: 14,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 15,
    borderWidth: 2,
  },
  contentIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  wrapIcon: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30 / 2,
  },
  options: {
    color: Color.secondary,
    fontFamily: Font.regular,
    letterSpacing: 0.4,
    fontSize: Sizes.small,
  },
});
