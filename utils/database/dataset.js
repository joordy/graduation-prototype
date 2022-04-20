export const PROJECT_DATA = [
    {
        icon: '/icons/mammut.ico',
        projectName: 'Mammut',
        slug: 'mammut',
        status: true,
        connections: [
            {
                name: 'Vercel',
                icon: '/icons/mammut.ico',
                status: true,
                relatedTo: 'Mammut',
            },
            {
                name: 'Contentful',
                icon: '/icons/mammut.ico',
                status: false,
                relatedTo: 'Mammut',
            },
            {
                name: 'Auth0',
                icon: '/icons/mammut.ico',
                status: true,
                relatedTo: 'MammutIO',
            },
            {
                name: 'iShop',
                icon: '/icons/mammut.ico',
                status: true,
                relatedTo: 'MammutIO',
            },
            {
                name: 'MailChimp',
                icon: '/icons/mammut.ico',
                status: false,
                relatedTo: 'MammutIO',
            },
            {
                name: 'Algolia',
                icon: '/icons/mammut.ico',
                status: true,
            },
        ],
    },
    {
        icon: '/icons/foam_icon.png',
        projectName: 'Foam',
        slug: 'foam',
        status: true,
        connections: [
            {
                name: 'Vercel',
                icon: '/icons/mammut.ico',
                status: true,
                relatedTo: 'Mammut',
            },
            {
                name: 'Storyblok',
                icon: '/icons/mammut.ico',
                status: true,
                relatedTo: 'Foam',
            },
            {
                name: 'Mailchimp',
                icon: '/icons/mammut.ico',
                status: true,
                relatedTo: 'Foam',
            },
        ],
    },
    {
        icon: '/icons/landofride.ico',
        projectName: 'Land of Ride',
        slug: 'land-of-ride',
        status: true,
        connections: [
            {
                name: 'Vercel',
                icon: '/icons/mammut.ico',
                status: true,
                relatedTo: 'Mammut',
            },
            {
                name: 'Storyblok',
                icon: '/icons/mammut.ico',
                status: true,
                relatedTo: 'Foam',
            },
        ],
    },
    {
        icon: '/icons/aubade_icon.png',
        projectName: 'Aubade',
        slug: 'aubade',
        status: true,
        connections: [
            {
                name: 'Vercel',
                icon: '/icons/mammut.ico',
                status: true,
                relatedTo: 'Mammut',
            },
            {
                name: 'Storyblok',
                icon: '/icons/mammut.ico',
                status: true,
                relatedTo: 'Foam',
            },
        ],
    },
]

export const NOTIFICATION_DATA = [
    {
        projectName: 'Mammut',
        projectIcon: '/icons/mammut.ico',
        name: 'mammut',
        slug: '18_04_2022_0001',
        intro: 'Contentful could not fetch any data',
        errorMessage: `
            error - pages/products/[sku].jsx (33:44) @ Products

            TypeError: Cannot read property 'map' of undefined
            
            31 |    {
            32 |        {product && (
            33 |            product.slug.map(({ name, icon, status }, i) => {
                                   ^
            34 |                return (
            35 |                    <li
            36 |                        key={i}`,
        specificCodeFile: 'pages/products/[sku].jsx',
        codeFunction: '',
        codeLine: '',
        priorityLevel: '',
    },
    {
        projectName: 'Aubade',
        projectIcon: '/icons/aubade_icon.png',
        name: 'aubade',
        slug: '23-456',
        intro: 'Storyblok stopped working',
    },
    {
        // projectName: 'Foam',
        // projectIcon: '/icons/foam_icon.png',
        projectName: 'Mammut',
        projectIcon: '/icons/mammut.ico',
        name: 'mammut',
        slug: '34-567',
        intro: 'MailChimp stopped working',
    },
    {
        projectName: 'Land of Ride',
        projectIcon: '/icons/landofride.ico',
        name: 'land-of-ride',
        slug: '45-678',
        intro: 'Storyblok stopped working',
    },
]
