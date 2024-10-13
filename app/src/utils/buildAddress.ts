export function buildAddress(address: {
  locality?: string;
  region?: string;
  street?: string;
  county?: string;
  housenumber?: string;
  name?: string;
}) {
  let reg = "";
  let str = "";
  let num = "";

  if (address.region) {
    reg = address.region;
  }
  if (address?.locality) {
    reg = address.locality;
  }

  if (address?.county) {
    str = address.county;
  }

  if (address?.name) {
    str = address.name;
  }

  if (address?.street) {
    str = address.street;
  }

  if (address?.housenumber) {
    num = address?.housenumber;
  }

  return `${reg ? `${reg}` : ""}${str ? `${reg ? ", " : ""}${str}` : ""}${num ? `${reg && str ? ", " : ""}${num}` : ""}`;
}
