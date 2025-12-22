import { MaterialIcons } from "@expo/vector-icons"; // Standard with Expo
import { createClient } from "@supabase/supabase-js";
import * as Application from "expo-application";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import {
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY;
const github_json_url = `https://raw.githubusercontent.com/AVVKavvk/vipin-notes-app/refs/heads/main/version.json?t=${new Date().getTime()}`;

const supabase = createClient(SUPABASE_URL!, SUPABASE_KEY!);

export default function StartAppConfig({ onReady }: { onReady: () => void }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateData, setUpdateData] = useState<{
    version: string;
    url: string;
  } | null>(null);

  useEffect(() => {
    async function initializeApp() {
      try {
        const androidId = Application.getAndroidId();
        const appJsonVersion = Constants.expoConfig?.version;
        const currentVersion = Application.nativeApplicationVersion;
        console.log(`App.json version: ${appJsonVersion}`);
        console.log(`Native version: ${currentVersion}`);

        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();

        // 1. Log to Supabase
        await supabase.from("app_users").upsert(
          {
            android_id: androidId,
            ip_address: ipData.ip,
            app_version: currentVersion,
            last_seen: new Date(),
          },
          { onConflict: "android_id" }
        );

        // 2. Check GitHub Version
        const ghRes = await fetch(github_json_url);
        const ghData = await ghRes.json();
        console.log("Github Data: ", ghData);

        if (ghData.latest_version !== appJsonVersion) {
          setUpdateData({
            version: ghData.latest_version,
            url: ghData.apk_url,
          });
          setUpdateVisible(true); // Show popup if versions don't match
        }
      } catch (e) {
        console.error("Setup Error:", e);
      } finally {
        setAppIsReady(true);
        if (onReady) onReady();
      }
    }
    initializeApp();
  }, []);

  if (!appIsReady) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={updateVisible}
      onRequestClose={() => setUpdateVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Close Icon (X) */}
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => setUpdateVisible(false)}
          >
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Update Available! 🚀</Text>
          <Text style={styles.modalText}>
            A newer version ({updateData?.version}) of Vipin Notes is available.
            Download the latest APK to get the newest features.
          </Text>

          <TouchableOpacity
            style={styles.downloadButton}
            onPress={() => {
              if (updateData?.url) Linking.openURL(updateData.url);
            }}
          >
            <Text style={styles.buttonText}>Download Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Dim the background
  },
  modalView: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    marginTop: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  downloadButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
