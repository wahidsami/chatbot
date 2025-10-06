import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Use a discriminated union for props to handle polymorphic behavior.
// This ensures type safety whether the component renders as a link or a button.
type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  className?: string;
} & (
  | (Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & { href: string })
  | (Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { href?: undefined })
);

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses = `
    px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 transform 
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    ${fullWidth ? 'w-full block text-center' : 'inline-block'}
  `;

  const variantClasses = {
    primary: 'bg-[#F36A10] text-white hover:bg-[#E45F0C] shadow-lg hover:shadow-xl focus:ring-[#F36A10]',
    secondary: 'bg-transparent text-[#0F2233] border-2 border-[#0F2233] hover:bg-[#0F2233] hover:text-white focus:ring-[#0F2233]',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 },
    transition: { type: 'spring', stiffness: 400, damping: 17 },
  };

  // Fix: Type assertion is used because TypeScript has difficulty inferring types correctly
  // when a rest spread operator is used on a discriminated union.
  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    if (href.startsWith('/')) {
      return (
        <motion.div {...motionProps} className={fullWidth ? 'w-full' : 'inline-block'}>
          <Link to={href} className={combinedClasses} {...anchorProps}>
            {children}
          </Link>
        </motion.div>
      );
    }
    return (
      <motion.div {...motionProps} className={fullWidth ? 'w-full' : 'inline-block'}>
        <a href={href} className={combinedClasses} {...anchorProps}>
          {children}
        </a>
      </motion.div>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <motion.button {...motionProps} className={combinedClasses} {...buttonProps}>
      {children}
    </motion.button>
  );
};

export default Button;