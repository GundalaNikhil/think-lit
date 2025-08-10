export  const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};


export const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'from-green-500 to-emerald-500';
      case 'intermediate':
        return 'from-yellow-500 to-orange-500';
      case 'advanced':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-blue-500 to-purple-500';
    }
  };