import React, { useEffect, useState } from 'react';
import { Jodit } from 'jodit';
// import 'jodit/build/jodit.min.css';

interface JoditEditorWrapperProps {
  value: string;
  onChange: (value: string) => void;
  className: string;
}

const JoditEditorWrapper: React.FC<JoditEditorWrapperProps> = ({ value, onChange, className }) => {
  const [JoditEditor, setJoditEditor] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    import('jodit-react').then((module) => {
        // @ts-ignore
      setJoditEditor(() => module.default);
    });
  }, []);

  if (!JoditEditor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className={className}>
        <JoditEditor
        // @ts-ignore
          value={value}
          config={{
            readonly: false, // all options from https://xdsoft.net/jodit/doc/
          }}
          // @ts-ignore
          onBlur={(newContent) => onChange(newContent)}
        />
    </div>
  );
};

export default JoditEditorWrapper;