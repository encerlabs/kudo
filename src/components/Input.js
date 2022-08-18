import React from 'react';
import { IoPaperPlane } from 'react-icons/io5';

export default function Input(props) {
  const { ...rest } = props;
  return (
    <div className="_input_container">
      <input {...rest} className="_input" />
      <IoPaperPlane className="_input_submit" />
    </div>
  );
}
