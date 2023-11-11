import { AvatarType } from "./types";

import { Avatar, AvatarImage, Box } from "@gluestack-ui/themed";

const CustomAvatatr = ({
  item,
  index,
}: {
  item: AvatarType;
  index: number;
}) => {
  const { img } = item;
  return (
    <Box
      key={index}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <Avatar bgColor="$amber600" size="lg" borderRadius="$full">
        <AvatarImage
          source={{
            uri: img,
          }}
        />
      </Avatar>
    </Box>
  );
};

export default CustomAvatatr;
