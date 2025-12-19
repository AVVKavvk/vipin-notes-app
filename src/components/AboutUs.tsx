import {
  Award,
  Code2,
  Github,
  Globe,
  GraduationCap,
  Home,
  Instagram,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../hooks/useTheme";

const { width } = Dimensions.get("window");

const AboutUsComponents = () => {
  const theme = useTheme();
  const isDark = theme === "dark";

  // Theme Colors matching your Labs style
  const colors = {
    primary: "#06b6d4", // Cyan
    secondary: "#8b5cf6", // Purple
    accent: "#ef4444", // Red
    card: isDark ? "#1f2937" : "#ffffff",
    text: isDark ? "#f3f4f6" : "#111827",
    subText: isDark ? "#9ca3af" : "#4b5563",
    bg: isDark ? "#111827" : "#f9fafb",
  };

  const openLink = (url: string) => Linking.openURL(url);

  const SocialLink = ({ Icon, label, color, url }: any) => (
    <TouchableOpacity
      onPress={() => openLink(url)}
      className="flex-row items-center mb-4 space-x-3"
    >
      <View
        className={`p-2 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
      >
        <Icon size={20} color={color || colors.primary} />
      </View>
      <Text
        className={`text-base font-medium ${isDark ? "text-gray-200" : "text-gray-800"}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const EducationCard = ({ title, grade, institution, icon: Icon }: any) => (
    <View
      style={{ backgroundColor: colors.card }}
      className="p-4 rounded-2xl mb-4 border border-gray-200 dark:border-gray-700 shadow-sm items-center flex-1 mx-1"
    >
      <Icon size={32} color={colors.primary} />
      <Text
        className="font-bold mt-2 text-center"
        style={{ color: colors.text }}
      >
        {title}
      </Text>
      <Text className="text-xs text-center" style={{ color: colors.subText }}>
        {institution}
      </Text>
      <Text
        className="text-sm font-bold mt-1"
        style={{ color: colors.primary }}
      >
        {grade}
      </Text>
    </View>
  );

  return (
    <ScrollView
      style={{ backgroundColor: colors.bg }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* 1. Profile Header */}
      <View className="items-center pt-10 pb-6 px-6">
        <View className="relative">
          {/* Outer Glow/Border */}
          <View className="w-32 h-32 rounded-full border-4 border-cyan-500 p-1">
            <Image
              source={{ uri: "https://github.com/AVVKavvk.png" }} // Fallback to GitHub avatar
              className="w-full h-full rounded-full"
            />
          </View>
          <View className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900" />
        </View>

        <Text
          className="text-3xl font-bold mt-4"
          style={{ color: colors.text }}
        >
          Vipin Kumawat
        </Text>
        <Text className="text-lg font-medium text-cyan-600">
          Full-Stack Developer
        </Text>

        <TouchableOpacity
          onPress={() => openLink("https://vipinkumawatportfolio.netlify.app/")}
          className="mt-4 px-6 py-2 rounded-full bg-red-500 flex-row items-center space-x-2"
        >
          <Globe size={16} color="white" />
          <Text className="text-white font-bold">Portfolio</Text>
        </TouchableOpacity>
      </View>

      {/* 2. Stats/Education Section */}
      <View className="px-4 flex-row justify-between">
        <EducationCard
          title="BTech"
          institution="IIIT Pune"
          grade="8.87 CGPA"
          icon={GraduationCap}
        />
        <EducationCard
          title="Class 12"
          institution="Gurukripa"
          grade="80%"
          icon={Award}
        />
        <EducationCard
          title="Class 10"
          institution="Prince Hub"
          grade="92%"
          icon={Code2}
        />
      </View>

      {/* 3. Contact & Socials */}
      <View className="px-6 mt-6">
        <View
          className={`p-6 rounded-3xl ${isDark ? "bg-gray-800" : "bg-white shadow-md"}`}
        >
          <Text
            className="text-xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Contact Details
          </Text>

          <SocialLink Icon={Home} label="Sikar, Rajasthan" color="#f59e0b" />
          <SocialLink Icon={Phone} label="+91 8107099646" color="#10b981" />
          <SocialLink
            Icon={Mail}
            label="kumawatvipin066@gmail.com"
            color="#ef4444"
          />

          <View className="h-[1px] bg-gray-200 dark:bg-gray-700 my-4" />

          <Text
            className="text-xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Connect with me
          </Text>
          <View className="flex-row flex-wrap justify-between">
            <View className="w-[48%]">
              <SocialLink
                Icon={Linkedin}
                label="LinkedIn"
                color="#0077b5"
                url="https://linkedin.com/in/vipin-kumawat-751b9124b/"
              />
              <SocialLink
                Icon={Github}
                label="Github"
                color={isDark ? "white" : "black"}
                url="https://github.com/AVVKavvk"
              />
            </View>
            <View className="w-[48%]">
              <SocialLink
                Icon={Instagram}
                label="Instagram"
                color="#C13584"
                url="https://instagram.com/k.vip_in/"
              />
              <SocialLink
                Icon={Code2}
                label="Leetcode"
                color="#ffa116"
                url="https://leetcode.com/Avvkvipin/"
              />
            </View>
          </View>
        </View>
      </View>

      {/* 4. Skills Section */}
      <View className="px-6 mt-8">
        <Text
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: colors.text }}
        >
          Tech Stack
        </Text>
        <View className="flex-row flex-wrap justify-center gap-3">
          {[
            "Agentic AI",
            "GenAI",
            "Fullstack",
            "React Native",
            "MERN",
            "C++ (Drogon)",
            "Golang",
            "FastAPI",
            "Fastify",
            "Django",
            "Python",
            "Kubernetes",
            "Grafana",
            "Prometheus",
            "React",
            "Node.js",
            "MongoDB",
            "Express",
            "Tailwind",
            "Redux",
            "Zustand",
            "JavaScript",
          ].map((skill) => (
            <View
              key={skill}
              className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20"
            >
              <Text className="text-cyan-600 font-bold">{skill}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutUsComponents;
