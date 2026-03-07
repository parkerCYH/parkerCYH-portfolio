'use client';

import { type ReactNode } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DropdownProps {
    /** The element that opens the menu. Rendered with `asChild`, so pass any valid JSX (Button, button, etc.). */
    trigger: ReactNode;
    children: ReactNode;
    align?: 'start' | 'center' | 'end';
    contentClassName?: string;
}

export function Dropdown({ trigger, children, align = 'end', contentClassName }: DropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            <DropdownMenuContent align={align} className={cn(contentClassName)}>
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export { DropdownMenuItem as DropdownItem };
