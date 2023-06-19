import { ipcMain } from 'electron';
import { randomUUID } from 'crypto';
import { Setting, Plug, UserPlug, UserData } from './models';
import { Paginate } from './types';

ipcMain.handle('db:find', async (event, id: string) => {
  return Setting.findOne({});
});

// 创建
ipcMain.handle('db:create', async (_, key: string, value: any) => {
  return (
    await UserData.create({
      uuid: randomUUID(),
      userId: randomUUID(),
      plugId: randomUUID(),
      key,
      value,
    })
  ).dataValues;
});

// 分页
ipcMain.handle(
  'db:paginate',
  async (
    _,
    key: string,
    search: Object,
    option: Paginate = { page: 1, page_size: 15 }
  ): Promise<Paginate> => {
    option.total = await UserData.count();
    option.page_count = Math.ceil(option.total / option.page_size);
    option.data = (
      await UserData.findAll({
        where: {
          key,
        },
        attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
        offset: (option.page - 1) * option.page_size,
        limit: option.page_size,
      })
    ).map((m) => m.dataValues);

    return option;
  }
);

ipcMain.handle('system:init', async () => {
  return JSON.stringify(
    await UserPlug.findAll({
      include: [Plug],
    })
  );
});
