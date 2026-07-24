import Cerebras from '@cerebras/cerebras_cloud_sdk';
import type { MeaningParams, MeaningResult } from '../model/types';

interface CerebrasCompletion {
    choices: Array<{
        message: {
            content: string | null;
        };
    }>;
}

function buildPrompt(params: MeaningParams): string {
    if (params.type === 'dailyCard') {
        const timeInstructions: Record<typeof params.time, string> = {
            morning: 'утро - что ждет днем',
            afternoon: 'день - какой был день, что ждет',
            evening: 'вечер - итог дня',
        };

        return `
Ты опытный таролог. Дай толкование карты дня — коротко, атмосферно, интересно.

Карта: ${params.cardName}

Требования:
- русский язык
- short: одно-два предложения, в зависимости от времени получения карты (${timeInstructions[params.time]})

Верни строго JSON с полем short, без markdown и пояснений.`;
    }

    return `
Ты опытный таролог и рассказчик. Твоя задача — дать понятное, интересное и атмосферное толкование расклада Таро.

Пиши живо и образно, но просто и естественно. Избегай пафоса, чрезмерной мистики и длинных метафор.
Текст должен читаться легко и звучать как спокойное объяснение смысла карт.

Объясни:
- общий смысл расклада
- как карты влияют друг на друга
- какое послание или совет они дают

Требования:
- русский язык
- полный текст 120–180 слов
- стиль спокойный, интригующий и понятный
- не используй слишком вычурные фразы и мистический пафос
- не повторяй одни и те же идеи разными словами

Верни результат строго в формате JSON с двумя полями:

full — развернутое толкование расклада (120–180 слов)
short — краткое толкование в 2 полных предложениях, передающее основной смысл расклада.

Входные данные:
Тип расклада: ${params.spreadType.name}
На что расклад: ${params.spreadPurpose.name}
Выпавшие карты: ${params.cardNames}

Выводи только чистый JSON. Без пояснений, без markdown, без дополнительного текста.`;
}

export async function generateTarotMeaning<T extends MeaningParams>(params: T): Promise<MeaningResult<T>> {
    const client = new Cerebras({ apiKey: import.meta.env.VITE_CEREBRAS_API });

    const completion = (await client.chat.completions.create({
        messages: [{ role: 'user', content: buildPrompt(params) }],
        model: 'zai-glm-4.7',
    })) as CerebrasCompletion;

    const content = completion.choices[0].message.content;

    if (!content) {
        throw new Error('Cerebras вернул пустой ответ');
    }

    return JSON.parse(content) as MeaningResult<T>;
}
