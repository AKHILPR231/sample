import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import HeroBanner from "../components/HeroBanner/HeroBanner";
import SectionHeader from "../components/SectionHeader/SectionHeader";
import QuoteCard from "../components/QuoteCard/QuoteCard";

import {
    BOUTIQUE_HOURS,
  EXCLUSIVE_LOUNGE_IMAGE,
  LOUNGE_SERVICES,
  PREMIUM_BOUTIQUES,
  SERVICE_SCREEN_CONTENT,
} from "../constants/serviceData";
import ServiceGrid from "../components/ServiceGrid/ServiceGrid";
import CalloutCard from "../components/CalloutCard/CalloutCard";
import { Boutique } from "../types/service";
import BoutiqueList from "../components/BoutiqueList/BoutiqueList";
import HoursTable from "../components/HoursTable/HoursTable";

const COLORS = {
  scaloYellow: "#FFD700",
  premiumBlack: "#121212",
  background: "#FFF9EF",
  white: "#FFFFFF",
  text: "#4D4732",
};

const ServiceScreen = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices((prev) => prev.filter((item) => item !== id));
    } else {
      setSelectedServices((prev) => [...prev, id]);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "The Place. Hospitality Lounge | Scalo Milano - Exclusive shopping experience.",
      });
    } catch (error) {
      console.log(error);
    }
  };

const handleAccessDetails = () => {
  if (selectedServices.length === 0) {
    Alert.alert(
      "Hospitality Lounge",
      "Please select at least one service before continuing."
    );
    return;
  }

  const selectedTitles = LOUNGE_SERVICES.filter((service) =>
    selectedServices.includes(service.id)
  ).map((service) => service.title);

  Alert.alert(
    "Selected Services",
    selectedTitles.join("\n\n"),
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Continue",
        onPress: () => {
          console.log("Proceed with booking...");
        },
      },
    ]
  );
};


const handleBoutiquePress = (boutique: Boutique) => {
  Alert.alert(
    boutique.name,
    `${boutique.details}\n\nLocation: ${boutique.location}`
  );
};
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.background}
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ------------------------------------------------ */}
        {/* Hero Banner */}
        {/* ------------------------------------------------ */}

        <HeroBanner
          image={EXCLUSIVE_LOUNGE_IMAGE}
          label={SERVICE_SCREEN_CONTENT.hero.label}
          title={SERVICE_SCREEN_CONTENT.hero.title}
        />

        {/* ------------------------------------------------ */}
        {/* Section 01 */}
        {/* ------------------------------------------------ */}

        <View style={styles.section}>
          <SectionHeader
            number={SERVICE_SCREEN_CONTENT.sectionOne.number}
            title={SERVICE_SCREEN_CONTENT.sectionOne.title}
          />

          <Text style={styles.body}>
            {SERVICE_SCREEN_CONTENT.sectionOne.description}
          </Text>
        </View>

        {/* ------------------------------------------------ */}
        {/* Section 02 */}
        {/* ------------------------------------------------ */}

        <View style={styles.premiumSection}>
          <SectionHeader
            number={SERVICE_SCREEN_CONTENT.sectionTwo.number}
            title={SERVICE_SCREEN_CONTENT.sectionTwo.title}
            showUnderline={false}
            titleColor="#FFFFFF"
          />

          <Text style={styles.premiumBody}>
            {SERVICE_SCREEN_CONTENT.sectionTwo.descriptionOne}
          </Text>

          <Text style={styles.premiumBody}>
            {SERVICE_SCREEN_CONTENT.sectionTwo.descriptionTwo}
          </Text>

          <QuoteCard
            quote={SERVICE_SCREEN_CONTENT.sectionTwo.quote}
          />
        </View>

        {/* ---------- Part 2 Starts Here ---------- */}

        {/* ------------------------------------------------ */}
{/* Section 03 */}
{/* ------------------------------------------------ */}

<View style={styles.section}>
  <SectionHeader
    number={SERVICE_SCREEN_CONTENT.sectionThree.number}
    title={SERVICE_SCREEN_CONTENT.sectionThree.title}
  />

  <Text style={styles.body}>
    Choose one or more exclusive services available in The Place Hospitality
    Lounge. Your selections can be used while requesting access.
  </Text>

  <View style={{ marginTop: 24 }}>
    <ServiceGrid
      services={LOUNGE_SERVICES}
      selectedServices={selectedServices}
      onSelect={toggleService}
    />
  </View>
</View>

{/* ------------------------------------------------ */}
{/* Callout */}
{/* ------------------------------------------------ */}

<View style={styles.calloutContainer}>
  <CalloutCard
    title={SERVICE_SCREEN_CONTENT.callout.title}
    description={SERVICE_SCREEN_CONTENT.callout.description}
    buttonTitle={SERVICE_SCREEN_CONTENT.callout.buttonTitle}
    onPress={handleAccessDetails}
  />
</View>
{/* ------------------------------------------------ */}
{/* Callout */}
{/* ------------------------------------------------ */}

<View style={styles.calloutContainer}>
  <CalloutCard
    title={SERVICE_SCREEN_CONTENT.callout.title}
    description={SERVICE_SCREEN_CONTENT.callout.description}
    buttonTitle={SERVICE_SCREEN_CONTENT.callout.buttonTitle}
    onPress={handleAccessDetails}
  />
</View>

{/* ------------------------------------------------ */}
{/* Boutique Opening Hours */}
{/* ------------------------------------------------ */}

<View style={styles.section}>
  <SectionHeader
    number="04"
    title="OPENING HOURS"
  />

  <HoursTable data={BOUTIQUE_HOURS} />
</View>

{/* ------------------------------------------------ */}
{/* Premium Boutiques */}
{/* ------------------------------------------------ */}

<View style={styles.section}>
  <SectionHeader
    number="05"
    title="PREMIUM BOUTIQUES"
  />

  <Text style={styles.body}>
    Discover a curated collection of luxury brands and
    exceptional dining experiences available exclusively
    within Scalo Milano.
  </Text>

  <View style={{ marginTop: 20 }}>
    <BoutiqueList
      boutiques={PREMIUM_BOUTIQUES}
      onSelect={handleBoutiquePress}
    />
  </View>
</View>

<View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingBottom: 40,
  },

  section: {
    paddingHorizontal: 20,
    marginTop: 32,
  },

  body: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.text,
  },

  premiumSection: {
    marginTop: 32,
    backgroundColor: COLORS.premiumBlack,
    paddingVertical: 36,
    paddingHorizontal: 20,
  },

  premiumBody: {
    color: "#EAE2CF",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 14,
  },
  calloutContainer: {
  marginTop: 36,
  paddingHorizontal: 20,
},
});