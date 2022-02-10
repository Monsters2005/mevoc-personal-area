import React, { ReactInstance, useState, useEffect } from 'react';

export const withVisibilityTimeout = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  timeout: number
  // eslint-disable-next-line react/function-component-definition
) => function (props: P) {
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
      const timeoutID = setTimeout(() => {
        setVisible(true);
      }, timeout);

      return () => {
        clearTimeout(timeoutID);
      };
    }, []);

    return (
      <WrappedComponent
        {...props}
        style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      />
    );
  };
