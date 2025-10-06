
import React, { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

interface AnimatedNumberProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ from = 0, to, duration = 1.5, className, prefix = '', suffix = '' }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (isInView) {
      const node = nodeRef.current;
      if (node) {
        const controls = animate(from, to, {
          duration,
          onUpdate(value) {
            node.textContent = prefix + Math.round(value).toString() + suffix;
          },
        });
        return () => controls.stop();
      }
    }
  }, [from, to, duration, isInView, prefix, suffix]);

  return <span ref={nodeRef} className={className}>{prefix}{from}{suffix}</span>;
};

export default AnimatedNumber;
