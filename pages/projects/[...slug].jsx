import Details from '_components/scopes/notifications/Details'
import Page from '_components/scopes/global/Page'

import { NOTIFICATION_DATA } from '_utils/database/dataset'
import { supabase } from '_utils/database/init'
import { capitalizeFirstLetter } from '_utils/helpers/stringHelpers'

const Notification = ({
    notification = {},
    notificationNotFound = false,
    ...props
}) => {
    const { name, service, message } = notification

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

                    <main className="pb-24 desktop:pb-0">
                        <Details notification={notification} />
                    </main>
                </>
            )}
        </Page>
    )
}

export async function getServerSideProps({ params }) {
    const { data: note, error: noteError } = await supabase
        .from('notifications')
        .select()
        .match({ name: params?.slug[0], notification_id: params?.slug[2] })

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
