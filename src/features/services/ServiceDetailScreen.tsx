import { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useOutlet, useService, useServicesByType } from "@/hooks";
import { useTheme } from "@/hooks/useTheme";
import type { OutletDocument, ServiceDocument } from "@/schemas";

import { FacilityRow } from "./components/FacilityRow/FacilityRow";
import { InfoRow } from "./components/InfoRow/InfoRow";
import { ScreenHeader } from "./components/ScreenHeader/ScreenHeader";
import { SectionCard } from "./components/SectionCard/SectionCard";
import { ServiceLocationRow } from "./components/ServiceLocationRow/ServiceLocationRow";
import { StatusBadge } from "./components/StatusBadge/StatusBadge";
import { ACTIVE_OUTLET_ID } from "./constants";
import { getServiceMeta } from "./serviceMeta";
import { createStyles } from "./ServiceDetailScreen.styles";

type Props = { serviceId: string };

/**
 * Outer screen: resolves the service by id and handles loading/not-found.
 * Detail rendering is delegated to an inner component that mounts only once a
 * concrete `service` (and therefore `type`) exists, which keeps the project's
 * single-subscription RxDB hooks (`useServicesByType`) correctly scoped.
 */
export function ServiceDetailScreen({ serviceId }: Props) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { data: service, loading } = useService(serviceId);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) router.back();
  }, []);

  if (loading) {
    return (
      <View style={styles.screen}>
        <ScreenHeader title="Service" onBack={handleBack} />
        <View style={styles.centered}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      </View>
    );
  }

  if (!service) {
    return (
      <View style={styles.screen}>
        <ScreenHeader title="Service" onBack={handleBack} />
        <View style={styles.centered}>
          <MaterialCommunityIcons
            name="map-marker-question-outline"
            size={40}
            color={theme.colors.textSecondary}
          />
          <Text style={styles.stateTitle}>Service not found</Text>
        </View>
      </View>
    );
  }

  return (
    <ServiceDetailContent
      service={service as ServiceDocument}
      onBack={handleBack}
    />
  );
}

function ServiceDetailContent({
  service,
  onBack,
}: {
  service: ServiceDocument;
  onBack: () => void;
}) {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const meta = useMemo(() => getServiceMeta(service.type), [service.type]);
  const { data: sameType } = useServicesByType(ACTIVE_OUTLET_ID, service.type);
  const { data: outlet } = useOutlet(ACTIVE_OUTLET_ID);

  const siblings = (sameType ?? []) as ServiceDocument[];
  const outletDoc = outlet as OutletDocument | null;

  const features = service.features ?? [];
  const accessLabel = useMemo(() => formatAccess(service.access_required), [
    service.access_required,
  ]);

  const handleOpenSibling = useCallback((next: ServiceDocument) => {
    router.push(`/services/${next.service_id}`);
  }, []);

  const handleDirections = useCallback(() => {
    const loc = outletDoc?.location;
    if (!loc) return;
    const label = encodeURIComponent(service.name);
    const latlng = `${loc.latitude},${loc.longitude}`;
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${label}&ll=${latlng}`,
      android: `geo:${latlng}?q=${latlng}(${label})`,
      default: `https://www.google.com/maps/search/?api=1&query=${latlng}`,
    });
    if (url) Linking.openURL(url).catch(() => undefined);
  }, [outletDoc?.location, service.name]);

  return (
    <View style={styles.screen}>
      <ScreenHeader title={meta.label} onBack={onBack} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <MaterialCommunityIcons
              name={meta.icon}
              size={44}
              color={theme.colors.primary}
            />
          </View>
          <Text style={styles.heroLabel}>{meta.label}</Text>
          <Text style={styles.heroTitle}>{service.name}</Text>
          <StatusBadge status={service.status} />
        </View>

        <SectionCard title="Location & Access" icon="map-marker-outline">
          <InfoRow label="Where" value={service.location_description} />
          {service.opening_hours ? (
            <InfoRow
              label="Hours"
              value={`${service.opening_hours.open} – ${service.opening_hours.close}`}
            />
          ) : null}
          <InfoRow label="Access" value={accessLabel} last />
        </SectionCard>

        {features.length > 0 ? (
          <SectionCard title="What's available" icon="check-decagram-outline">
            {features.map((feature) => (
              <FacilityRow key={feature} feature={feature} />
            ))}
          </SectionCard>
        ) : null}

        {siblings.length > 1 ? (
          <SectionCard title={`All ${meta.label.toLowerCase()}`} icon="format-list-bulleted">
            {siblings.map((item, idx) => (
              <ServiceLocationRow
                key={item.service_id}
                service={item}
                active={item.service_id === service.service_id}
                onPress={handleOpenSibling}
                last={idx === siblings.length - 1}
              />
            ))}
          </SectionCard>
        ) : null}

        {outletDoc?.location ? (
          <TouchableOpacity
            style={styles.cta}
            onPress={handleDirections}
            accessibilityRole="button"
            accessibilityLabel={`Get directions to ${service.name}`}
          >
            <MaterialCommunityIcons
              name="directions"
              size={20}
              color={theme.colors.background}
            />
            <Text style={styles.ctaLabel}>Get Directions</Text>
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    </View>
  );
}

/** Turns an `access_required` flag into a readable line; defaults to open access. */
function formatAccess(access?: string): string {
  if (!access) return "Open to all visitors";
  if (access.startsWith("loyalty_")) {
    const tier = access.replace("loyalty_", "").replace(/_/g, " ");
    return `VIA Card ${tier.replace(/\b\w/g, (c) => c.toUpperCase())}`;
  }
  return access.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
