import moment from 'moment'

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
const Changelog = ({ title = true, className }) => {
    return (
        <article className={'w-full ' + className}>
            {title && <h3 className="mb-2 text-xl font-bold">Changelog</h3>}
            <ul className="flex flex-col overflow-y-auto ">
                {STATUS.map(({ state, date, index }, i) => {
                    return (
                        <li key={i} className="mb-2 flex justify-between">
                            <div className="flex items-center">
                                <span
                                    className={
                                        ' relative mr-2 h-4 w-4 rounded-full border-2 border-raisinBlack ' +
                                        `after:absolute after:left-[50%] after:bottom-[100%] after:-z-10 after:block after:h-[20px] after:w-[5px] after:-translate-x-1/2 after:bg-raisinBlack after:opacity-50 after:content-[''] ` +
                                        (i == 0 &&
                                            'border-grey-900 border-4 after:hidden')
                                    }
                                />
                                <p>{state}</p>
                            </div>
                            <p>{date}</p>
                        </li>
                    )
                })}
            </ul>
        </article>
    )
}

export default Changelog
