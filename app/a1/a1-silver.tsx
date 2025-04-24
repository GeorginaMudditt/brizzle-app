import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { theme } from "../../theme";
import { useLocalSearchParams, Link } from "expo-router";
import { supabase } from "../../lib/supabase";
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

      const frenchSorted = data
        ? [...data].sort((a, b) =>
            a.translation_french.localeCompare(b.translation_french)
          )
        : [];

      setVocab(
        frenchSorted.map((item, index) => ({
          ...item,
          word_english: shuffledEnglish[index].word_english,
        }))
      );
    };

    fetchVocab();
  }, [topic]);

  const checkMatches = () => {
    const correct = vocab.every(
      (item) => matches[item.translation_french] === item.word_english
    );

    if (correct) {
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
          source={require("../../assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A1</Text>
      </View>
      <Text style={styles.h2}>{topic}</Text>
      <Text style={styles.h4}>
        Silver (<Text style={styles.italic}>Argent</Text>)
      </Text>
      <Text style={styles.instructions}>
        Glissez les mots anglais vers leur traduction française :
      </Text>

      {vocab.map((item, index) => (
        <View key={index} style={styles.vocabRow}>
          <View style={styles.dropZone}>
            <Text style={styles.dropText}>{item.translation_french}</Text>
          </View>

          <Draggable
            x={Dimensions.get("window").width * 0.6}
            y={10 + index * 100}
            renderSize={80}
            shouldReverse={true}
            renderColor={theme.colorBlue}
            onDragRelease={(e, gestureState) => {
              // Add better logic for detecting the drop later
              setMatches((prev) => ({
                ...prev,
                [item.translation_french]: item.word_english,
              }));
            }}
          >
            <Text style={styles.draggableText}>{item.word_english}</Text>
          </Draggable>
        </View>
      ))}

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
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding: 25,
  // },
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
  vocabRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  dropZone: {
    width: "45%",
    minHeight: 50,
    borderColor: theme.colorA1,
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  dropText: {
    fontSize: 20,
    color: theme.colorA1,
    marginBottom: 10,
  },
  draggableText: {
    color: "white",
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
