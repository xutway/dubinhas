import dotenv from "dotenv";

import { CodegenConfig } from "@graphql-codegen/cli";
import { addTypenameSelectionDocumentTransform } from "@graphql-codegen/client-preset";

dotenv.config();

const apiURL = process.env.EXPO_PUBLIC_API_URL_GRAPHQL as string;
const apiKey = process.env.EXPO_PUBLIC_API_KEY as string;

const config: CodegenConfig = {
  schema: {
    [apiURL]: {
      headers: {
        apikey: apiKey,
      },
    },
  },
  documents: "src/**/*.{graphql,js,ts,jsx,tsx}",
  overwrite: true,
  ignoreNoDocuments: true,
  generates: {
    "src/gql/": {
      preset: "near-operation-file",
      presetConfig: {
        extension: ".generated.tsx",
        baseTypesPath: "graphql.ts",
      },
      documentTransforms: [addTypenameSelectionDocumentTransform],
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        withHooks: true,
        scalars: {
          UUID: "string",
          Date: "string",
          Time: "string",
          Datetime: "string",
          JSON: "string",
          BigInt: "string",
          BigFloat: "string",
          Opaque: "any",
        },
      },
    },
  },
  // documents: "src/**/*.tsx",
  // overwrite: true,
  // ignoreNoDocuments: true,
  // generates: {
  //   "src/gql/": {
  //     preset: "client",
  //     documentTransforms: [addTypenameSelectionDocumentTransform],
  //     plugins: [],
  //     config: {
  //       scalars: {
  //         UUID: "string",
  //         Date: "string",
  //         Time: "string",
  //         Datetime: "string",
  //         JSON: "string",
  //         BigInt: "string",
  //         BigFloat: "string",
  //         Opaque: "any",
  //       },
  //     },
  //   },
  // },
  // hooks: {},
};

export default config;
