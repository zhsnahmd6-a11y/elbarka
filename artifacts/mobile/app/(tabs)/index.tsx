import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Linking,
  Platform,
  Animated,
  Dimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";

const { width } = Dimensions.get("window");

const WHATSAPP_NUMBER = "01001803423";
const DELIVERY_NUMBER = "01113179539";
const MGMT_NUMBER = "01111145290";

const isNative = Platform.OS !== "web";

function ContactButton({
  icon,
  label,
  sublabel,
  color,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  color: string;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: isNative }).start();
  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: isNative }).start();

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[styles.contactBtn, { transform: [{ scale }] }]}>
        <LinearGradient
          colors={[color + "22", color + "0A"]}
          style={styles.contactBtnGrad}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={[styles.contactBtnIcon, { backgroundColor: color + "33" }]}>
            {icon}
          </View>
          <View style={styles.contactBtnTextWrap}>
            <Text style={styles.contactBtnLabel}>{label}</Text>
            <Text style={styles.contactBtnSub}>{sublabel}</Text>
          </View>
          <Feather name="chevron-right" size={18} color={Colors.whiteDim} />
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

function StarDot({ top, left, delay = 0 }: { top: number; left: number; delay?: number }) {
  const opacity = useRef(new Animated.Value(0.2)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, { toValue: 1, duration: 900, useNativeDriver: isNative }),
        Animated.timing(opacity, { toValue: 0.2, duration: 900, useNativeDriver: isNative }),
      ])
    ).start();
  }, []);
  return (
    <Animated.View style={[styles.starDot, { top, left, opacity }]}>
      <MaterialCommunityIcons name="star" size={8} color={Colors.gold} />
    </Animated.View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 700, useNativeDriver: isNative }),
      Animated.timing(slideAnim, { toValue: 0, duration: 700, useNativeDriver: isNative }),
    ]).start();
  }, []);

  const handleCall = (number: string) => Linking.openURL(`tel:${number}`);
  const handleWhatsApp = (number: string) => Linking.openURL(`https://wa.me/2${number}`);

  return (
    <View style={[styles.container, { paddingTop: topPadding, paddingBottom: bottomPadding }]}>
      <LinearGradient
        colors={[Colors.deepNavy, "#0D1525", Colors.navy]}
        style={StyleSheet.absoluteFill}
      />

      {/* Ambient star dots */}
      <StarDot top={topPadding + 20} left={30} delay={0} />
      <StarDot top={topPadding + 90} left={width * 0.75} delay={400} />
      <StarDot top={topPadding + 55} left={width * 0.48} delay={200} />
      <StarDot top={topPadding + 160} left={width * 0.88} delay={700} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Lantern row using vector icons */}
        <View style={styles.decorRow}>
          <MaterialCommunityIcons name="candle" size={32} color={Colors.gold} />
          <MaterialCommunityIcons name="moon-waxing-crescent" size={32} color={Colors.gold} />
          <MaterialCommunityIcons name="candle" size={32} color={Colors.gold} />
        </View>

        {/* Ramadan Banner */}
        <Animated.View
          style={[styles.ramadanBanner, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <LinearGradient
            colors={["#1A2A4A", "#0F1E3A"]}
            style={styles.ramadanGrad}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.ramadanRow}>
              <MaterialCommunityIcons name="star-four-points" size={14} color={Colors.gold} />
              <Text style={styles.ramadanText}>رمضان كريم</Text>
              <MaterialCommunityIcons name="star-four-points" size={14} color={Colors.gold} />
            </View>
            <Text style={styles.ramadanSub}>أحلى الأوقات مع البركة</Text>
          </LinearGradient>
        </Animated.View>

        {/* Logo Section */}
        <Animated.View
          style={[styles.logoSection, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          <View style={styles.logoCircle}>
            <LinearGradient colors={[Colors.redAccent, "#8B1A12"]} style={styles.logoGrad}>
              <MaterialCommunityIcons name="pot-steam" size={48} color={Colors.white} />
            </LinearGradient>
          </View>
          <Text style={styles.restaurantNameAr}>مطعم البركة</Text>
          <Text style={styles.restaurantNameEn}>El Barka Restaurant</Text>
          <View style={styles.branchBadge}>
            <MaterialCommunityIcons name="map-marker" size={14} color={Colors.gold} />
            <Text style={styles.branchText}>فرع النزهة</Text>
          </View>
          <Text style={styles.tagline}>لقمة تدلعك وقرمشة تشبعك</Text>
        </Animated.View>

        {/* Info Badges */}
        <View style={styles.infoRow}>
          <View style={styles.infoBadge}>
            <Feather name="clock" size={14} color={Colors.gold} />
            <Text style={styles.infoBadgeText}>مفتوح ٢٤ ساعة</Text>
          </View>
          <View style={styles.infoBadge}>
            <MaterialCommunityIcons name="food" size={14} color={Colors.gold} />
            <Text style={styles.infoBadgeText}>فول · فلافل · شاورما</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <MaterialCommunityIcons name="star-four-points" size={14} color={Colors.gold} />
          <View style={styles.dividerLine} />
        </View>

        <Text style={styles.sectionTitle}>تواصل معنا</Text>

        <ContactButton
          icon={<MaterialCommunityIcons name="whatsapp" size={22} color="#25D366" />}
          label="واتساب"
          sublabel={WHATSAPP_NUMBER}
          color="#25D366"
          onPress={() => handleWhatsApp(WHATSAPP_NUMBER)}
        />
        <ContactButton
          icon={<MaterialCommunityIcons name="moped" size={22} color="#4FC3F7" />}
          label="خدمة التوصيل"
          sublabel={DELIVERY_NUMBER}
          color="#4FC3F7"
          onPress={() => handleCall(DELIVERY_NUMBER)}
        />
        <ContactButton
          icon={<Feather name="settings" size={20} color={Colors.gold} />}
          label="الإدارة"
          sublabel={MGMT_NUMBER}
          color={Colors.gold}
          onPress={() => handleCall(MGMT_NUMBER)}
        />

        {/* Address */}
        <View style={styles.addressCard}>
          <LinearGradient colors={[Colors.navyCard, "#141E30"]} style={styles.addressGrad}>
            <View style={styles.addressRow}>
              <MaterialCommunityIcons name="map-marker-outline" size={20} color={Colors.gold} />
              <View style={styles.addressTexts}>
                <Text style={styles.addressAr}>١٣٢ شارع النزهة، ميدان تريومف، مصر الجديدة</Text>
                <Text style={styles.addressEn}>132 Al Nozha St, Triumph Square, New Cairo</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.deepNavy,
  },
  starDot: {
    position: "absolute",
    zIndex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  decorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 10,
  },
  ramadanBanner: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.gold + "55",
  },
  ramadanGrad: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  ramadanRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  ramadanText: {
    fontSize: 22,
    fontFamily: "Cairo_900Black",
    color: Colors.gold,
    letterSpacing: 1,
  },
  ramadanSub: {
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: Colors.whiteDim,
    marginTop: 4,
  },
  logoSection: {
    alignItems: "center",
    paddingBottom: 20,
  },
  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Colors.gold,
    marginBottom: 16,
  } as any,
  logoGrad: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  restaurantNameAr: {
    fontSize: 38,
    fontFamily: "Cairo_900Black",
    color: Colors.white,
    textAlign: "center",
  },
  restaurantNameEn: {
    fontSize: 14,
    fontFamily: "Cairo_400Regular",
    color: Colors.whiteDim,
    textAlign: "center",
    marginTop: -4,
    letterSpacing: 2,
  },
  branchBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.navyCard,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.navyBorder,
  },
  branchText: {
    fontSize: 13,
    fontFamily: "Cairo_600SemiBold",
    color: Colors.gold,
  },
  tagline: {
    fontSize: 18,
    fontFamily: "Cairo_700Bold",
    color: Colors.gold,
    textAlign: "center",
    marginTop: 14,
    lineHeight: 28,
  },
  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: Colors.whiteFaint,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.navyBorder,
  },
  infoBadgeText: {
    fontSize: 13,
    fontFamily: "Cairo_600SemiBold",
    color: Colors.white,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.navyBorder,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Cairo_700Bold",
    color: Colors.white,
    textAlign: "right",
    marginBottom: 12,
  },
  contactBtn: {
    marginBottom: 10,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.navyBorder,
  },
  contactBtnGrad: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 12,
  },
  contactBtnIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  contactBtnTextWrap: {
    flex: 1,
    alignItems: "flex-end",
  },
  contactBtnLabel: {
    fontSize: 16,
    fontFamily: "Cairo_700Bold",
    color: Colors.white,
  },
  contactBtnSub: {
    fontSize: 13,
    fontFamily: "Cairo_400Regular",
    color: Colors.whiteDim,
  },
  addressCard: {
    marginTop: 8,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.navyBorder,
  },
  addressGrad: { padding: 16 },
  addressRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  addressTexts: {
    flex: 1,
    alignItems: "flex-end",
  },
  addressAr: {
    fontSize: 14,
    fontFamily: "Cairo_600SemiBold",
    color: Colors.white,
    textAlign: "right",
    lineHeight: 22,
  },
  addressEn: {
    fontSize: 12,
    fontFamily: "Cairo_400Regular",
    color: Colors.whiteDim,
    textAlign: "right",
    marginTop: 4,
  },
});
