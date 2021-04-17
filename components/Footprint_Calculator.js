var transportation = 0;
var waste = 0;
var utility = 0;

function transportation(cars, public, flight) {
  if (cars > 15000) {
    transportation += 15;
  } else if (cars > 10000) {
    transportation += 10;
  } else if (cars > 1000) {
    transportation += 6;
  } else if (cars > 0) {
    transportation += 4;
  }
}
