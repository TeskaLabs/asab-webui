import React from 'react';
import { useTranslation } from "react-i18next";
import { useSelector } from 'react-redux';

export default function PreviewFlag({ name }) {
    const flagName = name?.toLowerCase();
    const { t } = useTranslation();
    const theme = useSelector(state=>state?.theme);
 
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
            <span className={`badge badge-warning me-4 preview-flag ${theme == "light" ? "preview-flag-light" : "preview-flag-dark"}`}>
                { name }
            </span>
        </>
  )
}
