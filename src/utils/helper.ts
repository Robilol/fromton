export const convertMilkTypeToIcons = (milkTypeId: number) => {
  switch (milkTypeId) {
    case 1:
      return "🐄";
    case 2:
      return "🐐";
    case 3:
      return "🐑";
    case 4:
      return "🐄&🐑";
    case 5:
      return "🐄&🐐";
    case 6:
      return "🐐&🐑";
  }
};
