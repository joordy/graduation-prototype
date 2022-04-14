export const PROJECT_DATA = [
    {
        icon: '/icons/mammut.ico',
        projectName: 'Mammut',
        slug: 'mammut',
        status: true,
        connections: [
            {
                name: 'Contentful',
                icon: '/icons/mammut.ico',
                status: true,
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
        slug: '12345',
        shortDescription: 'Contentful stopped working',
        errorMessage: '',
        specificCodeFile: '_components/scopes/DummyComponent.jsx',
        codeFunction: '',
        codeLine: '',
        priorityLevel: '',
    },
    {
        projectName: 'Aubade',
        projectIcon: '/icons/aubade_icon.png',
        slug: '23-456',
        shortDescription: 'Storyblok stopped working',
    },
    {
        // projectName: 'Foam',
        // projectIcon: '/icons/foam_icon.png',
        projectName: 'Mammut',
        projectIcon: '/icons/mammut.ico',
        slug: '34-567',
        shortDescription: 'MailChimp stopped working',
    },
    {
        projectName: 'Land of Ride',
        projectIcon: '/icons/landofride.ico',
        slug: '45-678',
        shortDescription: 'Storyblok stopped working',
    },
]
