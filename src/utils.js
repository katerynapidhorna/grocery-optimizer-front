// https://levelup.gitconnected.com/ways-to-clone-an-object-in-javascript-e1e5beaaf564
export function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}
