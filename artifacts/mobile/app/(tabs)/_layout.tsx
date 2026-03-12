import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Tabs } from "expo-router";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SymbolView } from "expo-symbols";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/colors";

function NativeTabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Icon sf={{ default: "house", selected: "house.fill" }} />
        <Label>الرئيسية</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="menu">
        <Icon sf={{ default: "fork.knife", selected: "fork.knife" }} />
        <Label>القائمة</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="contact">
        <Icon sf={{ default: "phone", selected: "phone.fill" }} />
        <Label>تواصل</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.red,
        tabBarInactiveTintColor: Colors.gray,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.grayBorder,
          elevation: 8,
          paddingBottom: isWeb ? 0 : insets.bottom,
          ...(isWeb ? { height: 84 } : {}),
        },
        tabBarLabelStyle: {
          fontFamily: "Cairo_600SemiBold",
          fontSize: 11,
        },
        tabBarBackground: () => (
          <View style={[StyleSheet.absoluteFill, { backgroundColor: Colors.white }]} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "الرئيسية",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="house.fill" tintColor={color} size={24} />
            ) : (
              <Feather name="home" size={22} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "القائمة",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="fork.knife" tintColor={color} size={24} />
            ) : (
              <MaterialCommunityIcons name="food" size={22} color={color} />
            ),
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "تواصل",
          tabBarIcon: ({ color }) =>
            isIOS ? (
              <SymbolView name="phone.fill" tintColor={color} size={24} />
            ) : (
              <Feather name="phone" size={22} color={color} />
            ),
        }}
      />
    </Tabs>
  );
}

export default function TabLayout() {
  if (isLiquidGlassAvailable()) {
    return <NativeTabLayout />;
  }
  return <ClassicTabLayout />;
}
