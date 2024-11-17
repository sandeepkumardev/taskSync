export const generateRoomNumber = () => {
  const roomNumber = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit number
  return roomNumber;
};
