import { useState } from "react";
import { TextInput, TouchableOpacity, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

const Dashboard = () => {
  const [userName, setUserName] = useState("");

  const onSubmit = async () => {
    const { error } = await supabase
      .from("sub_account")
      .insert({ user_name: userName });

    if (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <View style={{ padding: 100 }}>
      <TextInput
        onChangeText={(text) => setUserName(text)}
        value={userName}
        placeholder="Nom de votre subAccount"
        autoCapitalize={"none"}
      />

      <TouchableOpacity onPress={onSubmit}>
        <Text>Create</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;
