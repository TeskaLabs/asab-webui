import React from 'react';
import {useTranslation} from "react-i18next";

export default function PreviewFlag({ name }) {
    const flagName = name?.toLowerCase();
    const {t} = useTranslation();

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
            <span className="preview-flag">
                { name }
            </span>
        </>
  )
}
