import React, { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';
import styled from 'styled-components';

const Photo = styled.img`
  width: 220px;
  margin-left: auto;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 5px;
`;

type PreviewerProps = React.HTMLAttributes<HTMLElement> & {
  src: string;
  name: string;
};

const Previewer = ({ src, name, ...props }: PreviewerProps) => {
  const photoRef = useRef<HTMLImageElement>(null);
  const { getFieldMeta } = useFormikContext();
  const { value } = getFieldMeta(name);

  useEffect(() => {
    if (!(value instanceof File) || !value.type.startsWith('image/')) return;
    const reader = new FileReader();
    // File reader's load event handler
    const handleLoad = ({ target }: ProgressEvent<FileReader>) => {
      if (!photoRef.current || typeof target?.result !== 'string') return;
      photoRef.current.src = target.result;
    };
    reader.readAsDataURL(value);
    // Attach the load handler to the file reader to handle the load event
    reader.addEventListener('load', handleLoad);
    return () => reader.removeEventListener('load', handleLoad);
  }, [value]);

  return (
    <figure {...props}>
      <Photo ref={photoRef} src={src} />
    </figure>
  );
};

export default Previewer;
