import React from 'react';
import { 
  makeStyles, 
  Text, 
  tokens
} from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: tokens.spacingVerticalXXL,
    textAlign: 'center',
    gap: tokens.spacingVerticalM,
    height: '100%',
    width: '100%'
  },
  icon: {
    fontSize: '32px',
    color: tokens.colorBrandForeground1,
    marginBottom: tokens.spacingVerticalM
  },
  title: {
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase500,
    marginBottom: tokens.spacingVerticalS,
    textAlign: 'center',
    maxWidth: '280px'
  },
  description: {
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalL,
    textAlign: 'center',
    maxWidth: '280px'
  }
});

export interface EmptyStateProps {
  image?: React.ReactNode;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  image, 
  title, 
  description, 
  action 
}) => {
  const styles = useStyles();
  
  return (
    <div className={styles.container}>
      {image && <div className={styles.icon}>{image}</div>}
      {title && <Text className={styles.title}>{title}</Text>}
      {description && <Text className={styles.description}>{description}</Text>}
      {action && action}
    </div>
  );
};
