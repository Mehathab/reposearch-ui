import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';
import { ReactNode } from 'react';

/* eslint-disable-next-line */
export interface SearchModalStateIconProps {
  isPending?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  children?: ReactNode;
}

export function SearchModalStateIcon({
  isPending,
  isError,
  isSuccess,
  children,
  ...restProps
}: SearchModalStateIconProps) {
  if (isPending) return <Spinner color="teal" {...restProps} />;
  if (isSuccess) return <CheckIcon color="green" {...restProps} />;
  if (isError) return <CloseIcon color="red" {...restProps} />;
  return <>{children}</>;
}

export default SearchModalStateIcon;
