import React from 'react';

export default function PreviewFlag({ name }) {
    if(!name) {
        return null
    }

    return (
        <>
            <span className="preview-flag">
                { name }
            </span>
        </>
  )
}
