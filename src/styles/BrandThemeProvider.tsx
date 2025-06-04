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
  20: brandColors.brand20,
  30: brandColors.brand30,
  40: brandColors.brand40,
  50: brandColors.brand50,
  60: brandColors.brand60,
  70: brandColors.brand70,
  80: brandColors.brand80,
  90: brandColors.brand90,
  100: brandColors.brand100,
  110: brandColors.brand110,
  120: brandColors.brand120,
  130: brandColors.brand130,
  140: brandColors.brand140,
  150: brandColors.brand150,
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
lightTheme.colorBrandForeground1 = brandColors.brand80; // Primary brand text color
lightTheme.colorBrandForeground2 = brandColors.brand60; // Secondary brand text color
lightTheme.colorBrandStroke1 = brandColors.brand80; // Primary brand border color
lightTheme.colorBrandStroke2 = brandColors.brand60; // Secondary brand border color

darkTheme.colorBrandForeground1 = brandColors.brand80; // Primary brand text color
darkTheme.colorBrandForeground2 = brandColors.brand60; // Secondary brand text color
darkTheme.colorBrandStroke1 = brandColors.brand80; // Primary brand border color
darkTheme.colorBrandStroke2 = brandColors.brand60; // Secondary brand border color

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
