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
                style={{
                  backgroundColor: "#bdbdbdda",
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 50,
                  minWidth: 100,
                  width: "auto",
                }}
                onPress={() => {
                  setShowAlertDialog(false);
                  onCancel && onCancel();
                }}
              >
                <Text>Cancelar</Text>
              </Button>
              <Button
                sx={{
                  backgroundColor: "#FF948D",
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 50,
                  width: "auto",
                  minWidth: 100,
                }}
                action="negative"
                onPress={() => {
                  setShowAlertDialog(false);
                  onConfirm && onConfirm();
                }}
              >
                <Text>Concluir</Text>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
  );
};

export default DialogModal;
