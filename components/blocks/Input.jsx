import PropTypes from 'prop-types'

const Input = ({
    styles,
    inputStyles,
    textStyles,
    label,
    name = '',
    type = '',
    placeholder = '',
    onChange,
}) => {
    return (
        <label className={styles}>
            <span className={textStyles}>{label}</span>
            <input
                placeholder={placeholder}
                className={inputStyles}
                name={name}
                type={type}
                onChange={onChange}
            />
        </label>
    )
}

Input.defaultProps = {
    label: '',
    name: '',
    type: 'text',
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func,
}

export default Input
