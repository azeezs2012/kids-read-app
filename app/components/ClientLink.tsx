"use client";

import Link from "next/link";

export default function ClientLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
      onClick={() => {
        // Cancel any ongoing speech before navigating away
        if (typeof window !== 'undefined') {
          window.speechSynthesis.cancel();
        }
      }}
    >
      {children}
    </Link>
  );
} 