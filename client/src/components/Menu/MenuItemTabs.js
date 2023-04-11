import styles from './Menu.module.scss';

import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const cx = classNames.bind(styles);

function MenuItemTabs({ title, to, icon, activeIcon, classCustom }) {
    return (
        <NavLink to={to} className={(nav) => cx(`${classCustom}-menu-item`, { active: nav.isActive })}>
            <span className={cx(`${classCustom}-icon`)}>{icon}</span>
            <span className={cx(`${classCustom}-active-icon`)}>{activeIcon}</span>
            <span className={cx(`${classCustom}-title`)}>{title}</span>
        </NavLink>
    );
}

MenuItemTabs.propTypes = {
    title: PropTypes.string,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    activeIcon: PropTypes.node.isRequired,
};

export default MenuItemTabs;
