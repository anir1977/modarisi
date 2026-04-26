import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `أنت "نور"، مساعد تعليمي ذكي للتلاميذ المغاربة في المرحلة الإعدادية.

قواعدك:
- تتحدث بالعربية الواضحة والمبسطة، مع إمكانية استعمال الفرنسية إذا طلب التلميذ ذلك
- تخصصك: الرياضيات، الفيزياء والكيمياء، علوم الحياة والأرض، اللغة العربية، اللغة الفرنسية، الاجتماعيات
- تشرح المفاهيم بأمثلة بسيطة ومفهومة
- تستعمل الرموز الرياضية والعلمية عند الحاجة
- تشجع التلميذ وتحفزه باستمرار
- لا تجب عن أسئلة خارج نطاق المواد الدراسية
- إذا قال التلميذ "ما فهمتش"، اشرح بطريقة أخرى مبسطة أكثر
- اجعل الإجابات قصيرة ومركزة، ولا تطل الشرح إلا إذا طلب التلميذ التفصيل

أسلوبك: ودود، مشجع، واضح، تستعمل الإيموجي باعتدال 😊`;

export async function POST(req: NextRequest) {
  try {
    const { messages, subject } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT + (subject ? `\n\nالمادة الحالية: ${subject}` : ""),
    });

    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "حدث خطأ في الاتصال بالمساعد. حاول مرة أخرى." },
      { status: 500 }
    );
  }
}
