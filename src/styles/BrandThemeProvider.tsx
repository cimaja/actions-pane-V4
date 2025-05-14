import React from 'react';
import { 
  FluentProvider, 
  createDarkTheme, 
  createLightTheme, 
  Theme,
  BrandVariants
} from '@fluentui/react-components';
import { brandColors } from './brandColors';

// Define brand variants using our brand colors
const brandVariants: BrandVariants = {
  10: brandColors.brand20, // Using brand20 for the lowest value
  20: brandColors.brand40,
  30: brandColors.brand60,
  40: brandColors.brand70,
  50: brandColors.brand80,
  60: brandColors.brand90,
  70: brandColors.brand100,
  80: brandColors.brand110,
  90: brandColors.brand120,
  100: brandColors.brand130,
  110: brandColors.brand140,
  120: brandColors.brand150,
  130: brandColors.brand160,
  140: brandColors.brand160, // Using brand160 for the highest values
  150: brandColors.brand160,
  160: brandColors.brand160,
};

// Create custom themes with our brand colors
const lightTheme: Theme = {
  ...createLightTheme(brandVariants),
};

const darkTheme: Theme = {
  ...createDarkTheme(brandVariants),
};

// Customize specific parts of the theme if needed
lightTheme.colorBrandForeground1 = brandColors.brand80; // Active text color
lightTheme.colorBrandForeground2 = brandColors.brand80; // Active text color
lightTheme.colorBrandStroke1 = brandColors.brand80; // Active border color
lightTheme.colorBrandStroke2 = brandColors.brand80; // Active border color

darkTheme.colorBrandForeground1 = brandColors.brand80; // Active text color
darkTheme.colorBrandForeground2 = brandColors.brand80; // Active text color
darkTheme.colorBrandStroke1 = brandColors.brand80; // Active border color
darkTheme.colorBrandStroke2 = brandColors.brand80; // Active border color

interface BrandThemeProviderProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

export const BrandThemeProvider: React.FC<BrandThemeProviderProps> = ({ 
  children, 
  theme = 'light' 
}) => {
  const currentTheme = theme === 'light' ? lightTheme : darkTheme;
  
  return (
    <FluentProvider theme={currentTheme}>
      {children}
    </FluentProvider>
  );
};
