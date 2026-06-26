export const calculatePrice = (seats, addons = []) => {
  let seatTotal = seats.reduce((sum, seat) => sum + seat.price, 0);
  let addonTotal = addons.reduce((sum, addon) => sum + addon.price, 0);

  return seatTotal + addonTotal;
};