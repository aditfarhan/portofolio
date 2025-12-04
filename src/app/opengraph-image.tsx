/**
 * Dynamic Open Graph Image Generation
 * 
 * Generates OG images dynamically using Next.js ImageResponse.
 * This creates beautiful social media previews with your branding.
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
 * Creates a professional OG image with:
 * - Custom branding
 * - Gradient background
 * - Profile initials (MAF)
 * - Title and description
 */
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
            >
                {/* Glow effect background */}
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                />

                {/* Main content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '24px',
                        zIndex: 1,
                    }}
                >
                    {/* Avatar circle with MAF */}
                    <div
                        style={{
                            width: '140px',
                            height: '140px',
                            borderRadius: '50%',
                            border: '3px solid rgba(255, 255, 255, 0.9)',
                            background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.95) 0%, rgba(20, 20, 20, 0.95) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        MAF
                    </div>

                    {/* Name */}
                    <div
                        style={{
                            fontSize: '56px',
                            fontWeight: 'bold',
                            color: '#ffffff',
                            letterSpacing: '-0.02em',
                            textAlign: 'center',
                        }}
                    >
                        Muhammad Aditia Farhan
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: '36px',
                            fontWeight: '600',
                            color: '#3b82f6',
                            textAlign: 'center',
                        }}
                    >
                        Software Engineer
                    </div>

                    {/* Tech stack */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            fontSize: '24px',
                            color: 'rgba(255, 255, 255, 0.7)',
                        }}
                    >
                        <span>React</span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
                        <span>Next.js</span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
                        <span>TypeScript</span>
                        <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
                        <span>5+ Years</span>
                    </div>
                </div>

                {/* Bottom accent line */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        height: '4px',
                        background: 'linear-gradient(90deg, transparent 0%, #3b82f6 50%, transparent 100%)',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    );
}
