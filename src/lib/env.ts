/**
 * Environment Variables Validation
 * 
 * Type-safe runtime validation of environment variables using Zod.
 * Catches missing or invalid env vars at build time.
 * 
 * @module lib/env
 */

import { z } from 'zod';

/**
 * Environment variables schema
 * 
 * Validates all required and optional environment variables.
 * Provides TypeScript autocomplete and runtime checks.
 */
const envSchema = z.object({
    // Node environment
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    // Public variables (accessible in browser)
    NEXT_PUBLIC_SITE_URL: z
        .string()
        .url()
        .default('https://aditfarhan-portofolio.vercel.app'),

    // Optional: Analytics and monitoring
    NEXT_PUBLIC_GA_ID: z.string().optional(),
    NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),

    // Optional: Vercel analytics
    NEXT_PUBLIC_VERCEL_ANALYTICS: z
        .enum(['true', 'false'])
        .transform((val) => val === 'true')
        .optional(),
});

/**
 * Validated and typed environment variables
 * 
 * Use this instead of process.env for type safety.
 * 
 * @example
 * ```ts
 * import { env } from '@/lib/env';
 * 
 * const siteUrl = env.NEXT_PUBLIC_SITE_URL; // Type-safe!
 * ```
 */
export const env = envSchema.parse(process.env);

/**
 * Type of validated environment variables
 */
export type Env = z.infer<typeof envSchema>;
