import {
  CheckIcon,
  Search2Icon,
  SearchIcon,
  SpinnerIcon,
} from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Box,
  InputRightElement,
  Divider,
  ModalHeader,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import SearchModalStateIcon from './SearchModalStateIcon';

export interface SearchModalProps extends InputProps {
  children?: ReactNode;
  onClose?: () => void;
  isPending?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  isShow: boolean;
  setShowModal: { on: () => void; off: () => void; toggle: () => void };
}

export function SearchModal({
  children,
  value,
  onChange,
  onClose,
  isError,
  isPending,
  isSuccess,
  isShow: isShowModal,
  setShowModal,
  ...restProps
}: SearchModalProps) {
  const handleOnClose = () => {
    setShowModal.off();
    if (onClose) onClose();
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
      <Input {...restProps} isReadOnly={true} onClick={setShowModal.on} />
      <Modal
        isOpen={!!isShowModal}
        onClose={handleOnClose}
        scrollBehavior="inside"
        closeOnOverlayClick
        closeOnEsc
        colorScheme="teal"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <InputGroup borderRadius="3xl">
              <InputLeftElement
                pointerEvents="none"
                height="16"
                children={<Search2Icon color="teal" />}
              />
              <Input
                {...restProps}
                width="md"
                size="lg"
                variant="unstyled"
                height="16"
                value={value}
                onChange={onChange}
              />
              <InputRightElement
                height="16"
                // mr="2"
                children={
                  <SearchModalStateIcon
                    isError={isError}
                    isSuccess={isSuccess}
                    isPending={isPending}
                  />
                }
              />
            </InputGroup>
            {!!children && <Divider orientation="horizontal" />}
          </ModalHeader>
          <ModalBody p="0" borderRadius={'3xl'}>
            {!!children && <Box px="4">{children}</Box>}
          </ModalBody>
        </ModalContent>
      </Modal>
    </InputGroup>
  );
}

export default SearchModal;
