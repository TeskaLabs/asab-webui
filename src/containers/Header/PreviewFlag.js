import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

export default function PreviewFlag({ name }) {
    const flagName = name?.toLowerCase();
    const { t } = useTranslation();
    const theme = useSelector(state=>state?.theme);

    useEffect(() => {
        const element = document.querySelector('.preview-flag');
        if (element) {
          element.classList.toggle('preview-flag-dark', theme === 'dark');
          element.classList.toggle('preview-flag-light', theme === 'light');
        }
    }, [theme]);
 
    if(flagName === "preview") {
        name = t("AnalysisContainer|Preview")
    } else if(flagName === "alpha") {
        name = "Alpha";
    } else if(flagName === "beta") {
        name = "Beta";
    } else {
        return null;
    }

    return (
        <>
            <span className="badge badge-warning mr-4 preview-flag">
                { name }
            </span>
        </>
  )
}
