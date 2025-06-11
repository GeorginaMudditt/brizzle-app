import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { theme } from "@theme/theme";
import { useLocalSearchParams, Link } from "expo-router";
import { supabase } from "@lib/supabase";
import Draggable from "react-native-draggable";
import { ScrollView } from "react-native-gesture-handler";

interface VocabRow {
  word_english: string;
  translation_french: string;
}

export default function Silver() {
  const { topic } = useLocalSearchParams();
  const [vocab, setVocab] = useState<VocabRow[]>([]);
  const [matches, setMatches] = useState<{ [key: string]: string }>({});
  const [positions, setPositions] = useState<{
    [key: string]: { x: number; y: number };
  }>({});

  useEffect(() => {
    const fetchVocab = async () => {
      const { data, error } = await supabase
        .from("Brizzle_A1_vocab")
        .select("word_english, translation_french")
        .eq("topic_page", topic);

      if (error) {
        console.error("Error fetching vocab data:", error);
        return;
      }

      const shuffledEnglish = data
        ? [...data].sort(() => Math.random() - 0.5)
        : [];

      setVocab(
        data
          ? data.map((item, index) => ({
              ...item,
              word_english: shuffledEnglish[index].word_english,
            }))
          : []
      );
    };

    fetchVocab();
  }, [topic]);

  const checkMatches = () => {
    // Ensure all the vocab is matched
    const allMatched = vocab.every(
      (item) => matches[item.translation_french] === item.word_english
    );

    if (allMatched) {
      Alert.alert(
        "Félicitations !",
        "Toutes les correspondances sont correctes 🎉"
      );
    } else {
      Alert.alert("Oups !", "Certaines correspondances sont incorrectes.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.awardsHeader}>
        <Image
          source={require("@assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A1</Text>
      </View>
      <Text style={styles.h2}>{topic}</Text>
      <Text style={styles.h4}>
        Silver (<Text style={styles.italic}>Argent</Text>)
      </Text>
      <Text style={styles.instructions}>
        Glissez les mots anglais vers leur traduction française
      </Text>

      <View style={styles.vocabListsContainer}>
        {vocab.map((item, index) => (
          <View key={index} style={styles.row}>
            {/* French side */}
            <View style={styles.dropZone}>
              <Text style={styles.dropText}>{item.translation_french}</Text>
            </View>

            {/* English draggable box */}
            <View style={styles.draggableWrapper}>
              <Draggable
                shouldReverse={false}
                renderColor="transparent"
                renderText=""
                onDrag={() => {}} // <-- Add this line
                onRelease={() => {}} // <-- Add this line
                onPressOut={() => {}} // <-- Add this line
                onDragRelease={(e, gestureState) => {
                  const newPosition = {
                    x: gestureState.moveX,
                    y: gestureState.moveY,
                  };
                  setPositions((prevPositions) => ({
                    ...prevPositions,
                    [item.word_english]: newPosition,
                  }));
                  setMatches((prev) => ({
                    ...prev,
                    [item.translation_french]: item.word_english,
                  }));
                }}
              >
                <View style={styles.draggableBox}>
                  <Text style={styles.draggableText}>{item.word_english}</Text>
                </View>
              </Draggable>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={checkMatches}>
        <Text style={styles.buttonText}>Continuez</Text>
      </TouchableOpacity>
      <Link href="./a1-awards-table" asChild>
        <Text style={styles.backToAwards}>
          Retour au tableau des récompenses A1
        </Text>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  balloonCircleLogo: {
    width: 100,
    height: 100,
  },
  awardsHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  introTextHeader: {
    color: theme.colorA1,
    fontSize: 30,
  },
  h2: {
    fontSize: 30,
    color: theme.colorBlue,
    marginTop: 20,
    textAlign: "center",
  },
  h4: {
    fontSize: 20,
    color: theme.colorA1,
    marginTop: 10,
    marginBottom: 10,
  },
  italic: {
    fontStyle: "italic",
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
    color: theme.colorBlue,
    textAlign: "center",
  },
  vocabListsContainer: {
    width: "100%",
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    justifyContent: "space-between",
  },
  dropZone: {
    width: "45%",
    minHeight: 50,
    borderColor: theme.colorA1,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    zIndex: 1,
  },
  dropText: {
    fontSize: 20,
    color: theme.colorA1,
  },
  draggableWrapper: {
    width: "45%",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
    zIndex: 2,
  },
  draggableBox: {
    width: 150,
    minHeight: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: theme.colorBlue,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowOpacity: 0,
    elevation: 0,
    zIndex: 100,
  },
  draggableText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: theme.colorA1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 40,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  backToAwards: {
    padding: 30,
    fontSize: 15,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
