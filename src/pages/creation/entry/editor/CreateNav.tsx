import { Avatar, Box, HStack, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { LogoBlack } from '../../../../components/nav';
import {
  ButtonComponent,
  IconButtonComponent,
} from '../../../../components/ui';
import { useAuthContext } from '../../../../context';
import { isMobileMode } from '../../../../utils';
import { MdOutlineArrowBackIos } from 'react-icons/md';

interface ICreateNavProps {
  isSaving: boolean;
  onSave: () => void;
  saveText?: string;
  onPreview?: () => void;
  onBack?: () => void;
}

export const CreateNav = ({
  isSaving,
  saveText,
  onSave,
  onPreview,
  onBack,
}: ICreateNavProps) => {
  const isMobile = isMobileMode();

  const { user } = useAuthContext();

  return (
    <>
      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        background={'rgba(252,252,252,0.9)'}
        // borderBottom={showBorder ? '1px solid rgba(0,0,0,0)' : '1px solid rgba(233,233,233,0.9)'}
        borderBottom={'1px solid rgba(233,233,233,0.9)'}
        boxSizing="border-box"
        position="fixed"
        backdropFilter="blur(2px)"
        top={0}
        left={0}
        zIndex={1000}
      >
        <Box
          display="flex"
          width="100%"
          justifyContent="space-between"
          margin={isMobile ? '10px' : '15px 40px 15px 40px'}
        >
          <HStack spacing="5px" justifyContent="center" alignItems="center">
            <LogoBlack />
            <Avatar height="40px" width="40px" src={user.imageUrl} />
            <Text fontWeight={600} fontSize="16px">
              {user.username}
            </Text>
          </HStack>
          <HStack>
            {onBack && (
              <ButtonComponent
                paddingX="6px"
                aria-label="back"
                onClick={onBack}
              >
                <MdOutlineArrowBackIos />
              </ButtonComponent>
            )}
            <ButtonComponent isDisabled={isSaving} onClick={onSave}>
              {saveText}
            </ButtonComponent>
            {onPreview && (
              <ButtonComponent primary onClick={onPreview}>
                Preview
              </ButtonComponent>
            )}
          </HStack>
        </Box>
      </Box>
    </>
  );
};
