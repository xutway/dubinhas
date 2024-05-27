import React from "react";
import { Text } from "react-native";

import { LogOutIcon } from "lucide-react-native";

import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  ButtonGroup,
  ButtonText,
  Center,
  CloseIcon,
  Icon,
  InputIcon,
  Pressable,
} from "@gluestack-ui/themed";

interface Props {
  title: string;
  bodyText: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  isOpen?: boolean;
  hideIcon?: boolean;
}

const DialogModal: React.FC<Props> = ({
  title,
  bodyText,
  onCancel,
  onConfirm,
  hideIcon,
  isOpen,
}) => {
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  return (
    <Center>
      {!hideIcon && (
        <Pressable onPress={() => setShowAlertDialog(true)}>
          <InputIcon as={LogOutIcon} color="#FF948D" size="lg" />
        </Pressable>
      )}
      <AlertDialog
        isOpen={showAlertDialog || isOpen}
        onClose={() => {
          setShowAlertDialog(false);
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text> {title}</Text>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>{bodyText}</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false);
                  onCancel && onCancel();
                }}
              >
                <ButtonText>Cancelar</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                  setShowAlertDialog(false);
                  onConfirm && onConfirm();
                }}
              >
                <ButtonText>Confirmar</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
};

export default DialogModal;
