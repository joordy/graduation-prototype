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
    background,
    innerWrapper,
}) => {
    const counterLength = getValueInArrayCounter(
        notifications,
        'status',
        issueStatus,
    )

    return (
        <>
            {checkIfValueExist(notifications, 'status', issueStatus) ? (
                <ul
                    className={
                        'flex h-full flex-col gap-y-3 overflow-y-auto px-0 pt-2 ' +
                        innerWrapper
                    }
                >
                    {notifications.map((data, i) => {
                        if (data.status === issueStatus)
                            return (
                                <Notification
                                    linked={linked}
                                    notificationType={notificationType}
                                    data={data}
                                    key={i}
                                    background={background}
                                />
                            )
                    })}
                </ul>
            ) : (
                <p className="pt-2 ml-1 text-xs">{emptyText}</p>
            )}
        </>
    )
}

export default IssueBlock
