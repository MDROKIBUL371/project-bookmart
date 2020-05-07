import React from 'react';

const Fragment = (props) => {
   // eslint-disable-next-line react/prop-types
   const { children } = props;
   return <>{children}</>;
};

export default Fragment;
