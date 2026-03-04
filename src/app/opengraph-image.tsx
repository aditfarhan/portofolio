/**
 * Dynamic Open Graph Image Generation
 * 
 * Generates elegant, minimalist OG images dynamically using Next.js ImageResponse.
 * Pure minimalism - just the MAF circle on black background.
 * 
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
 */

import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Muhammad Aditia Farhan - Software Engineer Portfolio';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

/**
 * Generate dynamic OG image
 * 
 * Creates an elegant, minimalist OG image with:
 * - Pure black background
 * - MAF circle logo (centered)
 * - Nothing else - pure minimalism
 */
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#0a0a0a',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                {/* Subtle glow effect */}
                <div
                    style={{
                        position: 'absolute',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                {/* MAF Circle - The only element */}
                <div
                    style={{
                        width: '200px',
                        height: '200px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.9)',
                        background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(10, 10, 10, 0.95) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '64px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 0 60px rgba(255, 255, 255, 0.05)',
                        letterSpacing: '0.05em',
                    }}
                >
                    MAF
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
