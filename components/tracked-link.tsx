'use client';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { trackEvent } from './analytics';
export function TrackedLink({ event, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { event: string; children: ReactNode }) { return <a {...props} onClick={(e) => { props.onClick?.(e); trackEvent(event, { link_url: props.href ?? '' }); }}>{children}</a>; }
