import { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  type ListRenderItem,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useOutlet, useServices } from "@/hooks";
import { useTheme } from "@/hooks/useTheme";
import type { OutletDocument, ServiceDocument } from "@/schemas";

import { FacilityRow } from "./components/FacilityRow/FacilityRow";
import { InfoRow } from "./components/InfoRow/InfoRow";
import { ScreenHeader } from "./components/ScreenHeader/ScreenHeader";
import { SectionCard } from "./components/SectionCard/SectionCard";
import { ServiceCard } from "./components/ServiceCard/ServiceCard";
import {
  ACTIVE_OUTLET_ID,
  FACILITIES_TITLE,
  HOURS_TITLE,
  PARKING_COPY,
  SCREEN_COPY,
} from "./constants";
import { createStyles } from "./ServicesScreen.styles";
import type { ServiceGroup } from "./types";
import { aggregateFeatures, formatOpeningHours, groupServicesByType } from "./utils";

export function ServicesScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { data: services, loading, error } = useServices(ACTIVE_OUTLET_ID);
  const { data: outlet } = useOutlet(ACTIVE_OUTLET_ID);

  const serviceList = (services ?? []) as ServiceDocument[];
  const outletDoc = outlet as OutletDocument | null;

  const groups = useMemo(() => groupServicesByType(serviceList), [serviceList]);
  const facilities = useMemo(() => aggregateFeatures(serviceList), [serviceList]);
  const hours = useMemo(
    () => formatOpeningHours(outletDoc?.opening_hours),
    [outletDoc?.opening_hours],
  );

  const parkingCapacity = outletDoc?.stats?.parking_capacity;

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  const handleOpenGroup = useCallback((group: ServiceGroup) => {
    router.push(`/services/${group.representative.service_id}`);
  }, []);

  const keyExtractor = useCallback((group: ServiceGroup) => group.type, []);

  const renderItem = useCallback<ListRenderItem<ServiceGroup>>(
    ({ item }) => <ServiceCard group={item} onPress={handleOpenGroup} />,
    [handleOpenGroup],
  );

  const Header = (
    <ScreenHeader
      title={SCREEN_COPY.title}
      subtitle={SCREEN_COPY.subtitle}
      onBack={handleBack}
    />
  );

  if (loading) {
    return (
      <View style={styles.screen}>
        {Header}
        <View style={styles.centered}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.screen}>
        {Header}
        <View style={styles.centered}>
          <MaterialCommunityIcons
            name="alert-circle-outline"
            size={40}
            color={theme.colors.textSecondary}
          />
          <Text style={styles.stateTitle}>{SCREEN_COPY.errorTitle}</Text>
          <Text style={styles.stateBody}>{SCREEN_COPY.errorBody}</Text>
        </View>
      </View>
    );
  }

  if (groups.length === 0) {
    return (
      <View style={styles.screen}>
        {Header}
        <View style={styles.centered}>
          <MaterialCommunityIcons
            name="information-outline"
            size={40}
            color={theme.colors.textSecondary}
          />
          <Text style={styles.stateTitle}>{SCREEN_COPY.emptyTitle}</Text>
          <Text style={styles.stateBody}>{SCREEN_COPY.emptyBody}</Text>
        </View>
      </View>
    );
  }

  const Footer = (
    <View style={styles.footer}>
      {parkingCapacity ? (
        <SectionCard title={PARKING_COPY.title} icon="parking">
          <InfoRow
            label="Total spaces"
            value={`${parkingCapacity.toLocaleString()} spaces`}
          />
          {PARKING_COPY.lines.map((line) => (
            <InfoRow key={line} value={line} bullet />
          ))}
        </SectionCard>
      ) : null}

      {facilities.length > 0 ? (
        <SectionCard title={FACILITIES_TITLE} icon="map-marker-check-outline">
          {facilities.map((feature) => (
            <FacilityRow key={feature} feature={feature} />
          ))}
        </SectionCard>
      ) : null}

      {hours.length > 0 ? (
        <SectionCard title={HOURS_TITLE} icon="clock-outline">
          {hours.map((range, idx) => (
            <InfoRow
              key={range.label}
              label={range.label}
              value={range.value}
              last={idx === hours.length - 1}
            />
          ))}
        </SectionCard>
      ) : null}
    </View>
  );

  return (
    <View style={styles.screen}>
      {Header}
      <FlatList
        data={groups}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.column}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <Text style={styles.gridIntro}>Tap a service for locations and details.</Text>
        }
        ListFooterComponent={Footer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
