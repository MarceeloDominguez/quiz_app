import React, { useCallback, useState } from "react";
import { StyleSheet, StatusBar, SafeAreaView, ScrollView } from "react-native";
import { Color } from "../constants/theme";
import Question from "../components/Question";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { data } from "../data/data";
import AnswerOptions from "../components/AnswerOptions";
import NextButton from "../components/NextButton";
import ModalComponent from "../components/ModalComponent";

export default function HomeScreen() {
  const allQuestion = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [score, setScore] = useState(0);

  const validateAnswer = (selectedAnswer: string) => {
    let correct_option = allQuestion[currentQuestionIndex]["correct_option"];
    setCorrectOption(correct_option);
    setCurrentOptionSelected(selectedAnswer);
    setIsOptionsDisabled(true);

    if (selectedAnswer === correct_option) {
      setScore(score + 1);
    }

    setShowNextButton(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex === allQuestion.length - 1) {
      setShowModal(true);
      setShowNextButton(false);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected("");
      setCorrectOption("");
      setIsOptionsDisabled(false);
    }
  };

  const resetQuiz = () => {
    setShowModal(false);
    setCurrentQuestionIndex(0);
    setCurrentOptionSelected("");
    setCorrectOption("");
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    setScore(0);
  };

  const [fontsLoaded] = useFonts({
    Bold: require("../../assets/fonts/Rubik-Bold.ttf"),
    Regular: require("../../assets/fonts/Rubik-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <StatusBar backgroundColor={Color.primary} barStyle="light-content" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Question
          currentQuestionIndex={currentQuestionIndex}
          allQuestion={allQuestion}
        />
        <AnswerOptions
          currentQuestionIndex={currentQuestionIndex}
          allQuestion={allQuestion}
          validateAnswer={validateAnswer}
          currentOptionSelected={currentOptionSelected}
          correctOption={correctOption}
          isOptionsDisabled={isOptionsDisabled}
        />
        {showNextButton && (
          <NextButton
            handleNext={handleNext}
            currentOptionSelected={currentOptionSelected}
          />
        )}
      </ScrollView>
      <ModalComponent
        showModal={showModal}
        resetQuiz={resetQuiz}
        score={score}
        allQuestion={allQuestion}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primary,
    paddingHorizontal: 20,
  },
});
