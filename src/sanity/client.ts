// import { createClient } from "next-sanity";

// export const client = createClient({
//   projectId: "zcmn8w05",
//   dataset: "production",
//   apiVersion: "2024-01-01",
//   useCdn: false,
// });

// 1. Install the Sanity client package:
// npm install @sanity/client

// 2. Import createClient from the Sanity client library
import { createClient } from '@sanity/client'

// 3. Configure your Sanity client with your project details
export const client = createClient({
  projectId: 'zcmn8w05', // Replace with your Sanity project ID
  dataset: 'production', // Replace with your Sanity dataset name
  useCdn: false, // Set to `false` for real-time data, `true` for cached data
  apiVersion: '2025-02-06', // Use the current date (YYYY-MM-DD) for the latest API version
})
