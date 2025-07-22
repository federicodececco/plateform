import { useTranslation } from 'react-i18next';
import styles from './BreadcrumbsCard.module.css';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/GlobalContext';

export default function BreadcrumbsCard({ region }) {
    const { t } = useTranslation();
    const { closeShowLanguageOptions } = useGlobalContext()
    return (
        <div onClick={closeShowLanguageOptions} className={styles["breadcrumbs"]}>
            {region ? <><a href="/">{t('homeBreadcrumb')}</a> &gt; <Link to={`/search/${region}`}>{region}</Link> &gt; <span>{t('restaurants')}</span></>
                : <><a href="/">{t('homeBreadcrumb')}</a> &gt; <span>{t('restaurants')}</span></>}
        </div>
    )
}