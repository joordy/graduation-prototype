import Breadcrumbs from '_components/blocks/Breadcrumbs'

const TopNavigation = ({ breadCrumbs = false }) => {
    return (
        <section className={'desktop:mb-4 desktop:mt-2 '}>
            {breadCrumbs && (
                <div className="hidden desktop:block">
                    <Breadcrumbs />
                </div>
            )}
        </section>
    )
}
export default TopNavigation
