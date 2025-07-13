// utils/formatting.js
export const formatDate = (dateString) => {
  if (!dateString) return "Unknown date";
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

export const convertMinutesToHours = (minutes) => {
  if (!minutes) return "Unknown runtime";
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Optional additional formatting helpers
export const formatCurrency = (amount) => {
  if (!amount) return "Unknown";
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatRating = (rating) => {
  if (!rating) return "No rating";
  return `${rating.toFixed(1)}/10`;
};