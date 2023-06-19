import { ipcMain } from 'electron';
import { Configuration, CreateChatCompletionResponse, OpenAIApi } from 'openai';
import { AxiosResponse } from 'axios';

ipcMain.handle('plug:ai:openai', async (_, content: string, id: number) => {
  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);
  let chatCompletion: AxiosResponse<CreateChatCompletionResponse>;

  try {
    chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo-0613',
      messages: [{ role: 'user', content }],
    });
  } catch (e: Error) {
    return e.message;
    // todo
  }
  console.log({ chatCompletion: chatCompletion.data });
  return chatCompletion.data.choices[0].message;
});
