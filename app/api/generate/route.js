import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Each flashcard should have a clear question on one side and a concise answer on the other. Follow these guidelines:

1. Create clear and specific questions.
2. Provide brief and accurate answers.
3. Focus on key concepts and important details.
4. Use simple language to ensure clarity.
5. Avoid overly complex or lengthy content.
6. Include a variety of question types (e.g., definitions, examples, comparisons).
7. Ensure that the flashcards cover the main points of the given topic.
8. Aim for a balanced set of flashcards that cover different aspects of the subject.

Your output should be a list of flashcards, each containing a question and its corresponding answer.

Return in the following JSON format:
{
    "flashcards": []
        {
            "front": str,
            "back": str
        }]
}
`

export async function POST(req) {
    const completion = await OpenAI.Chat.completion.create({
        messages: [
            {role: 'system', content: systemPrompt}, 
            {role: 'user', content: data}, 
        ], 
        model: 'gpt-4o', 
        reponse_format: {type: 'json_object'}, 
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcard)
}

