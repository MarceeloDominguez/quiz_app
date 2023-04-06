import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Color, Font, Sizes } from "../constants/theme";
import { Quiz } from "../interface/quizInterface";

type Props = {
  showModal: boolean;
  resetQuiz: () => void;
  score: number;
  allQuestion: Quiz[];
};

export default function ModalComponent({
  showModal,
  resetQuiz,
  score,
  allQuestion,
}: Props) {
  return (
    <Modal transparent={true} visible={showModal}>
      <View style={styles.containerModal}>
        <View style={styles.modal}>
          <View style={styles.wrapTitleButtonReset}>
            <Text style={styles.titleModal}>
              {score > allQuestion.length / 2 ? "Felicitaciones!" : "Oops!"}
            </Text>
            <Text style={[styles.titleModal, { fontSize: Sizes.small }]}>
              {score} / {allQuestion.length}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.containerButton}
              onPress={resetQuiz}
            >
              <Text style={styles.titleButton}>Reiniciar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    flex: 1,
  },
  containerModal: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
  },
  wrapTitleButtonReset: {
    backgroundColor: Color.secondary,
    borderRadius: 10,
    paddingVertical: 25,
  },
  titleModal: {
    color: Color.primary,
    fontFamily: Font.bold,
    fontSize: Sizes.large,
    letterSpacing: 0.4,
    textAlign: "center",
    marginBottom: 10,
  },
  containerButton: {
    backgroundColor: "#FF6000",
    marginTop: 20,
    width: 120,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    alignSelf: "center",
  },
  titleButton: {
    color: Color.primary,
    fontFamily: Font.bold,
    letterSpacing: 0.4,
    fontSize: Sizes.small,
  },
});
