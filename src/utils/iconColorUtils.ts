/**
 * This file contains utility functions for getting icon color and background classes.
 * The actual CSS classes are defined in src/styles/iconStyles.css
 */

/**
 * Get the appropriate icon color class based on the color name
 * @param iconColor The name of the icon color
 * @returns CSS class name for the icon color
 */
export const getIconColorClass = (iconColor?: string): string => {
  if (!iconColor) return 'iconColorBlue';
  
  switch (iconColor.toLowerCase()) {
    case 'amber':
      return 'iconColorAmber';
    case 'blue':
      return 'iconColorBlue';
    case 'green':
      return 'iconColorGreen';
    case 'purple':
      return 'iconColorPurple';
    case 'red':
      return 'iconColorRed';
    case 'orange':
      return 'iconColorOrange';
    case 'grey':
    case 'gray':
      return 'iconColorGray';
    case 'lightblue':
      return 'iconColorLightBlue';
    case 'teal':
      return 'iconColorTeal';
    case 'yellow':
      return 'iconColorYellow';
    case 'pink':
      return 'iconColorPink';
    default:
      return 'iconColorBlue';
  }
};

/**
 * Get the appropriate icon background color class based on the color name
 * @param iconColor The name of the icon color
 * @returns CSS class name for the icon background color
 */
export const getIconBackgroundClass = (iconColor?: string): string => {
  if (!iconColor) return 'iconBgBlue';
  
  switch (iconColor.toLowerCase()) {
    case 'amber':
      return 'iconBgAmber';
    case 'blue':
      return 'iconBgBlue';
    case 'green':
      return 'iconBgGreen';
    case 'purple':
      return 'iconBgPurple';
    case 'red':
      return 'iconBgRed';
    case 'orange':
      return 'iconBgOrange';
    case 'teal':
      return 'iconBgTeal';
    case 'yellow':
      return 'iconBgYellow';
    case 'pink':
      return 'iconBgPink';
    default:
      return 'iconBgBlue';
  }
};
