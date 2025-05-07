
import React from "react";
import { LucideIcon, LucideProps } from "lucide-react";

interface UntitledIconProps extends Omit<LucideProps, 'ref'> {
  icon: LucideIcon;
}

/**
 * UntitledIcon - A wrapper for Lucide icons that applies Untitled UI styling
 * 
 * This component takes any Lucide icon and applies a thicker stroke width (3.5)
 * to match the Untitled UI design system's icon style.
 * 
 * @example
 * ```tsx
 * import { Send } from 'lucide-react';
 * import { UntitledIcon } from '@/components/ui/untitled-icon';
 * 
 * <UntitledIcon icon={Send} />
 * ```
 */
export const UntitledIcon = ({
  icon: Icon,
  strokeWidth = 3.5,
  size = 20,
  ...props
}: UntitledIconProps) => {
  return <Icon strokeWidth={strokeWidth} size={size} {...props} />;
};
