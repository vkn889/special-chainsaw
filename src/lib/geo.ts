import { MAX_LOCAL_DISTANCE_MILES, PRACTICE_ORIGIN } from "./content";

const EARTH_RADIUS_MILES = 3958.8;

function toRadians(deg: number) {
  return (deg * Math.PI) / 180;
}

export function haversineMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_MILES * c;
}

export type DistanceCheckResult =
  | { status: "within-range"; miles: number }
  | { status: "out-of-range"; miles: number }
  | { status: "not-found" }
  | { status: "network-error" };

export async function checkDistanceFromPractice(
  query: string
): Promise<DistanceCheckResult> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      `${query} USA`
    )}`;
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return { status: "network-error" };

    const results: { lat: string; lon: string }[] = await res.json();
    if (!results.length) return { status: "not-found" };

    const { lat, lon } = results[0];
    const miles = haversineMiles(
      PRACTICE_ORIGIN.lat,
      PRACTICE_ORIGIN.lon,
      parseFloat(lat),
      parseFloat(lon)
    );

    return miles <= MAX_LOCAL_DISTANCE_MILES
      ? { status: "within-range", miles }
      : { status: "out-of-range", miles };
  } catch {
    return { status: "network-error" };
  }
}
