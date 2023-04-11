import styles from './Menu.module.scss';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function MenuTab({ children, className }) {
    return <nav className={cx(`${className}`)}>{children}</nav>;
}

MenuTab.propTypes = {
    children: PropTypes.node.isRequired,
};

export default MenuTab;
