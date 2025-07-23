import { useTranslation } from 'react-i18next';
import styles from './BreadcrumbsCard.module.css';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';
import React from 'react';

const BreadcrumbsCard = React.memo(({ region }) => {
    const { t } = useTranslation();
    const { closeShowLanguageOptions } = useGlobalContext()
    return (
        <div onClick={closeShowLanguageOptions} className={styles["breadcrumbs"]}>
            {region ? <><a href="/">{t('homeBreadcrumb')}</a> &gt; <Link to={`/search/${region}`}>{region}</Link> &gt; <span>{t('restaurants')}</span></>
                : <><a href="/">{t('homeBreadcrumb')}</a> &gt; <span>{t('restaurants')}</span></>}
        </div>
    )
})

export default BreadcrumbsCard