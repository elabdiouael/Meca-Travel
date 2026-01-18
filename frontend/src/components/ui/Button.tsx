import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}

export default function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button 
      className={`${styles.btn} ${variant === 'primary' ? styles.primary : styles.outline}`} 
      {...props}
    >
      {children}
    </button>
  );
}