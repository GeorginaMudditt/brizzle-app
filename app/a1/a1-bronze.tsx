import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { theme } from "../../theme";
import { useLocalSearchParams, Link } from "expo-router";
import { supabase } from "../../lib/supabase";
import { Audio } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

interface VocabRow {
  word_english: string;
  pron_english: string;
  translation_french: string;
}

export default function Bronze() {
  const { topic } = useLocalSearchParams();
  const [vocab, setVocab] = useState<VocabRow[]>([]);

  useEffect(() => {
    const fetchVocab = async () => {
      try {
        const { data, error } = await supabase
          .from("Brizzle_A1_vocab")
          .select("word_english, pron_english, translation_french")
          .eq("topic_page", topic)
          .order("id", { ascending: true });

        if (error) {
          console.error("Error fetching vocab data:", error);
          return;
        }

        setVocab(data || []);
      } catch (err) {
        console.error("Unexpected error:", err);
      }
    };

    fetchVocab();
  }, [topic]);

  const playAudio = async (audioUrl: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: true }
      );
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          await sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const renderRow = ({ item }: { item: VocabRow }) => {
    return (
      <View style={styles.row}>
        <View style={styles.cellLeft}>
          <Text style={styles.cellText}>{item.word_english}</Text>
        </View>
        <View style={styles.cellMiddle}>
          <TouchableOpacity onPress={() => playAudio(item.pron_english)}>
            <Ionicons name="volume-high" size={24} color={theme.colorBlue} />
          </TouchableOpacity>
        </View>
        <View style={styles.cellRight}>
          <Text style={[styles.cellText, styles.italic]}>
            {item.translation_french}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.awardsHeader}>
        <Image
          source={require("../../assets/brizzle-icon.png")}
          style={styles.balloonCircleLogo}
        />
        <Text style={styles.introTextHeader}>Brizzle A1</Text>
      </View>
      <Text style={styles.h2}>{topic}</Text>
      <Text style={styles.h4}>
        Bronze (<Text style={styles.italic}>Bronze</Text>)
      </Text>
      <FlatList
        data={vocab}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={true}
      />
      <LinearGradient
        colors={["transparent", theme.colorBlue]}
        style={styles.gradient}
      />
      <Link
        href={{
          pathname: "./a1-silver",
          params: { topic },
        }}
        asChild
      >
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continuez</Text>
        </TouchableOpacity>
      </Link>
      <Link href="./a1-awards-table" asChild>
        <Text style={styles.backToAwards}>
          Retour au tableau des récompenses A1
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  grid: {
    width: "80%",
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 50,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: theme.colorA1,
    height: 50,
    alignItems: "center",
  },
  cellLeft: {
    width: "40%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  cellMiddle: {
    width: "20%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  cellRight: {
    width: "40%",
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 15,
  },
  cellText: {
    fontSize: 16,
    color: theme.colorBlue,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 50,
    marginBottom: 110,
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
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
