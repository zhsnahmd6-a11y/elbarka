import React, { useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
  Animated,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";

const isNative = Platform.OS !== "web";
const MAPS_LINK = "https://maps.app.goo.gl/DL9HHqTGCJCQ8eoM8";

function ActionCard({
  icon,
  title,
  subtitle,
  accentColor,
  bgColor,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  accentColor: string;
  bgColor: string;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => Animated.spring(scale, { toValue: 0.97, useNativeDriver: isNative }).start()}
      onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: isNative }).start()}
    >
      <Animated.View style={[styles.actionCard, { transform: [{ scale }] }]}>
        <View style={styles.actionCardInner}>
          <View style={[styles.actionIcon, { backgroundColor: bgColor }]}>
            {icon}
          </View>
          <View style={styles.actionTexts}>
            <Text style={styles.actionTitle}>{title}</Text>
            <Text style={styles.actionSub}>{subtitle}</Text>
          </View>
          <View style={[styles.actionArrow, { backgroundColor: accentColor + "18" }]}>
            <Feather name="arrow-left" size={16} color={accentColor} />
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

export default function ContactScreen() {
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

  const handleCall = (num: string) => Linking.openURL(`tel:${num}`);
  const handleWhatsApp = (num: string) => Linking.openURL(`https://wa.me/2${num}`);
  const handleMaps = () => Linking.openURL(MAPS_LINK);

  return (
    <View style={[styles.container, { paddingTop: topPadding, paddingBottom: bottomPadding }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero with logo flyer image */}
        <View style={styles.hero}>
          <Image
            source={require("@/assets/images/logo-flyer.jpg")}
            style={styles.heroImg}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(204,17,0,0.9)", "rgba(155,13,0,0.7)", "transparent"]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>تواصل معنا</Text>
            <Text style={styles.heroSub}>مطعم البركة · فرع النزهة</Text>
          </View>
        </View>

        {/* 24h badge */}
        <View style={styles.badge24Wrap}>
          <View style={styles.badge24}>
            <LinearGradient colors={[Colors.red, Colors.redDark]} style={styles.badge24Grad}>
              <MaterialCommunityIcons name="clock-check-outline" size={18} color={Colors.white} />
              <Text style={styles.badge24Text}>مفتوح ٢٤ ساعة / ٧ أيام</Text>
            </LinearGradient>
          </View>
        </View>

        <View style={styles.content}>
          {/* WhatsApp */}
          <Text style={styles.sectionLabel}>واتساب وطلبات</Text>
          <ActionCard
            icon={<MaterialCommunityIcons name="whatsapp" size={24} color={Colors.white} />}
            title="واتساب"
            subtitle="01001803423"
            accentColor="#25D366"
            bgColor="#25D366"
            onPress={() => handleWhatsApp("01001803423")}
          />

          {/* Delivery */}
          <Text style={styles.sectionLabel}>خدمة التوصيل</Text>
          <ActionCard
            icon={<MaterialCommunityIcons name="moped" size={24} color={Colors.white} />}
            title="توصيل الطلبات"
            subtitle="01113179539"
            accentColor={Colors.red}
            bgColor={Colors.red}
            onPress={() => handleCall("01113179539")}
          />
          <ActionCard
            icon={<Feather name="phone-call" size={22} color={Colors.white} />}
            title="اتصال مباشر"
            subtitle="01113179539"
            accentColor="#1565C0"
            bgColor="#1565C0"
            onPress={() => handleCall("01113179539")}
          />

          {/* Management */}
          <Text style={styles.sectionLabel}>إدارة المطعم</Text>
          <ActionCard
            icon={<Feather name="settings" size={22} color={Colors.white} />}
            title="الإدارة"
            subtitle="01111145290"
            accentColor={Colors.darkMed}
            bgColor={Colors.darkMed}
            onPress={() => handleCall("01111145290")}
          />

          {/* Bag image */}
          <View style={styles.bagImgWrap}>
            <Image
              source={require("@/assets/images/bag.jpg")}
              style={styles.bagImg}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(204,17,0,0.7)"]}
              style={StyleSheet.absoluteFill}
            />
          </View>

          {/* Maps */}
          <Text style={styles.sectionLabel}>الموقع على الخريطة</Text>
          <Pressable onPress={handleMaps}>
            <View style={styles.mapCard}>
              <LinearGradient
                colors={[Colors.red, Colors.redDark]}
                style={styles.mapCardGrad}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <MaterialCommunityIcons name="map-marker-radius" size={36} color={Colors.white} />
                <Text style={styles.mapTitle}>اضغط لفتح الخريطة</Text>
                <Text style={styles.mapSub}>١٣٢ شارع النزهة · ميدان تريومف · مصر الجديدة</Text>
                <View style={styles.mapBtn}>
                  <Feather name="map-pin" size={16} color={Colors.red} />
                  <Text style={styles.mapBtnText}>افتح في الخرائط</Text>
                </View>
              </LinearGradient>
            </View>
          </Pressable>

          {/* Address */}
          <View style={styles.addressCard}>
            <View style={[styles.addressIcon, { backgroundColor: Colors.red }]}>
              <MaterialCommunityIcons name="map-marker-outline" size={20} color={Colors.white} />
            </View>
            <View style={styles.addressTexts}>
              <Text style={styles.addressAr}>١٣٢ شارع النزهة، ميدان تريومف، مصر الجديدة</Text>
              <Text style={styles.addressEn}>132 Al Nozha Street, Triumph Square, New Cairo</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.whiteOff },
  hero: {
    height: 200,
    overflow: "hidden",
    position: "relative",
  },
  heroImg: { width: "100%", height: "100%" },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 32,
    fontFamily: "Cairo_900Black",
    color: Colors.white,
    textAlign: "center",
  },
  heroSub: {
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    marginTop: 2,
  },
  badge24Wrap: {
    alignItems: "center",
    marginTop: -18,
    zIndex: 10,
  },
  badge24: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.white,
  },
  badge24Grad: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  badge24Text: {
    fontSize: 15,
    fontFamily: "Cairo_700Bold",
    color: Colors.white,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: "Cairo_700Bold",
    color: Colors.darkMed,
    textAlign: "right",
    marginBottom: 8,
    marginTop: 4,
  },
  actionCard: {
    marginBottom: 10,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.grayBorder,
  },
  actionCardInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 14,
    gap: 12,
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  actionTexts: { flex: 1, alignItems: "flex-end" },
  actionTitle: {
    fontSize: 16,
    fontFamily: "Cairo_700Bold",
    color: Colors.dark,
  },
  actionSub: {
    fontSize: 13,
    fontFamily: "Cairo_400Regular",
    color: Colors.gray,
  },
  actionArrow: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  bagImgWrap: {
    height: 160,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    marginTop: 8,
    position: "relative",
  },
  bagImg: {
    width: "100%",
    height: "100%",
  },
  mapCard: {
    marginBottom: 14,
    borderRadius: 20,
    overflow: "hidden",
  },
  mapCardGrad: {
    padding: 24,
    alignItems: "center",
    gap: 8,
  },
  mapTitle: {
    fontSize: 18,
    fontFamily: "Cairo_700Bold",
    color: Colors.white,
    textAlign: "center",
  },
  mapSub: {
    fontSize: 13,
    fontFamily: "Cairo_400Regular",
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    lineHeight: 20,
  },
  mapBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 8,
  },
  mapBtnText: {
    fontSize: 15,
    fontFamily: "Cairo_700Bold",
    color: Colors.red,
  },
  addressCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
    alignItems: "flex-start",
    marginBottom: 4,
  },
  addressIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  addressTexts: { flex: 1, alignItems: "flex-end" },
  addressAr: {
    fontSize: 14,
    fontFamily: "Cairo_600SemiBold",
    color: Colors.dark,
    textAlign: "right",
    lineHeight: 22,
  },
  addressEn: {
    fontSize: 12,
    fontFamily: "Cairo_400Regular",
    color: Colors.gray,
    textAlign: "right",
    marginTop: 4,
  },
});
