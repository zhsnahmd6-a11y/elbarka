import React, { useState, useCallback, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  FlatList,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/colors";

type SizePrice = { s?: number; m?: number; l?: number; single?: number };

type MenuItem = {
  name: string;
  prices: SizePrice;
};

type MenuCategory = {
  id: string;
  nameAr: string;
  icon: string;
  items: MenuItem[];
};

const MENU: MenuCategory[] = [
  {
    id: "foul",
    nameAr: "سندوتشات الفول",
    icon: "food-variant",
    items: [
      { name: "فول سادة", prices: { s: 11, m: 13, l: 14 } },
      { name: "فول مخصوص", prices: { s: 13, m: 16, l: 20 } },
      { name: "فول اسكندراني", prices: { s: 13, m: 14, l: 18 } },
      { name: "فول زبدة", prices: { s: 13, m: 14, l: 16 } },
      { name: "فول زيت حار", prices: { s: 13, m: 13, l: 16 } },
      { name: "فول زيت زيتون", prices: { s: 13, m: 13, l: 16 } },
      { name: "فول البركة", prices: { s: 13, m: 16, l: 20 } },
      { name: "فول اسكندراني", prices: { s: 14, m: 18, l: 20 } },
      { name: "فول بالبيض المسلوق", prices: { s: 20, m: 23, l: 25 } },
      { name: "فول بالبيض الاوملت", prices: { s: 20, m: 25, l: 28 } },
      { name: "فول بالسجق", prices: { s: 20, m: 25, l: 28 } },
      { name: "جبنة فيتا", prices: { s: 15, m: 25, l: 40 } },
      { name: "جبنة قديمة", prices: { s: 15, m: 25, l: 40 } },
      { name: "بابا غنوج", prices: { s: 15, m: 25, l: 40 } },
      { name: "شكشوكة", prices: { s: 15, m: 25, l: 40 } },
      { name: "مسقعة", prices: { s: 15, m: 25, l: 40 } },
      { name: "مسقعة بالسجق", prices: { s: 20, m: 25, l: 40 } },
      { name: "بطاطس مهروسة بالجبنة الرومي", prices: { s: 20, m: 30, l: 50 } },
      { name: "مهروسة بالزبدة", prices: { s: 20, m: 30, l: 50 } },
      { name: "مهروسة بالبيض الاوملت", prices: { s: 20, m: 25, l: 40 } },
      { name: "طبق بطاطس صوابع", prices: { s: 15, m: 20, l: 25 } },
      { name: "طبق شيبسي", prices: { s: 15, m: 20, l: 25 } },
      { name: "طبق صوابع كاتشب", prices: { s: 18, m: 23, l: 28 } },
      { name: "طبق صوابع مايونيز", prices: { s: 18, m: 23, l: 28 } },
      { name: "طبق صوابع كاتشب ومايونيز", prices: { s: 21, m: 26, l: 32 } },
      { name: "فول من القدرة", prices: { s: 12, m: 13, l: 14 } },
      { name: "فول بالفلفل", prices: { s: 13, m: 13, l: 14 } },
      { name: "فول على بطاطس", prices: { s: 16, m: 16, l: 20 } },
      { name: "فول على بادنجان", prices: { s: 16, m: 16, l: 20 } },
      { name: "فول على بابا غنوج", prices: { s: 16, m: 19, l: 22 } },
      { name: "فول على بيض", prices: { s: 19, m: 21, l: 24 } },
      { name: "فول اوملت", prices: { s: 21, m: 25, l: 28 } },
      { name: "فول سوسيس", prices: { s: 25, m: 25, l: 28 } },
      { name: "فول سجق", prices: { s: 25, m: 25, l: 28 } },
      { name: "فول بسطرمة", prices: { s: 25, m: 25, l: 28 } },
      { name: "فول ليمون معصفر", prices: { s: 15, m: 15, l: 18 } },
    ],
  },
  {
    id: "taameya",
    nameAr: "سندوتشات الطعمية",
    icon: "food",
    items: [
      { name: "طعمية", prices: { s: 11, m: 13, l: 14 } },
      { name: "طعمية مخصوص", prices: { s: 13, m: 13, l: 16 } },
      { name: "طعمية مكس", prices: { s: 14, m: 14, l: 17 } },
      { name: "طعمية محشية", prices: { s: 13, m: 13, l: 17 } },
      { name: "طعمية محشية على فول", prices: { s: 16, m: 16, l: 19 } },
      { name: "طعمية على بطاطس", prices: { s: 16, m: 16, l: 19 } },
      { name: "طعمية على بادنجان", prices: { s: 16, m: 16, l: 19 } },
      { name: "طعمية على مسقعة", prices: { s: 16, m: 16, l: 19 } },
      { name: "طعمية على بابا غنوج", prices: { s: 16, m: 16, l: 19 } },
      { name: "طعمية على جبنة قديمة", prices: { s: 16, m: 16, l: 19 } },
      { name: "طعمية على فيتا", prices: { s: 20, m: 20, l: 23 } },
      { name: "طعمية على كنكوت", prices: { s: 20, m: 20, l: 23 } },
      { name: "طعمية على بيض", prices: { s: 19, m: 19, l: 22 } },
      { name: "طعمية على بسطرمة", prices: { s: 20, m: 20, l: 24 } },
      { name: "طعمية على اوملت", prices: { s: 21, m: 21, l: 24 } },
      { name: "طعمية جبنة كبيري", prices: { s: 20, m: 20, l: 23 } },
      { name: "طعمية موتزاريلا", prices: { s: 20, m: 20, l: 23 } },
      { name: "طعمية جبنة رومي", prices: { s: 20, m: 20, l: 23 } },
      { name: "طعمية جبنة شيدر", prices: { s: 20, m: 20, l: 23 } },
      { name: "طعمية كبيري بسطرمة", prices: { s: 25, m: 25, l: 28 } },
    ],
  },
  {
    id: "misc",
    nameAr: "متنوعات",
    icon: "silverware-fork-knife",
    items: [
      { name: "طبق اوملت اياشي", prices: { s: 23, m: 35 } },
      { name: "طبق اوملت ميكس جين", prices: { s: 23, m: 35 } },
      { name: "طبق اوملت بسطرمة", prices: { s: 20, m: 33 } },
      { name: "طبق جبنة مقلية 3 قطع", prices: { single: 25 } },
      { name: "عيش بلدي", prices: { single: 3 } },
      { name: "عيش شامي", prices: { s: 1.5, m: 3 } },
      { name: "قرص طعمية", prices: { single: 2 } },
      { name: "قرص طعمية محشية", prices: { single: 6 } },
      { name: "قرص طعمية مخصوص", prices: { single: 6 } },
      { name: "قرص طعمية اسكندراني", prices: { single: 7 } },
      { name: "قرص طعمية محشى ليمون معصفر", prices: { single: 7 } },
      { name: "قرص طعمية محشي كبيري", prices: { single: 13 } },
      { name: "قرص طعمية موتزاريلا", prices: { s: 13, m: 25 } },
      { name: "قرص طعمية مجشي رومي", prices: { s: 13, m: 20 } },
      { name: "قرص طعمية محشي شيدر", prices: { single: 13 } },
      { name: "قرص عجة بلدي", prices: { single: 18 } },
      { name: "طبق عجة فرنساوي", prices: { single: 10 } },
      { name: "قرص كنكوت", prices: { single: 12 } },
      { name: "بيضة مسلوقة", prices: { single: 8 } },
      { name: "بيضة مدحرجة", prices: { single: 10 } },
      { name: "طبق اوملت سادة", prices: { single: 13 } },
    ],
  },
  {
    id: "omelet",
    nameAr: "سندوتشات الاوملت",
    icon: "egg",
    items: [
      { name: "اوملت سادة", prices: { s: 17, m: 17, l: 20 } },
      { name: "اوملت زيدة", prices: { s: 19, m: 19, l: 22 } },
      { name: "اوملت اسكندراني", prices: { s: 18, m: 18, l: 22 } },
      { name: "اوملت سجق", prices: { s: 27, m: 27, l: 30 } },
      { name: "اوملت سوسيس", prices: { s: 26, m: 26, l: 29 } },
      { name: "اوملت بسطرمة", prices: { s: 27, m: 27, l: 30 } },
      { name: "اوملت رومي", prices: { s: 25, m: 25, l: 28 } },
      { name: "اوملت شيدر", prices: { s: 25, m: 25, l: 28 } },
      { name: "اوملت موتزاريلا", prices: { s: 25, m: 25, l: 28 } },
      { name: "اوملت بيتزا", prices: { s: 28, m: 28, l: 30 } },
      { name: "اوملت اياتشي", prices: { s: 27, m: 27, l: 30 } },
      { name: "اوملت ميكس جبن", prices: { s: 28, m: 28, l: 30 } },
      { name: "اوملت جبنة كبيري", prices: { s: 25, m: 25, l: 28 } },
      { name: "بيض مسلوق", prices: { s: 16, m: 16, l: 19 } },
      { name: "بيض مسلوق زيدة", prices: { s: 17, m: 17, l: 20 } },
      { name: "بيض مسلوق مدحرج", prices: { s: 17, m: 17, l: 20 } },
    ],
  },
  {
    id: "sharqi",
    nameAr: "سندوتشات الشرقي",
    icon: "food-drumstick",
    items: [
      { name: "شكشوكة", prices: { s: 15, m: 15, l: 18 } },
      { name: "باباغنوج", prices: { s: 15, m: 15, l: 18 } },
      { name: "مسقعة", prices: { s: 15, m: 15, l: 18 } },
      { name: "مسقعة سجق", prices: { s: 25, m: 25, l: 28 } },
      { name: "ديناميت", prices: { s: 25, m: 25, l: 28 } },
      { name: "عجة بلدي", prices: { s: 18, m: 18, l: 20 } },
      { name: "عجة فرنساوي", prices: { s: 15, m: 15, l: 18 } },
      { name: "جبنة قديمة", prices: { s: 15, m: 15, l: 18 } },
      { name: "جبنة", prices: { s: 15, m: 15, l: 20 } },
      { name: "جبنة مقلية", prices: { s: 25, m: 29, l: 32 } },
      { name: "جبنة مقلية بطاطس", prices: { s: 29, m: 33, l: 35 } },
      { name: "جبنة مقلية جامبو", prices: { s: 35, m: 35, l: 37 } },
      { name: "جبنة فيتا بالبيض", prices: { s: 21, m: 21, l: 23 } },
    ],
  },
  {
    id: "potato",
    nameAr: "سندوتشات بطاطس",
    icon: "french-fries",
    items: [
      { name: "بطاطس صوابع", prices: { s: 15, m: 15, l: 18 } },
      { name: "بطاطس شيبسي", prices: { s: 15, m: 15, l: 18 } },
      { name: "بطاطس جمبري", prices: { s: 15, m: 15, l: 18 } },
      { name: "بطاطس بانية", prices: { s: 15, m: 15, l: 18 } },
      { name: "بطاطس كاتشب", prices: { s: 18, m: 18, l: 21 } },
      { name: "بطاطس مايونيز", prices: { s: 20, m: 20, l: 23 } },
      { name: "بطاطس على بابا غنوج", prices: { s: 17, m: 17, l: 20 } },
      { name: "بطاطس على مسقعة", prices: { s: 17, m: 17, l: 20 } },
      { name: "بطاطس على بيض", prices: { s: 17, m: 17, l: 20 } },
      { name: "بطاطس على اوملت", prices: { s: 17, m: 17, l: 20 } },
      { name: "بطاطس شيدر", prices: { s: 22, m: 22, l: 25 } },
      { name: "بطاطس رومي", prices: { s: 22, m: 22, l: 25 } },
      { name: "بطاطس موتزاريلا", prices: { s: 22, m: 22, l: 25 } },
      { name: "بطاطس ميكس جبن", prices: { s: 30, m: 30, l: 33 } },
      { name: "مهروسة", prices: { s: 15, m: 15, l: 18 } },
      { name: "مهروسة زيدة", prices: { s: 15, m: 15, l: 18 } },
      { name: "مهروسة بيض", prices: { s: 17, m: 17, l: 20 } },
      { name: "مهروسة اوملت", prices: { s: 20, m: 20, l: 23 } },
      { name: "مهروسة رومي", prices: { s: 22, m: 22, l: 25 } },
      { name: "مهروسة شيدر", prices: { s: 25, m: 25, l: 28 } },
      { name: "مهروسة موتزاريلا", prices: { s: 25, m: 25, l: 28 } },
      { name: "مهروسة جبنة فريش", prices: { s: 25, m: 25, l: 28 } },
      { name: "مهروسة بازوكا", prices: { s: 20, m: 20, l: 23 } },
      { name: "مهروسة ميكس جبن", prices: { s: 30, m: 30, l: 33 } },
    ],
  },
  {
    id: "souri",
    nameAr: "سندوتشات السوري",
    icon: "bread-slice",
    items: [
      { name: "بازوكا", prices: { single: 38 } },
      { name: "صوابع ميكس جبن", prices: { single: 38 } },
      { name: "طعمية سوري", prices: { single: 23 } },
      { name: "صوابع سوري", prices: { single: 27 } },
    ],
  },
  {
    id: "sides",
    nameAr: "مقبلات",
    icon: "bowl-mix",
    items: [
      { name: "ليمون مخلل", prices: { s: 10, m: 20 } },
      { name: "طحنية", prices: { s: 12, m: 30 } },
      { name: "سلطة بلدي", prices: { s: 15, m: 25 } },
      { name: "طرشي بلدي", prices: { s: 7, m: 10, l: 15 } },
      { name: "طبق طماطم وخيار وفلفل", prices: { s: 10, m: 15, l: 20 } },
      { name: "باذنجان مخلل/مقلي", prices: { s: 15, m: 20 } },
      { name: "طبق خيار مخلل", prices: { s: 10, m: 15, l: 20 } },
    ],
  },
  {
    id: "danone",
    nameAr: "زبادي دانون",
    icon: "cup",
    items: [
      { name: "زبادي دانون 85 جرام", prices: { single: 8 } },
      { name: "زبادي دانون 100 جرام", prices: { single: 12 } },
      { name: "رايب اكتفيا 205 جرام", prices: { single: 18 } },
      { name: "دانيت شيكولاتة 85 جرام", prices: { single: 10 } },
    ],
  },
];

function formatPrice(prices: SizePrice): string {
  if (prices.single !== undefined) return `${prices.single} ج`;
  const parts: string[] = [];
  if (prices.s !== undefined) parts.push(`${prices.s}`);
  if (prices.m !== undefined) parts.push(`${prices.m}`);
  if (prices.l !== undefined) parts.push(`${prices.l}`);
  return parts.join(" / ") + " ج";
}

function hasSizes(prices: SizePrice): boolean {
  return prices.s !== undefined || prices.m !== undefined || prices.l !== undefined;
}

function MenuItemCard({ item }: { item: MenuItem }) {
  const sizes = hasSizes(item.prices);
  return (
    <View style={menuStyles.itemCard}>
      <View style={menuStyles.itemLeft}>
        <Text style={menuStyles.itemName}>{item.name}</Text>
        {sizes && (
          <View style={menuStyles.sizeRow}>
            {item.prices.s !== undefined && (
              <View style={menuStyles.sizeBadge}>
                <Text style={menuStyles.sizeLabel}>ص</Text>
                <Text style={menuStyles.sizePrice}>{item.prices.s}</Text>
              </View>
            )}
            {item.prices.m !== undefined && (
              <View style={[menuStyles.sizeBadge, menuStyles.sizeBadgeMid]}>
                <Text style={menuStyles.sizeLabel}>و</Text>
                <Text style={menuStyles.sizePrice}>{item.prices.m}</Text>
              </View>
            )}
            {item.prices.l !== undefined && (
              <View style={[menuStyles.sizeBadge, menuStyles.sizeBadgeLg]}>
                <Text style={menuStyles.sizeLabel}>ك</Text>
                <Text style={menuStyles.sizePrice}>{item.prices.l}</Text>
              </View>
            )}
          </View>
        )}
      </View>
      <View style={menuStyles.itemRight}>
        <Text style={menuStyles.itemPrice}>{formatPrice(item.prices)}</Text>
        <Text style={menuStyles.itemCurrency}>جنيه</Text>
      </View>
    </View>
  );
}

export default function MenuScreen() {
  const insets = useSafeAreaInsets();
  const topPadding = Platform.OS === "web" ? 67 : insets.top;
  const bottomPadding = Platform.OS === "web" ? 34 : 0;

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (activeCategory && !q) {
      const cat = MENU.find((c) => c.id === activeCategory);
      return cat ? [cat] : MENU;
    }
    if (!q && !activeCategory) return MENU;
    return MENU.flatMap((cat) => {
      if (activeCategory && cat.id !== activeCategory) return [];
      const items = cat.items.filter((i) => i.name.toLowerCase().includes(q));
      if (!items.length) return [];
      return [{ ...cat, items }];
    });
  }, [search, activeCategory]);

  const totalResults = useMemo(
    () => filtered.reduce((acc, cat) => acc + cat.items.length, 0),
    [filtered]
  );

  const renderCategory = useCallback(
    ({ item: cat }: { item: MenuCategory }) => (
      <View style={menuStyles.categorySection} key={cat.id}>
        <LinearGradient
          colors={[Colors.navyCard, "#141E30"]}
          style={menuStyles.categoryHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={menuStyles.catHeaderLeft}>
            <MaterialCommunityIcons
              name={cat.icon as any}
              size={20}
              color={Colors.gold}
            />
            <Text style={menuStyles.categoryTitle}>{cat.nameAr}</Text>
          </View>
          <View style={menuStyles.catCount}>
            <Text style={menuStyles.catCountText}>{cat.items.length}</Text>
          </View>
        </LinearGradient>
        <View style={menuStyles.categoryItems}>
          {cat.items.map((item, idx) => (
            <MenuItemCard key={`${cat.id}-${idx}`} item={item} />
          ))}
        </View>
      </View>
    ),
    []
  );

  return (
    <View style={[menuStyles.container, { paddingTop: topPadding, paddingBottom: bottomPadding }]}>
      <LinearGradient
        colors={[Colors.deepNavy, "#0D1525", Colors.navy]}
        style={StyleSheet.absoluteFill}
      />

      {/* Top Header */}
      <View style={menuStyles.topBar}>
        <Text style={menuStyles.pageTitle}>قائمة الطعام</Text>
        <Text style={menuStyles.pageSubtitle}>مطعم البركة</Text>
      </View>

      {/* Search Bar */}
      <View style={menuStyles.searchWrapper}>
        <View style={menuStyles.searchBar}>
          <Feather name="search" size={18} color={Colors.whiteDim} />
          <TextInput
            style={menuStyles.searchInput}
            placeholder="ابحث في القائمة..."
            placeholderTextColor={Colors.whiteDim}
            value={search}
            onChangeText={setSearch}
            textAlign="right"
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch("")}>
              <Feather name="x" size={18} color={Colors.whiteDim} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={menuStyles.chipsRow}
        style={menuStyles.chipsScroll}
      >
        <Pressable
          onPress={() => setActiveCategory(null)}
          style={[menuStyles.chip, !activeCategory && menuStyles.chipActive]}
        >
          <Text style={[menuStyles.chipText, !activeCategory && menuStyles.chipTextActive]}>
            الكل
          </Text>
        </Pressable>
        {MENU.map((cat) => (
          <Pressable
            key={cat.id}
            onPress={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
            style={[menuStyles.chip, activeCategory === cat.id && menuStyles.chipActive]}
          >
            <Text
              style={[
                menuStyles.chipText,
                activeCategory === cat.id && menuStyles.chipTextActive,
              ]}
            >
              {cat.nameAr.replace("سندوتشات ", "")}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Size Legend */}
      <View style={menuStyles.legend}>
        <View style={menuStyles.legendItem}>
          <View style={[menuStyles.legendDot, { backgroundColor: "#5B8DEF" }]} />
          <Text style={menuStyles.legendText}>ص = صغير</Text>
        </View>
        <View style={menuStyles.legendItem}>
          <View style={[menuStyles.legendDot, { backgroundColor: "#8B5CF6" }]} />
          <Text style={menuStyles.legendText}>و = وسط</Text>
        </View>
        <View style={menuStyles.legendItem}>
          <View style={[menuStyles.legendDot, { backgroundColor: Colors.gold }]} />
          <Text style={menuStyles.legendText}>ك = كبير</Text>
        </View>
        <Text style={menuStyles.legendCount}>{totalResults} صنف</Text>
      </View>

      {/* Menu List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        ListEmptyComponent={
          <View style={menuStyles.empty}>
            <Feather name="search" size={40} color={Colors.whiteDim} />
            <Text style={menuStyles.emptyText}>لا توجد نتائج</Text>
          </View>
        }
      />
    </View>
  );
}

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.deepNavy,
  },
  topBar: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    paddingTop: 12,
    alignItems: "flex-end",
  },
  pageTitle: {
    fontSize: 28,
    fontFamily: "Cairo_900Black",
    color: Colors.white,
  },
  pageSubtitle: {
    fontSize: 13,
    fontFamily: "Cairo_400Regular",
    color: Colors.gold,
    marginTop: -4,
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.navyCard,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.navyBorder,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Cairo_400Regular",
    color: Colors.white,
    padding: 0,
  },
  chipsScroll: {
    maxHeight: 50,
    marginBottom: 6,
  },
  chipsRow: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.navyCard,
    borderWidth: 1,
    borderColor: Colors.navyBorder,
  },
  chipActive: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  chipText: {
    fontSize: 12,
    fontFamily: "Cairo_600SemiBold",
    color: Colors.whiteDim,
  },
  chipTextActive: {
    color: Colors.deepNavy,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 12,
    justifyContent: "flex-end",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontFamily: "Cairo_400Regular",
    color: Colors.whiteDim,
  },
  legendCount: {
    flex: 1,
    fontSize: 12,
    fontFamily: "Cairo_600SemiBold",
    color: Colors.gold,
    textAlign: "left",
  },
  categorySection: {
    marginBottom: 12,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.navyBorder,
  },
  categoryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  catHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
    justifyContent: "flex-end",
  },
  categoryTitle: {
    fontSize: 17,
    fontFamily: "Cairo_700Bold",
    color: Colors.gold,
  },
  catCount: {
    backgroundColor: Colors.gold + "33",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginLeft: 10,
  },
  catCountText: {
    fontSize: 13,
    fontFamily: "Cairo_700Bold",
    color: Colors.gold,
  },
  categoryItems: {
    backgroundColor: Colors.navy,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.navyBorder,
  },
  itemLeft: {
    flex: 1,
    alignItems: "flex-end",
  },
  itemName: {
    fontSize: 14,
    fontFamily: "Cairo_600SemiBold",
    color: Colors.white,
    textAlign: "right",
    lineHeight: 22,
  },
  sizeRow: {
    flexDirection: "row",
    gap: 4,
    marginTop: 4,
    justifyContent: "flex-end",
    flexWrap: "wrap",
  },
  sizeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#5B8DEF22",
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  sizeBadgeMid: {
    backgroundColor: "#8B5CF622",
  },
  sizeBadgeLg: {
    backgroundColor: Colors.gold + "22",
  },
  sizeLabel: {
    fontSize: 11,
    fontFamily: "Cairo_700Bold",
    color: Colors.whiteDim,
  },
  sizePrice: {
    fontSize: 11,
    fontFamily: "Cairo_700Bold",
    color: Colors.white,
  },
  itemRight: {
    alignItems: "center",
    marginLeft: 12,
    minWidth: 54,
  },
  itemPrice: {
    fontSize: 15,
    fontFamily: "Cairo_700Bold",
    color: Colors.gold,
    textAlign: "center",
  },
  itemCurrency: {
    fontSize: 11,
    fontFamily: "Cairo_400Regular",
    color: Colors.whiteDim,
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
    gap: 12,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "Cairo_600SemiBold",
    color: Colors.whiteDim,
  },
});
