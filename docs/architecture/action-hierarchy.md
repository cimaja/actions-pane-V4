sectionHeader: Large, bold section headers (like "Connectors")
expandableGroup: Light gray background for top-level expandable groups
nestedGroup: Slightly darker background for nested groups
Action items: Smaller font size (base200) with neutral foreground color


Category-Based Color Scheme:
Data (amber): #FEF3C7 background, #CA5010 icon
Integration (blue): #E0E7FF background, #4F6BED icon
Interaction (orange): #FFEDD5 background, #EA580C icon
Logic (red): #FFE4E6 background, #E11D48 icon
System (green): #D1FAE5 background, #059669 icon
Custom actions (purple): #F3E8FF background, #881798 icon
Connectors (light blue): #E5F1FB background, #0078D4 icon
Scripting (teal): #E6FFFA background, #00A381 icon



LibraryCategoryType = 'Built-in' | 'Connectors' | 'Custom Actions' | 'UI Collections' | 'Templates';

Tags automatically creates categories for modules but for a module to show you need to import it in index.ts src/data/mock/modules/index.ts