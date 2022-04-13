export const PROJECT_DATA = [
    {
        icon: '/icons/mammut.ico',
        projectName: 'Mammut',
        slug: 'mammut',
        connections: [
            {
                name: 'Auth0',
                status: true,
                relatedTo: 'MammutIO',
            },
            {
                name: 'iShop',
                status: true,
                relatedTo: 'MammutIO',
            },
            {
                name: 'Algolia',
                status: true,
            },
        ],
    },
    {
        icon: '/icons/foam_icon.png',
        projectName: 'Foam',
        slug: 'foam',
    },
    {
        icon: '/icons/landofride.ico',
        projectName: 'Land of Ride',
        slug: 'land-of-ride',
    },
    {
        icon: '/icons/aubade_icon.png',
        projectName: 'Aubade',
        slug: 'aubade',
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
        codeFile: '',
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
        projectName: 'Foam',
        projectIcon: '/icons/foam_icon.png',
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
