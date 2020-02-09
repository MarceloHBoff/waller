import 'dotenv/config';

import './database';
import getStock from './app/services/getStock';
import User from './app/models/User';
import Bond from './app/models/Bond';
import UserStock from './app/models/UserStock';

async function teste() {
  try {
    const user = await User.create({
      name: 'demo',
      email: 'demo@demo.com',
      password: '123456',
    });

    let stock = await getStock('BIDI11');
    await UserStock.create({
      userId: user.dataValues.id,
      stockId: stock.id,
      amount: 100,
      averagePrice: 60.45,
    });

    stock = await getStock('PETR4');
    await UserStock.create({
      userId: user.dataValues.id,
      stockId: stock.id,
      amount: 200,
      averagePrice: 28.46,
    });

    stock = await getStock('VALE3');
    await UserStock.create({
      userId: user.dataValues.id,
      stockId: stock.id,
      amount: 50,
      averagePrice: 46.89,
    });

    stock = await getStock('WEGE3');
    await UserStock.create({
      userId: user.dataValues.id,
      stockId: stock.id,
      amount: 90,
      averagePrice: 16.78,
    });

    stock = await getStock('ITUB3');
    await UserStock.create({
      userId: user.dataValues.id,
      stockId: stock.id,
      amount: 300,
      averagePrice: 46.12,
    });

    stock = await getStock('MGLU3');
    await UserStock.create({
      userId: user.dataValues.id,
      stockId: stock.id,
      amount: 60,
      averagePrice: 40.23,
    });

    stock = await getStock('KNRI11');
    await UserStock.create({
      userId: user.dataValues.id,
      stockId: stock.id,
      amount: 400,
      averagePrice: 156.32,
    });

    stock = await getStock('HGLG11');
    await UserStock.create({
      userId: user.dataValues.id,
      stockId: stock.id,
      amount: 50,
      averagePrice: 123.51,
    });

    await Bond.create({
      userId: user.dataValues.id,
      title: 'Tesouro Direto',
      value: 50000.0,
      nowValue: 53890.56,
      dueDate: new Date(1, 1, 2020),
      nowRentability: 7.785,
    });

    await Bond.create({
      userId: user.dataValues.id,
      title: 'LCI ITAU',
      value: 20000.0,
      nowValue: 22456.0,
      dueDate: new Date(1, 1, 2020),
      nowRentability: 12.28,
    });
  } catch (err) {
    console.log(err.message);
    console.log('Demo already exists');
  }
}

teste();
