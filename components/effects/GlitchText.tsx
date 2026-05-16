'use client';

type Props = {
  text: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

export default function GlitchText({ text, as: Tag = 'span', className = '' }: Props) {
  return (
    // @ts-expect-error dynamic tag
    <Tag data-text={text} className={`glitch ${className}`}>
      {text}
    </Tag>
  );
}
