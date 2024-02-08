import React, { ReactNode } from "react";
import { View } from "react-native";

import DrawerSearchInput from "components/DrawerSearchInput";

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetFlatList,
} from "@gluestack-ui/themed";

type DrawerProps = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  item?: (item: any) => ReactNode;
  data: any[];
  searchBarLabel: string;
  onSearch: (text: string) => void;
};
const Drawer = ({
  data,
  onClose,
  isOpen,
  item: renderItem,
  onSearch,
  searchBarLabel,
}: DrawerProps) => {
  return (
    <View>
      <Actionsheet onClose={onClose} isOpen={isOpen}>
        <ActionsheetBackdrop />
        <ActionsheetContent bgColor="#C3EBFF" h="$2/3" zIndex={999}>
          <ActionsheetDragIndicatorWrapper marginVertical="$3">
            <DrawerSearchInput
              onChange={onSearch}
              placeholder={searchBarLabel || "Buscar"}
            />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetFlatList
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            data={data}
            renderItem={({ item }) => <View>{renderItem(item)}</View>}
          />
        </ActionsheetContent>
      </Actionsheet>
    </View>
  );
};

export default Drawer;
