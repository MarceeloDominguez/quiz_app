import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  View,
  Animated,
} from "react-native";
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

  //progress bar
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnimated = progress.interpolate({
    inputRange: [0, allQuestion.length],
    outputRange: ["0%", "100%"],
  });

  //validar si la respuesta es correcta o no
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

  //pasar a la siguiente pregunta
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

    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  //reiniciar el juego
  const resetQuiz = () => {
    setShowModal(false);
    setCurrentQuestionIndex(0);
    setCurrentOptionSelected("");
    setCorrectOption("");
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    setScore(0);

    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  //cargar tipo de fuente
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
        <View style={styles.containerProgressBar}>
          <Animated.View
            style={[styles.progressBar, { width: progressAnimated }]}
          />
        </View>
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
  containerProgressBar: {
    width: "100%",
    height: 15,
    borderRadius: 4,
    marginTop: 20,
    marginBottom: 15,
    backgroundColor: "#242931",
  },
  progressBar: {
    height: 15,
    borderRadius: 4,
    backgroundColor: "#FF6000",
  },
});
