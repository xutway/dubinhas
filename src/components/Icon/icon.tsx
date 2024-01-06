import { FontAwesome } from "@expo/vector-icons";

export function IconType(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  size: number;
}) {
  return <FontAwesome style={{ marginBottom: -3 }} {...props} />;
}
