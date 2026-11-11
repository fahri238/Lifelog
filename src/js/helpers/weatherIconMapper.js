export function getIcon(code, isDay = 1) {
  if (code === 1000) {
    return isDay ? "bi-sun" : "bi-moon-stars";
  }

  if (code === 1003) {
    return isDay ? "bi-cloud-sun" : "bi=cloud-moon";
  }

  if (code === 1006 || code === 1009) {
    return "bi-cloudy";
  }

  if ([1030, 1135, 1147].includes(code)) {
    return "bi-cloud-haze2";
  }

  if ([1063, 1150, 1153, 1180, 1183, 1240].includes(code)) {
    return "bi-cloud-drizzle";
  }

  if ([1186, 1189, 1192, 1195, 1243, 1246].includes(code)) {
    return "bi-cloud-rain-heavy";
  }

  if ([1087, 1273, 1276, 1279, 1282].includes(code)) {
    return "bi-cloud-lightning-rain";
  }

  if (code >= 1210 && code <= 1225) {
    return "bi-snow3";
  }

  return "bi-cloud";
}
