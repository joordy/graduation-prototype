import { uuid } from 'uuidv4'
import moment from 'moment'

import Breadcrumbs from '_components/blocks/Breadcrumbs'
import NotificationDetails from '_components/scopes/notifications/Details'
import Page from '_components/scopes/global/Page'

import { NOTIFICATION_DATA } from '_utils/database/dataset'
import { supabase } from '_utils/database/init'
import { capitalizeFirstLetter } from '_utils/helpers/stringHelpers'

var m1 = moment().subtract(5, 'h')
var m2 = moment().subtract(55, 'h')
var m3 = moment().subtract(1, 'd')
var m4 = moment().subtract(1, 'm')

const YESTERDAY = new Date(new Date().setDate(new Date().getDate() - 3))
const TODAY = new Date()
const STATUS = [
    {
        index: 6,
        state: 'Moved to BiA QA',
        date: moment([
            TODAY.getFullYear(),
            TODAY.getMonth(),
            TODAY.getDate(),
            TODAY.getHours(),
            TODAY.getMinutes() <= 1 ? 0 : 1,
            10,
        ]).fromNow(),
    },
    {
        index: 5,
        state: 'Moved to Mammut QA',
        date: moment([
            TODAY.getFullYear(),
            TODAY.getMonth(),
            TODAY.getDate(),
            TODAY.getHours() - 1,
            TODAY.getMinutes() <= 1 ? 0 : 1,
            10,
        ]).fromNow(),
    },
    {
        index: 4,
        state: 'Moved to Ready for release',
        date: moment([
            TODAY.getFullYear(),
            TODAY.getMonth(),
            TODAY.getDate(),
            8,
            10,
            30,
        ]).fromNow(),
    },
    {
        index: 3,
        state: 'Moved to Production',
        date: moment([
            TODAY.getFullYear(),
            TODAY.getMonth(),
            TODAY.getDate() - 1,
            18,
            9,
            30,
        ]).fromNow(),
    },
    {
        index: 2,
        state: 'Currently in Progress',
        date: moment([
            TODAY.getFullYear(),
            TODAY.getMonth(),
            TODAY.getDate() - 1,
            18,
            10,
            30,
        ]).fromNow(),
    },
    {
        index: 1,
        state: 'Reported on backlog',
        date: moment([
            TODAY.getFullYear(),
            TODAY.getMonth(),
            TODAY.getDate() - 1,
            18,
            8,
            30,
        ]).fromNow(),
    },
]

const Notification = ({
    notification = {},
    notificationNotFound = false,
    ...props
}) => {
    const {
        name,
        service,
        message,
        projectIcon,
        slug,
        specificCodeFile,
        errorMessage,
        time,
        ...data
    } = notification

    return (
        <Page topNav={true}>
            {notificationNotFound ? (
                <p>No notification can be found</p>
            ) : (
                <>
                    <h1 className="mt-8 text-3xl font-bold">
                        {`${capitalizeFirstLetter(
                            name,
                        )} — ${capitalizeFirstLetter(service)} ${message}`}
                    </h1>

                    <NotificationDetails
                        STATUS={STATUS}
                        notification={notification}
                    />
                </>
            )}
        </Page>
    )
}

export async function getServerSideProps({ params }) {
    // const id = uuid()

    // const { data: injectedData, error: injectedError } = await supabase
    //     .from('notifications')
    //     .insert([
    // {
    //     projectIcon: '/icons/mammut.ico',
    //     service: 'vercel',
    //     name: 'mammut',
    //     notification_id: id,
    //     slug: id,
    //     message: 'Vercel can`t reach the website',
    //     status: 'inProgress',
    //     errorMessage: [`StatusCode 500 - Internal server Error`],
    //     codeFile: false,
    //     codeFunction: false,
    //     codeLine: false,
    //     priorityLevel: 'High',
    // },
    //     ])

    // // // const { data, error } = await supabase
    // // //     .from('notifications')
    // // //     .update({ time: [2022, 4, 10, 18, 2, 10] })
    // // //     .match({ name: params?.slug[0], notification_id: params?.slug[2] })

    // console.log('insert data', injectedData, injectedError)

    const { data, error } = await supabase
        .from('notifications')
        .select()
        .match({ name: params?.slug[0], notification_id: params?.slug[2] })
        .single()

    if (!data) {
        return {
            props: { notificationNotFound: true },
        }
    }
    return {
        props: { notificationNotFound: false, notification: data },
    }
}

export default Notification
