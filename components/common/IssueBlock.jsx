import {
    checkIfValueExist,
    getValueInArrayCounter,
} from '_utils/helpers/arrayHelpers'

import Notification from '_components/common/notifications/Notification'

const IssueBlock = ({
    showTitle,
    issueTitle,
    issueStatus,
    emptyText,
    notifications,
}) => {
    return (
        <article>
            {showTitle && (
                <h2 className="mb-2 font-[500]">
                    {issueTitle}
                    <span className="text-sm">
                        {` (${getValueInArrayCounter(
                            notifications,
                            'status',
                            issueStatus,
                        )})`}
                    </span>
                    :
                </h2>
            )}
            {checkIfValueExist(notifications, 'status', issueStatus) ? (
                <ul className="flex flex-col gap-y-4">
                    {notifications.map((data, i) => {
                        if (data.status === issueStatus)
                            return <Notification data={data} key={i} />
                    })}
                </ul>
            ) : (
                <p className="text-xs">{emptyText}</p>
            )}
        </article>
    )
}

export default IssueBlock
