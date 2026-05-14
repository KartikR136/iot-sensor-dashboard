export const formatTimestamp = (timestamp) => {
  if (!timestamp) {
    return null;
  }

  return new Date(timestamp).toLocaleString();
};