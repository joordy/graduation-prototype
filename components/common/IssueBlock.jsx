import {
    checkIfValueExist,
    getValueInArrayCounter,
} from '_utils/helpers/arrayHelpers'

import Notification from '_components/common/notifications/Notification'

const IssueBlock = ({
    showTitle,
    linked = true,
    notificationType,
    issueTitle,
    issueStatus,
    emptyText,
    notifications,
}) => {
    const counterLength = getValueInArrayCounter(
        notifications,
        'status',
        issueStatus,
    )

    return (
        <article className="overflow-hidden">
            {showTitle && (
                <h2 className="mb-2 font-[500]">
                    {issueTitle}
                    {counterLength >= 1 && (
                        <span className="text-sm">{` (${counterLength}):`}</span>
                    )}
                </h2>
            )}

            {checkIfValueExist(notifications, 'status', issueStatus) ? (
                <ul className="flex flex-col h-full pb-10 overflow-auto gap-y-2">
                    {notifications.map((data, i) => {
                        if (data.status === issueStatus)
                            return (
                                <Notification
                                    linked={linked}
                                    notificationType={notificationType}
                                    data={data}
                                    key={i}
                                />
                            )
                    })}
                </ul>
            ) : (
                <p className="text-xs">{emptyText}</p>
            )}
        </article>
    )
}

export default IssueBlock
