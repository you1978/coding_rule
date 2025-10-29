import { useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';

interface CopyButtonProps {
  /** The text to be copied to clipboard */
  text: string;
  /** Additional class name for styling */
  className?: string;
  /** Button label (default: 'Copy') */
  label?: string;
  /** Success message (default: 'Copied!') */
  successMessage?: string;
  /** Callback when copy is successful */
  onCopy?: () => void;
}

/**
 * A button component that copies text to clipboard
 * @example
 * <CopyButton text="Text to copy" />
 */
export const CopyButton = ({
  text,
  className = '',
  label = 'Copy',
  successMessage = 'Copied!',
  onCopy,
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    const success = await copyToClipboard(text);
    
    if (success) {
      setIsCopied(true);
      onCopy?.();
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-1 rounded border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${className}`}
      aria-label={`${isCopied ? successMessage : `Copy to clipboard: ${text}`}`}
      disabled={isCopied}
    >
      <span className="sr-only">{isCopied ? successMessage : `Copy: ${text}`}</span>
      <span aria-hidden>
        {isCopied ? (
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {successMessage}
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 text-slate-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2v-5a1 1 0 112 0v5a4 4 0 01-4 4H6a4 4 0 01-4-4V5a4 4 0 014-4h3a1 1 0 010 2H6z" />
              <path d="M16 6a1 1 0 01-1-1V3a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2z" />
            </svg>
            {label}
          </span>
        )}
      </span>
    </button>
  );
};
