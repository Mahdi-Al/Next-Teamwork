import { connectDB, disconnectDB } from "@/db/connectDB";
import Question from "@/db/Models/Question";
import { revalidateTag } from "next/cache";
// GET all Questions
export async function GET() {
  try {
    await connectDB();
    const Questions = await Question.find();
    return new Response(JSON.stringify(Questions), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Questions:", error);
    disconnectDB();
  } finally {
    disconnectDB();
  }
}
// POST a new Question
// POST a new Question
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const newQuestion = new Question(body);

    // Save the new question
    const savedQuestion = await newQuestion.save();

    // Revalidate the cache
    revalidateTag("Questions");

    // Return the saved question along with timestamps
    return new Response(JSON.stringify(savedQuestion), {
      headers: { "Content-Type": "application/json" },
      status: 201, // HTTP status code for created
    });
  } catch (error) {
    console.error("Error saving question:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to save question.",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    disconnectDB();
  }
}

// PATCH answer
export async function PATCH(request) {
  try {
    await connectDB();
    const { id, newAnswer, updatedAnswers } = await request.json();

    let updatedQuestion;

    if (newAnswer) {
      updatedQuestion = await Question.findByIdAndUpdate(
        id,
        { $push: { answer: newAnswer } },
        { new: true }
      );
    } else if (updatedAnswers) {
      updatedQuestion = await Question.findByIdAndUpdate(
        id,
        { answer: updatedAnswers },
        { new: true }
      );
    }

    return new Response(JSON.stringify(updatedQuestion), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating answers:", error);
    disconnectDB();
    return new Response(
      JSON.stringify({ message: "Failed to update answers." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    disconnectDB();
  }
}
export async function DELETE(request) {
  try {
    await connectDB();
    const { id } = await request.json(); // Expecting the ID to be sent in the request body

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return new Response(JSON.stringify({ message: "Question not found." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    revalidateTag("Questions"); // Optionally revalidate the cache if needed

    return new Response(
      JSON.stringify({ message: "Question deleted successfully." }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error deleting question:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete question." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    disconnectDB();
  }
}
