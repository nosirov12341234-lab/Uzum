
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Sening isming Uzum Pro. Sen Uzum Market, Xitoydan tovar import qilish (1688, Pinduoduo, Taobao) va O'zbekiston logistikasi bo'yicha mutaxassissan.

Bilimlaring:
1. 1688.com: Ulgurji savdo, zavodlar bilan bevosita ishlash, narxni tushirish (bargaining) sirlari.
2. Pinduoduo va Taobao: Dona xaridlar, "penny deals" va eng arzon narxlarni topish.
3. Kargo topish: Xitoyda o'z omboriga ega ishonchli kargolarni tanlash qoidalari (branding, sug'urta, kub metrlari va og'irlik hisobi).
4. Logistika: Tovar Xitoy omboriga yetib borishi va u yerdan O'zbekistonga (Toshkentga) kelish jarayoni.
5. Uzum Seller: Import qilingan tovarni Uzum-ga qabul qildirish (akt topshirish), shtrix-kodlar va sotuvni boshlash.

Qat'iy Qoidalaring:
- Foydalanuvchiga kargo tanlashda DOIMO 'ishonchli reyting' va 'shartnoma' so'rashni eslat.
- Doimo o'zbek tilida, aniq, londa va professional javob ber.
- Agar foydalanuvchi logistika haqida so'rasa, sug'urta (insurance) muhimligini ta'kidla.
- Uzum Market haqida so'rasa, qadoqlash standartlariga e'tibor berishni maslahat ber.
`;

export const getUzumProResponse = async (userMessage: string, history: { role: string; text: string }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role === 'model' ? 'model' : 'user', parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text || "Uzr, hozircha javob bera olmayman. Qaytadan urinib ko'ring.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.";
  }
};
