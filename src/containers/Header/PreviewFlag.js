import React from 'react';
import { useSelector } from 'react-redux';

export default function PreviewFlag({ name }) {

    if(!name) {
        return null
    }

  return (
    <>
        <span
            className="preview-flag"
        >
            { name }
        </span>
    </>
  )
}
