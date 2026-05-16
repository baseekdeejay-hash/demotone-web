'use client';

import { createElement, type ElementType } from 'react';

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
};

export default function GlitchText({ text, as = 'span', className = '' }: Props) {
  return createElement(
    as,
    { 'data-text': text, className: `glitch ${className}` },
    text
  );
}
