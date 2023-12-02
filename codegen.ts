import { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv'; 
dotenv.config();

const apiURL = process.env.EXPO_PUBLIC_API_URL_GRAPHQL as string;
const apiKey = process.env.EXPO_PUBLIC_API_KEY as string;


const config: CodegenConfig = {
  schema: {
    [apiURL]: {
        headers: {
          apikey: apiKey
        }
      }
  },
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ['src/**/*.{graphql,js,ts,jsx,tsx}}'],
  generates: {
    './app/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  },
  ignoreNoDocuments: true,
};

export default config;