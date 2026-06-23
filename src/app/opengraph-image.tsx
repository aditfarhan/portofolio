import { ImageResponse } from 'next/og';
import { PROFILE_ROLE, PROFILE_STATS } from '@/data/portfolio';

export const runtime = 'edge';
export const alt = `Muhammad Aditia Farhan — ${PROFILE_ROLE} Portfolio`;
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
    const years      = PROFILE_STATS.find(s => s.label === 'years')!;
    const hospitals  = PROFILE_STATS.find(s => s.label === 'hospitals')!;
    const industries = PROFILE_STATS.find(s => s.label === 'industries')!;

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
                    background: '#0a0a0a',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    position: 'relative',
                }}
            >
                {/* Ambient glow */}
                <div
                    style={{
                        position: 'absolute',
                        width: '600px',
                        height: '600px',
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.04) 0%, transparent 70%)',
                        borderRadius: '50%',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />

                {/* MAF mark */}
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: '1.5px solid rgba(255, 255, 255, 0.65)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        marginBottom: '32px',
                        letterSpacing: '0.05em',
                    }}
                >
                    MAF
                </div>

                {/* Name */}
                <div
                    style={{
                        fontSize: '56px',
                        fontWeight: '700',
                        color: '#ffffff',
                        letterSpacing: '-0.025em',
                        marginBottom: '14px',
                        lineHeight: 1.05,
                    }}
                >
                    Muhammad Aditia Farhan
                </div>

                {/* Role */}
                <div
                    style={{
                        fontSize: '24px',
                        color: 'rgba(255, 255, 255, 0.42)',
                        letterSpacing: '-0.01em',
                        marginBottom: '40px',
                    }}
                >
                    {PROFILE_ROLE}
                </div>

                {/* Divider */}
                <div
                    style={{
                        width: '420px',
                        height: '1px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        marginBottom: '28px',
                    }}
                />

                {/* Stats */}
                <div style={{ display: 'flex', gap: '48px' }}>
                    {[years, hospitals, industries].map(stat => (
                        <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '32px', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.02em' }}>
                                {stat.value}{stat.suffix}
                            </span>
                            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
