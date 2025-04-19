export const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, "0");
  return `${hour}:00`;
});

// Get cryptocurrency symbol
export const getCryptoSymbol = (name: string) => {
  switch (name) {
    case "Bitcoin":
      return "BTC";
    case "Ethereum":
      return "ETH";
    case "Monero":
      return "XMR";
    default:
      return name;
  }
};

// Get cryptocurrency price (mock data)
export const getCryptoPrice = (name: string) => {
  switch (name) {
    case "Bitcoin":
      return "$48,256.12";
    case "Ethereum":
      return "$3,487.25";
    case "Monero":
      return "$178.63";
    default:
      return "$0.00";
  }
};

// Get cryptocurrency change (mock data)
export const getCryptoChange = (name: string) => {
  switch (name) {
    case "Bitcoin":
      return "+2.4%";
    case "Ethereum":
      return "+1.8%";
    case "Monero":
      return "+3.2%";
    default:
      return "0%";
  }
};
