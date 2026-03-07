'use client';

import { type ReactNode, useRef, useEffect, useCallback } from 'react';
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

/**
 * Prevents the browser from selecting nearby text when the user double-clicks
 * the trigger to rapidly open/close the menu.
 *
 * Why this is needed:
 * - Radix suppresses `mousedown` (via pointerdown.preventDefault) when opening.
 * - Chromium's dblclick selection then targets unrelated text elsewhere on the page.
 * Solution: watch `pointerdown` on the trigger (always fires), then block any
 * `selectstart` within 300 ms of that interaction.
 */
function usePreventDoubleClickSelection(ref: React.RefObject<HTMLElement | null>) {
    const blockSelection = useCallback(() => {
        const abortTimer = setTimeout(() => {
            document.removeEventListener('selectstart', prevent);
        }, 300);
        function prevent(e: Event) {
            e.preventDefault();
            clearTimeout(abortTimer);
            document.removeEventListener('selectstart', prevent);
        }
        document.addEventListener('selectstart', prevent);
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        el.addEventListener('pointerdown', blockSelection, { capture: true });
        return () => el.removeEventListener('pointerdown', blockSelection, { capture: true });
    }, [ref, blockSelection]);
}

export function Dropdown({ trigger, children, align = 'end', contentClassName }: DropdownProps) {
    const triggerRef = useRef<HTMLSpanElement>(null);
    usePreventDoubleClickSelection(triggerRef);

    return (
        <DropdownMenu>
            <span ref={triggerRef}>
                <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
            </span>
            <DropdownMenuContent align={align} className={cn(contentClassName)}>
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export { DropdownMenuItem as DropdownItem };
