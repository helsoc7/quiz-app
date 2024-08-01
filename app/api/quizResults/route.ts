import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, quizScore, correctAnswers, wrongAnswers } = body;

    // Grundlegende Validierung der Eingabedaten
    if (!userId || typeof quizScore !== 'number' || typeof correctAnswers !== 'number' || typeof wrongAnswers !== 'number') {
      return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
    }

    let existingUser = await prisma.user.findUnique({
      where: { id: userId },
      include: { quizResults: true },
    });

    if (existingUser && existingUser.quizResults && existingUser.quizResults.length > 0) {
      const updatedUserStats = await prisma.quizResult.update({
        where: { id: existingUser.quizResults[0].id },
        data: {
          quizScore: existingUser.quizResults[0].quizScore + quizScore,
          correctAnswers: existingUser.quizResults[0].correctAnswers + correctAnswers,
          wrongAnswers: existingUser.quizResults[0].wrongAnswers + wrongAnswers,
        },
      });
      return NextResponse.json({ updatedUserStats });
    } else {
      const newUser = await prisma.user.update({
        where: { id: userId },
        data: {
          quizResults: {
            create: {
              quizScore: quizScore,
              correctAnswers: correctAnswers,
              wrongAnswers: wrongAnswers,
            },
          },
        },
      });
      return NextResponse.json({ newUser });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}