import './bootstrap';

import './database';
import Active from './app/models/Active';
import User from './app/models/User';
import UserActive from './app/models/UserActive';

import { getActive } from './app/services/activeUtils';

async function seed() {
  try {
    const user = await User.create({
      name: 'demo',
      email: 'demo@demo.com',
      password: '123456',
    });

    let active = await getActive('BIDI11');
    await UserActive.findOrCreate({
      where: {
        userId: user.dataValues.id,
        activeId: active.id,
        amount: 100,
        buyDate: new Date(2019, 0, 1),
        value: 60.45,
      },
    });

    active = await getActive('PETR4');
    await UserActive.findOrCreate({
      where: {
        userId: user.dataValues.id,
        activeId: active.id,
        amount: 200,
        buyDate: new Date(2019, 0, 1),
        value: 28.46,
      },
    });

    active = await getActive('VALE3');
    await UserActive.findOrCreate({
      where: {
        userId: user.dataValues.id,
        activeId: active.id,
        amount: 50,
        buyDate: new Date(2019, 0, 1),
        value: 46.89,
      },
    });

    active = await getActive('WEGE3');
    await UserActive.findOrCreate({
      where: {
        userId: user.dataValues.id,
        activeId: active.id,
        amount: 90,
        buyDate: new Date(2019, 0, 1),
        value: 16.78,
      },
    });

    active = await getActive('ITUB3');
    await UserActive.findOrCreate({
      where: {
        userId: user.dataValues.id,
        activeId: active.id,
        amount: 300,
        buyDate: new Date(2019, 0, 1),
        value: 46.12,
      },
    });

    active = await getActive('MGLU3');
    await UserActive.findOrCreate({
      where: {
        userId: user.dataValues.id,
        activeId: active.id,
        amount: 60,
        buyDate: new Date(2019, 0, 1),
        value: 40.23,
      },
    });

    active = await getActive('KNRI11');
    await UserActive.findOrCreate({
      where: {
        userId: user.dataValues.id,
        activeId: active.id,
        amount: 400,
        buyDate: new Date(2019, 0, 1),
        value: 156.32,
      },
    });

    active = await getActive('HGLG11');
    await UserActive.findOrCreate({
      where: {
        userId: user.dataValues.id,
        activeId: active.id,
        amount: 50,
        buyDate: new Date(2019, 0, 1),
        value: 123.51,
      },
    });

    [active] = await Active.findOrCreate({
      where: {
        code: 'RF',
        type: 'Bond',
        name: 'Tesouro Direto',
      },
    });
    await UserActive.findOrCreate({
      where: {
        userId: user.dataValues.id,
        activeId: active.dataValues.id,
        amount: 1,
        value: 50000.0,
        dueDate: new Date(2030, 0, 1),
        nowValue: 53890.56,
        buyDate: new Date(2019, 0, 1),
      },
    });

    [active] = await Active.findOrCreate({
      where: {
        code: 'RF',
        type: 'Bond',
        name: 'LCI ITAU',
      },
    });
    await UserActive.findOrCreate({
      where: {
        userId: user.dataValues.id,
        activeId: active.dataValues.id,
        amount: 1,
        value: 20000.0,
        dueDate: new Date(2030, 0, 1),
        nowValue: 53890.56,
        buyDate: new Date(2019, 0, 1),
      },
    });
  } catch (err) {
    console.log(err.message);
    console.log('Demo already exists');
  }
}

seed();
