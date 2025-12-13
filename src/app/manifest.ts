import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Pensieri.',
        short_name: 'Pensieri.',
        description: 'A sanctuary for thoughtful writing and deep reading.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ccb869ff', // bg-primary
        theme_color: '#14130fff',
        icons: [
            {
                src: '/inkwise.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/inkwise.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}
