import React, { useRef, useEffect, useState } from "react";
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
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";

const { width } = Dimensions.get("window");

const isNative = Platform.OS !== "web";

const GALLERY_IMAGES = [
  require("@/assets/images/sandwiches.jpg"),
  require("@/assets/images/wrap.jpg"),
  require("@/assets/images/tray.jpg"),
  require("@/assets/images/spread.jpg"),
  require("@/assets/images/collage.jpg"),
];

function ContactButton({
  icon,
  label,
  sublabel,
  color,
  bg,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  color: string;
  bg: string;
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
        <View style={[styles.contactBtnInner, { borderColor: bg + "40" }]}>
          <View style={[styles.contactBtnIcon, { backgroundColor: bg }]}>
            {icon}
          </View>
          <View style={styles.contactBtnTextWrap}>
            <Text style={styles.contactBtnLabel}>{label}</Text>
            <Text style={styles.contactBtnSub}>{sublabel}</Text>
          </View>
          <View style={[styles.arrowCircle, { backgroundColor: color + "15" }]}>
            <Feather name="arrow-left" size={16} color={color} />
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}

function GalleryCarousel() {
  const [active, setActive] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % GALLERY_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.galleryContainer}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        contentOffset={{ x: active * (width - 40), y: 0 }}
      >
        {GALLERY_IMAGES.map((img, i) => (
          <View key={i} style={styles.gallerySlide}>
            <Image source={img} style={styles.galleryImg} resizeMode="cover" />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.4)"]}
              style={StyleSheet.absoluteFill}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotRow}>
        {GALLERY_IMAGES.map((_, i) => (
          <View key={i} style={[styles.dot, i === active && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 600, useNativeDriver: isNative }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: isNative }),
    ]).start();
  }, []);

  const handleCall = (number: string) => Linking.openURL(`tel:${number}`);
  const handleWhatsApp = (number: string) => Linking.openURL(`https://wa.me/2${number}`);

  return (
    <View style={[styles.container, { paddingTop: topPadding, paddingBottom: bottomPadding }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero Banner with restaurant image */}
        <View style={styles.heroBanner}>
          <Image
            source={require("@/assets/images/banner.jpg")}
            style={styles.heroImg}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(204,17,0,0.85)", "rgba(155,13,0,0.7)", "transparent"]}
            style={styles.heroOverlay}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
          <View style={styles.heroContent}>
            <View style={styles.ramadanRow}>
              <MaterialCommunityIcons name="star-four-points" size={12} color="#FFD700" />
              <Text style={styles.ramadanText}>رمضان كريم</Text>
              <MaterialCommunityIcons name="star-four-points" size={12} color="#FFD700" />
            </View>
            <Text style={styles.heroTitle}>مطعم البركة</Text>
            <Text style={styles.heroEn}>El Barka Restaurant</Text>
            <View style={styles.heroBranch}>
              <MaterialCommunityIcons name="map-marker" size={13} color="#FFD700" />
              <Text style={styles.heroBranchText}>فرع النزهة</Text>
            </View>
          </View>
          <View style={styles.badge24h}>
            <MaterialCommunityIcons name="clock-check-outline" size={12} color={Colors.red} />
            <Text style={styles.badge24hText}>24/7</Text>
          </View>
        </View>

        {/* Tagline */}
        <Animated.View style={[styles.taglineWrap, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <LinearGradient
            colors={[Colors.red, Colors.redDark]}
            style={styles.taglineGrad}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <MaterialCommunityIcons name="moon-waxing-crescent" size={18} color="#FFD700" />
            <Text style={styles.taglineText}>لقمة تدلعك وقرمشة تشبعك</Text>
            <MaterialCommunityIcons name="moon-waxing-crescent" size={18} color="#FFD700" />
          </LinearGradient>
        </Animated.View>

        {/* Info chips */}
        <View style={styles.chipsRow}>
          <View style={styles.chip}>
            <Feather name="clock" size={13} color={Colors.red} />
            <Text style={styles.chipText}>مفتوح ٢٤ ساعة</Text>
          </View>
          <View style={styles.chip}>
            <MaterialCommunityIcons name="food" size={13} color={Colors.red} />
            <Text style={styles.chipText}>فول · فلافل · شاورما</Text>
          </View>
          <View style={styles.chip}>
            <MaterialCommunityIcons name="moped" size={13} color={Colors.red} />
            <Text style={styles.chipText}>توصيل</Text>
          </View>
        </View>

        {/* Gallery */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>من مطبخنا</Text>
          </View>
          <GalleryCarousel />
        </View>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <View style={styles.dividerDot} />
          <View style={styles.dividerLine} />
        </View>

        {/* Contact section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionAccent} />
            <Text style={styles.sectionTitle}>تواصل معنا</Text>
          </View>

          <ContactButton
            icon={<MaterialCommunityIcons name="whatsapp" size={22} color={Colors.white} />}
            label="واتساب"
            sublabel="01001803423"
            color="#25D366"
            bg="#25D366"
            onPress={() => handleWhatsApp("01001803423")}
          />
          <ContactButton
            icon={<MaterialCommunityIcons name="moped" size={22} color={Colors.white} />}
            label="خدمة التوصيل"
            sublabel="01113179539"
            color={Colors.red}
            bg={Colors.red}
            onPress={() => handleCall("01113179539")}
          />
          <ContactButton
            icon={<Feather name="settings" size={20} color={Colors.white} />}
            label="الإدارة"
            sublabel="01111145290"
            color={Colors.darkMed}
            bg={Colors.darkMed}
            onPress={() => handleCall("01111145290")}
          />
        </View>

        {/* Food collage image */}
        <View style={styles.section}>
          <Image
            source={require("@/assets/images/social.jpg")}
            style={styles.socialImg}
            resizeMode="cover"
          />
        </View>

        {/* Address */}
        <View style={[styles.section, { marginBottom: 20 }]}>
          <View style={styles.addressCard}>
            <LinearGradient
              colors={[Colors.red, Colors.redDark]}
              style={styles.addressIconWrap}
            >
              <MaterialCommunityIcons name="map-marker" size={22} color={Colors.white} />
            </LinearGradient>
            <View style={styles.addressTexts}>
              <Text style={styles.addressAr}>١٣٢ شارع النزهة، ميدان تريومف، مصر الجديدة</Text>
              <Text style={styles.addressEn}>132 Al Nozha St, Triumph Square, New Cairo</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const CARD_RADIUS = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteOff,
  },
  heroBanner: {
    width: "100%",
    height: 280,
    position: "relative",
    overflow: "hidden",
  },
  heroImg: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    alignItems: "center",
  },
  ramadanRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  ramadanText: {
    fontSize: 14,
    fontFamily: "Cairo_700Bold",
    color: "#FFD700",
    letterSpacing: 1,
  },
  heroTitle: {
    fontSize: 40,
    fontFamily: "Cairo_900Black",
    color: Colors.white,
    textAlign: "center",
    lineHeight: 50,
  },
  heroEn: {
    fontSize: 13,
    fontFamily: "Cairo_400Regular",
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 2,
    textAlign: "center",
  },
  heroBranch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  heroBranchText: {
    fontSize: 13,
    fontFamily: "Cairo_600SemiBold",
    color: "#FFD700",
  },
  badge24h: {
    position: "absolute",
    top: 14,
    left: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badge24hText: {
    fontSize: 12,
    fontFamily: "Cairo_700Bold",
    color: Colors.red,
  },
  taglineWrap: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: CARD_RADIUS,
    overflow: "hidden",
  },
  taglineGrad: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  taglineText: {
    fontSize: 17,
    fontFamily: "Cairo_700Bold",
    color: Colors.white,
    textAlign: "center",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    marginTop: 12,
    justifyContent: "center",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
  },
  chipText: {
    fontSize: 12,
    fontFamily: "Cairo_600SemiBold",
    color: Colors.dark,
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    justifyContent: "flex-end",
  },
  sectionAccent: {
    width: 4,
    height: 22,
    backgroundColor: Colors.red,
    borderRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Cairo_700Bold",
    color: Colors.dark,
  },
  galleryContainer: {
    borderRadius: CARD_RADIUS,
    overflow: "hidden",
    height: 220,
    position: "relative",
  },
  gallerySlide: {
    width: width - 40,
    height: 220,
    position: "relative",
  },
  galleryImg: {
    width: "100%",
    height: "100%",
  },
  dotRow: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotActive: {
    backgroundColor: Colors.white,
    width: 18,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginHorizontal: 16,
    marginTop: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.grayBorder,
  },
  dividerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.red,
  },
  contactBtn: {
    marginBottom: 10,
  },
  contactBtnInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: CARD_RADIUS,
    padding: 12,
    gap: 12,
    borderWidth: 1,
  },
  contactBtnIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
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
    color: Colors.dark,
  },
  contactBtnSub: {
    fontSize: 13,
    fontFamily: "Cairo_400Regular",
    color: Colors.gray,
  },
  arrowCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
  },
  socialImg: {
    width: "100%",
    height: 200,
    borderRadius: CARD_RADIUS,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: Colors.white,
    borderRadius: CARD_RADIUS,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.grayBorder,
  },
  addressIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },
  addressTexts: {
    flex: 1,
    alignItems: "flex-end",
  },
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
    marginTop: 2,
  },
});
