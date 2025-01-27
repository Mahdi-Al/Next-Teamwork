"use server";
import { revalidateTag } from "next/cache";
export const getQuestion = async (formData) => {
  await fetch("http://localhost:3000/api/v1/question", {});
  revalidateTag("questions");
};
export const addQuestion = async (formData) => {
  await fetch("http://localhost:3000/api/v1/question", {
    method: "POST",
    status: 201,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  revalidateTag("questions");
};
export const deleteQuestion = async (id) => {
  const response = await fetch(`http://localhost:3000/api/v1/question`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }), // Send the ID in the request body
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to delete question.");
  }

  revalidateTag("questions"); // Revalidate the cache after deletion
};
