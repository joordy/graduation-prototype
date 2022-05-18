import { supabase } from 'utils/database/init'

const { data, error } = await supabase.from('notifications').select()

// console.log(data)

// const checkStatus = (project, service) => {
//     data.filter((item) => {
//         return item.name === project && item.service === service
//     })
//     return 1
// }

export const PROJECT_DATA = [
    {
        icon: '/icons/mammut.ico',
        projectName: 'Mammut',
        domain: 'mammut.com',
        slug: 'mammut',
        status: true,
        connections: [
            {
                name: 'Vercel',
                priority: 1,
                type: 'Hosting',
                icon: '/icons/vercel.ico',
                status: true,
            },
            {
                name: 'Contentful',
                priority: 1,
                type: 'Site content',
                icon: '/icons/contentful.ico',
                status: true,
            },
            {
                name: 'Mammut IO',
                priority: 1,
                type: 'Products',
                icon: '/icons/mammut.ico',
                status: true,
            },
            {
                name: 'Algolia',
                priority: 2,
                type: 'Search engine',
                icon: '/icons/algolia.ico',
                status: true,
            },
            {
                name: 'Yotpo',
                priority: 3,
                type: 'User reviews',
                icon: '/icons/yotpo.ico',
                status: true,
            },
        ],
    },
    {
        icon: '/icons/foam.ico',
        projectName: 'Foam',
        slug: 'foam',
        status: true,
        connections: [
            {
                name: 'Vercel',
                priority: 1,
                type: 'Hosting',
                icon: '/icons/vercel.ico',
                status: true,
            },
            {
                name: 'Storyblok',
                icon: '/icons/storyblok.ico',
                status: true,
                priority: 1,
                type: 'Site content',
            },
            {
                name: 'Mailchimp',
                icon: '/icons/mailchimp.ico',
                status: true,
                priority: 2,
                type: 'Subscription',
            },
        ],
    },
    {
        icon: '/icons/land-of-ride.ico',
        projectName: 'Land of Ride',
        slug: 'land-of-ride',
        status: true,
        connections: [
            {
                name: 'Vercel',
                priority: 1,
                type: 'Hosting',
                icon: '/icons/vercel.ico',
                status: true,
            },
            {
                name: 'Storyblok',
                icon: '/icons/storyblok.ico',
                status: true,
                priority: 1,
                type: 'Site content',
            },
        ],
    },
    {
        icon: '/icons/aubade.ico',
        projectName: 'Aubade',
        slug: 'aubade',
        status: true,
        connections: [
            {
                name: 'Vercel',
                priority: 1,
                type: 'Hosting',
                icon: '/icons/vercel.ico',
                status: true,
            },
            {
                name: 'Storyblok',
                icon: '/icons/storyblok.ico',
                status: true,
                priority: 1,
                type: 'Site content',
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
        status: 'Currently in progress',
        errorMessage: [
            `error - pages/products/[sku].jsx (33:44) @ Products`,
            ``,
            `TypeError: Cannot read property 'map' of undefined`,
            ``,
            `31 |    {`,
            `32 |        {product && (`,
            `33 |            product.slug.map(({ name, icon, status }, i) => {`,
            `                            ^`,
            `34 |                return (`,
            `35 |                    <li`,
            `36 |                        key={i}`,
        ],
        specificCodeFile: 'pages/products/[sku].jsx',
        codeFunction: '',
        codeLine: '',
        priorityLevel: '',
    },
    {
        projectName: 'Aubade',
        projectIcon: '/icons/aubade.ico',
        name: 'aubade',
        status: 'recently reported',
        slug: '23-456',
        intro: 'Storyblok stopped working',
    },
    {
        // projectName: 'Foam',
        // projectIcon: '/icons/foam_icon.png',
        projectName: 'Mammut',
        projectIcon: '/icons/mammut.ico',
        name: 'mammut',
        status: 'recently reported',
        slug: '34-567',
        intro: 'MailChimp stopped working',
    },
    {
        projectName: 'Land of Ride',
        projectIcon: '/icons/land-of-ride.ico',
        name: 'land-of-ride',
        slug: '45-678',
        status: 'recently reported',
        intro: 'Storyblok stopped working',
    },
]
