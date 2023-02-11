import React, { useMemo } from 'react';
import { IButtonProps, Button as NativeButton, Spinner } from 'native-base';

interface ButtonProps extends IButtonProps {
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  ...props
}) => {
  const actualChildren = useMemo(() => {
    if (loading) {
      return <Spinner color="white" />;
    }

    return children;
  }, [loading, children]);

  return (
    <NativeButton fontWeight={700} width={260} {...props}>
      {actualChildren}
    </NativeButton>
  );
};
